export default class HashTable {
  level;
  N;
  pages;
  pageSize;
  maxLoadFactor;

  constructor(pageSize, maxLoadFactor) {
    this.level = 0;
    this.N = 0;
    this.pages = [[], []];
    this.pageSize = pageSize;
    this.maxLoadFactor = maxLoadFactor;
  }

  hash(key, l) {
    return key % (2 * Math.pow(2, l));
  }

  calculateLoadFactor() {
    let numberOfElements = 0;
    let numberOfPages = 0;
    for (let page of this.pages) {
      numberOfElements += page.length;
      numberOfPages += Math.ceil(page.length / this.pageSize) || 1;
    }

    return numberOfElements / (numberOfPages * this.pageSize);
  }

  calculateNumberOfPages() {
    let numberOfPages = 0;
    for (let page of this.pages) {
      numberOfPages += Math.ceil(page.length / this.pageSize) || 1;
    }
    return numberOfPages;
  }

  print() {
    console.log("Level: " + this.level);
    console.log("Number of pages: " + this.calculateNumberOfPages());
    console.log("Page size: " + this.pageSize);
    console.log("Load factor: " + this.calculateLoadFactor());
    for (let i = 0; i < this.pages.length; i++) {
      console.log(`Page ${i}: ${this.pages[i]}`);
    }
  }

  insert(key) {
    let hash = this.hash(key, this.level);
    if (hash < this.N) {
      hash = this.hash(key, this.level + 1);
    }
    this.pages[hash].push(key);
    if (this.calculateLoadFactor() >= this.maxLoadFactor) {
      this.split();
    }
  }

  split() {
    this.pages.push([]);
    const pageToSplit = this.pages[this.N];
    this.pages[this.N] = [];
    for (let key of pageToSplit) {
      const hash = this.hash(key, this.level + 1);
      this.pages[hash].push(key);
    }
    this.N = (this.N + 1) % (2 * Math.pow(2, this.level));
    if (this.N === 0) {
      this.level++;
    }
  }

  calculateMediumLoadFactor() {
    let numberOfPages = 0;
    let spaceUsed = 0;
    for (let page of this.pages) {
      numberOfPages += Math.ceil(page.length / this.pageSize) || 1;
      spaceUsed += page.length;
    }

    return (spaceUsed / numberOfPages) * this.pageSize;
  }

  calculateNumberOfAdditionalPages() {
    let numberOfPages = 0;
    for (let page of this.pages) {
      numberOfPages += Math.ceil(page.length / this.pageSize) || 1;
    }
    return numberOfPages / this.pages.length;
  }
}
