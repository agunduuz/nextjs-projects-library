export interface Quote {
  _id: string;
  content: string;
  author: string;
  tags: string[];
  authorSlug: string;
  length: number;
  dateAdded: string;
  dateModified: string;
}

export interface QuoteState {
  quote: Quote | null;
  loading: boolean;
  error: string | null;
}
