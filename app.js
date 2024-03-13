const express =require('express')
const dotenv = require('dotenv');
const cors = require('cors')
const fs =require('fs')


const app =express()
dotenv.config();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Movies server");
  });
  
app.use('/movies', require('./routes/movies'))

const server = app.listen(port, () => {
    console.log(`Server is Runnig at port:${port}`);
  });
  
process.on("unhandledRejection", (err, promise) => {
    console.log(`Error ocuured : ${err}`);
    server.close(() => process.exit(1));
  });