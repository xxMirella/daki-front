export class CrudDAO {

  constructor(model, key) {
    this.model = model;
    this.modelName = model.modelName.toLowerCase();
    this.key = key;
  }

  async post(item) {
    return await this.model.create(item)
      .then((modelInstance) => {
        let response = {};
        response[this.modelName] = modelInstance;
        return response;
      });
  }

  async list(query = {}, pagination = { ignore: 0 , limit: 10}) {
    return await this.model
      .find({})
      .skip(pagination.ignore)
      .limit(pagination.limit)
      .then((modelInstance) => {
        let response = {};
        response[this.modelName] = modelInstance;
        return response;
      });
  }

  async delete(id) {
    const filter = {};
    filter[this.key] = id;

    return await this.model.deleteOne({ _id: id })
  }

  update(id, item) {
    return this.model.updateOne({ _id: id }, { $set: item })
  }
}