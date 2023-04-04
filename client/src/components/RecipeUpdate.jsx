import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getDetail, updateRecipe, getDiets} from '../actions';

function validateInput(input){
    let errors = {};
    if(!input.name){
        errors.name = "Recipe name is required";
    } else if(!input.summary){
        errors.summary = "Recipe summary required";
    } else if(!input.healthscore || input.healthscore < 1 || input.healthscore > 100){
        errors.healthscore = "Health Score required, values must be between 1 and 100";
    } else if(!input.image){
        errors.image = "Image required";
    }else if(!input.steps){
        errors.steps = "Recipe steps required";
    }else if(!input.diets || input.diets.length === 0){
        errors.diets = "Diet type required";
    }
    return errors;
}

export default function RecipeUpdate(props){

    const dispatch = useDispatch();
    const myRecipe = useSelector( state => state.detail);
    const history = useHistory();
    const diets = useSelector( state => state.diets);
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: myRecipe[0]?.name,
        image: myRecipe[0]?.image,
        summary: myRecipe[0]?.summary,
        healthscore: myRecipe[0]?.healthscore,
        steps: myRecipe[0]?.steps,
        diets: [myRecipe[0]?.diets]
    });

    useEffect(()=>{
        dispatch(getDetail(props.match.params.id));
    },[dispatch, props.match.params.id])

    useEffect(()=>{
        dispatch(getDiets());
    },[dispatch])

    function handleChange(e){
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value 
        })
        setErrors(validateInput({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleCheck(e){
        if(e.target.checked){
            setInput({
                ...input,
                diets: [...input.diets, e.target.value]
            })
        }
    }
/*
    function handleSelect(e){
        setInput({
            ...input,
            diets: [...input.diets, e.target.value]
        })
    }
*/
    function handleSubmit(e){
       // console.log(Object.keys(errors))
        //console.log(Object.keys(errors).length)
        e.preventDefault();
        if(Object.keys(errors).length < 1){
            console.log(input);
            dispatch(updateRecipe(input, myRecipe[0]?.id));
            alert("Recipe updated");
            setInput({
                name: "",
                image: "",
                summary: "",
                healthscore: "",
                steps: "",
                diets: []
            });
        }else{
            alert("There must be no errors in order to update the recipe")
        }
        history.push("/home");
    }

    function handleDelete(e){
        setInput({
            ...input,
            diets: input.diets.filter( diet => diet !== e)
        })
    }
    //console.log(Object.keys(errors).length)
    console.log(myRecipe)
    return (
        <div>
            {myRecipe.length > 0 ? 
            <div>
                <Link to="/home"><button>Go back home</button></Link>
            <h1>Update your recipe</h1>
            <form onSubmit={e=>handleSubmit(e)} className="form-input">
                <div>
                    <label>Name: </label>
                    <input type="text" value={input.name} name="name" placeholder={myRecipe[0]?.name} onChange={e=>handleChange(e)} />
                    {errors.name && <p className='error'>{errors.name}</p>}
                </div>
                <div>
                    <label>Image: </label>
                    <input type="text" value={input.image} name="image" placeholder={myRecipe[0]?.image} onChange={e=>handleChange(e)} />
                    {errors.image && <p className='error'>{errors.image}</p>}
                </div>
                <div>
                    <label>Summary: </label>
                    <textarea name="summary" placeholder={myRecipe[0]?.summary} rows="5" cols="40" onChange={e=>handleChange(e)}></textarea>
                    {/*<input type="text" value={input.summary} name="summary" placeholder="Enter a summary" onChange={e=>handleChange(e)} />*/}
                    {errors.summary && <p className='error'>{errors.summary}</p>}
                </div>
                <div>
                    <label>Health Score: </label>
                    <input type="number" value={input.healthscore} name="healthscore" placeholder={myRecipe[0]?.healthscore} onChange={e=>handleChange(e)} />
                    {errors.healthscore && <p className='error'>{errors.healthscore}</p>}
                </div>
                <div>
                    <label>Steps: </label>
                    <input type="text" value={input.steps} name="steps" placeholder={myRecipe[0]?.steps} onChange={e=>handleChange(e)} />
                    {errors.steps && <p className='error'>{errors.steps}</p>}
                </div>
                <div>
                    <label>Diet Type: </label>
                    {diets && diets.map( e => {
                        //console.log(e)
                        return <label>{e.name}<input key={e.id} type="checkbox" value={e.name} onChange={e=>handleCheck(e)} /></label>
                    })}
                    {/*<select onChange={(e,index)=>handleSelect(e,index)}>
                        {diets && diets.map((e,index)=>{
                            return <option key={index} value={e.name}>{e.name}</option>
                        })}
                    </select>*/}
                    {errors.diets && <p className='error'>{errors.diets}</p>}
                    <ul>
                    <li>
                        {<p>Added:</p>}{input.diets.map((e, index)=> {
                           // console.log(e)
                        return <div key={index}>{e + ", "}</div>})}
                    </li>
                </ul>
                <button disabled={Object.keys(errors).length > 0 } type="submit">Update Recipe</button>
                </div>
            </form>
            {input.diets.map((e, index)=>{
                return (<div>
                    <button key={index} className='error' onClick={()=>handleDelete(e)}>{e} x</button>
                </div>)
            })}
            </div> : <p>Loading...</p>  }
        </div>
    );
}