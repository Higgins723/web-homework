const graphql = require('graphql')
const TransactionType = require('./transaction-type')
const UserType = require('./user-type')
const Model = require('../query-resolvers/query-resolver.js')
const { TransactionModel } = require('../data-models/Transaction')
const { UserModel } = require('../data-models/User')

const {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
} = graphql
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    transaction: {
      type: TransactionType,
      args: {
        id: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve (parentValue, args) {
        return Model.findOne(TransactionModel, args.id)
      }
    },
    transactions: {
      type: GraphQLList(TransactionType),
      args: {
        amount: { type: GraphQLFloat },
        credit: { type: GraphQLBoolean },
        debit: { type: GraphQLBoolean },
        description: { type: GraphQLString },
        merchant_id: { type: GraphQLString },
        user_id: { type: GraphQLString }
      },
      resolve (parentValue, args) {
        return Model.find(TransactionModel, args)
      }
    },
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve (parentValue, args) {
        return Model.findOne(UserModel, args.id);
      }
    },
    users: {
      type: GraphQLList(UserType),
      args: {
        dob: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
      },
      resolve: (parentValue, args) => {
        return Model.find(UserModel, args);
      }
    }
  })
})

module.exports = RootQuery
