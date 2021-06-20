const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require('method-override')
const cors = require("cors");
const app = express();


//handline cors
app.use(cors());

//Database connection
const MONGOURI = process.env.MONGOURI;

mongoose.connect(MONGOURI, {useNewUrlParser: true,useCreateIndex: true,useUnifiedTopology: true,})
.then(() => console.log("Connected to database"))
.catch((err) => console.log(err));
mongoose.Promise = global.Promise;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'))

//handling cors
app.use(cors());
//routes
app.use("/users", require("./routes/user"));

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
  const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));