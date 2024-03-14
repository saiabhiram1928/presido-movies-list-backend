const express =require('express')
const dotenv = require('dotenv');
const cors = require('cors')
const fs =require('fs')


const app =express()
dotenv.config();
const port = process.env.PORT || 5000;
app.set('view engine', 'ejs');
app.set('views', './views')
app.use('/images', express.static('./data/images'));
app.use(cors())
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

  
app.use('/', require('./routes/movies'))

const server = app.listen(port, () => {
    console.log(`Server is Runnig at port:${port}`);
  });
  
process.on("unhandledRejection", (err, promise) => {
    console.log(`Error ocuured : ${err}`);
    server.close(() => process.exit(1));
  });