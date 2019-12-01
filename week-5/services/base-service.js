module.exports = class Service {
  async findAll() {
    return this.model.find();
  }

  async create(item) {
    return this.model.create(item);
  }

  async del(itemId) {
    return this.model.remove({ _id: itemId });
  }

  async find(itemId) {
    return this.model.findById(itemId);
  }

  async update(item, updateObject) {
    return item.update(updateObject);
  }

  static addEntity(entityType) {
    return async function addEntity(model, entity) {
      model[entityType].push(entity._id);
      await model.save();
    };
  }

  static deleteEntity(entityType) {
    return async function deleteEntity(model, entity) {
      const entityIndex = model[entityType].findIndex(entityItem => {
        return entity._id === entityItem._id;
      });
      if (entityIndex >= 0) {
        model[entityType].splice(entityIndex, 1);
      }
      return model.save();
    };
  }
};
