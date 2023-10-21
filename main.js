import HashTable from "./hash-table.js";

const PAGE_SIZES = [1, 5, 10, 20, 50];
const MAX_LOAD_FACTORS = [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];
const NUMBER_OF_TIME_TO_REPEAT = 10;

const choosenPageSize = PAGE_SIZES[0];
const choosenMaxLoadFactor = MAX_LOAD_FACTORS[0];

const hashTable = new HashTable(choosenPageSize, choosenMaxLoadFactor);

for (let i = 0; i < 1000 * choosenPageSize; i++) {
  hashTable.insert(Math.floor(Math.random() * 1e9));
}

hashTable.print();

function analyseHashTable(pageSize, maxLoadFactor) {
  for (let i = 0; i < NUMBER_OF_TIME_TO_REPEAT; i++) {
    const hashTable = new HashTable(pageSize, maxLoadFactor);
    for (let i = 0; i < 1000 * pageSize; i++) {
      hashTable.insert(Math.floor(Math.random() * (1000 * pageSize)));
    }
    hashTable.print();
  }
}

function startAnalysis() {
  for (let pageSize of PAGE_SIZES) {
    for (let maxLoadFactor of MAX_LOAD_FACTORS) {
      analyseHashTable(pageSize, maxLoadFactor);
    }
  }
}

// startAnalysis();
