// Recover all Cursor chat history from workspaceStorage and globalStorage
// Extracts all chat conversations and saves them as Markdown files

const fs = require('fs');
const path = require('path');
const os = require('os');

// SQLite3 is needed - check if available
let sqlite3;
try {
    sqlite3 = require('sqlite3');
} catch (e) {
    console.error('sqlite3 not found. Installing...');
    console.error('Please run: npm install sqlite3');
    process.exit(1);
}

// Get workspaceStorage path based on OS
function getWorkspaceStoragePath() {
    const platform = os.platform();
    const homeDir = os.homedir();
    
    if (platform === 'win32') {
        // Windows: %APPDATA%/Cursor/User/workspaceStorage
        const appData = process.env.APPDATA || path.join(homeDir, 'AppData', 'Roaming');
        return path.join(appData, 'Cursor', 'User', 'workspaceStorage');
    } else if (platform === 'darwin') {
        // macOS: ~/Library/Application Support/Cursor/User/workspaceStorage
        return path.join(homeDir, 'Library', 'Application Support', 'Cursor', 'User', 'workspaceStorage');
    } else {
        // Linux: ~/.config/Cursor/User/workspaceStorage
        return path.join(homeDir, '.config', 'Cursor', 'User', 'workspaceStorage');
    }
}

function getGlobalStoragePath() {
    const platform = os.platform();
    const homeDir = os.homedir();
    
    if (platform === 'win32') {
        const appData = process.env.APPDATA || path.join(homeDir, 'AppData', 'Roaming');
        return path.join(appData, 'Cursor', 'User', 'globalStorage');
    } else if (platform === 'darwin') {
        return path.join(homeDir, 'Library', 'Application Support', 'Cursor', 'User', 'globalStorage');
    } else {
        return path.join(homeDir, '.config', 'Cursor', 'User', 'globalStorage');
    }
}

// Open SQLite database
function openDatabase(dbPath) {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(dbPath)) {
            reject(new Error(`Database not found: ${dbPath}`));
            return;
        }
        
        const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(db);
            }
        });
    });
}

// Query database for chat data
function queryChatData(db) {
    return new Promise((resolve, reject) => {
        const queries = [
            "SELECT key, value FROM ItemTable WHERE key LIKE '%chat%'",
            "SELECT key, value FROM ItemTable WHERE key LIKE '%aichat%'",
            "SELECT key, value FROM ItemTable WHERE key LIKE '%composer%'",
            "SELECT key, value FROM ItemTable WHERE key LIKE '%prompts%'",
            "SELECT key, value FROM ItemTable WHERE key LIKE '%aiService%'",
            "SELECT key, value FROM ItemTable WHERE key LIKE '%DriftGuard%'",
            "SELECT key, value FROM ItemTable WHERE key LIKE '%ArchDrift%'"
        ];
        
        const allResults = [];
        let completed = 0;
        
        queries.forEach((query, index) => {
            db.all(query, [], (err, rows) => {
                if (err) {
                    console.error(`Query ${index + 1} error:`, err.message);
                } else {
                    allResults.push(...rows);
                }
                
                completed++;
                if (completed === queries.length) {
                    // Remove duplicates based on key
                    const uniqueResults = [];
                    const seenKeys = new Set();
                    allResults.forEach(row => {
                        if (!seenKeys.has(row.key)) {
                            seenKeys.add(row.key);
                            uniqueResults.push(row);
                        }
                    });
                    resolve(uniqueResults);
                }
            });
        });
    });
}

// Parse chat data from JSON
function parseChatData(key, value) {
    try {
        const data = JSON.parse(value);
        const chats = [];
        
        // Handle different data structures
        if (Array.isArray(data)) {
            data.forEach((item, index) => {
                if (item && typeof item === 'object') {
                    chats.push({
                        key: `${key}[${index}]`,
                        data: item,
                        source: key
                    });
                }
            });
        } else if (data && typeof data === 'object') {
            // Check for nested chat structures
            if (data.chats || data.conversations || data.messages) {
                const chatArray = data.chats || data.conversations || data.messages;
                if (Array.isArray(chatArray)) {
                    chatArray.forEach((chat, index) => {
                        chats.push({
                            key: `${key}.chats[${index}]`,
                            data: chat,
                            source: key
                        });
                    });
                }
            } else if (data.prompts || data.composerId || data.bubbleId) {
                // Single chat entry
                chats.push({
                    key: key,
                    data: data,
                    source: key
                });
            } else {
                // Try to find chat-like structures in object
                Object.keys(data).forEach(subKey => {
                    if (typeof data[subKey] === 'object' && data[subKey] !== null) {
                        chats.push({
                            key: `${key}.${subKey}`,
                            data: data[subKey],
                            source: key
                        });
                    }
                });
            }
        }
        
        return chats;
    } catch (e) {
        // Not JSON or parse error
        return [];
    }
}

// Extract messages from chat data
function extractMessages(chatData) {
    const messages = [];
    
    function extractFromObject(obj, depth = 0) {
        if (depth > 10) return; // Prevent infinite recursion
        
        if (Array.isArray(obj)) {
            obj.forEach(item => extractFromObject(item, depth + 1));
        } else if (obj && typeof obj === 'object') {
            // Look for message-like structures
            if (obj.message || obj.content || obj.text || obj.prompt) {
                const content = obj.message || obj.content || obj.text || obj.prompt;
                const role = obj.role || obj.type || 'unknown';
                const timestamp = obj.timestamp || obj.date || obj.time || null;
                
                messages.push({
                    role: role,
                    content: content,
                    timestamp: timestamp,
                    metadata: obj
                });
            }
            
            // Recursively search nested objects
            Object.values(obj).forEach(value => {
                if (typeof value === 'object' && value !== null) {
                    extractFromObject(value, depth + 1);
                }
            });
        }
    }
    
    extractFromObject(chatData);
    return messages;
}

// Format chat as Markdown
function formatChatAsMarkdown(title, messages, source) {
    let markdown = `# Chat: ${title}\n\n`;
    markdown += `**Source:** ${source}\n`;
    markdown += `**Messages:** ${messages.length}\n`;
    markdown += `**Recovered:** ${new Date().toISOString()}\n\n`;
    markdown += `---\n\n`;
    
    messages.forEach((msg, index) => {
        const role = msg.role.toLowerCase();
        const timestamp = msg.timestamp ? ` (${new Date(msg.timestamp).toISOString()})` : '';
        
        if (role === 'user' || role === 'human' || role === 'prompt') {
            markdown += `## User${timestamp}\n\n`;
        } else if (role === 'assistant' || role === 'ai' || role === 'response') {
            markdown += `## AI${timestamp}\n\n`;
        } else {
            markdown += `## ${role}${timestamp}\n\n`;
        }
        
        // Format content - preserve code blocks
        const content = String(msg.content || '');
        if (content.includes('```') || content.includes('`')) {
            markdown += `${content}\n\n`;
        } else {
            // Check if content looks like code
            const lines = content.split('\n');
            const hasCodeIndicators = lines.some(line => 
                line.trim().startsWith('function ') ||
                line.trim().startsWith('const ') ||
                line.trim().startsWith('import ') ||
                line.trim().startsWith('export ')
            );
            
            if (hasCodeIndicators) {
                markdown += `\`\`\`\n${content}\n\`\`\`\n\n`;
            } else {
                markdown += `${content}\n\n`;
            }
        }
        
        markdown += `---\n\n`;
    });
    
    return markdown;
}

// Process a single workspace database
async function processWorkspace(workspacePath, outputDir) {
    const dbPath = path.join(workspacePath, 'state.vscdb');
    
    if (!fs.existsSync(dbPath)) {
        return { processed: false, reason: 'No state.vscdb found' };
    }
    
    try {
        const db = await openDatabase(dbPath);
        const results = await queryChatData(db);
        
        db.close();
        
        if (results.length === 0) {
            return { processed: true, chats: 0 };
        }
        
        let chatCount = 0;
        const workspaceName = path.basename(workspacePath);
        
        results.forEach(row => {
            const chats = parseChatData(row.key, row.value);
            
            chats.forEach((chat, index) => {
                const messages = extractMessages(chat.data);
                
                if (messages.length > 0) {
                    const title = chat.data.title || 
                                 chat.data.name || 
                                 `Chat ${chatCount + 1} from ${workspaceName}`;
                    const safeTitle = title.replace(/[<>:"/\\|?*]/g, '_').substring(0, 100);
                    const filename = `${workspaceName}_${safeTitle}_${Date.now()}.md`;
                    const filepath = path.join(outputDir, filename);
                    
                    const markdown = formatChatAsMarkdown(title, messages, `${workspaceName}/${row.key}`);
                    fs.writeFileSync(filepath, markdown, 'utf-8');
                    
                    chatCount++;
                }
            });
        });
        
        return { processed: true, chats: chatCount };
    } catch (error) {
        return { processed: false, reason: error.message };
    }
}

// Main recovery function
async function recoverAllChats() {
    const outputDir = path.join(__dirname, '..', 'all-cursor-chats');
    
    // Create output directory
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    
    console.log('🔍 Starting Cursor chat history recovery...\n');
    console.log(`📁 Output directory: ${outputDir}\n`);
    
    // Process workspaceStorage
    const workspaceStoragePath = getWorkspaceStoragePath();
    console.log(`📂 WorkspaceStorage: ${workspaceStoragePath}`);
    
    if (!fs.existsSync(workspaceStoragePath)) {
        console.log(`⚠️  WorkspaceStorage not found at: ${workspaceStoragePath}`);
    } else {
        const workspaces = fs.readdirSync(workspaceStoragePath).filter(item => {
            const itemPath = path.join(workspaceStoragePath, item);
            return fs.statSync(itemPath).isDirectory();
        });
        
        console.log(`   Found ${workspaces.length} workspaces\n`);
        
        let totalChats = 0;
        for (const workspace of workspaces) {
            const workspacePath = path.join(workspaceStoragePath, workspace);
            console.log(`   Processing: ${workspace}...`);
            
            const result = await processWorkspace(workspacePath, outputDir);
            if (result.processed) {
                if (result.chats > 0) {
                    console.log(`      ✅ Found ${result.chats} chat(s)`);
                    totalChats += result.chats;
                } else {
                    console.log(`      ⚪ No chats found`);
                }
            } else {
                console.log(`      ❌ Error: ${result.reason}`);
            }
        }
        
        console.log(`\n   Total chats from workspaces: ${totalChats}\n`);
    }
    
    // Process globalStorage
    const globalStoragePath = getGlobalStoragePath();
    console.log(`📂 GlobalStorage: ${globalStoragePath}`);
    
    if (!fs.existsSync(globalStoragePath)) {
        console.log(`⚠️  GlobalStorage not found at: ${globalStoragePath}`);
    } else {
        // Look for state.vscdb in globalStorage root or subdirectories
        const globalDbPath = path.join(globalStoragePath, 'state.vscdb');
        
        if (fs.existsSync(globalDbPath)) {
            console.log(`   Processing globalStorage state.vscdb...`);
            const result = await processWorkspace(globalStoragePath, outputDir);
            if (result.processed && result.chats > 0) {
                console.log(`      ✅ Found ${result.chats} chat(s) in globalStorage`);
            }
        }
        
        // Also check subdirectories
        const subdirs = fs.readdirSync(globalStoragePath).filter(item => {
            const itemPath = path.join(globalStoragePath, item);
            return fs.statSync(itemPath).isDirectory();
        });
        
        for (const subdir of subdirs) {
            const subdirPath = path.join(globalStoragePath, subdir);
            const dbPath = path.join(subdirPath, 'state.vscdb');
            
            if (fs.existsSync(dbPath)) {
                console.log(`   Processing ${subdir}...`);
                const result = await processWorkspace(subdirPath, outputDir);
                if (result.processed && result.chats > 0) {
                    console.log(`      ✅ Found ${result.chats} chat(s)`);
                }
            }
        }
    }
    
    console.log(`\n✅ Recovery complete!`);
    console.log(`📁 All chats saved to: ${outputDir}`);
    
    // List recovered files
    const files = fs.readdirSync(outputDir).filter(f => f.endsWith('.md'));
    console.log(`\n📄 Recovered ${files.length} chat file(s)`);
    
    if (files.length > 0) {
        console.log(`\nFirst few files:`);
        files.slice(0, 5).forEach(file => {
            console.log(`   - ${file}`);
        });
    }
}

// Run recovery
if (require.main === module) {
    recoverAllChats().catch(error => {
        console.error('❌ Recovery failed:', error);
        process.exit(1);
    });
}

module.exports = { recoverAllChats };
