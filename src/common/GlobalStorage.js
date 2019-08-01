const globalStorage = {
  store: {},
  getItem(key) {
    return this.store[key] || null;
  },
  setItem(key, value) {
    this.store[key] = value;
  },
  removeItem(key) {
    delete this.store[key];
  },
  clear() {
    this.store = {};
  },
};

export default {
  get(itemName) {
    return globalStorage.getItem(itemName);
  },

  getCollection(itemName) {
    return JSON.parse(globalStorage.getItem(itemName));
  },

  set(itemName, data) {
    globalStorage.setItem(itemName, data);
  },

  setCollection(itemName, data) {
    globalStorage.setItem(itemName, JSON.stringify(data));
  },

  remove(itemName) {
    globalStorage.removeItem(itemName);
  },

  clear() {
    globalStorage.clear();
  },
};
