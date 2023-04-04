const axios = require('axios');
require('dotenv').config();
const {Recipe, Diet} = require('../db');
const {API_KEY} = process.env;

const getApiInfo = async () => {
    try {
        const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
        //console.log(apiUrl.data)
        const apiInfo = await apiUrl.data.results.map( e => {
            //console.log(e)
            return {
                id: e.id,
                name: e.title,
                image: e.image,
                summary: e.summary,
                healthscore: e.healthScore,
                steps: e.analyzedInstructions[0]?.steps.map(e=>{
                    return {
                        number: e.number,
                        step: e.step
                    }
                }),
                diets: e.diets.map(e => e),
                dishTypes: e.dishTypes.map( e => e),
                vegetarian: e.vegetarian,
                vegan: e.vegan,
            }
        })
        return apiInfo;
    } catch (error) {
        throw new Error(error)
    }
};

const getDbInfo = async () => {
    try {
        return await Recipe.findAll({
            include: {
                model: Diet,
                attributes: ['name'],
                through: {
                    attributes: [],
                },
            },
        });
    } catch (error) {
        throw new Error(error)
    }
};

const getAllRecipes = async () => {
    try {
        let apiInfo = await getApiInfo();
        let dbInfo = await getDbInfo();
        //console.log(dbInfo[0].dataValues.diets)
        let infoTotal = dbInfo.concat(apiInfo);
        return infoTotal;
    } catch (error) {
        throw new Error(error)
    }
};

module.exports = {
    getApiInfo, getAllRecipes
}