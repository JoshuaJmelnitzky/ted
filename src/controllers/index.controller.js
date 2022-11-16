export const renderIndex = (req, res) => {
  if(!user) res.render("index");
  let user = req.user.name;
  res.render("index", {user});
};

export const renderAbout = (req, res) => {
  res.render("about");
};

// export const nada = (req,res)=>{
//   res.render("nada");
// }


export const perfil = (req,res)=>{
  let {name,email,apellido,fechaN} = req.user;
  let user = req.user.name;

  let fechaf= fechaN.toLocaleDateString()
  // console.log(fechaf);
  // let email= req.user.email
  res.render("perfil",{user,name,email,apellido,fechaf});
}

export const playground = (req,res)=>{
  let user = req.user.name; 
  res.render("playground",{user});
}