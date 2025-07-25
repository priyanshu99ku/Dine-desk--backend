const AdminAuth=(req,res,next) =>{
    const token='xyz';
    const isAdminAuthorized = token ==='xyz';
    if(!isAdminAuthorized){
        res.status(401).send('unauthorized');
    }
    else{
        next();
    }
};
const UserAuth=(req,res) => {
    const token ='xyz'
    const isUserAuthorized =token ==='xyz';
    if(!isUserAuthorized){
        res.status(401).send('unauthorized')
    }
    else{
        next();
    }
}

module.exports ={
    AdminAuth,
    UserAuth

}