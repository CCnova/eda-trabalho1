import HashTable from "./hash-table.js";

const PAGE_SIZES = [1, 5, 10, 20, 50];
const MAX_LOAD_FACTORS = [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];
const NUMBER_OF_TIME_TO_REPEAT = 10;

const choosenPageSize = PAGE_SIZES[1];
const choosenMaxLoadFactor = MAX_LOAD_FACTORS[0];

const hashTable = new HashTable(choosenPageSize, choosenMaxLoadFactor);

for (let i = 0; i < 1000 * choosenPageSize; i++) {
  hashTable.insert(Math.floor(Math.random() * 1e9));
}

hashTable.print();

/**
 * Insert keys in the hash table and store the keys inserted in the storage array.
 *
 * @param {number} pageSize
 * @param {HashTable} hashTable
 * @param {Array<number>} storage
 */
function insertKeys(pageSize, hashTable, storage) {
  const range = 1000 * pageSize;
  for (let i = 0; i < range; i++) {
    const element = Math.floor(Math.random() * range);
    hashTable.insert(element);
    storage.push(element);
  }
}

/**
 * Generate keys that are not inserted in the hash table based on insertedKeys.
 *
 * @param {Array<number>} insertedKeys
 * @param {Array<number>} storage
 */
function generateNonInsertedKeys(insertedKeys, storage) {
  while (storage.length < insertedKeys.length) {
    const element = Math.floor(Math.random() * 1e9);
    if (!insertedKeys.includes(element)) {
      storage.push(element);
    }
  }
}

/**
 * Execute the analysis of the hash table.
 *
 * @param {number} pageSize
 * @param {number} maxLoadFactor
 */
function analyseHashTable(pageSize, maxLoadFactor) {
  for (let i = 0; i < NUMBER_OF_TIME_TO_REPEAT; i++) {
    const insertedKeys = [],
      nonInsertedKeys = [];
    const hashTable = new HashTable(pageSize, maxLoadFactor);
    insertKeys(pageSize, hashTable, insertedKeys);
    generateNonInsertedKeys(insertedKeys, nonInsertedKeys);
    hashTable.print();
  }
}

/**
 * Start the analysis of the hash table executing it for all pair of page size and max load factor.
 */
function startAnalysis() {
  for (let pageSize of PAGE_SIZES) {
    for (let maxLoadFactor of MAX_LOAD_FACTORS) {
      analyseHashTable(pageSize, maxLoadFactor);
    }
  }
}
