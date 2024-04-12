export default function useLocalStorage() {
  function getStorage(key: string) {
    return localStorage.getItem(key);
  }
  function setStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }
  return {
    getStorage,
    setStorage,
  };
}
