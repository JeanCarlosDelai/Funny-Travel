import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError, UnauthenticatedError } from '../errors';
import Travel from '../models/Travel';

interface CustomRequest extends Request {
  user: {
    userId: string;
  };
}

const getAllTravelsAllPeoples = async (req: CustomRequest, res: Response) => {
  const { search, sort } = req.query;

  const queryObject: any = {};

  if (search) {
    queryObject.travelName = {
      [Op.like]: `%${search}%`,
    };
  }
  const queryOptions: any = {};

  if (sort === 'latest') {
    queryOptions.order = [['createdAt', 'DESC']];
  }
  if (sort === 'oldest') {
    queryOptions.order = [['createdAt', 'ASC']];
  }
  if (sort === 'a-z') {
    queryOptions.order = [['travelName', 'ASC']];
  }
  if (sort === 'z-a') {
    queryOptions.order = [['travelName', 'DESC']];
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  queryOptions.limit = limit;
  queryOptions.offset = offset;

  const { rows: travels, count: totalTravels } = await Travel.findAndCountAll({
    where: queryObject,
    ...queryOptions,
  });

  const numOfPages = Math.ceil(totalTravels / limit);

  res.status(StatusCodes.OK).json({ travels, totalTravels, numOfPages });
};


const getAllTravels = async (req: CustomRequest, res: Response) => {
  const { search, sort } = req.query;

  const queryObject: any = {};

  if (req.user && req.user.userId) {
    queryObject.createdBy = req.user.userId;
  } else {
    throw new UnauthenticatedError('Usuário não autenticado');
  }

  if (search) {
    queryObject.travelName = {
      [Op.like]: `%${search}%`,
    };
  }

  const queryOptions: any = {};

  if (sort === 'latest') {
    queryOptions.order = [['createdAt', 'DESC']];
  }
  if (sort === 'oldest') {
    queryOptions.order = [['createdAt', 'ASC']];
  }
  if (sort === 'a-z') {
    queryOptions.order = [['travelName', 'ASC']];
  }
  if (sort === 'z-a') {
    queryOptions.order = [['travelName', 'DESC']];
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  queryOptions.limit = limit;
  queryOptions.offset = offset;

  const { rows: travels, count: totalTravels } = await Travel.findAndCountAll({
    where: queryObject,
    ...queryOptions,
  });

  const numOfPages = Math.ceil(totalTravels / limit);

  res.status(StatusCodes.OK).json({ travels, totalTravels, numOfPages });
};

const getTravel = async (req: CustomRequest, res: Response) => {
  const {
    user: { userId },
    params: { id: travelId },
  } = req;

  const travel = await Travel.findOne({
    where: {
      id: travelId,
      createdBy: userId,
    },
  });

  if (!travel) {
    throw new NotFoundError(`Sem viagens com o ID: ${travelId}`);
  }

  res.status(StatusCodes.OK).json({ travel });
};

const createTravel = async (req: CustomRequest, res: Response) => {
  console.log(req.body);

  req.body.createdBy = req.user.userId;

  if (typeof req.body.price !== 'number') {
    throw new BadRequestError(`Por favor, digite um preço válido`);
  }

  const travel = await Travel.create(req.body);

  res.status(StatusCodes.CREATED).json({ travel });
};

const updateTravel = async (req: CustomRequest, res: Response) => {
  const {
    body: { travelName, location },
    user: { userId },
    params: { id: travelId },
  } = req;

  if (travelName === '' || location === '') {
    throw new BadRequestError('Nome da viagem e localização estão em branco');
  }

  const travel = await Travel.update(req.body, {
    where: {
      id: travelId,
      createdBy: userId,
    },
    returning: true,
  });

  if (travel[0]) {
    throw new NotFoundError(`Sem viagens com o IDdd: ${travelId}`);
  }

  res.status(StatusCodes.OK).json({ travel: travel[1][0] });
};

const deleteTravel = async (req: CustomRequest, res: Response) => {
  const {
    user: { userId },
    params: { id: travelId },
  } = req;

  const travel = await Travel.destroy({
    where: {
      id: travelId,
      createdBy: userId,
    },
  });

  if (!travel) {
    throw new NotFoundError(`Sem viagens com o ID: ${travelId}`);
  }

  res.status(StatusCodes.OK).send();
};

export {
  createTravel,
  deleteTravel,
  getAllTravels,
  updateTravel,
  getTravel,
  getAllTravelsAllPeoples
};
