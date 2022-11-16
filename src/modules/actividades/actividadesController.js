import { ActivitiesService } from './actividadesService.js';
import { UserService } from '../usuario/usuarioService.js'

const activitiesService = new ActivitiesService();
const userService =  new UserService();


export const getActividades = async (req , res) => {
    let user = req.user.name; 
 
    const actividad = await activitiesService.getActividades();
    const usuarios = await userService.findUser(req.user.email);

    let usuarioID = usuarios.actividades.map((act, index) => Object.assign({}, act, {id: index + 1}));
    let actividadID = actividad.map((act, index) => Object.assign({}, act, {id: index + 1}));

    
    for(let act of actividadID){
        for (let usu of usuarioID){
            if (act.id == usu.id) {
                if(usu.estadoRespuesta == 1){
                    act.color = "green";
                }
                else if(usu.estadoRespuesta == 2){
                    act.color = "darkorange";
                }else{
                    act.color = "red";
                };
            }
        }
    }
    for (let act of actividadID){
        if(act.color == undefined){act.color = "grey"}
    }


    const modulo1 = actividadID.filter(e => e.modulo === '1');
    let modulo1Id = modulo1.map((act, index) => Object.assign({}, act, {id: index + 1}));
    
    const modulo2 = actividadID.filter(e => e.modulo === "2");
    let modulo2Id = modulo2.map((act, index) => Object.assign({}, act, {id: index + 1}));

    const modulo3 = actividadID.filter(e => e.modulo === "3");
    let modulo3Id = modulo3.map((act, index) => Object.assign({}, act, {id: index + 1}));
    
    res.render('actividades', {modulo1Id, modulo2Id, modulo3Id, user, actividadID});
}

