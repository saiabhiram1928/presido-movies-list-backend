const fs = require('fs');

//@desc   Fetch all Movies
//@route  GET /movies
//@acess  Public
const getAllMovies = async(req,res)=>{
    try{
    const data = eval (await fs.promises.readFile('./data/movies.js','utf8'))
    res.status(200).json(data)
        }catch(err){
            console.log(`Error in reading file ${err}`)
            res.status(500).send('Error reading file')
        }
}

//@desc   Add movie
//@route  POST /movies
//@acess  Public

const addMovie =async (req, res)=>{
    const {name, description, genere , director , release_year, language,rating}  = req.body
    const newMovie = {id : Date.now(),name, description, genere, director, release_year, language,rating}

    try {
        const moviesdata =  eval(await fs.promises.readFile('./data/movies.js','utf8'))
        moviesdata.push(newMovie)
        eval(await fs.promises.writeFile('./data/movies.js', JSON.stringify(moviesdata,null,2) , 'utf8'))
        res.status(200).json({moviesdata})
    } catch (error) {
        console.log(`Error in reading file ${error}`)
        res.status(500).json({ error: 'Failed to post data to file' })
    }
}

//@desc   update movie
//@route  PUT /movies/:id
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
        res.status(200).json(moviesdata)
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
        res.status(200).json(data)
        

    }catch{

    }
}

//@desc   Search a movie
//@route  GET /movies/search
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
        res.status(200).json(data);
    }catch(error){
        console.log(error)
        res.status(500).json({ error: 'Failed to search for movies' });
    }
}



module.exports = {
    getAllMovies,
    addMovie,
    searchMovie,
    updateMovie,
    deleteMovie
}