const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require('method-override')
const cors = require("cors");
const app = express();


//handline cors
app.use(cors());


const connectToDB = require('./controllers/dbconnect')
const webSockets = require('./controllers/webSockets')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

//handling cors
app.use(cors());
//routes
app.use("/users", require("./routes/user"));
app.use('/meets', require("./routes/meet"));
app.use('/team', require("./routes/teams"));
app.use('/note', require("./routes/notes"));

  // error handler
  app.use((err, req, res, next) => {
    console.log(err.message);
    return res.status(400).send({
      message: err.message,
    });
  });

  app.get('/', (req, res) => {
	res.send('Server is Running');
});

const main = async() => {
  await connectToDB()
  const server = await webSockets(app)
  return server
}
const PORT = process.env.PORT || 5000;

main().then(server => {
  server.listen(PORT, () => {
      console.log(`listening on ${PORT}`)
  })
})
