import React from 'react';
import Pic from './Pic';

const PicsList = ({pics}) => {
    return ( 
        <div className="col-12 p-5 row">
            {pics.map(pic => (
                <Pic 
                    key={pic.key}
                    pic={pic}
                />
            ))}
        </div>
     );
}
 
export default PicsList;