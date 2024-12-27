import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next)=> {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            message: 'Authorization token missing or invalid',
            success: false,
        });
    }
    
    const token = authHeader.split(' ')[1];

    try {
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