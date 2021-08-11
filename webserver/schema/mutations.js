const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLFloat, GraphQLNonNull } = graphql
const { TransactionModel } = require('../data-models/Transaction')
const { UserModel } = require('../data-models/User')
const TransactionType = require('./transaction-type')
const UserType = require('./user-type')

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addTransaction: {
      type: TransactionType,
      args: {
        user_id: { type: GraphQLString },
        description: { type: GraphQLString },
        merchant_id: { type: GraphQLString },
        debit: { type: GraphQLBoolean },
        credit: { type: GraphQLBoolean },
        amount: { type: GraphQLFloat }
      },
      /* eslint-disable-next-line camelcase */
      resolve: async (parentValue, { user_id, description, merchant_id, debit, credit, amount }) => {
        const transaction = await TransactionModel.create({ user_id, description, merchant_id, debit, credit, amount });
        transaction.id = transaction._id;
        return transaction;
      }
    },
    deleteTransaction: {
      type: TransactionType,
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parentValue, { id }) => {
        const deleted = await TransactionModel.findByIdAndDelete(id);
        if (!deleted) {
          throw new Error('Error');
        }
        return deleted;
      }
    },
    updateTransaction: {
      type: TransactionType,
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        merchant_id: { type: GraphQLString },
        debit: { type: GraphQLBoolean },
        credit: { type: GraphQLBoolean },
        amount: { type: GraphQLFloat }
      },
      resolve: async (parentValue, { id, description, merchant_id, debit, credit, amount }) => {
        const updated = await TransactionModel.findByIdAndUpdate(id, { $set: { description, merchant_id, debit, credit, amount } }, { new: true });
        updated.id = updated._id;
        return updated;
      }
    },
    addUser: {
      type: UserType,
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        dob: { type: GraphQLString },
      },
      resolve: async (parentValue, { firstName, lastName, dob }) => {
        const user = await UserModel.create({ firstName, lastName, dob });
        user.id = user._id;
        return user;
      }
    },
    deleteUser: {
      type: UserType,
      args: { id: { type: GraphQLNonNull(GraphQLString) } },
      resolve: async (parentValue, { id }) => {
        const deleted = await UserModel.findByIdAndDelete(id);
        if (!deleted) {
          throw new Error('Error deleting user');
        }
        return deleted;
      }
    },
    updateUser: {
      type: UserType,
      args: {
        id: { type: GraphQLNonNull(GraphQLString) },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        dob: { type: GraphQLString },
      },
      resolve: async (parentValue, { id, firstName, lastName, dob }) => {
        const updated = await UserModel.findByIdAndUpdate(id, { firstName, lastName, dob }, { new: true });
        updated.id = updated._id;
        return updated;
      }
    }
  }
})

module.exports = mutation
