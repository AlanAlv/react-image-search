import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import PicsList from './components/PicsList';

function App() {

  // App states
  const [ search, saveSearch ] = useState('');
  const [ pics, savePics ] = useState([]);

  useEffect(() => {
    const callAPI = async () => {
      if(search === '') return;

      const imagesPerPage = 30;
      const key = '16912680-a9141e85075a160802da71bea';
      const url = `https://pixabay.com/api/?key=${key}&q=${search}&per_page=${imagesPerPage}`
  
      const answer = await fetch(url);
      const result = await answer.json();

      savePics(result.hits);
  
    }

    callAPI();
  }, [search])

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
      </div>
    </div>
  );
}

export default App;
