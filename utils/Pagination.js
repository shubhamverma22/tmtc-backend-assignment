/* eslint-disable no-restricted-globals */
const { statusCodes } = require('./response/response.handler');

class Pagination {
  constructor({ pageNumber, pageSize }) {
    if (pageNumber <= 0 || !pageNumber || isNaN(pageNumber)) {
      throw {
        code: statusCodes.STATUS_CODE_VALIDATION_FAILED,
        message: 'Valid pageNumber value required for pagination',
      };
    }
    if (pageSize <= 0 || !pageSize || isNaN(pageSize)) {
      throw {
        code: statusCodes.STATUS_CODE_VALIDATION_FAILED,
        message: 'Valid pageSize required for pagination',
      };
    }
    this.pageNumber = parseInt(pageNumber, 10);
    this.pageSize = parseInt(pageSize, 10);
  }

  getLimit() {
    return this.pageSize;
  }

  getOffset() {
    return (this.pageNumber - 1) * this.pageSize;
  }

  getNoOfPages(totalRecords) {
    if (!totalRecords) {
      return 0;
    }
    return Math.ceil(totalRecords / this.getLimit());
  }
}

module.exports = Pagination;
