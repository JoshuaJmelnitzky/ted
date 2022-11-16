import { PlaygroundService } from './playgroundService.js';
import { ActivitiesService } from '../actividades/actividadesService.js'
import { UserService } from '../usuario/usuarioService.js'
import { ObjectId } from 'mongodb';

const playgroundService = new PlaygroundService();
const activitiesService = new ActivitiesService();
const userService = new UserService();

export const playground  = async (req, res) => {
    const user = req.user.name;
    let idActividad = req.params.id;

    const actividad = await playgroundService.getActividad(idActividad);
    const getActividades = await activitiesService.getActividades();
    let getActividadesConId = getActividades.map((act, index) => Object.assign({}, act, {id: index + 1}));

    const { title, enunciado } = actividad;

    res.render('playground', {title, enunciado, idActividad, getActividadesConId, user});
};


export const saveSolution = async (req, res) => {
    const user = req.user.name;
    let idActividad = req.params.id;

    const actividad = await playgroundService.getActividad(idActividad);

    const usuarioFinded = await userService.findUser(req.user.email);

    const getActividades = await activitiesService.getActividades();

    let getActividadesConId = getActividades.map((act, index) => Object.assign({}, act, {id: index + 1}));

    let  index = getActividades.map(function(e) { return ObjectId(e._id).valueOf(); }).indexOf(ObjectId(actividad._id).valueOf());

    const actividadIndex = getActividades[index];

    const { parametros, title, enunciado, solucion } = actividad;

    const feedback = await playgroundService.evaluarSolucion(req.body, solucion, parametros);
    let feedbackOk;
    let feedbackFail;
    let feedbackError;
    let solution = req.body.solution;

    let feedbackFailNumber;
    let feedbackOkNumber;
    let feedbackErrorNumber;

    let actividadColor;

    switch(feedback){
        case(true): 
            actividadColor = {...actividadIndex, color: 'green'};
            getActividades[index] = actividadColor;
            feedbackOk = 'Felicitaciones! La respuesta ha pasado todas las pruebas ✅';
            feedbackOkNumber = 1;
            break;
        
        case(false): 
            actividadColor = {...actividadIndex, color: 'darkorange'};
            getActividades[index] = actividadColor;
            feedbackFail = 'La respuesta no ha pasado todas las pruebas 💪';
            feedbackFailNumber = 2;
            break;

        default:
            actividadColor = {...actividadIndex, color: 'red'};
            getActividades[index] = actividadColor;
            feedbackErrorNumber = -1
            feedbackError = feedback;
    }

    let estadoRespuesta  =  feedbackOkNumber || feedbackFailNumber || feedbackErrorNumber;

    
    usuarioFinded.actividades.push({getActividades, solution, estadoRespuesta});
    

    await userService.updateById(req.user.email, usuarioFinded);
    

    res.render('playground', {feedbackOk, feedbackFail, feedbackError, solution, title, enunciado, idActividad, getActividadesConId, user })
};


