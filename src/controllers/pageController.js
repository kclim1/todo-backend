exports.getDashboard = (req,res)=>{
    try{
        console.log('this is a placeholder')
        res.status(200).json({message:"this is the placeholder for dashboard page"})
    }catch(error){
        res.status(401).json({message:"Invalid or expired token."})
    }
}