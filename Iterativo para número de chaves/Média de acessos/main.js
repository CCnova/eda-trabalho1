import HashTable from "./hash-table.js";

const PAGE_SIZES = [1, 5, 10, 20, 50];
const MAX_LOAD_FACTORS = [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];
const NUMBER_OF_TIMES_TO_REPEAT = 1;

/**
 * Insert keys in the hash table and store the keys inserted in the storage array.
 *
 * @param {HashTable} hashTable
 * @param {Array<number>} storage
 */
function insertKeys(hashTable, storage) {
  const numberOfKeysToInsert = 1000 * hashTable.pageSize;
  for (let i = 0; i < numberOfKeysToInsert; i++) {
    let element = Math.floor(Math.random() * 1e6);
    while (storage.includes(element)) {
      element = Math.floor(Math.random() * 1e6);
    }
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
    const element = Math.floor(Math.random() * 1e6);
    if (!insertedKeys.includes(element) && !storage.includes(element)) {
      storage.push(element);
    }
  }
}

/**
 * Execute the analysis of the hash table a `NUMBER_OF_TIMES_TO_REPEAT` times.
 *
 * @param {HashTable} hashTable
 */
function analyseHashTable(hashTable) {
  for (let i = 0; i < NUMBER_OF_TIMES_TO_REPEAT; i++) {
    const insertedKeys = [],
      nonInsertedKeys = [];
    insertKeys(hashTable, insertedKeys);
    generateNonInsertedKeys(insertedKeys, nonInsertedKeys);
    hashTable.print();
    let soma = 0;
    console.log(
      "-------------- Procurando por chaves nao existentes --------------"
    );
    for (let nonInsertedKey of nonInsertedKeys.slice(0, (200*hashTable.pageSize))) {
      soma += hashTable.search(nonInsertedKey);     
    }
    console.log("média de acessos = " + (soma/(200*hashTable.pageSize)));
    soma = 0;
    console.log(
      "-------------- Procurando por chaves existentes --------------"
    );
    for (let insertedKey of insertedKeys.sort().slice(0, (200*hashTable.pageSize))) {
      soma += hashTable.search(insertedKey);
    }
    console.log("média de acessos = " + (soma/(200*hashTable.pageSize)));
  }
}

/**
 * Start the analysis of the hash table executing it for all pair of page size and max load factor.
 */
function startBroadAnalysis() {
  for (let pageSize of PAGE_SIZES) {
    for (let maxLoadFactor of MAX_LOAD_FACTORS) {
      const hashTable = new HashTable(pageSize, maxLoadFactor);
      analyseHashTable(hashTable);
    }
  }
}

/**
 * Start the analysis of the hash table executing it for one pair of page size and max load factor.
 */
function startOneTimeAnalysis() {
  const choosenPageSize = PAGE_SIZES[4];
  const choosenMaxLoadFactor = MAX_LOAD_FACTORS[7];

  const hashTable = new HashTable(choosenPageSize, choosenMaxLoadFactor);

  analyseHashTable(hashTable);
}

// startBroadAnalysis();
startOneTimeAnalysis();
