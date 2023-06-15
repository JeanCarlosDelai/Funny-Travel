
import { StatusCodes } from 'http-status-codes'
import { Request, Response, NextFunction } from 'express'

interface CustomError {
  statusCode?: number;
  name?: string;
  message?: string;
  errors?: { message: string }[];
  code?: number;
  keyValue?: any;
  value?: any;
}

const errorHandlerMiddleware = (err: CustomError, req: Request, res: Response, next: NextFunction) => {

  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Algo está errado tente novamente',
  }

  if (err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors || [])
      .map((item) => item.message)
      .join(',')
    customError.statusCode = 400
  }
  if (err.code && err.code === 11000) {
    customError.msg = `Valores duplicados para ${Object.keys(
      err.keyValue
    )} campo, por favor escolha outro valor`
    customError.statusCode = 400
  }
  if (err.name === 'CastError') {
    customError.msg = `Sem items com o ID: ${err.value}`
    customError.statusCode = 404
  }

  return res.status(customError.statusCode).json({ msg: customError.msg })
}

export default errorHandlerMiddleware
