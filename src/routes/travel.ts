import express from 'express'
import authenticateUser from '../middleware/authentication'
import checkAdminRole from '../middleware/checkAdminRole'
const router: any = express.Router();
import {
  createTravel,
  deleteTravel,
  getAllTravels,
  updateTravel,
  getTravel,
  getAllTravelsAllPeoples, uploadProductImage
} from '../controllers/travels'

router.post('/', authenticateUser, checkAdminRole, createTravel);
router.get('/', authenticateUser, checkAdminRole, getAllTravels);
router.get('/all', authenticateUser, getAllTravelsAllPeoples);

router.get('/:id', authenticateUser, checkAdminRole, getTravel);
router.delete('/:id', authenticateUser, checkAdminRole, deleteTravel);
router.patch('/:id', authenticateUser, checkAdminRole, updateTravel);

router.post('/uploads', uploadProductImage);

export default router;
