const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {getRecipesHandler, 
    getDietsHandler, 
    postRecipesHandler, 
    getRecipesByIdHandler, 
    updateRecipesHandler,
    deleteRecipeHandler
} = require('../handlers/recipesHandler');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);



router.get('/recipes',getRecipesHandler);

router.put('/recipeupdate/:id', updateRecipesHandler);

router.delete('/recipedelete/:id', deleteRecipeHandler);

router.get('/diets', getDietsHandler);

router.post('/recipes', postRecipesHandler);

router.get('/recipes/:id', getRecipesByIdHandler)


module.exports = router;
