import React, { useEffect, useState } from 'react';
import apiclient from './Services/apiclient.js';
import Table from './Table.jsx';
import ReactDOM from "react-dom/client";
import apimock from './Services/apimock.js';
let root;
export default function AuthorForm() {
  const [author, setAuthor] = useState(""); 
  const handleInputChange = (event) => {
    setAuthor(event.target.value); 
  };

  const handleClick = () => {
    getBlueprint();
  };

  //Cambiar entre apimock o apiclient para las solicitudes:
  const [api, setApi] = useState(apiclient); 
 
  //Función para obtener el blueprint por autor
  const getBlueprint = () => {
    if(author){
      var func = function(response){
        if(response){
          const totalPoints = response.reduce((acc, bp) => acc + bp.points.length, 0);
          putTable(response, totalPoints, author);
        }else{
          alert("Author not found");
        }
      }
      const response = api.getBlueprintsByAuthor(author, func);
    }
  }  
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