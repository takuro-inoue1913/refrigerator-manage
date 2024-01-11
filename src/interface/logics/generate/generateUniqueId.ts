/**
 * Generate unique id.
 */
export const generateUniqueId = (id: number, prefix: string): string => {
  return `${prefix}:${id}`;
};
