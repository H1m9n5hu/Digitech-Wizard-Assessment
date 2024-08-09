import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const ensureAuthenticated = (req, res, next) => {
    const auth = req.headers['authorization'];
    if(!auth){
        return res.status(403).json({message: 'Unauthorized, JWT token is not authorized'});
    }
    try {
        const decoded = jwt.verify(auth, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({message: 'Unauthorized, JWT token is not wrong or exprired.'});
    }
}

export { ensureAuthenticated };