const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "products.json");
const SearchOptionMap = {
  ScrumMaster: "scrumMaster",
  Developer: "developer",
};

class Database {
  constructor() {
    const dataString = fs.readFileSync(filePath, "utf-8");
    this.data = JSON.parse(dataString);
  }

  get(query, queryType) {
    if (query !== "undefined" && queryType !== "undefined") {
      return this.getByQuery(query, queryType);
    } else {
      return this.data;
    }
  }

  getByQuery(query, queryType) {
    if (queryType === SearchOptionMap.ScrumMaster) {
      const result = this.data.filter((item) => {
        const itemScrumMaster = item.scrumMaster.replace(/(\s*)/g, "");
        return itemScrumMaster.toLowerCase().includes(query.toLowerCase());
      });
      return result;
    } else if (queryType === SearchOptionMap.Developer) {
      const result = this.data.filter((item) => {
        const modifiedDevelopers = item.developers.map((developer) =>
          developer.replace(/(\s*)/g, "").toLowerCase()
        );
        return modifiedDevelopers.some((developer) =>
          developer.includes(query.replace(/(\s*)/g, ""))
        );
      });
      return result;
    }
  }

  post() {
    console.log("=====>");
  }

  put() {}

  delete() {}
}

module.exports = Database;
