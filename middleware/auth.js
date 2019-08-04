import jwt from 'jsonwebtoken';
import User from '../models/User';
import { decode } from 'punycode';

const auth = async (req, res, next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'hellogithub');
        const user = await User.findOne({_id : decoded._id, 'tokens.token' : token});
        
        if(!user){
            throw new Error();
        }

        req.user = user;
        next();
        
    }catch(e){
        res.status(401).send({error : "Wrong Auhtorization Code"});
    }
}
export default auth;