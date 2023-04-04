
const initialState = {
    recipes: [],
    diets: [],
    allRecipes: [],
    detail: []
}

function rootReducer(state = initialState, action){
    switch(action.type){
        case 'GET_RECIPES':
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            }
        case 'GET_RECIPE_BY_NAME':
            return {
                ...state,
                recipes: action.payload
            }
        case 'GET_DIETS':
            return {
                ...state,
                diets: action.payload
            }
        case 'POST_RECIPE':
            return {
                ...state,
            }
        case 'PUT_RECIPE':
            return {
                ...state,
            }
        case 'DELETE_RECIPE':
            return {
                ...state,
            }
        case 'GET_DETAIL':
            return {
                ...state,
                detail: action.payload
            }
        case 'FILTER_BY_DIET':
            const allRecipes = state.allRecipes;
            const recipesFiltered = action.payload === 'all' ? allRecipes : allRecipes.filter(e=>e.diets.toString().toLowerCase().includes(action.payload.toLowerCase()));
            return {
                ...state,
                recipes: recipesFiltered
            }
        case 'FILTER_BY_CREATED':
            const allRecipes2 = state.allRecipes;
            const createdFilter = action.payload === 'created' ? allRecipes2.filter( e => e.createdInDb) : allRecipes2.filter( e => !e.createdInDb);
            return {
                ...state,
                recipes: action.payload === 'all' ? allRecipes2 : createdFilter
            }
        case 'ORDER_BY_NAME':
            let orderedArr = action.payload === 'asc' ? 
            state.recipes.sort(function(a,b){
                if(a.name > b.name){
                    return 1;
                }
                if(b.name > a.name){
                    return -1;
                }
                return 0;
            }) : state.recipes.sort(function(a,b){
                if(a.name > b.name){
                    return -1;
                }
                if(b.name > a.name){
                    return 1;
                }
                return 0;
            })
            return {
                ...state,
                recipes: orderedArr
            }
            case 'ORDER_BY_HEALTHSCORE':
                let orderedHealthArr = action.payload === 'good' ?
                state.recipes.sort(function(a,b){
                    if(a.healthscore > b.healthscore){
                        return 1;
                    }
                    if(b.healthscore > a.healthscore){
                        return -1;
                    }
                    return 0;
                }) : state.recipes.sort(function(a,b){
                    if(a.healthscore > b.healthscore){
                        return -1;
                    }
                    if(b.healthscore > a.healthscore){
                        return 1;
                    }
                    return 0;
                })
                return {
                    ...state,
                    recipes: orderedHealthArr
                }
        default:
            return state;
    }
}

export default rootReducer;