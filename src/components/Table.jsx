import React, { useEffect, useState } from 'react';
import Canva from './Canva';
import Form from './Form';

export default function Table({ blueprints, totalOfPoints, author, saveBlueprint, blueprintModule, createBlueprint, deleteBlueprint }) {
    const [selectedBP,setBP] = useState();
    const [isNew, setIsNew] = useState(false);
    const handleclick = (bp) => {
        blueprintModule.getBlueprintAuthorAndName(bp.name, setBP);
    }
    const updateBP = () => {
        setBP(blueprintModule.getCurrentBlueprint());
    }
    const saveBP = () => {
        if(isNew){
            createBlueprint();
        }else{
            saveBlueprint();
        }
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
                {selectedBP &&
                <div className="d-flex flex-column gap-2">
                    <h3>Current blueprint: {selectedBP.name}</h3>
                    <Canva blueprint={selectedBP} updatePoints={blueprintModule.addPointsToBP}/>
                    <div class="d-grid gap-2 d-md-flex"> 
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