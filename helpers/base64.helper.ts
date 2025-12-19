export const encodeBase64 = (str: string): string => {
  return Buffer.from(str, 'utf-8').toString('base64');
}
export const decodeBase64 = (b64: string): string => {
  return Buffer.from(b64, 'base64').toString('utf-8');
}