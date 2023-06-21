
import { Request, Response, NextFunction } from 'express';
import { UnauthenticatedError } from '../errors';

interface CustomRequest extends Request {
    user: {
        role: string;
    };
}


const checkAdminRole = (req: CustomRequest, res: Response, next: NextFunction) => {
    if (req.user.role === 'admin') {
        next();
    } else {
        throw new UnauthenticatedError('Acesso negado. Somente o Admin pode efetuar essas ações!');
    }
};


export default checkAdminRole 