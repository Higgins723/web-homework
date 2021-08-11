const { packageModel } = require('./utils.js')

const find = async (model, criteria) => {
  const query = Object.keys(criteria).length ? (
    model.find(criteria)
  ) : (
    model.find()
  );

  const result = await query.exec();
  return packageModel(result);
}

const findOne = async (model, id) => {
  const query = model.findById(id)
  const result = await query.exec();
  
  return packageModel(result)[0] || null;
}

module.exports = {
  find,
  findOne,
}