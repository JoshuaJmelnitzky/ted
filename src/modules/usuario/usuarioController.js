import { UserService } from '../usuario/usuarioService.js'

const userService = new UserService();

export const usuario  = async(req, res) => {
    let user = req.user.name;
    let usuarios = await userService.getListUsers() 
    let usuarioID = usuarios.map((act, index) => Object.assign({}, act, {id: index + 1}));
    
    for (let index = 0; index < usuarioID.length; index++) {
        const element =usuarioID[index];
        if(element.actividades.length > 0){
            for(let i  of element.actividades){
                if(i.estadoRespuesta == 1)
                element.puntaje+=100         
                // console.log(i.estadoRespuesta);                
            }
        }    // console.log(element.puntaje);
    }
    console.log(usuarioID.sort(function(a,b){
        return b.puntaje -a.puntaje
    }));
    let ranking = usuarioID.map((act, index) => Object.assign({}, act, {id: index + 1}));
    // console.log(usuarios);

    const PrimerPuesto= ranking[0];
    const SegundoPuesto= ranking[1];
    const TercerPuesto= ranking[2];

    res.render('ranking', {ranking,user,PrimerPuesto,SegundoPuesto,TercerPuesto});
};


