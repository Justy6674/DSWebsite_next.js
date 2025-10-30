'use client';

import React from 'react';

interface TagsInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  className?: string;
}

export default function TagsInput({ value, onChange, placeholder, className }: TagsInputProps) {
  const [draft, setDraft] = React.useState('');

  const commit = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const items = trimmed
      .split(',') // allow comma-separated pastes
      .map(t => t.trim())
      .filter(Boolean);
    if (items.length === 0) return;
    const current = new Set(value.map(v => v.toLowerCase()));
    const merged = [...value];
    for (const t of items) {
      if (!current.has(t.toLowerCase())) merged.push(t);
    }
    onChange(merged);
    setDraft('');
  };

  const remove = (idx: number) => {
    const next = value.slice();
    next.splice(idx, 1);
    onChange(next);
  };

  return (
    <div className={`w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 flex flex-wrap gap-2 ${className || ''}`}>
      {value.map((tag, idx) => (
        <span key={`${tag}-${idx}`} className="inline-flex items-center gap-2 bg-slate-800 text-[#f8fafc] border border-slate-600 rounded px-2 py-1 text-xs">
          {tag}
          <button
            type="button"
            onClick={() => remove(idx)}
            className="text-slate-400 hover:text-[#fef5e7]"
            aria-label={`Remove ${tag}`}
          >
            ×
          </button>
        </span>
      ))}
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={() => commit(draft)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            commit(draft);
          } else if (e.key === 'Backspace' && draft === '' && value.length > 0) {
            remove(value.length - 1);
          }
        }}
        placeholder={placeholder || 'Add tag and press Enter or comma'}
        className="flex-1 min-w-[160px] bg-transparent outline-none text-[#f8fafc] text-sm py-1"
      />
    </div>
  );
}


