const express = require('express')
const router = express.Router()

const {moviesSchema} = require('../helper/schema')
const {getAllMovies , addMovie,searchMovie,updateMovie,deleteMovie,renderForm,getMovieById,filterMovie} = require('../controllers/movies')

router.get('/', getAllMovies)
router.get('/form', renderForm)
router.get('/update/:id',getMovieById)
router.post('/update/:id', updateMovie)
router.get('/delete/:id', deleteMovie)
router.post('/search', searchMovie)
router.post('/filter', filterMovie)
router.post('/',moviesSchema, addMovie)
module.exports = router