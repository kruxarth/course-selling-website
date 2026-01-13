import jwt from "jsonwebtoken";

const JWT_ADMIN_PASSWORD = process.env.JWT_ADMIN_PASSWORD


function adminMiddleware(req, res, next){
    try {
        const token = req.headers.token;
        const decoded = jwt.verify(token, JWT_ADMIN_PASSWORD);

        if(decoded){
            req.adminId = decoded.id;
            next();
        }else{
            return res.status(403).json({message: "You are not logged in"})
        }
    } catch(error){
        return res.status(403).json({message: "You are not logged in"})
    }
}

export {
    adminMiddleware
}




