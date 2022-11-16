import { ActivitiesDaoMongoDb } from './playgroundPersistence.js';

export class PlaygroundService{
    constructor(){
        this.dao = new ActivitiesDaoMongoDb();
    }
    async getActividad(id){
        return await this.dao.getById(id);       
    }

    async evaluarSolucion(evaluar, respuesta, parametros) {
        const split = parametros.split(',');
        let parse = [];
        for(let num of split){
            parse.push(parseInt(num));
        }

        let solution = evaluar.solution;
        
        try{
            let result = Function("return " + solution)()

            if (typeof result(parse[0], parse[1]) === "string"){
                return result(parametros) == respuesta? true: false;
              
            }else{
                return result(parse[0], parse[1], parse[2], parse[3]) == respuesta? true: false;
            }
            
        }catch(e){
            return "Sintaxis incorrecta: " + e
        }
    }
}

