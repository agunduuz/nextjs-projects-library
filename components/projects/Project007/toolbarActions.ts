export interface InsertResult {
  value: string;
  selectionStart: number;
  selectionEnd: number;
}

export function wrapSelection(
  value: string,
  start: number,
  end: number,
  before: string,
  after: string = before
): InsertResult {
  const selected = value.slice(start, end);
  const newValue = value.slice(0, start) + before + selected + after + value.slice(end);

  return {
    value: newValue,
    selectionStart: start + before.length,
    selectionEnd: start + before.length + selected.length,
  };
}

export function insertLinePrefix(
  value: string,
  start: number,
  end: number,
  prefix: string
): InsertResult {
  const lineStart = value.lastIndexOf('\n', start - 1) + 1;
  const newValue = value.slice(0, lineStart) + prefix + value.slice(lineStart);
  const offset = lineStart <= start ? prefix.length : 0;

  return {
    value: newValue,
    selectionStart: start + offset,
    selectionEnd: end + offset,
  };
}
