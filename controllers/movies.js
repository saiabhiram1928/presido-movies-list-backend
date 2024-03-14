const fs = require('fs');


//@desc   Fetch all Movies
//@route  GET /
//@acess  Public
const getAllMovies = async(req,res)=>{
    try{
    const data = eval (await fs.promises.readFile('./data/movies.js','utf8'))
    // res.status(200).json(data)
    res.render('index',{movies:data});
        }catch(err){
            console.log(`Error in reading file ${err}`)
            res.status(500).render('error', {error : "Error reading file"})
        }
}

//@desc   Add movie
//@route  POST /
//@acess  Public

const addMovie =async (req, res)=>{
    const {id,name, description, genere , director , release_year, language,rating}  = req.body
    const newMovie = {id ,name, description, genere, director, release_year, language,rating}
    
    try {
        const moviesdata =  eval(await fs.promises.readFile('./data/movies.js','utf8'))
        moviesdata.push(newMovie)
        eval(await fs.promises.writeFile('./data/movies.js', JSON.stringify(moviesdata,null,2) , 'utf8'))
        res.status(200).redirect('/')
    } catch (error) {
        console.log(`Error in reading file ${error}`)
        res.status(500).render('error',{ error: 'Failed to post data to file' })
    }
}

//@desc   update movie
//@route  PUT /:id
//@acess  Public

const updateMovie = async (req,res)=>{
    const id  = parseInt(req.params.id)
    try{
        let moviesdata = eval(await fs.promises.readFile('./data/movies.js','utf8'))
        const index = moviesdata.findIndex(movie => movie.id === id);
        if (index === -1) {
            return res.status(404).json({ error: 'Movie not found' });
        }
        moviesdata[index] = { ...moviesdata[index], ...req.body };
        eval(await fs.promises.writeFile('./data/movies.js', JSON.stringify(moviesdata,null,2) , 'utf8'))
        res.status(200).redirect('/')
    }catch(error){
        console.log(error)
        res.status(500).json({error:"Failed to update the details"})
    }
    
}
const deleteMovie = async (req, res) => {
    const id  = parseInt(req.params.id)
    try{
        const moviesData = eval (await fs.promises.readFile('./data/movies.js', 'utf8'));
        const data = moviesData.filter((movie) =>{
           return movie.id !=  id
        })
        eval(await fs.promises.writeFile('./data/movies.js', JSON.stringify(data,null,2) , 'utf8'))
        res.status(200).redirect('/')
        

    }catch(error){
        console.log(error)
        res.status(500).render('error',{error : "not able to delete"})
    }
}

//@desc   Search a movie
//@route  GET /search
//@acess  Public

const searchMovie = async (req, res) => {
    const {name} = req.body
    console.log(name.toLowerCase())
    try{
        const moviesData = eval (await fs.promises.readFile('./data/movies.js', 'utf8'));
        const data = moviesData.filter((movie) =>{
           return movie.name.toLowerCase() ===  name.toLowerCase()
        })
        if(data.length ==  0 )return res.status(400).json({error: 'It doesnt exist in db or check the spelling'})
        res.status(200).render('index' , {movies : data});
    }catch(error){
        console.log(error)
        res.status(500).render('error',{ error: 'Failed to search for movies' });
    }
}

const renderForm = (req,res)=>{
      res.render('form',{movie : ''})
}

const getMovieById = async (req,res)=>{
    const id = parseInt(req.params.id) 

    try {
        let movies = await fs.promises.readFile('./data/movies.js', 'utf8');
        movies = JSON.parse(movies);

        const movie = movies.find(movie => movie.id === id);
        if (!movie) {
            return res.status(404).render('error',{ error: 'Movie not found' });
        }

        res.status(200).render('form', {movie});
    } catch (error) {
        console.error(`Error fetching movie details: ${error}`);
        res.status(500).render('error',{ error: 'Failed to fetch movie details' });
    }
}

const filterMovie =async (req,res)=>{
    let { director = '', release_year = '', rating = '0', language = [] } = req.body;
    console.log(req.body)
    const moviesData = eval(await fs.promises.readFile('./data/movies.js', 'utf8'));
    let movies = [];

    for (let i = 0; i < moviesData.length; i++) {
        if ((director === '' || moviesData[i].director === director) &&
            (release_year === '1980' || moviesData[i].release_year === release_year) &&
            (rating === '0' || moviesData[i].rating === rating) &&
            (language.length === 0 || moviesData[i].language.some(lang => language.includes(lang)))) {
            movies.push(moviesData[i]);
        }
    }
    console.log(movies)
    res.render('index',{movies})

}

module.exports = {
    getAllMovies,
    addMovie,
    searchMovie,
    updateMovie,
    deleteMovie,
    renderForm,
    getMovieById,
    filterMovie
}