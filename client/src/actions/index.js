import axios from 'axios';

export function getRecipes(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/recipes");
        return dispatch({
            type: 'GET_RECIPES',
            payload: json.data
        })
    }
}

export function getDiets(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/diets");
        return dispatch({
            type: 'GET_DIETS',
            payload: json.data
        })
    }
}

export function getRecipeByName(name){
    return async function(dispatch){
        try {
            var json = await axios.get(`http://localhost:3001/recipes?name=${name}`);
            return dispatch({
                type: 'GET_RECIPE_BY_NAME',
                payload: json.data
            })    
        } catch (error) {
            console.error(error);
        }   
    }
}

export function postRecipe(payload){
    return async function(dispatch){
        const response = await axios.post("http://localhost:3001/recipes", payload);
        //console.log(response);
        return response;
    }
}

export function updateRecipe(payload, id){
    return async function(dispatch){
        const response = await axios.put(`http://localhost:3001/recipeupdate/${id}`, payload);
        //console.log(response);
        return response;
    }
}

export function deleteRecipe(id){
    return async function(dispatch){
        const response = await axios.delete(`http://localhost:3001/recipedelete/${id}`)
        console.log(response);
        return response;
    }
}

export function getDetail(id){
    return async function(dispatch){
        try {
            const json = await axios.get(`http://localhost:3001/recipes/${id}`);
            return dispatch({
                type: 'GET_DETAIL',
                payload: json.data
            })
        } catch (error) {
            console.error(error);
        }
    }
}

export function filterRecipesByDiet(payload){
    //console.log(payload)
    return {
        type: 'FILTER_BY_DIET',
        payload
    }
}

export function filterCreated(payload){
    return {
        type: 'FILTER_BY_CREATED',
        payload
    }
}

export function orderByName(payload){
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByHealthScore(payload){
    return {
        type: 'ORDER_BY_HEALTHSCORE',
        payload
    }
}

