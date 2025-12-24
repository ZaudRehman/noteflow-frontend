export function stripMarkdown(markdown: string): string {
    if (!markdown) return '';

    return markdown
        // Remove headers
        .replace(/^#{1,6}\s+/gm, '')
        // Remove blockquotes
        .replace(/^\s*>\s+/gm, '')
        // Remove list markers
        .replace(/^[\s-]*[-*+]\s+/gm, '')
        .replace(/^\s*\d+\.\s+/gm, '')
        // Remove horizontal rules
        .replace(/^\s*[-*_]{3,}\s*$/gm, '')
        // Remove bold/italic
        .replace(/(\*\*|__)(.*?)\1/g, '$2')
        .replace(/(\*|_)(.*?)\1/g, '$2')
        // Remove links/images
        .replace(/!\[(.*?)\]\(.*?\)/g, '$1') // Images
        .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Links
        // Remove inline code
        .replace(/`([^`]+)`/g, '$1')
        // Remove code blocks
        .replace(/```[\s\S]*?```/g, '')
        // Remove LaTeX block \[ ... \] and $$ ... $$
        .replace(/\\\[[\s\S]*?\\\]/g, ' [Equation] ')
        .replace(/\$\$[\s\S]*?\$\$/g, ' [Equation] ')
        // Remove LaTeX inline \( ... \) and $ ... $
        .replace(/\\\([\s\S]*?\\\)/g, ' [Equation] ')
        .replace(/\$[^$]*?\$/g, ' [Equation] ')
        // Collapse whitespace
        .replace(/\s+/g, ' ')
        .trim();
}
