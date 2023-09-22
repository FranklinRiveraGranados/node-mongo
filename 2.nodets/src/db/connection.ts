import mongoose from "mongoose";


const connect2 = async (): Promise<boolean> => {
    try{
        await mongoose.connect(process.env.MONGO_URI!)
    
        return true
    }catch(e){
        console.error(e)

        return false
    }
}

export default connect2