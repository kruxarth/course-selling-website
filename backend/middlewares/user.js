import jwt from "jsonwebtoken";

function userMiddleware(req, res, next){
    try {
        const token = req.headers.token;
        const decoded = jwt.verify(token, process.env.JWT_USER_PASSWORD);

        if(decoded){
            req.userId = decoded.id;
            next(); 
        }else{
            return res.status(403).json({message: "You are not signed in"});
        }
    } catch(error){
        console.log("JWT Error:", error.message);
        return res.status(403).json({message: "You are not signed in"});
    }
}

export {
    userMiddleware
}







