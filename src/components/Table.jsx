import React, { useEffect, useState } from 'react';
import Canva from './Canva';


export default function Table({ blueprints, totalOfPoints, author }) {
    const [selectedBP,setBP] = useState();
    const [pointsBP, setPoints] = useState([]);
    const handleclick = (bp) => {
        setBP(bp);
    }

    return (
        <div className="row align-items-start">
            <div className="col-md-6">
                <h2>{author} blueprints</h2>
                <table class="table">
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
                    <td>{bp.points.length}</td>
                    <td><button type="button" class="btn btn-outline-primary" onClick={() => handleclick(bp)}>Open</button></td>
                    </tr>
                    ))}
                    </tbody>
                </table>
                <h4>Total of Points: {totalOfPoints} </h4>
            </div>
            <div className="col-md-6">
                {selectedBP && <Canva blueprint={selectedBP} />}
            </div>
        </div>
      );
      
}