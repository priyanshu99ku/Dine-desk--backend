require('dotenv').config();
const mongoose=require('mongoose')

const connectDB = async () => {
    
        await mongoose.connect(process.env.MONGO_URI);

}
connectDB()
.then(() => {
    console.log("Database connected successfully");
})
.catch((err) =>{
    console.error("Database connection failed:", err);
    process.exit(1);
})