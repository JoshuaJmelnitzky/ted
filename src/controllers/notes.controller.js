import Note from "../models/Note.js";
import Actividades from "../models/Actividades.js"

export const renderNoteForm = (req, res) =>{
  let user = req.user.name;

  res.render("notes/new-note",{user});
} 
// res.render("notes/new-note");

export const createNewNote = async (req, res) => {
  const { title,tipo,modulo,enunciado,solucion,parametros,ayuda } = req.body;
  const errors = [];
  if (!title) {
    errors.push({ text: "Please Write a Title." });
  }
  if(!solucion){
    errors.push({ text: "Please" });
  }
  if(!modulo){
    errors.push({ text: "Please" });
  }
  if (!enunciado) {
    errors.push({ text: "Please Write a Description" });
  }
  if(!parametros){
    errors.push({ text: "Please" });
  }
  if (errors.length > 0)
    return res.render("notes/new-note", {
      errors,
      title,
      tipo,
      modulo,
      enunciado,
      solucion,
      parametros,
      ayuda,
    });

  const newNote = new Actividades({ title,tipo,modulo,enunciado,solucion,parametros,ayuda });
  newNote.user = req.user.id;
  await newNote.save();
  // req.flash("success_msg", "Note Added Successfully");
  res.redirect("/notes");
};

export const renderNotes = async (req, res) => {
  const actividades = await Actividades.find({ user: req.user.id })
    .sort({ date: "desc" })
    .lean();
  res.render("notes/all-notes", { actividades });
};

export const renderEditForm = async (req, res) => {
  const note = await Actividades.findById(req.params.id).lean();
  if (note.user != req.user.id) {
    // req.flash("error_msg", "Not Authorized");
    return res.redirect("/notes");
  }
  res.render("notes/edit-note", { note });
};

export const updateNote = async (req, res) => {
  const { title, description } = req.body;
  await Actividades.findByIdAndUpdate(req.params.id, { title, description });
  // req.flash("success_msg", "Note Updated Successfully");
  res.redirect("/notes");
};

export const deleteNote = async (req, res) => {
  await Actividades.findByIdAndDelete(req.params.id);
  // req.flash("success_msg", "Note Deleted Successfully");
  res.redirect("/notes");
};
