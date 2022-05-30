class LocalCache {
  setCache(key: string, value: unknown): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getCache(key: string): unknown {
    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    }
  }

  deleteCache(key: string): void {
    localStorage.removeItem(key);
  }

  clearCache(): void {
    localStorage.clear();
  }
}

const lc = new LocalCache();

export default lc;
