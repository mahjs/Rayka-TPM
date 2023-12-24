const storage = {
  get<T>(key: string, isJson: boolean = false): T {
    const data: any = localStorage.getItem(key);

    return data && isJson ? JSON.parse(data) : data;
  },

  set<T>(key: string, value: T, isJson: boolean = false): void {
    const data = value && isJson ? JSON.stringify(value) : value;
    localStorage.setItem(key, String(data));
  },

  remove(key: string): void {
    return localStorage.removeItem(key);
  },
};

export { storage as default };
