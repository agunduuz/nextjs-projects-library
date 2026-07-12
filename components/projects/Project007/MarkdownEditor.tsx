'use client';

import { useMemo, useRef, useState } from 'react';
import {
  Bold,
  Italic,
  Heading2,
  List,
  ListOrdered,
  Link2,
  Code,
  Quote,
  Copy,
  Download,
  Check,
  Columns2,
  Pencil,
  Eye,
} from 'lucide-react';
import { EditorView } from './types';
import { renderMarkdown } from './markdownService';
import { wrapSelection, insertLinePrefix } from './toolbarActions';
import { DEFAULT_MARKDOWN } from './defaultMarkdown';

const VIEW_OPTIONS: { value: EditorView; label: string; icon: typeof Pencil }[] = [
  { value: 'edit', label: 'Yazı', icon: Pencil },
  { value: 'split', label: 'Bölünmüş', icon: Columns2 },
  { value: 'preview', label: 'Önizleme', icon: Eye },
];

export function MarkdownEditor() {
  const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN);
  const [view, setView] = useState<EditorView>('split');
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const html = useMemo(() => renderMarkdown(markdown), [markdown]);
  const wordCount = useMemo(
    () => markdown.trim().split(/\s+/).filter(Boolean).length,
    [markdown]
  );

  const applyEdit = (
    editFn: (
      value: string,
      start: number,
      end: number
    ) => { value: string; selectionStart: number; selectionEnd: number }
  ) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const { selectionStart, selectionEnd } = textarea;
    const result = editFn(markdown, selectionStart, selectionEnd);

    setMarkdown(result.value);

    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(result.selectionStart, result.selectionEnd);
    });
  };

  const toolbarButtons = [
    {
      icon: Bold,
      label: 'Kalın',
      action: () => applyEdit((v, s, e) => wrapSelection(v, s, e, '**')),
    },
    {
      icon: Italic,
      label: 'İtalik',
      action: () => applyEdit((v, s, e) => wrapSelection(v, s, e, '*')),
    },
    {
      icon: Heading2,
      label: 'Başlık',
      action: () => applyEdit((v, s, e) => insertLinePrefix(v, s, e, '## ')),
    },
    {
      icon: Quote,
      label: 'Alıntı',
      action: () => applyEdit((v, s, e) => insertLinePrefix(v, s, e, '> ')),
    },
    {
      icon: List,
      label: 'Liste',
      action: () => applyEdit((v, s, e) => insertLinePrefix(v, s, e, '- ')),
    },
    {
      icon: ListOrdered,
      label: 'Numaralı Liste',
      action: () => applyEdit((v, s, e) => insertLinePrefix(v, s, e, '1. ')),
    },
    {
      icon: Link2,
      label: 'Bağlantı',
      action: () =>
        applyEdit((v, s, e) => wrapSelection(v, s, e, '[', '](https://)')),
    },
    {
      icon: Code,
      label: 'Kod',
      action: () => applyEdit((v, s, e) => wrapSelection(v, s, e, '`')),
    },
  ];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'document.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6 text-center sm:mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Pencil className="w-6 h-6 sm:w-8 sm:h-8 text-primary-500 dark:text-primary-400" />
          <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl text-secondary-900 dark:text-white">
            Markdown Editör
          </h2>
        </div>
        <p className="text-sm sm:text-base text-secondary-600 dark:text-secondary-400">
          Yazın, anında önizleyin
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 mb-3 bg-white border border-gray-200 dark:bg-secondary-800 dark:border-secondary-700 rounded-xl">
        <div className="flex flex-wrap gap-1">
          {toolbarButtons.map(({ icon: Icon, label, action }) => (
            <button
              key={label}
              type="button"
              onClick={action}
              title={label}
              aria-label={label}
              className="flex items-center justify-center transition-colors rounded-lg touch-manipulation w-9 h-9 sm:w-10 sm:h-10 text-secondary-600 dark:text-secondary-300 hover:bg-gray-100 dark:hover:bg-secondary-700"
            >
              <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            title="Panoya kopyala"
            aria-label="Panoya kopyala"
            className="flex items-center justify-center transition-colors rounded-lg touch-manipulation w-9 h-9 sm:w-10 sm:h-10 text-secondary-600 dark:text-secondary-300 hover:bg-gray-100 dark:hover:bg-secondary-700"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-500 sm:w-5 sm:h-5" />
            ) : (
              <Copy className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </button>
          <button
            type="button"
            onClick={handleDownload}
            title=".md olarak indir"
            aria-label=".md olarak indir"
            className="flex items-center justify-center transition-colors rounded-lg touch-manipulation w-9 h-9 sm:w-10 sm:h-10 text-secondary-600 dark:text-secondary-300 hover:bg-gray-100 dark:hover:bg-secondary-700"
          >
            <Download className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex gap-2 mb-4 sm:hidden">
        {VIEW_OPTIONS.map(option => (
          <button
            key={option.value}
            type="button"
            onClick={() => setView(option.value)}
            className={`flex-1 flex items-center justify-center gap-1.5 min-h-[44px] px-3 py-2 rounded-lg text-sm font-medium transition-colors touch-manipulation ${
              view === option.value
                ? 'bg-primary-500 text-white dark:bg-primary-600'
                : 'bg-gray-100 dark:bg-secondary-700 text-secondary-700 dark:text-secondary-300'
            }`}
            aria-pressed={view === option.value}
          >
            <option.icon className="w-4 h-4" />
            {option.label}
          </button>
        ))}
      </div>

      <div className="hidden gap-2 mb-4 sm:flex">
        {VIEW_OPTIONS.map(option => (
          <button
            key={option.value}
            type="button"
            onClick={() => setView(option.value)}
            className={`flex items-center gap-1.5 min-h-[44px] px-4 py-2 rounded-lg text-sm font-medium transition-colors touch-manipulation ${
              view === option.value
                ? 'bg-primary-500 text-white dark:bg-primary-600'
                : 'bg-gray-100 dark:bg-secondary-700 text-secondary-700 dark:text-secondary-300 hover:bg-gray-200 dark:hover:bg-secondary-600'
            }`}
            aria-pressed={view === option.value}
          >
            <option.icon className="w-4 h-4" />
            {option.label}
          </button>
        ))}
      </div>

      {/* Editor / Preview */}
      <div
        className={`grid gap-4 ${view === 'split' ? 'sm:grid-cols-2' : 'grid-cols-1'}`}
      >
        {(view === 'edit' || view === 'split') && (
          <textarea
            ref={textareaRef}
            value={markdown}
            onChange={e => setMarkdown(e.target.value)}
            spellCheck={false}
            aria-label="Markdown metin girişi"
            className="w-full min-h-[400px] p-4 font-mono text-sm bg-white border border-gray-200 rounded-xl resize-y dark:bg-secondary-800 dark:border-secondary-700 dark:text-white text-secondary-900 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
          />
        )}

        {(view === 'preview' || view === 'split') && (
          <div
            className="w-full min-h-[400px] p-4 overflow-auto bg-white border border-gray-200 rounded-xl dark:bg-secondary-800 dark:border-secondary-700 markdown-preview"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )}
      </div>

      {/* Stats */}
      <div className="flex items-center justify-center gap-4 mt-4 text-xs sm:text-sm text-secondary-500 dark:text-secondary-400">
        <span>{markdown.length} karakter</span>
        <span>•</span>
        <span>{wordCount} kelime</span>
      </div>
    </div>
  );
}
