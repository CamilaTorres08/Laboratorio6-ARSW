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
    const getBlueprintAuthorAndName = async (name,setBP) => {
        if(author){
            const func = (response) => {
                if(response){
                  currentBlueprint=response;
                  setBP(response);
                }else{
                  currentBlueprint=null;
                  setBP(null);
                  alert("Author not found");
                }
            }
            await api.getBlueprintsByNameAndAuthor(author,name,func);
        }
      }

    //Método para actualizar el plano 
    const saveBlueprint = async () => {
      if(author){
          const func = (response) => {
              if(response){
                currentBlueprint = response;
                alert("Update successfully");
              }else{
                currentBlueprint=null;
                alert("Cannot update");
              }
          }
          if(currentBlueprint){
            await api.updateBlueprint(author, currentBlueprint.name, currentBlueprint, func);
          }
      }
    }

    //Método para crear un plano 
    const createBlueprint = async () => {
      if(author){
          const func = (response) => {
              if(response){
                currentBlueprint = response;
                alert("Blueprint Created successfully");
              }else{
                currentBlueprint = null;
                alert("Cannot create");
              }
          }
          if(currentBlueprint){
            await api.createBlueprint(currentBlueprint, func);
          }
      }
    }
    //Método para borrar un plano 
    const deleteBlueprint = async (setBP) => {
      if(author){
          const func = (response) => {
              if(response){
                currentBlueprint = null;
                setBP(null);
                alert("Blueprint delete successfully");
              }else{
                alert("Cannot delete");
              }
          }
          if(currentBlueprint){
            await api.deleteBlueprint(author,currentBlueprint.name, func);
          }
      }
    }
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
