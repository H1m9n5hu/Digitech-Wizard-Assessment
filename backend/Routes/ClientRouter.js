import express from 'express';
import { ensureAuthenticated } from '../Middlewares/Auth.js';
import { AddClient, EditClient, GetClients, WithdrawExpo } from '../Controllers/ClientController.js';

const router = express.Router();

router.post('/addClient', ensureAuthenticated, AddClient);
router.put('/editClient/:id', ensureAuthenticated, EditClient);
router.get('/getClients', ensureAuthenticated, GetClients);
router.put('/withdrawExpo/:id', ensureAuthenticated, WithdrawExpo);

export { router as ClientRouter };