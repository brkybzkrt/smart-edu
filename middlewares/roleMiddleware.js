module.exports=(roles)=>{
    return (req,res,next)=>{
        if(roles.includes(req.body.role)){
            next()
        }else{
            return res.status(401).send('Access Denied');
        }

    }
}