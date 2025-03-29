import React, { useEffect, useState } from 'react';
import Canva from './Canva';
import Form from './Form';

export default function Table({ blueprints, totalOfPoints, author, saveBlueprint, blueprintModule, createBlueprint, deleteBlueprint, sendPoint, onBlueprintSelect, selectedBlueprint }) {
    const [selectedBP,setBP] = useState();
    const [isNew, setIsNew] = useState(false);
    

    const handleclick = async (bp) => { // <- Haz la función asíncrona
        try {
          const newBP = await new Promise((resolve, reject) => {
            blueprintModule.getBlueprintAuthorAndName(
              bp.name,
              (response) => resolve(response),
              (error) => reject(error)
            );
          });
          
          if (newBP) {
            setBP(newBP);
            onBlueprintSelect(newBP); // <- Asegura que se ejecute después de obtener los datos
          }
        } catch (error) {
          console.error("Error fetching blueprint:", error);
        }
      };
    const updateBP = () => {
        console.log("Updating blueprint");
        setBP(blueprintModule.getCurrentBlueprint());
    }
    const saveBP = () => {
        console.log("Saving blueprint");  
        isNew ? createBlueprint() : saveBlueprint();
        setIsNew(false);
    }
    const deleteBP = () => {
        deleteBlueprint(setBP);
    }
    
    return (
        blueprints.length > 0 &&
        <div className="row align-items-start">
            <div className="col-md-6">
                <h2>{author} blueprints</h2>
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">Blueprint Name</th>
                        <th scope="col">Number of Points</th>
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {blueprints.map((bp, index) => (
                    <tr key={index}>
                    <th scope="row">{bp.name}</th>
                    <td>{bp.points}</td>
                    <td><button type="button" className="btn btn-outline-primary" onClick={() => handleclick(bp)}>Open</button></td>
                    </tr>
                    ))}
                    </tbody>
                </table>
                <h4>Total of Points: {totalOfPoints} </h4>
            </div>
            <div className="col-md-6">
            <Form author={author} setBP={blueprintModule.setCurrentBlueprint} updateBP={updateBP} setNew={setIsNew}/>
                {selectedBlueprint &&
                <div className="d-flex flex-column gap-2">
                    <h3>Current blueprint: {selectedBlueprint.name}</h3>
                    <Canva blueprint={selectedBlueprint} updatePoints={blueprintModule.addPointsToBP} 
                    sendPoint={sendPoint}/>
                    <div className="d-grid gap-2 d-md-flex"> 
                    <button type="button" className={isNew ? "btn btn-success" : "btn btn-warning"} onClick={saveBP}>
                        {isNew ? "Create Blueprint" : "Update Blueprint"}
                    </button>
                    <button type="button" className="btn btn-danger" onClick={deleteBP} disabled={isNew}>Delete Blueprint</button>
                    </div>
                </div>}
            </div>
        </div>
      );
      
}