import express from 'express'
// import testUser from '../middleware/testUser'

import { authenticateUser, checkAdminRole } from '../middleware/authentication'
const router: any = express.Router();
// import uploadProductImage from '../controllers/uploadsController'
import {
  createTravel,
  deleteTravel,
  getAllTravels,
  updateTravel,
  getTravel,
  getAllTravelsAllPeoples
} from '../controllers/travels'

router.post('/', authenticateUser, checkAdminRole, createTravel);
router.get('/', authenticateUser, checkAdminRole, getAllTravels);
router.get('/all', authenticateUser, getAllTravelsAllPeoples);

router.get('/:id', authenticateUser, checkAdminRole, getTravel);
router.delete('/:id', authenticateUser, checkAdminRole, deleteTravel);
router.patch('/:id', authenticateUser, checkAdminRole, updateTravel);

export default router;
