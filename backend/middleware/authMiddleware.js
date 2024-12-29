import jwt from 'jsonwebtoken';
import { blacklist } from '../controllers/user.Controllers.js';

const authMiddleware = (req, res, next)=> {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            message: 'Authorization token missing or invalid',
            success: false,
        });
    }
    
    const token = authHeader.split(' ')[1];

    console.log("token coming from frontend", token);

    try {
        if(!token || blacklist.has(token)){
            return res.status(400).json({
                message: "Token is expired or not valid",
                success: false
            })
        };

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if(decodedToken) {
            req.userId = decodedToken.userId;
            next();
        }
        else {
            return res.status(403).json({
                message: 'Token is expired',
                success: false,
            })
        }

    } catch (error) {
        return res.status(403).json({
            message: 'Token is invalid',
            success: false,
        })
    }

}
export { authMiddleware };