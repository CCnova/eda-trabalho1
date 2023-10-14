export default class Page {
  keys;
  size;
  nextPage;

  constructor(size) {
    this.keys = [];
    this.size = size;
    this.nextPage = null;
  }

  insert(key) {
    if (this.keys.length < this.size) {
      this.keys.push(key);
    } else {
      if (this.nextPage == null) {
        this.nextPage = new Page(this.size);
      }
      let traverser = this.nextPage;
      while (traverser.nextPage) {
        traverser = traverser.nextPage;
      }
      if (traverser.keys.length >= this.size) {
        traverser.nextPage = new Page(this.size);
        traverser = traverser.nextPage;
      }
      traverser.keys.push(key);
    }
  }

  print() {
    let outputString = `Keys: ${this.keys} ->`;
    let traverser = this.nextPage;
    while (traverser) {
      outputString += ` Keys: ${traverser.keys} ->`;
      traverser = traverser.nextPage;
    }
    console.log(outputString);
  }

  getNumberOfElements() {
    let numberOfElements = this.keys.length;
    let traverser = this.nextPage;
    while (traverser) {
      numberOfElements += traverser.keys.length;
      traverser = traverser.nextPage;
    }
    return numberOfElements;
  }

  getNumberOfPages() {
    let numberOfPages = 1;
    let traverser = this.nextPage;
    while (traverser) {
      numberOfPages++;
      traverser = traverser.nextPage;
    }
    return numberOfPages;
  }

  clearEmptyLinkedPages() {
    let traverser = this.nextPage;
    while (traverser) {
      if (traverser.keys.length === 0) {
        this.nextPage = traverser.nextPage;
      }
      traverser = traverser.nextPage;
    }
  }
}
