const express = require('express')
const router = express.Router()

const {moviesSchema} = require('../helper/schema')
const {getAllMovies , addMovie,searchMovie,updateMovie,deleteMovie} = require('../controllers/movies')

router.get('/', getAllMovies)
router.put('/:id', updateMovie)
router.delete('/:id', deleteMovie)
router.get('/search', searchMovie)
router.post('/',moviesSchema, addMovie)
module.exports = router