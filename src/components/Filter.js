import React from 'react';

const Filter = ({changeFunction}) => {
    
    return (
        <div>
            Filter: <input onChange={changeFunction}/>
        </div>
    );
}

export default Filter;