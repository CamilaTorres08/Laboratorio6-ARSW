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
 // const [selectetBP, setBP] = useState(null);

  //useEffect(() => {
  //  if (selectetBP !== null) {
   //   console.log("Blueprint seleccionado2:", selectetBP)
   //   setSelectedBlueprint([selectetBP]);
   // }
  //}, [selectetBP]);

  useEffect(() => {
    selectedBlueprintRef.current = selectedBlueprint;
  }, [selectedBlueprint]);



  // Cuando se tenga un autor y un blueprint seleccionado, se construye el tópico dinámico.
  useEffect(() => {
    if (authorInput && selectedBlueprint) {
      // Normalizamos el nombre (por ejemplo, eliminando espacios)
      const topic = `/topic/newpoint/${authorInput}/${selectedBlueprint.name}`;
      setDynamicTopic(topic);
      console.log("Dynamic topic actualizado:", topic);
    } else {
      setDynamicTopic(null);
    }
  }, [authorInput, selectedBlueprint]);

  useEffect(() => {
    console.log("Blueprint seleccionado:", selectedBlueprint);
  }, [selectedBlueprint]);

  // Inicia la conexión STOMP solo cuando dynamicTopic tenga valor.
  useEffect(() => {
    if (!dynamicTopic) {
      console.log("No topic provided, no connection");
      return;
    }
    console.log("Conectando a STOMP en topic:", dynamicTopic);
    const socket = new SockJS("http://localhost:8080/stompendpoint");
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: (frame) => {
        console.log("Conectado a STOMP:", frame);
        client.subscribe(dynamicTopic, (message) => {
          console.log("Mensaje recibido en topic:", dynamicTopic, message.body);
          try {
            const newPoint = JSON.parse(message.body);
            // Actualiza el estado global de puntos
            setPoints((prevPoints) => [...prevPoints, newPoint]);
          } catch (e) {
            console.error("Error al parsear el mensaje:", e);
          }
        });
      },
      onStompError: (frame) => {
        console.error("Error en STOMP:", frame);
      },
    });
    client.activate();
    setStompClient(client);

    return () => {
      console.log("Desactivando STOMP");
      client.deactivate();
      setStompClient(null);
    };
  }, [dynamicTopic]);

  // Función para enviar un punto vía STOMP.
  // Se usará para publicar cada punto (por ejemplo, desde el canvas).
  const sendPoint = (x, y) => {
    console.log("Estado actual:", {
      stompClient: stompClient?.connected,
      author: authorInput,
      blueprint: selectedBlueprint,
    });
  
    if (stompClient?.connected && authorInput && selectedBlueprint) {
      const pointMessage = {
        author: authorInput,
        name: selectedBlueprint.name,
        x,
        y,
      };
      stompClient.publish({
        destination: `/app/newpoint/${authorInput}/${selectedBlueprint.name}`,
        body: JSON.stringify(pointMessage),
      });
      console.log("Punto enviado:", pointMessage);
    } else {
      console.error("Error al enviar punto. Verifica:", {
        stompClient: !!stompClient,
        author: authorInput,
        blueprint: !!selectedBlueprint,
      });
    }
  };

  // Actualiza el estado del input del autor.
  const handleInputChange = (event) => {
    setAuthorInput(event.target.value);
  };

  const handleBlueprintSelect = (bp) => {
    blueprint.setCurrentBlueprint(bp); 
    setSelectedBlueprint(bp);
  }

  // Función para obtener la lista de blueprints del autor.
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
      <Table
        blueprints={blueprintsList}
        totalOfPoints={totalPoints} // <- Usa totalPoints (estado)
        author={authorInput} // <- Usa authorInput (estado)
        saveBlueprint={saveBP}
        blueprintModule={blueprint}
        createBlueprint={createNewBP}
        deleteBlueprint={deleteBP}
        sendPoint={sendPoint}
        onBlueprintSelect={handleBlueprintSelect}
      />
    </div>
  );
}
