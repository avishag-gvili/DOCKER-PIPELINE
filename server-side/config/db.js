
import  mongoose from 'mongoose';
<<<<<<< HEAD
=======

>>>>>>> mongoDB-team
export  const connecMongo=()=>{
mongoose.connect(process.env.DB_URL)
.then(()=>console.log('mongo db connected'))
.catch(err=>console.log(err.message));
}
