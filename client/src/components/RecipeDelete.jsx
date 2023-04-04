import React, {useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import { deleteRecipe, getDetail } from '../actions';
import {useDispatch, useSelector} from 'react-redux';

export default function RecipeDelete(props){
    const dispatch = useDispatch();
    const myRecipe = useSelector( state => state.detail);
    const history = useHistory();

    useEffect(()=>{
        dispatch(getDetail(props.match.params.id))
    },[dispatch, props.match.params.id])
    
    //console.log(myRecipe)
    
    function handleDelete(e){
        e.preventDefault();
        dispatch(deleteRecipe(myRecipe[0]?.id))
        alert("Recipe deleted");
        history.push("/home");
    }

    return (
        <div>
            <h1>Recipe Delete</h1>
            <h2>Delete the selected recipe</h2>

            <button onClick={handleDelete}>Delete</button>
            
            <Link to="/home"><button>Go back home</button></Link>
        </div>
    );
}