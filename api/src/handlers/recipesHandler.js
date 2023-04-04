const {getApiInfo, getAllRecipes} = require('../controllers/recipesController'); // controllers
const {Recipe, Diet} = require('../db');

const getRecipesHandler = async (req, res) => {
    try {
        const name = req.query.name;
        let recipesTotal = await getAllRecipes(); // controller
        if(name){
            let recipeName = await recipesTotal.filter( e => e.name.toLowerCase().includes(name.toLowerCase()));
            recipeName.length ? res.status(200).send(recipeName) : res.status(404).send('Receta no encontrada');
        } else {
            res.status(200).send(recipesTotal);
        }
    } catch (error) {
        res.status(404).json({error: error.message})
    }   
};

const getDietsHandler = async (req, res) => {
    try {
        const dietsApi = await getApiInfo(); // controller
        dietsApi.forEach(e => {
        //console.log(Object.entries(e))
            for(let [key] of Object.entries(e)){ // recorrido por cada elemento buscando las propiedades vegetarian, vegan
                if(key === 'vegetarian' || key === 'vegan'){
                    Diet.findOrCreate({
                        where: {name: key}
                    })
                }
            }

            e.diets.forEach( e => {
                Diet.findOrCreate({
                    where: { name: e}
                })
            })
        });

        const allDiets = await Diet.findAll();
        res.status(200).send(allDiets);
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

const postRecipesHandler = async (req, res) => {
    try {
        let {
            name,
            image,
            summary,
            healthscore,
            steps,
            createdInDb,
            diets,
        } = req.body;
    
        console.log(diets)
        let recipeCreated = await Recipe.create({
            name,
            image,
            summary,
            healthscore,
            steps,
            createdInDb,
        });
    
        let recipeDb = await Diet.findAll({
            where: {name: diets}
        });
    
        recipeCreated.addDiet(recipeDb);
        res.status(200).send('Receta creada correctamente.');
    } catch (error) {
        res.status(404).json({error: error.message})
    }  
}

const updateRecipesHandler = async (req, res) => { //update handler
    try {
        console.log(req.body)
        const {id} = req.params;
        const {name, image, summary, healthscore, steps, diets, createdInDb} = req.body;

        const updatedRecipe = await Recipe.update({
            name, image, summary, healthscore, steps, createdInDb   
        },  {where: {id: id}, returning: true} );
        console.log(updatedRecipe[1][0])

        const updatedRecipeInstance = updatedRecipe[1][0]; // Get the first element of the array

        let recipeDb = await Diet.findAll({
        where: {name: diets}
        });

        await updatedRecipeInstance.setDiets(recipeDb);
    
        
        res.status(200).json({message: 'Recipe updated succesfully'})

    } catch (error) {
        console.error(error);
        res.status(404).json({error: error.message})
    }
}

const deleteRecipeHandler = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id)
        await Recipe.destroy({where: {id: id}})
        res.status(200).send('Recipe deleted succesfully');
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

const getRecipesByIdHandler = async (req, res) => {
    try {
        const id = req.params.id;
        const recipesTotal = await getAllRecipes();
        if(id){
            let recipeId = await recipesTotal.filter( e => e.id == id);
            recipeId.length ? res.status(200).json(recipeId) : res.status(404).send('Receta no encontrada');
        }
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

module.exports = {
    getRecipesHandler, 
    getDietsHandler, 
    postRecipesHandler, 
    getRecipesByIdHandler, 
    updateRecipesHandler,
    deleteRecipeHandler
}