// Pure data snapshot of AWS course task guides for semantic search.
// Kept separate from client components so global search never imports React/CSS UI.
const V = (kind: string, title: string, subtitle: string, nodes: string[], explanation: string, cue: string) => ({ kind, title, subtitle, nodes, explanation, cue });

export const awsSaaDomains = [] as const;

export const awsSapDomains = [] as const;

export const awsAdvancedNetworkingDomains = [] as const;

export const awsSecurityDomains = [] as const;

export const awsDeveloperDomains = [] as const;

export const awsCloudPractitionerDomains = [] as const;

export const awsAiPractitionerDomains = [] as const;
