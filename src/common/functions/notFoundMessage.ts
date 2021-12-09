export function notFoundMessage(resourceName: string, field: object) {
  const [key, val] = Object.entries(field)[0];
  return `${resourceName} is not found with ${key}: ${val}`;
}
