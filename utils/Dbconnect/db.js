import mongoose from "mongoose";
const mongo_url=process.env.MONGO_URL;
if(!mongo_url){
    throw new Error('mongodb is not connected')
}

let cached =global.mongoose;
if(!cached) cached=global.mongoose={conn:null,promise:null};
async function dbConnect(){
    if(cached.conn) return cached.conn;
    if(!cached.promise) cached.promise=mongoose.connect(mongo_url).then((mongoose)=>mongoose);
    cached.conn=await cached.promise;
    return cached.conn
}

export default dbConnect











