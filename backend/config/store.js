import MongoStore from "connect-mongo";

const createSessionStore = () => {
    try {
        const store = MongoStore.create({
            mongoUrl:process.env.MONGODB_URI,
            crypto:{
                secret:process.env.SESSION_SECRET
            },
            touchAfter:24*60*60,
        })
        return store;
    } catch (error) {
        console.log("Mongo session store error",error);
        throw error;
    }
}

export default createSessionStore;