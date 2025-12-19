export function decodeJsonFromMarkdown(str: string): any {
  const cleaned = str
    .replace(/^```json\s*/i, '')
    .replace(/\s*```$/, '')
    .trim();

  return JSON.parse(cleaned);
}
