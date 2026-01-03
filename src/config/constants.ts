/**
 * ArchDrift Configuration Constants
 * 
 * Centralized configuration for stability labels, expert diagnosis messages,
 * and other UI-facing strings. Separates business logic from presentation.
 */

/**
 * Stability Label definitions based on drift percentage
 */
export const STABILITY_LABELS = {
    ROCK_SOLID: {
        threshold: 1,
        emoji: '🟢',
        name: 'Rock Solid',
        description: 'Minimal architectural drift, excellent structural integrity'
    },
    STABLE: {
        threshold: 5,
        emoji: '🟡',
        name: 'Stable',
        description: 'Low drift, manageable technical debt'
    },
    ERODING: {
        threshold: 20,
        emoji: '🟠',
        name: 'Eroding',
        description: 'Moderate drift, requires attention'
    },
    CRITICAL: {
        threshold: Infinity,
        emoji: '🔴',
        name: 'Critical',
        description: 'High drift, urgent refactoring needed'
    }
} as const;

/**
 * Get stability label for a given drift percentage
 */
export function getStabilityLabel(drift: number): typeof STABILITY_LABELS[keyof typeof STABILITY_LABELS] {
    if (drift < STABILITY_LABELS.ROCK_SOLID.threshold) {
        return STABILITY_LABELS.ROCK_SOLID;
    } else if (drift < STABILITY_LABELS.STABLE.threshold) {
        return STABILITY_LABELS.STABLE;
    } else if (drift < STABILITY_LABELS.ERODING.threshold) {
        return STABILITY_LABELS.ERODING;
    } else {
        return STABILITY_LABELS.CRITICAL;
    }
}

/**
 * Expert Diagnosis message templates
 * These are refined to mention specific top offenders when available
 * Now includes remediation sentences based on top violation type
 */
export const EXPERT_DIAGNOSIS_TEMPLATES = {
    ROCK_SOLID: (topOffenders?: string[], remediation?: string) => {
        const base = topOffenders && topOffenders.length > 0
            ? `🟢 Rock Solid: Minimal architectural drift, excellent structural integrity. Top files: ${topOffenders.slice(0, 3).join(', ')}`
            : '🟢 Rock Solid: Minimal architectural drift, excellent structural integrity.';
        return remediation ? `${base} ${remediation}` : base;
    },
    STABLE: (topOffenders?: string[], remediation?: string) => {
        const base = topOffenders && topOffenders.length > 0
            ? `🟡 Stable: Low drift, manageable technical debt. Focus areas: ${topOffenders.slice(0, 3).join(', ')}`
            : '🟡 Stable: Low drift, manageable technical debt.';
        return remediation ? `${base} ${remediation}` : base;
    },
    ERODING: (topOffenders?: string[], remediation?: string) => {
        const base = topOffenders && topOffenders.length > 0
            ? `🟠 Eroding: Moderate drift, requires attention. Priority refactoring: ${topOffenders.slice(0, 3).join(', ')}`
            : '🟠 Eroding: Moderate drift, requires attention.';
        return remediation ? `${base} ${remediation}` : base;
    },
    CRITICAL: (topOffenders?: string[], remediation?: string) => {
        const base = topOffenders && topOffenders.length > 0
            ? `🔴 Critical: High drift, urgent refactoring needed. Critical files: ${topOffenders.slice(0, 3).join(', ')}`
            : '🔴 Critical: High drift, urgent refactoring needed.';
        return remediation ? `${base} ${remediation}` : base;
    }
} as const;

/**
 * Detect project domain from repository name and characteristics
 * @param repoName Repository name
 * @param violations Violation counts (can help infer domain)
 * @returns Detected project domain
 */
export function detectProjectDomain(
    repoName: string,
    violations?: { layer: number; nPlusOne: number; godClass: number }
): ProjectDomain {
    const name = repoName.toLowerCase();
    
    // Framework detection
    if (name.includes('react') || name.includes('vue') || name.includes('angular') || 
        name.includes('svelte') || name.includes('remix') || name.includes('next') ||
        name.includes('nest') || name.includes('express') || name.includes('fastify') ||
        name.includes('hono') || name.includes('storybook')) {
        return 'FRAMEWORK';
    }
    
    // Database/ORM detection
    if (name.includes('prisma') || name.includes('typeorm') || name.includes('sequelize') ||
        name.includes('mongoose') || name.includes('database') || name.includes('db') ||
        name.includes('orm') || name.includes('query') || name.includes('directus') ||
        name.includes('strapi') || name.includes('payload')) {
        return 'DATABASE';
    }
    
    // Utility library detection
    if (name.includes('lodash') || name.includes('underscore') || name.includes('ramda') ||
        name.includes('axios') || name.includes('zod') || name.includes('yup') ||
        name.includes('validator') || name.includes('utils') || name.includes('helper') ||
        name.includes('prettier') || name.includes('eslint') || name.includes('biome')) {
        return 'UTILITY';
    }
    
    // Application detection (full-stack apps)
    if (name.includes('app') || name.includes('calcom') || name.includes('plane') ||
        name.includes('nocodb') || name.includes('immich') || name.includes('tldraw') ||
        name.includes('excalidraw') || name.includes('vscode')) {
        return 'APPLICATION';
    }
    
    return 'UNKNOWN';
}

/**
 * Get remediation message based on top violation type
 * @param violations Violation counts
 * @returns Remediation message or undefined
 */
export function getRemediationMessage(
    violations: { layer: number; nPlusOne: number; godClass: number }
): string | undefined {
    // Determine top violation type
    const layerWeight = violations.layer * 10;
    const godClassWeight = violations.godClass * 5;
    const nPlusOneWeight = violations.nPlusOne * 2;
    
    if (layerWeight >= godClassWeight && layerWeight >= nPlusOneWeight && violations.layer > 0) {
        return REMEDIATION_TEMPLATES.layerViolation;
    } else if (godClassWeight >= nPlusOneWeight && violations.godClass > 0) {
        return REMEDIATION_TEMPLATES.godClass;
    } else if (violations.nPlusOne > 0) {
        return REMEDIATION_TEMPLATES.nPlusOneQuery;
    }
    
    return undefined;
}

/**
 * Generate expert diagnosis with top offenders and remediation
 * @param drift Drift percentage (0-100)
 * @param violations Violation counts
 * @param topOffenders Optional array of top offender file names (without paths)
 */
export function getExpertDiagnosis(
    drift: number,
    violations: { layer: number; nPlusOne: number; godClass: number },
    topOffenders?: string[]
): string {
    const label = getStabilityLabel(drift);
    
    // Extract top offender file names (just basename, no path)
    const offenderFiles = topOffenders?.map(file => {
        const parts = file.split(/[/\\]/);
        return parts[parts.length - 1];
    }).filter(Boolean) || [];
    
    // Get remediation message based on top violation
    const remediation = getRemediationMessage(violations);
    
    switch (label.name) {
        case 'Rock Solid':
            return EXPERT_DIAGNOSIS_TEMPLATES.ROCK_SOLID(offenderFiles.length > 0 ? offenderFiles : undefined, remediation);
        case 'Stable':
            return EXPERT_DIAGNOSIS_TEMPLATES.STABLE(offenderFiles.length > 0 ? offenderFiles : undefined, remediation);
        case 'Eroding':
            return EXPERT_DIAGNOSIS_TEMPLATES.ERODING(offenderFiles.length > 0 ? offenderFiles : undefined, remediation);
        case 'Critical':
            return EXPERT_DIAGNOSIS_TEMPLATES.CRITICAL(offenderFiles.length > 0 ? offenderFiles : undefined, remediation);
        default:
            return EXPERT_DIAGNOSIS_TEMPLATES.ROCK_SOLID(undefined, remediation);
    }
}

/**
 * Violation weights for drift calculation (default/legacy)
 */
export const VIOLATION_WEIGHTS = {
    layerViolation: 10,    // Layer violations (highest weight - architectural boundary violations)
    godClassMonolith: 5,    // God Class Monoliths (1501+ LOC for regular files, 2501+ for type files)
    nPlusOneQuery: 2       // N+1 Queries (reduced from 3 due to false positives)
} as const;

/**
 * Domain-aware violation weights
 * Different project types have different architectural priorities
 */
export type ProjectDomain = 'FRAMEWORK' | 'UTILITY' | 'DATABASE' | 'APPLICATION' | 'UNKNOWN';

export const DOMAIN_WEIGHTS = {
    FRAMEWORK: {
        layerViolation: 15,    // High weight: Frameworks must maintain strict architectural boundaries
        godClassMonolith: 3,    // Lower weight: Framework code can be complex but organized
        nPlusOneQuery: 2,       // Standard weight: Performance matters but not primary concern
        structuralWeight: 0.5,  // Weight for structural violations (Layer + God Class)
        performanceWeight: 0.3, // Weight for performance violations (N+1)
        complexityWeight: 0.2   // Weight for complexity violations (God Class)
    },
    UTILITY: {
        layerViolation: 5,     // Lower weight: Utilities may have simpler structure
        godClassMonolith: 2,   // Lower weight: Utilities often have large files (e.g., lodash)
        nPlusOneQuery: 1,      // Lower weight: Utilities rarely have N+1 issues
        structuralWeight: 0.2,  // Lower overall structural penalty
        performanceWeight: 0.1, // Lower performance penalty
        complexityWeight: 0.7  // Higher complexity tolerance (utilities can be complex)
    },
    DATABASE: {
        layerViolation: 8,     // Moderate weight: Database tools need structure
        godClassMonolith: 4,   // Moderate weight: Some complexity is expected
        nPlusOneQuery: 5,      // High weight: N+1 is critical for database tools
        structuralWeight: 0.3, // Moderate structural weight
        performanceWeight: 0.6, // High performance weight (N+1 is critical)
        complexityWeight: 0.1  // Lower complexity weight
    },
    APPLICATION: {
        layerViolation: 10,    // Standard weight: Applications need clean architecture
        godClassMonolith: 5,   // Standard weight
        nPlusOneQuery: 2,      // Standard weight
        structuralWeight: 0.4, // Balanced weights
        performanceWeight: 0.3,
        complexityWeight: 0.3
    },
    UNKNOWN: {
        layerViolation: 10,    // Default weights (fallback)
        godClassMonolith: 5,
        nPlusOneQuery: 2,
        structuralWeight: 0.4,
        performanceWeight: 0.3,
        complexityWeight: 0.3
    }
} as const;

/**
 * Remediation messages based on top violation type
 */
export const REMEDIATION_TEMPLATES = {
    layerViolation: 'Remediation: Refactor imports to respect layer boundaries—move shared logic to appropriate layers.',
    godClass: 'Remediation: Split large files into focused modules—extract related functionality into separate files.',
    nPlusOneQuery: 'Remediation: Batch database queries outside loops—use Promise.all() or bulk operations to reduce round trips.'
} as const;
