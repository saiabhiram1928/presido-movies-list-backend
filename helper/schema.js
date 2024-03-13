const moviesSchema = (req,res , next)=>{
    const {name, description, genere , director , release_year, language,rating}  = req.body
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
        return res.status(400).json({ error: 'Name is required and must be a non-empty string' });
    }else if(!description || typeof description !== 'string' || description.trim().length === 0){
        return res.status(400).json({ error: 'Description is required and must be a non-empty string'});
    }else if(!genere || !Array.isArray(genere) || genere.length === 0){
        return res.status(400).json({ error: 'genere is required and must be an array'});
    }else if(!director ||typeof director !== 'string'  || director.trim().length === 0){
        return res.status(400).json({ error: 'director is required and must be a non-empty string'});
    }else if(!release_year ||typeof release_year !== 'string'  || release_year.trim().length === 0){
        return res.status(400).json({ error: 'release_year is required and must be a non-empty string'});
    }else if(!language || !Array.isArray(language) || language.length === 0){
        return res.status(400).json({ error: 'language is required and must be an array'});
    }else if(!rating ||typeof rating !== 'number'  || rating === 0){
        return res.status(400).json({ error: 'rating is required and must be a non-empty string'});
    }else{
        next()
    }
}


module.exports={
    moviesSchema
}