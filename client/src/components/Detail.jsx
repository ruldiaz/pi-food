import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getDetail} from '../actions';


export default function Detail(props){
    const dispatch = useDispatch();
    const myRecipe = useSelector( state => state.detail);

    useEffect(()=>{
        dispatch(getDetail(props.match.params.id));
    },[dispatch, props.match.params.id])

   // console.log(myRecipe);

    return (
        <div>
            {myRecipe.length > 0 ? 
            
            <div className='recipe-detail'>
                <span>{myRecipe[0].createdInDb && <Link to={`/recipeupdate/${props.match.params.id}`}><button>Update</button></Link>}</span>
                <span>{myRecipe[0].createdInDb && <Link to={`/recipedelete/${props.match.params.id}`}><button>Delete</button></Link>}</span>
                <h1>{myRecipe[0].name && myRecipe[0].name}</h1>
                <h5>id: {myRecipe[0].id}</h5>
                <img src={myRecipe[0].image} alt="not found" width="300px" height="300px" />
                {<p className='detail-type'><strong>Diet Type:</strong> {!myRecipe[0].createdInDb ? myRecipe[0].diets.map(e=>e + ', ') :  myRecipe[0].diets?.map(e=>e.name + ' ')}</p>}
                <p><strong>Summary:</strong>  { myRecipe[0].summary?.replace(/<[^>]*>/g, '') } </p>
                <p className='detail-type'><strong>Health score:</strong> {myRecipe[0].healthscore}</p>
                <p className='detail-type'><span>min value 0 </span><meter min="0" low="35" max="100" high="70" optimum="90" value={myRecipe[0].healthscore}>{myRecipe[0].healthscore}</meter><span>max value 100</span></p>
                <p><strong>Steps</strong></p>
                <ul>
                    {Array.isArray(myRecipe[0].steps) ? myRecipe[0].steps.map((e,index)=>(
                        <li key={index}>{e.number + ". " + e.step}</li>
                        )) : myRecipe[0].steps}
                </ul>
            </div> : <p>Loading...</p>
        }
        <Link to="/home"><button>Go back home</button></Link>
        </div>
        );
}