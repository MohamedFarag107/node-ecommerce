class ApiFeatures {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
    this.paginationResult = {};
  }

  filter() {
    const queryStringObj = { ...this.queryString };
    const excludesFields = ["page", "limit", "sort", "fields", "q"];
    excludesFields.forEach((field) => delete queryStringObj[field]);
    // Apply filtration using [gte, gt, lte, lt]
    let queryStr = JSON.stringify(queryStringObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr));

    return this;
  }

  paginate({ countDocs }) {
    // pagination result
    let { page = 1, limit = 50 } = this.queryString;
    page = +page;
    limit = +limit;
    const pagination = {};

    pagination.numberOfPages = Math.ceil(countDocs / limit);

    // check if page more than the max number of pages
    if (page > pagination.numberOfPages) {
      page = pagination.numberOfPages;
    }

    pagination.currentPage = page;

    if (pagination.numberOfPages > 1 && pagination.currentPage > 1) {
      pagination.prevPage = pagination.currentPage - 1;
    } else {
      pagination.prevPage = 1;
    }

    // check if the currentPage page is equal to numberOfPages
    if (pagination.currentPage === pagination.numberOfPages) {
      pagination.nextPage = pagination.numberOfPages;
    } else {
      pagination.nextPage = pagination.currentPage + 1;
    }

    const skip = (+page - 1) * +limit;

    this.mongooseQuery = this.mongooseQuery.find({}).skip(skip).limit(+limit);

    this.paginationResult = pagination;

    return this;
  }

  sort() {
    let { sort } = this.queryString;
    if (sort) {
      sort = sort.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.sort(sort);
    }
    return this;
  }

  limitFields() {
    let { fields } = this.queryString;
    if (fields) {
      fields = fields.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.select(fields);
    }
    return this;
  }

  search(modelName) {
    let { q } = this.queryString;
    if (q) {
      let query = {};
      if (modelName === "Product") {
        query.$or = [
          { title: { $regex: q, $options: "i" } },
          { description: { $regex: q, $options: "i" } },
        ];
      } else {
        query = { name: { $regex: q, $options: "i" } };
      }

      this.mongooseQuery = this.mongooseQuery.find(query);
    }
    return this;
  }
}

module.exports = ApiFeatures;
