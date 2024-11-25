export const saveToSessionStorage = <TItem>(key: string, item: TItem): void => {
  const jsonElement = JSON.stringify(item);
  window.sessionStorage.setItem(key, jsonElement);
};

export const getFromSessionStorage = <TItem>(
  key: string,
): TItem | undefined => {
  const jsonItem = window.sessionStorage.getItem(key);
  return jsonItem ? (JSON.parse(jsonItem) as TItem) : undefined;
};

export const removeFromSessionStorage = (key: string): void => {
  window.sessionStorage.removeItem(key);
};

export const saveToLocalStorage = <TItem>(key: string, item: TItem): void => {
  const jsonElement = JSON.stringify(item);
  window.localStorage.setItem(key, jsonElement);
};

export const getFromLocalStorage = <TItem>(
  key: string,
): TItem | undefined => {
  const jsonItem = window.localStorage.getItem(key);
  return jsonItem ? (JSON.parse(jsonItem) as TItem) : undefined;
};

export const removeFromLocalStorage = (key: string): void => {
  window.localStorage.removeItem(key);
};