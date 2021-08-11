const { model, Schema, SchemaTypes } = require('mongoose')

const UserSchema = new Schema({
  id: { type: SchemaTypes.ObjectId },
  firstName: { type: String, default: null },
  lastName: { type: String, default: null },
  dob: { type: String, default: null }
})

const UserModel = model('user', UserSchema)

module.exports = {
  UserModel,
  UserSchema,
  default: UserSchema
}
