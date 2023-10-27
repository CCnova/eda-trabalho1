import HashTable from "./hash-table.js";

const PAGE_SIZES = [1, 5, 10, 20, 50];
const MAX_LOAD_FACTORS = [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];
const NUMBER_OF_TIMES_TO_REPEAT = 1;

const choosenPageSize = PAGE_SIZES[0];
const choosenMaxLoadFactor = MAX_LOAD_FACTORS[6];
const insertedKeys = [];
const nonInsertedKeys = [];

const hashTable = new HashTable(choosenPageSize, choosenMaxLoadFactor);

analyseHashTable(hashTable);

// for (let i = 0; i < 1000 * choosenPageSize; i++) {
//   hashTable.search(Math.floor(Math.random() * 1e9));
// }

/**
 * Insert keys in the hash table and store the keys inserted in the storage array.
 *
 * @param {HashTable} hashTable
 * @param {Array<number>} storage
 */
function insertKeys(hashTable, storage) {
  const range = 1000 * hashTable.pageSize;
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
 * @param {HashTable} hashTable
 */
function analyseHashTable(hashTable) {
  for (let i = 0; i < NUMBER_OF_TIMES_TO_REPEAT; i++) {
    insertKeys(hashTable, insertedKeys);
    generateNonInsertedKeys(insertedKeys, nonInsertedKeys);
    hashTable.print();
    hashTable.search(insertedKeys[0]);
    hashTable.search(nonInsertedKeys[0]);
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
