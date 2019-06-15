
import React from 'react';

const AddItemInput = (props) =>{
  const { addAction, buttonText, handleInput, buttonDisabled } = props;

  return (
    <form onSubmit={addAction}>
      <input onChange={(e) => handleInput(e)}/>
      <button disabled={buttonDisabled()}>{buttonText}</button>
    </form>
  );
}
 
export default AddItemInput;