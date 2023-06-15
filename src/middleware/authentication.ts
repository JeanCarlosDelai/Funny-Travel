
import { Request, Response, NextFunction } from 'express';
import { UnauthenticatedError } from '../errors';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

interface CustomRequest extends Request {
  user: {
    userId: string;
    role: string;
  };
}

const authenticateUser: any = async (req: CustomRequest, res: Response, next: NextFunction) => {
  // check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('Autenticação Inválida');
  }
  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as Secret) as JwtPayload & { userId: string, role: string };
    // attach the user to the job routes

    req.user = { userId: payload.userId, role: payload.role };
    next();
  } catch (error) {
    throw new UnauthenticatedError('Autenticação Inválida');
  }
};

const checkAdminRole = (req: CustomRequest, res: Response, next: NextFunction) => {
  // Verifica se o usuário tem a role de "admin"
  if (req.user.role === 'admin') {
    next(); // Permite o acesso à próxima função de middleware ou rota
  } else {
    throw new UnauthenticatedError('Acesso negado. Somente o Admin pode efetuar essas ações!');
  }
};

export { authenticateUser, checkAdminRole, CustomRequest };