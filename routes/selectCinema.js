import express from 'express';
import fetch from 'isomorphic-fetch';
import session from 'express-session';
const router = express.Router();


//选择影城
router.get('/', (req, res, next) => res.render('selectCinema/selectCinema'));

export default router;
