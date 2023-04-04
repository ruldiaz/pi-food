import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getRecipes, getDiets, filterRecipesByDiet, filterCreated, orderByName, orderByHealthScore } from '../actions';
import {Link} from 'react-router-dom';
import Card from './Card';
import Paginado from './Paginado';
import SearchBar from './SearchBar';

export default function Home(){

    const dispatch = useDispatch();
    const allRecipes = useSelector( state => state.recipes);
    const allDiets = useSelector( state => state.diets);
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage, setRecipesPerPage] = useState(9);
    const [orden, setOrden] = useState("")
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const previousPage = () => {
        if(currentPage !== 1){
            setCurrentPage( currentPage => currentPage - 1); // functional state update
        }
    }

    const nextPage = () => {
        if(currentPage !== Math.ceil(allRecipes.length / recipesPerPage)){
            setCurrentPage( currentPage => currentPage + 1); // functional state update
        }
    }

    useEffect(()=>{
        document.title = 'Henry Food Pi'
        dispatch(getRecipes());
        dispatch(getDiets());
    },[dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getRecipes());
        dispatch(getDiets());
    }

    function handleFilterByDiet(e){
        e.preventDefault();
        dispatch(filterRecipesByDiet(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`);
    }

    function handleFilterCreated(e){
        e.preventDefault();
        dispatch(filterCreated(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`);
    }

    function handleOrderByName(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`);
    }

    function handleOrderByHealthScore(e){
        e.preventDefault();
        dispatch(orderByHealthScore(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`);
    }

    return (
        <div className='home'>
            <div className='top-section'>
                <Link to="/"><button>Go back to Landing</button></Link>
                <h1>Henry Food Individual Project</h1>
                <Link to="/recipe"><button>Create recipe</button></Link>
            </div>
            <button onClick={e=>handleClick(e)}>Refresh</button>
            <div>
                <select onChange={e=>handleOrderByName(e)}>
                    <option>Order Alphabetically</option>
                    <option value='asc'>Ascending</option>
                    <option value='desc'>Descending</option>
                </select>
                <select onChange={e=>handleOrderByHealthScore(e)}>
                    <option>Order by Health Score</option>
                    <option value='good'> - to + health Score</option>
                    <option value='bad'> + to - health Score</option>
                </select>
                <select onChange={e=>handleFilterCreated(e)}>
                    <option value='all'>All Sources</option>
                    <option value='api'>Api</option>
                    <option value='created'>Db</option>
                </select>
                <select onChange={e=>handleFilterByDiet(e)}>
                    <option value='all'>All Diet Types</option>
                    {allDiets?.map((e, index)=>{
                        return <option key={index} value={e.name}>{e.name}</option>
                    })}
                </select>
                <Paginado recipesPerPage={recipesPerPage} allRecipes={allRecipes.length} paginado={paginado} currentPage={currentPage} previousPage={previousPage} nextPage={nextPage} setRecipesPerPage={setRecipesPerPage} orden={orden} />
                <SearchBar />
                <div className='allRecipes'>
                {
                    currentRecipes?.map( e => {
                        //console.log(e)
                        return <Card key={e.id} name={e.name} image={e.image} diets={e.diets} id={e.id} />
                    })
                }
                </div>
            </div>
            <footer>Developed by Raul, using react, express, node, sequelize, and postgres</footer>
        </div>
    );
}