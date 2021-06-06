import React from 'react';

const PersonForm = ({onNameChangeFunction, onNumberChangeFunction, onSubmitFunction}) => {
    return (
        <form>
        <div>
          name: <input onChange={onNameChangeFunction}/>
          <br></br>
          number: <input onChange={onNumberChangeFunction}/>
        </div>
        <div>
          <button type="submit" onClick={onSubmitFunction}>add</button>
        </div>
      </form>
    );
}

export default PersonForm;