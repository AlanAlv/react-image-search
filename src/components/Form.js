import React, { useState } from 'react';
import Error from './Error'

const Form = ({saveSearch}) => {

    const [ word, saveWord ] = useState('');
    const [ error, saveError ] = useState(false)

    const searchImages = e =>  {
        e.preventDefault();

        // Validation
        if(word.trim() === ''){
            saveError(true);
            return;
        }
        saveError(false);

        // send word to App component
        saveSearch(word);
    }
    return ( 
        <form
            onSubmit={searchImages}
        >
            <div className="row">
                <div className="form-group col-md-8">
                    <input 
                        type="text" 
                        className="form-control form-control-lg" 
                        placeholder="Search an imahe, i.e. : Football"
                        onChange={ e => saveWord(e.target.value)}
                    />
                </div>
                <div className="form-group col-md-4">
                    <input 
                        type="submit" 
                        className="btn btn-lg btn-danger btn-block" 
                        value="Search"
                    />
                </div>
            </div>
            {error ? <Error message="Type a word to search" /> : null}
        </form>
     );
}
 
export default Form;
