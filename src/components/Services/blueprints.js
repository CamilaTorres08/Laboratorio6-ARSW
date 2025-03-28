import apiclient from './apiclient.js';
import apimock from './apimock.js';

const blueprint = (() => {
    let author;
    let blueprintsList = [];
    let api = apiclient;
    let currentBlueprint;

    const setAuthor = (newAuthor) => {
      if(newAuthor){
        author = newAuthor;
      }
    }
    //Método para obtener la lista de blueprints 
    const getBlueprint = async (putTable) => {
      const func = (response) => {
        if(response){
            fetchBlueprints(response,putTable);
        }else{
            fetchBlueprints([],putTable);
            alert("Author not found");
        }
      }
      await api.getBlueprintsByAuthor(author, func);
    } 

    // Método para obtener los planos del autor y ponerlos en la tabla
    const fetchBlueprints = (blueprints, table) => {
        blueprintsList = blueprints.map(bp => ({
            name: bp.name,
            points: bp.points.length
        }));
        const totalPoints = blueprints.reduce((acc, bp) => acc + bp.points.length, 0);
        console.log(blueprintsList+" "+totalPoints);
        table(blueprintsList, totalPoints, author);
    };
    //Método para obtener el blueprint basado en el autor y el nombre
    const getBlueprintAuthorAndName = async (name, successCallback, errorCallback) => {
      if (!author) {
        errorCallback("Autor no definido");
        return;
      }
      
      try {
        await api.getBlueprintsByNameAndAuthor(
          author,
          name,
          (response) => successCallback(response), // <- Éxito
          (error) => errorCallback(error) // <- Error
        );
      } catch (e) {
        errorCallback(e.message);
      }
    };

    //Método para actualizar el plano 
// Modifica saveBlueprint para enviar solo los puntos
    const saveBlueprint = async (putTable) => {
      if (author && currentBlueprint) {
          const func = (response) => {
              if (response) {
                  currentBlueprint = response;
                  alert("Update successfully");
                  getBlueprint(putTable); // ← Recarga la lista
              } else {
                  alert("Cannot update");
              }
          };
          // Envía solo los puntos, no todo el blueprint
          await api.updateBlueprint(
            author,
            currentBlueprint.name, 
            {
              author: author,
              name: currentBlueprint.name,
              points: currentBlueprint.points
            }, 
            func
          );
        }
    };

    //Método para crear un plano 
    const createBlueprint = async (putTable) => { 
      if (author && currentBlueprint) {
        const func = (response) => {
          if (response) {
            currentBlueprint = response;
            alert("¡Creado correctamente!");
            getBlueprint(putTable);
          }
        };
        await api.createBlueprint(currentBlueprint, func);
      }
    };
    //Método para borrar un plano 
    const deleteBlueprint = async (setBP, putTable) => {
      if (author && currentBlueprint) {
        const func = (response) => {
          if (response) {
            currentBlueprint = null;
            setBP(null);
            alert("¡Borrado correctamente!");
            getBlueprint(putTable); // ← Recarga la lista
          }
        };
        await api.deleteBlueprint(author, currentBlueprint.name, func);
      }
    };
    
    const getCurrentBlueprint = () => {
      return currentBlueprint;
    }
    const addPointsToBP = (points) => {
      if(currentBlueprint){
        currentBlueprint.points = points;
      }
    }
    const setCurrentBlueprint = (newBP) => {
      currentBlueprint = newBP;
    }

    return { getBlueprint, getBlueprintAuthorAndName, saveBlueprint, getCurrentBlueprint, addPointsToBP, setAuthor, setCurrentBlueprint, createBlueprint, deleteBlueprint };
})();

export default blueprint;
