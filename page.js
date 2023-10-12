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
    console.log("Keys: " + this.keys);
    console.log("Next page: ");
    this.nextPage?.print();
  }
}
