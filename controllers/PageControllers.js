const vistaRegistro = (req,res)=>{
res.render('register', {alert:false})
}

const vistaPrincipal = (req,res)=>{
    res.render('pacientes', {alert:false})
    }

module.exports ={
    vistaRegistro,
    vistaPrincipal
}