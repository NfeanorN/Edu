export type ContentBlock =
  | { type: 'h2'; en: string; ru?: string }
  | { type: 'h3'; en: string; ru?: string }
  | { type: 'h4'; en: string; ru?: string }
  | { type: 'p'; en: string; ru?: string }
  | { type: 'ul'; items: Array<{ en: string; ru?: string }> }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'graph'; ascii: string }
  | { type: 'formula'; lines: string[] }
  | { type: 'hr' }

export type TopicContent = ContentBlock[]
