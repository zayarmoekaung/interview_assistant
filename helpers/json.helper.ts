export function decodeJsonFromMarkdown(str: string): any {
  const match = str.match(/```json\s*([\s\S]*?)\s*```/i);
  const jsonContent = match ? match[1].trim() : str.trim();
  const cleaned = jsonContent
    .replace(/^```json\s*/i, '')
    .replace(/\s*```$/, '')
    .trim();

  return JSON.parse(cleaned);
}
