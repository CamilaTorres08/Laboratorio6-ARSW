import React, { useState } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min";

export default function Form({author,setBP, updateBP, setNew}) {
    const [showModal, setShowModal] = useState(false);
    const [nameBP, setName] = useState("");
    const handleInputChange = (event) => {
        setName(event.target.value); 
    };
    const handleClick = () => {
        const newBP = {
            author: author,
            name: nameBP,
            points: []
        }
        console.log(newBP);
        setBP(newBP);
        updateBP();
        setNew(true);
        setShowModal(false);
    }
    return (
        <>
            <button 
                type="button" 
                className="btn btn-success"
                onClick={() => setShowModal(true)}
            >
                Create New Blueprint
            </button>

            {showModal && (
                <div className="modal fade show" style={{ display: "block" }} aria-modal="true" role="dialog">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5">Add New Blueprint</h1>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <label htmlFor="colFormLabelLg" className="col-form-label">Name:</label>
                                <input 
                                type="text" 
                                className="form-control" 
                                id="inputName"
                                value={nameBP}
                                onChange={handleInputChange}/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                    Close
                                </button>
                                <button type="button" className="btn btn-primary" onClick={handleClick}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
