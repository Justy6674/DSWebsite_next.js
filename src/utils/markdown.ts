// Utilities for cleaning and normalizing blog content into Markdown that renders correctly
// - Fixes standalone bullet markers lines (e.g., "•" on its own line)
// - Normalizes Unicode bullets to Markdown (- or *)
// - Merges numbered markers placed on their own line with the following text
// - Ensures a blank line before lists so ReactMarkdown/remark parse them as lists
// - Normalizes CRLF/nbsp to LF/spaces

export const normalizeBlogContent = (raw: string): string => {
  if (!raw) return '';
  let text = raw.replace(/\r\n/g, '\n').replace(/\u00A0/g, ' ');

  const lines = text.split('\n');
  const merged: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];

    // If the line is only a bullet marker, merge it with next line
    if (/^\s*(?:[\u2022]|-|\*)\s*$/.test(l) && i + 1 < lines.length) {
      const next = lines[i + 1].trim();
      if (next) {
        const bullet = l.includes('*') ? '*' : '-';
        merged.push(`${bullet} ${next}`);
        i++;
        continue;
      }
    }

    // Normalize bullet char to markdown
    if (/^\s*[\u2022]\s+/.test(l)) {
      merged.push(l.replace(/^\s*[\u2022]\s+/, '- '));
      continue;
    }

    // If a numbered marker is on its own line, merge with the next
    const m = l.match(/^\s*(\d+)\.\s*$/);
    if (m && i + 1 < lines.length) {
      const next = lines[i + 1].trim();
      if (next) {
        merged.push(`${m[1]}. ${next}`);
        i++;
        continue;
      }
    }

    merged.push(l);
  }

  text = merged.join('\n');

  // Ensure blank line before lists for markdown parsing
  text = text.replace(/([^\n])\n(-\s|\*\s|\d+\.\s)/g, '$1\n\n$2');

  // Final fallback: convert any remaining bullet chars
  text = text.replace(/^\s*[\u2022]\s?/gm, '- ');

  return text;
};
