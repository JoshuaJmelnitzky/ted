import mongoose from "mongoose";

const ActividadSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    enunciado: {
      type: String,
      require: true,
    },
    modulo:{
    type:String,
    require:true,
    },
    tipo:{
      type:String,
      require:false,
    },
    solucion:{
      type:String,
      require:true,
    },
    parametros:{
      type:String,
      require:true,
    },
    color:{
      type: String, 
      default: "grey"
    },
    ayuda:{
      type:String,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Actividades", ActividadSchema);
