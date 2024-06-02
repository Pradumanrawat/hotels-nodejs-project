/*const express = require('express')
const app = express();
app.get('/', (req, res) => {
  res.send('welcome to my hotel... how can i help you')
})

app.get('/balmithai', function (req, res) {

  var uk = {
    country: "india",
    state: "uttrakhand",
    favdish: "balmithai",
  }
  res.send(uk)
})

app.post('/balmithai', (req, res) => {
  console.log("data is saves")

})

app.get('/kimchi', (req, res) => {
  res.send('hello sir! welcome to south korea resturnent')
})
app.listen(3000, () => {
  console.log("server islive on 3000")
})*/



const express = require('express');

const app = express();

const db = require('./db');

const bodyparser = require('body-parser');

app.use(bodyparser.json());

const person = require('./models/person');

const item = require('./models/item');

//import the server files.

const personroutes = require('./routes/personroutes');

const itemroutes = require('./routes/itemroutes');

//use the router.
app.use('/person', personroutes);

app.use('/item', itemroutes);

app.listen(3000, () => {
  console.log("server islive on 3000")
})



