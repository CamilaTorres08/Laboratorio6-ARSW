// src/AuthorForm.jsx
import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import Table from "./Table.jsx";
import blueprint from "./Services/blueprints.js";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

let root;

export default function AuthorForm() {
  const [authorInput, setAuthorInput] = useState("");
  const [selectedBlueprint, setSelectedBlueprint] = useState(null);
  const [dynamicTopic, setDynamicTopic] = useState(null);
  const [points, setPoints] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const selectedBlueprintRef = useRef();
  const [blueprintsList, setBlueprintsList] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [drawingId, setDrawingId] = useState("");
  const [isConnected, setIsConnected] = useState(false);  // Para controlar la conexión

  const handleDrawingIdChange = (event) => {
    setDrawingId(event.target.value);
  };
  useEffect(() => {
    if (authorInput && drawingId) {
      const topic = `/topic/newpoint.${drawingId}`;
      setDynamicTopic(topic);
      console.log("Dynamic topic updated:", topic);
    }
  }, [authorInput, drawingId]);

  const handleConnect = () => {
    if (selectedBlueprint && drawingId) {
      connectToStomp();
    } else {
      alert("Please select a blueprint and enter a drawing ID");
    }
  };
  const connectToStomp = () => {
    if (!drawingId) {
      alert("Please enter a drawing ID");
      return;
    }
    if (!selectedBlueprint) {
      alert("Please select a blueprint before connecting");
      return;
    }

    const topic = `/topic/newpoint.${drawingId}/${authorInput}/${selectedBlueprint.name}`;

    const socket = new SockJS("http://localhost:8080/stompendpoint");
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: (frame) => {
        console.log("Connected to STOMP on topic:", topic);
        client.subscribe(topic, (message) => {
          try {
            console.log("entre a lo de subscribir");
            const newPoint = JSON.parse(message.body);
            setSelectedBlueprint((prevBP) => {
              if (!prevBP) return prevBP;
              const updatedPoints = [...prevBP.points, newPoint];
              const updatedBP = { ...prevBP, points: updatedPoints };
              blueprint.setCurrentBlueprint(updatedBP);
              return updatedBP;
            });
          } catch (e) {
            console.error("Error parsing message:", e);
          }
        });
        setIsConnected(true); 
      },
      onStompError: (frame) => {
        console.error("STOMP connection error:", frame);
      },
    });
    client.activate();
    setStompClient(client);
  };
  const sendPoint = (x, y) => {
    if (stompClient?.connected && authorInput && drawingId) {
      const pointMessage = {
        author: authorInput,
        name: selectedBlueprint.name,
        x,
        y,
      };
      stompClient.publish({
        destination: `/app/newpoint.${drawingId}/${authorInput}/${selectedBlueprint.name}`,
        body: JSON.stringify(pointMessage),
      });
      console.log("Point sent:", pointMessage);
    } else {
      console.error("Error sending point. Verify:", {
        stompClient: !!stompClient,
        author: authorInput,
        drawingId: !!drawingId,
      });
    }
  };

  const handleInputChange = (event) => {
    setAuthorInput(event.target.value);
  };

  const handleBlueprintSelect = (bp) => {
    setSelectedBlueprint({ ...bp });
    setPoints([...bp.points]);  
    
  }
  useEffect(() => {
    console.log("selectedref",selectedBlueprint)
    selectedBlueprintRef.current = selectedBlueprint;
  }, [selectedBlueprint]);


  useEffect(() => {
    if (selectedBlueprint) {
      console.log("Blueprint seleccionado:", selectedBlueprint);
      setPoints((prevPoints) => [...selectedBlueprint.points]);
      
      blueprint.setCurrentBlueprint(selectedBlueprint); 
      console.log(points);
    }
  }, [selectedBlueprint]); 

  const getBlueprints = async () => {
    blueprint.setAuthor(authorInput);
    await blueprint.getBlueprint(putTable);
  };

  const saveBP = async () => {
    await blueprint.saveBlueprint(putTable);
  };

  const createNewBP = async () => {
    await blueprint.createBlueprint(putTable);
  };

  const deleteBP = async () => {
    await blueprint.deleteBlueprint(setSelectedBlueprint, putTable);
  };

  const putTable = (blueprintsList, total) => {
    setBlueprintsList(blueprintsList);
    setTotalPoints(total);
  };


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
          <button type="button" className="btn btn-primary" onClick={getBlueprints}>
            Get Blueprint
          </button>
        </div>
      </div>
            {/* Agregamos el campo para drawingId */}
            <div className="row align-items-center mt-2">
        <div className="col-lg-6 d-flex align-items-center">
          <label htmlFor="drawingId" className="col-form-label col-form-label-lg me-2">
            Drawing ID
          </label>
          <input
            type="number"
            className="form-control form-control-lg w-100"
            id="drawingId"
            placeholder="Enter drawing ID"
            value={drawingId}
            onChange={handleDrawingIdChange}
          />
        </div>
        <div className="col-auto">
          <button type="button" className="btn btn-success" onClick={handleConnect} disabled={isConnected}>
            {isConnected ? "Connected" : "Connect"}
          </button>
        </div>
      </div>
      <Table
        blueprints={blueprintsList}
        totalOfPoints={totalPoints}
        author={authorInput} 
        saveBlueprint={saveBP}
        blueprintModule={blueprint}
        createBlueprint={createNewBP}
        deleteBlueprint={deleteBP}
        sendPoint={sendPoint}
        onBlueprintSelect={handleBlueprintSelect}
        selectedBlueprint={selectedBlueprint}
      />
    </div>
  );
}
