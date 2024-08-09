import express from 'express';
import { ensureAuthenticated } from '../Middlewares/Auth.js';
import { AddMiniAdmin, EditMiniAdmin, GetMiniAdmins } from '../Controllers/MiniAdminController.js';

const router = express.Router();

router.post('/addMiniAdmin', ensureAuthenticated, AddMiniAdmin);
router.put('/editMiniAdmin/:id', ensureAuthenticated, EditMiniAdmin);
router.get('/getMiniAdmins', ensureAuthenticated, GetMiniAdmins);

export { router as MiniAdminRouter };