class Storage {
  save(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  get(key) {
    const data = localStorage.getItem(key);
    return JSON.parse(data);
  }
}

const storage = new Storage();
export default storage;
