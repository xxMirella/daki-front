class CrudDAO {

  constructor(model, key) {
    this.model = model;
    this.modelName = model.modelName.toLowerCase();
    this.key = key;
  }

  get(item) {
    return this.model.find(item)
  }

  post(item) {
    return this.model.create(item)
      .then((modelInstance) => {
        let response = {};
        response[this.modelName] = modelInstance;
        return response;
      });
  }

  list(query = {}, pagination = { ignore: 0 , limit: 10}) {
    return this.model
      .find({})
      .skip(pagination.ignore)
      .limit(pagination.limit)
      .then((modelInstance) => {
        let response = {};
        response[this.modelName] = modelInstance;
        return response;
      });
  }

  delete(id) {
    const filter = {};
    filter[this.key] = id;
    return this.model.deleteOne({ _id: id })
  }

  update(id, item) {
    return this.model.updateOne({ _id: id }, { $set: item })
  }
}

module.exports = CrudDAO;