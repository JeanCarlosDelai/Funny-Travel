import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnauthenticatedError } from '../errors';
import User from '../models/User';

const register = async (req: Request, res: Response) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
      role: user.role,
      token,
    },
  });
}

const login = async (req: Request, res: Response) => {

  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Por favor forneça email e senha');
  }

  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new UnauthenticatedError('Credencias inválidas');
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Credencias inválidas');
  }

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
      role: user.role,
      token,
    },
  });
}


const updateUser = async (req: any, res: Response) => {

  const { email, name, lastName, location } = req.body;
  if (!email || !name || !lastName || !location) {
    throw new BadRequestError('Por favor forneça as credenciais');
  }

  const user = await User.findByPk(req.user.userId);

  if (!user) {
    throw new BadRequestError('User not found');
  }

  user.email = email;
  user.name = name;
  user.lastName = lastName;
  user.location = location;

  await user.save();

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
      role: user.role,
      token,
    },
  });
}

export { register, login, updateUser };

