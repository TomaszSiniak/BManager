const express = require('express');
const graphqlHTTP = require('express-graphql');
const cors = require('cors');
const mongoose = require('mongoose');
const schema = require('./Schema/schema');

const app = express();
app.use(cors());

mongoose.connect('mongodb://sintom:test123@ds119795.mlab.com:19795/mydb', { useNewUrlParser: true });
mongoose.connection.once('open', () => console.log('connected to database'));

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`app is running on port: ${PORT}`))
