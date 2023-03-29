/**
 * This module defines a Database class that handles CRUD operations on a JSON file.
 * It reads the data from the file and stores it in the class instance, which can be queried using various methods.
 * It also provides methods for creating, updating and deleting product entries.
 * Additionally, it has a method for generating a unique product number ID.
 * The class exports the Database object as a module.
 */
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "products.json");
const SearchOptionMap = {
  ScrumMaster: "scrumMasterName",
  Developer: "developer",
};

class Database {
  constructor() {
    const dataString = fs.readFileSync(filePath, "utf-8");
    this.data = JSON.parse(dataString);
  }

  /**
   * Gets data based on query parameters
   * @param {string} query - search term to filter by
   * @param {string} queryType - type of query, either 'ScrumMaster' or 'Developer'
   * @returns {Array} - an array of products that match the query
   */
  get(query, queryType) {
    if (query && queryType) {
      return this.getByQuery(query, queryType);
    } else {
      return this.data;
    }
  }

  /**
   * Gets product data based on the product number
   * @param {string} productNumber - the product number to search for
   * @returns {Array} - an array of products that match the product number
   */
  getByProductNumber(productNumber) {
    try {
      const selectedData = this.data?.filter((item) => {
        return item.productNumber === productNumber;
      });
      return selectedData[0] ?? 400;
    } catch (err) {
      return 500;
    }
  }
  /**
   * Adds a new product to the data
   * @param {object} productData - an object containing data for the new product
   * @returns {boolean} - true if successful, false if not
   */
  post(productData) {
    const newProductNumber = this.getUniqueNumberID();
    if (typeof newProductNumber !== "number") {
      return false;
    }
    this.data.unshift({ productNumber: newProductNumber, ...productData });
    const jsonString = JSON.stringify(this.data);
    try {
      fs.writeFileSync(filePath, jsonString);
      return true;
    } catch (err) {
      return false;
    }
  }

  /**
   * Updates an existing product in the data
   * @param {string} productNumber - the product number of the product to update
   * @param {object} productData - an object containing data to update the product with
   * @returns {boolean} - true if successful, false if not
   */
  put(productNumber, productData) {
    let count = 0;
    const newProductList = this.data?.map((item) => {
      if (item.productNumber === productNumber) {
        return {
          ...item,
          ...productData,
        };
      } else {
        count++;
        return item;
      }
    });
    if (count === this.data.length) {
      return 400;
    }
    try {
      fs.writeFileSync(filePath, JSON.stringify(newProductList));
      this.data = newProductList;
      return true;
    } catch (err) {
      return 500;
    }
  }

  /**
   * Deletes a product from the data
   * @param {string} productNumber - the product number of the product to delete
   * @returns {boolean} - true if successful, false if not
   */
  delete(productNumber) {
    try {
      let newProductList = this.data?.filter((item) => {
        return item.productNumber !== productNumber;
      });
      const jsonString = JSON.stringify(newProductList);
      if (newProductList.length === this.data.length) {
        return 400;
      }
      fs.writeFileSync(filePath, jsonString);
      this.data = newProductList;
      return true;
    } catch (err) {
      return 500;
    }
  }

  /**
   * Gets data based on a search query and type of search
   * @param {string} query - the search term to filter by
   * @param {string} queryType - the type of search, either 'ScrumMaster' or 'Developer'
   * @returns {Array} - an array of products that match the search query and type
   */
  getByQuery(query, queryType) {
    const qry = query.trim().toLowerCase().replace(/(\s*)/g, "");

    if (queryType === SearchOptionMap.ScrumMaster) {
      const result = this.data?.filter((item) =>
        item.scrumMasterName.toLowerCase().includes(qry)
      );
      return result;
    } else if (queryType === SearchOptionMap.Developer) {
      const result = this.data?.filter((item) => {
        const modifiedDevelopers = item.developers?.map((developer) =>
          developer.toLowerCase()
        );
        return modifiedDevelopers.some((developer) => developer.includes(qry));
      });
      return result;
    }
  }

  /**
   * Generates a unique product number ID
   * @returns {number} - a unique product number ID
   */
  getUniqueNumberID() {
    const usedNumbers = new Set();
    let randomNum;
    let idArr = this.data?.map((item) => {
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
