import React from 'react';
import {Link} from 'react-router-dom';

export default function Card({name, image, diets, id}){
    return (
        <Link to={`/recipes/${id}`}>
        <div className='card'>
            <h3>{name}</h3>
            <img src={image} alt="not found" width="200px" height="200px" />
            <h5>{diets && diets.map( e => {
               // console.log(e)
                let response = "";
                if(e.name){
                    response = e.name + " | "
                } else if ( e) {
                    response = e + " | "
                                }
                return response;
            })}</h5>

        </div>
        </Link>
    );
}