import Page from "./page.js";

export default class HashTable {
  level;
  N;
  pages;
  pageSize;
  maxLoadFactor;

  constructor(pageSize, maxLoadFactor) {
    this.level = 0;
    this.N = 0;
    this.pages = [new Page(pageSize), new Page(pageSize)];
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
      numberOfElements += page.getNumberOfElements();
      numberOfPages += page.getNumberOfPages();
    }

    return numberOfElements / (numberOfPages * this.pageSize);
  }

  calculateNumberOfPages() {
    let numberOfPages = 0;
    for (let page of this.pages) {
      numberOfPages += page.getNumberOfPages();
    }
    return numberOfPages;
  }

  print() {
    console.log("Level: " + this.level);
    console.log("Number of pages: " + this.calculateNumberOfPages());
    console.log("Page size: " + this.pageSize);
    console.log("Load factor: " + this.calculateLoadFactor());
    for (let page of this.pages) {
      page.print();
    }
  }

  insert(key) {
    let hash = this.hash(key, this.level);
    if (hash < this.N) {
      hash = this.hash(key, this.level + 1);
    }
    this.pages[hash].insert(key);
    if (this.calculateLoadFactor() > this.maxLoadFactor) {
      this.split();
    }
  }

  split() {
    this.pages.push(new Page(this.pageSize));
    const pageToSplit = this.pages[this.N];
    this.pages[this.N] = new Page(this.pageSize);
    let traverser = pageToSplit;
    while (traverser) {
      for (let key of traverser.keys) {
        const hash = this.hash(key, this.level + 1);
        this.pages[hash].insert(key);
      }
      traverser = traverser.nextPage;
    }
    this.pages[this.N].clearEmptyLinkedPages();
  }

  calculateMediumLoadFactor() {
    let numberOfPages = 0;
    let spaceUsed = 0;
    for (let page of this.pages) {
      numberOfPages += page.getNumberOfPages();
      spaceUsed += page.getNumberOfElements();
    }

    return (spaceUsed / numberOfPages) * this.pageSize;
  }

  calculateNumberOfAdditionalPages() {
    let numberOfPages = 0;
    for (let page of this.pages) {
      numberOfPages += page.getNumberOfPages();
    }
    return numberOfPages / this.pages.length;
  }
}
