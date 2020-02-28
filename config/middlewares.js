module.exports = isUser =(req, res, nex)=>{
    if(req.isAuthenticated()){
        return next()
    }else{
        req.flash('error', 'sorry you have to login first')
        res.redirect('/')
    }
}