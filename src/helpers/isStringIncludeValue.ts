export const isStringIncludeValue = (stringToCheck: null | string, substring: string) =>
  stringToCheck?.indexOf(substring) !== -1
