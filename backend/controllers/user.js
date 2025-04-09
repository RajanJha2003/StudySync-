

const signup=async(req,res)=>{
   try {
    const { firstName, lastName, email, password, confirmPassword,
        accountType, contactNumber, otp } = req.body;
        if (!firstName || !lastName || !email || !password || !confirmPassword || !accountType || !otp) {
            return res.status(401).json({
                success: false,
                message: 'All fields are required..!'
            });
        }

        if(password!=confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password and confirm password did not match , please try again"
            })
        }

        
   } catch (error) {
    
   }
    
}


export {signup};