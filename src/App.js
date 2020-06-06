import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import PicsList from './components/PicsList';

function App() {

  // App states
  const [ search, saveSearch ] = useState('');
  const [ pics, savePics ] = useState([]);
  const [ currentPage, saveCurrentPage ] = useState(1);
  const [ totalPages, saveTotalPages ] = useState(1);


  useEffect(() => {
    const callAPI = async () => {
      if(search === '') return;

      const imagesPerPage = 30;
      const key = '16912680-a9141e85075a160802da71bea';
      const url = `https://pixabay.com/api/?key=${key}&q=${search}&per_page=${imagesPerPage}&page=${currentPage}`
  
      const answer = await fetch(url);
      const result = await answer.json();

      savePics(result.hits);       
      
      // Calculate total pages
      const calculateTotalPages = Math.ceil(result.totalHits / imagesPerPage);
      saveTotalPages(calculateTotalPages);
    
      // Move Screen Up
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({ behavior: 'smooth'});
    }

    callAPI();
  }, [search, currentPage])

  const previousPage = ()=> {
    const newCurrentPage = currentPage -1;

    if (newCurrentPage === 0) return;

    saveCurrentPage(newCurrentPage);
  }

  const nextPage = ()=> {
    const newCurrentPage = currentPage +1;

    if (newCurrentPage > totalPages ) return;

    saveCurrentPage(newCurrentPage);
  }

  useEffect (() =>{
    saveCurrentPage(1);
  },[search]);

  return (
    <div className="container">
      <div className="jumbotron">

        <p className="lead text-center">
          Image Search
        </p>

        <Form 
          saveSearch={saveSearch}
        />
      </div>

      <div className="row justify-content-center">
        <PicsList 
          pics={pics}
        />

        { (currentPage === 1) ? null : (
          <button
            type="button"
            className="btn btn-info mr-2"
            onClick={previousPage}
          >
            &laquo; Previous 
          </button>
        )}

        {(currentPage === totalPages) ? null : (
          <button
            type="button"
            className="btn btn-info ml-2"
            onClick={nextPage}
          >
            Next &raquo;
          </button>
        )

        }
      </div>
    </div>
  );
}

export default App;
