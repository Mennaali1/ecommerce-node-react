import QueryString from "qs";

export default class ApiFeatures {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }

  pagination() {
    let page = this.queryString.page * 1 || 1;
    if (this.queryString.page <= 0) page = 1;
    let skip = (page - 1) * 5;
    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(5);
    this.page = page;
    return this;
  }

  filtering() {
    let filter = { ...this.queryString };
    const exclude = ["page", "sort", "search", "fields"];
    exclude.forEach((el) => {
      delete filter[el];
    });

    // filter = QueryString.parse(this.queryString);
    filter = JSON.stringify(filter);
    filter = filter.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
    filter = JSON.parse(filter);

    this.mongooseQuery = this.mongooseQuery.find(filter);
    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      let sortedBy = this.queryString.sort.split(",").join(" ");
      this.mongooseQuery.sort(sortedBy);
    }
    return this;
  }
  search() {
    if (this.queryString.search) {
      this.mongooseQuery = this.mongooseQuery.find({
        $or: [
          { name: { $regex: this.queryString.search, $options: "i" } },
          { description: { $regex: this.queryString.search, $options: "i" } },
        ],
      });
    }
    return this;
  }
  fields() {
    if (this.queryString.fields) {
      let fields = this.queryString.fields.split(",").join("");
      this.mongooseQuery = this.mongooseQuery.select(fields);
    }
    return this;
  }
}
