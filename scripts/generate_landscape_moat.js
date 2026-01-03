// Generate LANDSCAPE_MOAT.json from archived test results
// Uses new calculateDrift logic (not SII)
// Processes all repos in test-results-backup/ with error resilience

const fs = require('fs');
const path = require('path');

// Domain-aware drift calculation logic (matching analyzer.ts)
const DOMAIN_WEIGHTS = {
    FRAMEWORK: {
        layerViolation: 15,
        godClassMonolith: 3,
        nPlusOneQuery: 2,
        structuralWeight: 0.5,
        performanceWeight: 0.3,
        complexityWeight: 0.2
    },
    UTILITY: {
        layerViolation: 5,
        godClassMonolith: 2,
        nPlusOneQuery: 1,
        structuralWeight: 0.2,
        performanceWeight: 0.1,
        complexityWeight: 0.7
    },
    DATABASE: {
        layerViolation: 8,
        godClassMonolith: 4,
        nPlusOneQuery: 5,
        structuralWeight: 0.3,
        performanceWeight: 0.6,
        complexityWeight: 0.1
    },
    APPLICATION: {
        layerViolation: 10,
        godClassMonolith: 5,
        nPlusOneQuery: 2,
        structuralWeight: 0.4,
        performanceWeight: 0.3,
        complexityWeight: 0.3
    },
    UNKNOWN: {
        layerViolation: 10,
        godClassMonolith: 5,
        nPlusOneQuery: 2,
        structuralWeight: 0.4,
        performanceWeight: 0.3,
        complexityWeight: 0.3
    }
};

function detectProjectDomain(repoName) {
    const name = repoName.toLowerCase();
    
    if (name.includes('react') || name.includes('vue') || name.includes('angular') || 
        name.includes('svelte') || name.includes('remix') || name.includes('next') ||
        name.includes('nest') || name.includes('express') || name.includes('fastify') ||
        name.includes('hono') || name.includes('storybook')) {
        return 'FRAMEWORK';
    }
    
    if (name.includes('prisma') || name.includes('typeorm') || name.includes('sequelize') ||
        name.includes('mongoose') || name.includes('database') || name.includes('db') ||
        name.includes('orm') || name.includes('query') || name.includes('directus') ||
        name.includes('strapi') || name.includes('payload')) {
        return 'DATABASE';
    }
    
    if (name.includes('lodash') || name.includes('underscore') || name.includes('ramda') ||
        name.includes('axios') || name.includes('zod') || name.includes('yup') ||
        name.includes('validator') || name.includes('utils') || name.includes('helper') ||
        name.includes('prettier') || name.includes('eslint') || name.includes('biome')) {
        return 'UTILITY';
    }
    
    if (name.includes('app') || name.includes('calcom') || name.includes('plane') ||
        name.includes('nocodb') || name.includes('immich') || name.includes('tldraw') ||
        name.includes('excalidraw') || name.includes('vscode')) {
        return 'APPLICATION';
    }
    
    return 'UNKNOWN';
}

function calculateDrift(rawIssues, productionLOC, totalProductionFiles, strictMode = true, domain = null) {
    if (strictMode) {
        let productionIssues = 0;
        let godClassMonoliths = 0;
        let nPlusOneQueries = 0;
        let layerViolations = 0;

        rawIssues.forEach(issue => {
            productionIssues++;
            
            if (issue.pattern === 'Layer Violation') {
                layerViolations++;
            } else if (issue.pattern === 'N+1 Query') {
                if (issue.likelyBatched) {
                    nPlusOneQueries += 0.5;
                } else {
                    nPlusOneQueries++;
                }
            } else if (issue.pattern === 'God Class') {
                if (issue.godClassTier === 'Monolith') {
                    godClassMonoliths++;
                }
            }
        });
        
        // Detect domain if not provided
        const detectedDomain = domain || 'UNKNOWN';
        const domainWeights = DOMAIN_WEIGHTS[detectedDomain];
        
        // Calculate weighted violation count using domain-aware weights
        const weightedViolations = (godClassMonoliths * domainWeights.godClassMonolith) + 
                                   (nPlusOneQueries * domainWeights.nPlusOneQuery) + 
                                   (layerViolations * domainWeights.layerViolation);
        
        const totalFiles = Math.max(totalProductionFiles, 1);
        
        // Domain-aware drift calculation using weighted densities
        const layerDensity = layerViolations / totalFiles;
        const n1Density = nPlusOneQueries / totalFiles;
        const godClassDensity = godClassMonoliths / totalFiles;
        
        // Apply domain-specific weights to densities
        const structuralDrift = domainWeights.structuralWeight * (layerDensity * domainWeights.layerViolation + godClassDensity * domainWeights.godClassMonolith) * 100;
        const performanceDrift = domainWeights.performanceWeight * (n1Density * domainWeights.nPlusOneQuery) * 100;
        const complexityDrift = domainWeights.complexityWeight * (godClassDensity * domainWeights.godClassMonolith) * 100;
        
        // Combined drift score
        let driftScore = structuralDrift + performanceDrift + complexityDrift;
        
        // Logarithmic Ceiling (matching analyzer.ts)
        const violationDensity = weightedViolations / totalFiles;
        let logarithmicCeiling;
        if (violationDensity <= 1) {
            logarithmicCeiling = 100 - (60 * Math.exp(-violationDensity * 2));
            driftScore = Math.min(driftScore, logarithmicCeiling);
        } else {
            logarithmicCeiling = 100 - (40 * Math.exp(-(violationDensity - 1) * 0.5));
            const growthFactor = Math.sqrt(violationDensity);
            driftScore = Math.min(logarithmicCeiling, growthFactor * 50);
        }
        
        driftScore = Math.min(100, Math.max(0, driftScore));
        const driftScoreRounded = Math.round(driftScore * 10) / 10;
        
        return {
            driftScore: driftScoreRounded,
            weightedDebt: weightedViolations,
            productionLOC,
            productionIssues,
            totalProductionFiles: totalFiles
        };
    }
}

// Import constants (using require for JS compatibility)
const constantsPath = path.join(__dirname, '..', 'out', 'config', 'constants.js');
let getExpertDiagnosisFromConstants;
try {
    // Try to use compiled constants if available
    const constants = require(constantsPath);
    getExpertDiagnosisFromConstants = constants.getExpertDiagnosis;
} catch (e) {
    // Fallback to inline implementation matching constants.ts
    getExpertDiagnosisFromConstants = null;
}

function getExpertDiagnosis(drift, violations, topOffenders = []) {
    // Use constants if available (includes remediation), otherwise fallback
    if (getExpertDiagnosisFromConstants) {
        return getExpertDiagnosisFromConstants(drift, violations, topOffenders);
    }
    
    // Fallback implementation matching src/config/constants.ts (without remediation)
    const offenderFiles = topOffenders.map(file => {
        const parts = file.split(/[/\\]/);
        return parts[parts.length - 1];
    }).filter(Boolean).slice(0, 3);
    
    if (drift < 1) {
        if (offenderFiles.length > 0) {
            return `🟢 Rock Solid: Minimal architectural drift, excellent structural integrity. Top files: ${offenderFiles.join(', ')}`;
        }
        return '🟢 Rock Solid: Minimal architectural drift, excellent structural integrity.';
    } else if (drift < 5) {
        if (offenderFiles.length > 0) {
            return `🟡 Stable: Low drift, manageable technical debt. Focus areas: ${offenderFiles.join(', ')}`;
        }
        return '🟡 Stable: Low drift, manageable technical debt.';
    } else if (drift < 20) {
        if (offenderFiles.length > 0) {
            return `🟠 Eroding: Moderate drift, requires attention. Priority refactoring: ${offenderFiles.join(', ')}`;
        }
        return '🟠 Eroding: Moderate drift, requires attention.';
    } else {
        if (offenderFiles.length > 0) {
            return `🔴 Critical: High drift, urgent refactoring needed. Critical files: ${offenderFiles.join(', ')}`;
        }
        return '🔴 Critical: High drift, urgent refactoring needed.';
    }
}

function parseFullDetails(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const lines = content.split('\n');
        
        // Extract production files and LOC
        let productionFiles = 0;
        let productionLOC = 0;
        
        for (const line of lines) {
            if (line.includes('Total Files:') && line.includes('production')) {
                const match = line.match(/\((\d+)\s+production\)/);
                if (match) productionFiles = parseInt(match[1].replace(/,/g, ''));
            }
            if (line.includes('Production Code:') && line.includes('LOC')) {
                const match = line.match(/([\d,]+)\s+LOC/);
                if (match) productionLOC = parseInt(match[1].replace(/,/g, ''));
            }
        }
        
        // Parse violations and extract top offenders
        const rawIssues = [];
        const topOffenders = new Set(); // Track unique file paths
        let currentSection = '';
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            
            // Check for section headers (both formats)
            if (line.includes('## 📦 God Class') || line.includes('God Class')) {
                if (line.startsWith('##') || line.includes('📦')) {
                    currentSection = 'God Class';
                }
            } else if (line.includes('## ⚡ N+1 Query') || (line.includes('N+1 Query') && line.startsWith('###'))) {
                if (line.startsWith('##') || (line.startsWith('###') && line.includes('N+1'))) {
                    currentSection = 'N+1 Query';
                }
            } else if (line.includes('## 🚫 Layer Violation') || line.includes('Layer Violation')) {
                if (line.startsWith('##') || line.includes('🚫')) {
                    currentSection = 'Layer Violation';
                }
            }
            
            // Parse violations - handle multiple formats
            // Format 1: "### 1. N+1 Query - filepath" followed by "Line X: message"
            // Format 2: "### `filepath`" followed by "- **Line X:** message"
            if (line.match(/^### \d+\.\s+(N\+1 Query|God Class|Layer Violation)/)) {
                const patternMatch = line.match(/(N\+1 Query|God Class|Layer Violation)/);
                if (patternMatch) {
                    if (patternMatch[1] === 'N+1 Query') currentSection = 'N+1 Query';
                    else if (patternMatch[1] === 'God Class') currentSection = 'God Class';
                    else if (patternMatch[1] === 'Layer Violation') currentSection = 'Layer Violation';
                }
                // Extract file path from this format: "### 1. N+1 Query - filepath"
                const fileMatch = line.match(/-\s+(.+)$/);
                if (fileMatch) {
                    const filePath = fileMatch[1].trim();
                    // Remove relative path prefixes (sanitized for production)
                    const cleanPath = filePath.replace(/^\.\.\/\.\.\/\.\.\/[^/]+\/[^/]+\//, '');
                    topOffenders.add(cleanPath);
                }
            } else if (line.startsWith('### `')) {
                // Extract file path for top offenders
                const fileMatch = line.match(/### `([^`]+)`/);
                if (fileMatch) {
                    const filePath = fileMatch[1];
                    // Clean up path (remove ../../../audit_targets/ prefix)
                    // Remove relative path prefixes (sanitized for production)
                    const cleanPath = filePath.replace(/^\.\.\/\.\.\/\.\.\/[^/]+\/[^/]+\//, '');
                    topOffenders.add(cleanPath);
                }
            } else if (line.match(/^Line \d+:/) || line.match(/^- \*\*Line \d+:/)) {
                // Format 1: "Line X: message" (Prisma format)
                // Format 2: "- **Line X:** message" (other format)
                const lineMatch = line.match(/Line (\d+):/);
                const lineNumber = lineMatch ? parseInt(lineMatch[1]) : 1;
                
                if (currentSection === 'God Class') {
                    const isMonolith = line.includes('Monolith detected');
                    const locMatch = line.match(/(\d+)\s+code lines/);
                    const loc = locMatch ? parseInt(locMatch[1]) : 0;
                    
                    rawIssues.push({
                        pattern: 'God Class',
                        line: lineNumber,
                        column: 0,
                        message: line,
                        severity: 1,
                        codeLineCount: loc,
                        godClassTier: isMonolith ? 'Monolith' : 'Large Class'
                    });
                } else if (currentSection === 'N+1 Query') {
                    rawIssues.push({
                        pattern: 'N+1 Query',
                        line: lineNumber,
                        column: 0,
                        message: line,
                        severity: 1,
                        likelyBatched: false
                    });
                } else if (currentSection === 'Layer Violation') {
                    rawIssues.push({
                        pattern: 'Layer Violation',
                        line: lineNumber,
                        column: 0,
                        message: line,
                        severity: 1
                    });
                }
            }
        }
        
        return {
            rawIssues,
            productionFiles,
            productionLOC,
            topOffenders: Array.from(topOffenders).slice(0, 5) // Top 5 offenders
        };
    } catch (error) {
        throw new Error(`Failed to parse ${filePath}: ${error.message}`);
    }
}

function getAllRepos() {
    // Use environment variable or default to relative path
    const resultsBase = process.env.TEST_RESULTS_DIR || path.join(__dirname, '..', 'test-results-backup');
    const resultsDir = path.join(resultsBase, 'results');
    const repos = [];
    
    // Scan all batch directories
    const batches = ['batch_1', 'batch_2', 'batch_3', 'final_push'];
    
    for (const batch of batches) {
        const batchDir = path.join(resultsDir, batch);
        if (!fs.existsSync(batchDir)) continue;
        
        const items = fs.readdirSync(batchDir);
        for (const item of items) {
            const itemPath = path.join(batchDir, item);
            if (fs.statSync(itemPath).isDirectory()) {
                const fullDetailsPath = path.join(itemPath, 'FULL_DETAILS.md');
                if (fs.existsSync(fullDetailsPath)) {
                    repos.push({
                        name: item,
                        batch: batch,
                        fullDetailsPath: fullDetailsPath
                    });
                }
            }
        }
    }
    
    return repos;
}

async function generateLandscapeMoat() {
    const repos = getAllRepos();
    const results = [];
    const errors = [];
    
    for (const repo of repos) {
        try {
            const analysis = parseFullDetails(repo.fullDetailsPath);
            
            // Detect domain for domain-aware calculation
            const domain = detectProjectDomain(repo.name);
            
            const drift = calculateDrift(
                analysis.rawIssues,
                analysis.productionLOC,
                analysis.productionFiles,
                true,
                domain
            );
            
            const violations = {
                layer: analysis.rawIssues.filter(i => i.pattern === 'Layer Violation').length,
                nPlusOne: analysis.rawIssues.filter(i => i.pattern === 'N+1 Query').length,
                godClass: analysis.rawIssues.filter(i => i.pattern === 'God Class').length
            };
            
            // Get top offenders (files with most violations)
            const topOffenders = analysis.topOffenders || [];
            const expertDiagnosis = getExpertDiagnosis(drift.driftScore, violations, topOffenders);
            
            results.push({
                name: repo.name,
                drift: drift.driftScore,
                expertDiagnosis: expertDiagnosis,
                violations: violations,
                files: analysis.productionFiles,
                loc: analysis.productionLOC
            });
        } catch (error) {
            const errorMsg = `Error processing ${repo.name}: ${error.message}`;
            errors.push(errorMsg);
            // Continue processing other repos
        }
    }
    
    // Sort by drift (lowest to highest)
    results.sort((a, b) => a.drift - b.drift);
    
    // Generate JSON (production-ready, no notes)
    const moatData = {
        generated: new Date().toISOString(),
        totalRepos: results.length,
        errors: errors.length > 0 ? errors : undefined,
        repos: results
    };
    
    const outputPath = path.join(__dirname, '..', 'LANDSCAPE_MOAT.json');
    fs.writeFileSync(outputPath, JSON.stringify(moatData, null, 2), 'utf-8');
    
    // Also write to dist/ for production
    const distDir = path.join(__dirname, '..', 'dist');
    if (!fs.existsSync(distDir)) {
        fs.mkdirSync(distDir, { recursive: true });
    }
    const distPath = path.join(distDir, 'LANDSCAPE_MOAT.json');
    fs.writeFileSync(distPath, JSON.stringify(moatData, null, 2), 'utf-8');
}

if (require.main === module) {
    generateLandscapeMoat().catch(console.error);
}

module.exports = { generateLandscapeMoat };
