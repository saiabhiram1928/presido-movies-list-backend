const moviesSchema = (req,res , next)=>{
    console.log(req.body)
    const {name, description, genere , director , release_year, language,rating}  = req.body
    req.body.id = Date.now()
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
        return res.status(400).render('error',{ error: 'Name is required and must be a non-empty string, please go back to form' });
    }else if(!description || typeof description !== 'string' || description.trim().length === 0){
        return res.status(400).render('error',{ error: 'Description is required and must be a non-empty string, please go back to form'});
    }else if(!genere || !Array.isArray(genere) || genere.length === 0){
        return res.status(400).render('error',{ error: 'genere is required and must be an array , please go back to form'});
    }else if(!director ||typeof director !== 'string'  || director.trim().length === 0){
        return res.status(400).render('error',{ error: 'director is required and must be a non-empty string, please go back to form'});
    }else if(!release_year ||typeof release_year !== 'string'  || release_year.trim().length === 0){
        return res.status(400).render('error',{ error: 'release_year is required and must be a non-empty string,please go back to form'});
    }else if(!language || !Array.isArray(language) || language.length === 0){
        return res.status(400).render('error',{ error: 'language is required and must be an array,please go back to form'});
    }else if(!rating ||typeof rating !== 'string'  || rating === 0){
        return res.status(400).render('error',{ error: 'rating is required and must be a non-empty string,please go back to form'});
    }else{
        next()
    }
}


module.exports={
    moviesSchema
}