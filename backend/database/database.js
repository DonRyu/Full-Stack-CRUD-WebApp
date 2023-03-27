const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "products.json");

class Database {
  constructor() {
    const dataString = fs.readFileSync(filePath, "utf-8");
    this.data = JSON.parse(dataString);
  }

  get(pagination, query, queryType) {

    const perPage = 10;
    const start = (pagination - 1) * perPage;
    const end = start + perPage;
    const pageData = this.data.slice(start, end);
console.log('====>',pagination)

    if (queryType) {
      return;
    }

    return {
      pageData: pageData,
      currentPage: pagination,
      totalPages: Math.ceil(this.data.length / perPage),
      totalProduct: this.data.length,
    };
  }

  search() {}

  post() {
    console.log("=====>");
  }

  put() {}

  delete() {}
}

module.exports = Database;
