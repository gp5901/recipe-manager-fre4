/**
 * StorageManager: robust abstraction for localStorage with performance monitoring.
 *
 * Big O:
 *  - get: O(1) - direct key lookup
 *  - set: O(n) - JSON serialization where n=size of data
 *  - clear: O(1) - single removeItem
 */
export class StorageManager {
  /**
   * @param {string} key - localStorage key
   */
  constructor(key) {
    this.key = key;
  }

  /**
   * Checks if localStorage is available & writable
   * @returns {boolean}
   */
  available() {
    try {
      const testKey = '__storage_test__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * Load and parse stored data, handles corruption by resetting data
   * @returns {Array|Object} parsed JSON or empty array
   */
  load() {
    try {
      const raw = localStorage.getItem(this.key);
      if (!raw) return [];
      return JSON.parse(raw);
    } catch (error) {
      // Corrupted data: reset storage key to empty state
      console.warn(`Storage key "${this.key}" corrupted. Resetting data.`);
      localStorage.removeItem(this.key);
      return [];
    }
  }

  /**
   * Save data serialized as JSON string; returns success boolean
   * @param {Object|Array} data 
   * @returns {boolean} success
   */
  save(data) {
    try {
      localStorage.setItem(this.key, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error(`Failed to save data to localStorage key "${this.key}": ${error.message}`);
      return false;
    }
  }

  /**
   * Remove storage key entirely
   */
  clear() {
    localStorage.removeItem(this.key);
  }
}
