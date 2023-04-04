import React from 'react';

export default function Paginado({recipesPerPage, allRecipes, paginado, currentPage, previousPage, nextPage}){
    //console.log(currentPage)
    
    const pageNumbers = [];
    
    for(let i=1; i<=Math.ceil(allRecipes/recipesPerPage) ; i++){
        pageNumbers.push(i);

    }
    //console.log(pageNumbers.length) // boton nextpage se deshabilita cuando la pagina actual es igual a la ultima pagina
    return (
        <nav>
            <ul className='botones-paginado'>
                <li onClick={previousPage}>
                    <button disabled={currentPage<=1}>Prev</button>
                </li>
                {pageNumbers && pageNumbers.map((number, index) => {
                    return <button key={index} onClick={()=>paginado(number)} className={number === currentPage ? 'active' : ""} >{number}</button>
                })}
                <li onClick={nextPage}>
                    <button disabled={currentPage === pageNumbers.length}>Next</button> 
                </li>
            </ul>
        </nav>
    );
}