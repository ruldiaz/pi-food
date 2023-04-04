import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import { getRecipeByName } from '../actions';

export default function SearchBar(){
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value);
        console.log(name);
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getRecipeByName(name));
        setName("");
    }

    return (
        <div>
            <input type="text" value={name} placeholder="Search by recipe name..." onChange={e=>handleInputChange(e)} />
            <button type="submit" onClick={e=>handleSubmit(e)}>Search</button>
        </div>
    );
}