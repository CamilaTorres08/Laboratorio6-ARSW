import React, { useEffect, useState } from 'react';
import Table from './Table.jsx';
import ReactDOM from "react-dom/client";
import blueprint from './Services/blueprints.js';

let root;
export default function AuthorForm() {
  const [authorInput, setAuthorInput] = useState(""); 
  const handleInputChange = (event) => {
    setAuthorInput(event.target.value); 
  };
  const handleClick = () => {
    blueprint.getBlueprint(authorInput,putTable);
  };
  //Función para añadir la tabla con los blueprints
  const putTable = (blueprintsList, total, author) => {
    const oldDiv = document.getElementById("table");
    if(!root){
      root = ReactDOM.createRoot(oldDiv);
    }
    root.render(<Table blueprints={blueprintsList} totalOfPoints={total} author={author} />);
  }
    return (
      <div id="user-container">
        <div className="row align-items-center">
          <div className="col-lg-6 d-flex align-items-center">
            <label htmlFor="colFormLabelLg" className="col-form-label col-form-label-lg me-2">
              Author
            </label>
            <input
              type="text"
              className="form-control form-control-lg w-100"
              id="colFormLabelLg"
              placeholder="Enter author's name"
              value={authorInput}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-auto">
            <button type="button" className="btn btn-primary" onClick={handleClick}>Get Blueprint</button>
          </div>
        </div>
        <div id="table"></div>
        </div>
      );
      
}