const { GraphQLObjectType, GraphQLInt, GraphQLList, GraphQLString, GraphQLSchema } = require('graphql');

const UserType = new GraphQLObjectType({
  name: "user",
  fields: () => ({
    id: { type: GraphQLInt },
    password: { type: GraphQLString },
    name: { type: GraphQLString },
    accounts: { type: BankAccountType},
    credit_cards: { type: CreditCardType }
  })
})

// dodac jeszcze typy dla konta i dla karty

// const RootQuery = new GraphQLObjectType({
//   name: 'RootQuery',
//   fields: {
//     users: {
//       type: new GraphQLList
//     }
//   }
// })

// module.exports = new GraphQLSchema({
//   query: RootQuery,
// })