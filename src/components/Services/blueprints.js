import apiclient from './apiclient.js';
import apimock from './apimock.js';

const blueprint = (() => {
    let author = "";
    let blueprintsList = [];
    let api = apimock;
    

    //Método para obtener la lista de blueprints 
    const getBlueprint = (selectedAuthor,putTable) => {
        if(selectedAuthor){
            const func = (response) => {
                if(response){
                    author = selectedAuthor;
                    fetchBlueprints(response,putTable);
                }else{
                  alert("Author not found");
                }
            }
            const response = api.getBlueprintsByAuthor(selectedAuthor, func);
        }
      } 

    // Método para obtener los planos del autor y ponerlos en la tabla
    const fetchBlueprints = async (blueprints, table) => {
        blueprintsList = blueprints.map(bp => ({
            name: bp.name,
            points: bp.points.length
        }));
        const totalPoints = blueprints.reduce((acc, bp) => acc + bp.points.length, 0);
        table(blueprintsList, totalPoints, author);
    };
    //Método para obtener el blueprint basado en el autor y el nombre
    const getBlueprintAuthorAndName = (name,setBP) => {
        if(author){
            const func = (response) => {
                if(response){
                  setBP(response);
                }else{
                  alert("Author not found");
                }
            }
            const response = api.getBlueprintsByNameAndAuthor(author, name,func);
        }
      }

    return { getBlueprint, getBlueprintAuthorAndName };
})();

export default blueprint;
