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
    if (query != "undefined" && queryType != "undefined") {
      return this.getByQuery(query, queryType);
    } else {
      console.log("this.data", this.data);
      return this.data;
    }
  }

  getByProductNumber(productNumber) {
    const selectedData = this.data.filter((item) => {
      return item.productNumber == productNumber;
    });
    return selectedData;
  }

  post(productData) {
    const newProductNumber = this.getUniqueNumberID();
    this.data.unshift({ productNumber: newProductNumber, ...productData });
    const jsonString = JSON.stringify(this.data);
    try {
      fs.writeFileSync(filePath, jsonString);
      return true;
    } catch (err) {
      return false;
    }
  }

  put(productNumber, productData) {
    const newProductList = this.data.map((item) => {
      if (item.productNumber === productNumber) {
        return {
          ...item,
          ...productData,
        };
      } else {
        return item;
      }
    });
    const jsonString = JSON.stringify(newProductList);
    try {
      fs.writeFileSync(filePath, jsonString);
      this.data = newProductList;
      return true;
    } catch (err) {
      return false;
    }
  }

  delete(productNumber) {
    let newProductList = this.data.filter((item) => {
      return item.productNumber !== productNumber;
    });
    const jsonString = JSON.stringify(newProductList);
    try {
      fs.writeFileSync(filePath, jsonString);
      this.data = newProductList;
      return true;
    } catch (err) {
      return false;
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

  getUniqueNumberID() {
    const usedNumbers = new Set();
    let randomNum;
    let idArr = this.data.map((item) => {
      return item.productNumber;
    });
    idArr.forEach((element) => usedNumbers.add(element));
    do {
      randomNum = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
    } while (usedNumbers.has(randomNum));

    return randomNum;
  }
}

module.exports = Database;
