const local_Storage = window.sessionStorage; //instead of local storage we are using session storage as localstorage was cleared when naviagated to different zappID deeplinks

export default {
  get(itemName) {
    return local_Storage.getItem(itemName);
  },

  getCollection(itemName) {
    return JSON.parse(local_Storage.getItem(itemName));
  },

  set(itemName, data) {
    local_Storage.setItem(itemName, data);
  },

  setCollection(itemName, data) {
    local_Storage.setItem(itemName, JSON.stringify(data));
  },

  remove(itemName) {
    local_Storage.removeItem(itemName);
  },

  clear() {
    local_Storage.clear();
  },
};
