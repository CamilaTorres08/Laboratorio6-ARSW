import React, { useEffect, useState } from 'react';
import * as serviceBP from './Services/Service.ts';
import Table from './Table.jsx';
import ReactDOM from "react-dom/client";
import apimock from './Services/apimock.js';

export default function AuthorForm() {
  const [author, setAuthor] = useState(""); 
  
  const handleInputChange = (event) => {
    setAuthor(event.target.value); 
  };

  const handleClick = () => {
    getBlueprint();
  };

  const [api, setApi] = useState(serviceBP); 
 
  const getBlueprint = () => {
    if(author){
      var func = function(response){
        const totalPoints = response.reduce((acc, bp) => acc + bp.points.length, 0);
        putTable(response, totalPoints, author);
      }

      const response = api.getBlueprintsByAuthor(author, func);
    }
  }  
  const putTable = (blueprintsList, total, author) => {
    const oldDiv = document.getElementById("table");
    const root = ReactDOM.createRoot(oldDiv);
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
              value={author}
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