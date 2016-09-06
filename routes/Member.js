import express from 'express';
import fetch from 'isomorphic-fetch';
import session from 'express-session';
const router = express.Router();

router.get('/', (req, res, next) => res.render('Member/Member'));

export default router;
