export type EditorView = 'edit' | 'preview' | 'split';

export interface MarkdownEditorState {
  markdown: string;
  view: EditorView;
}
