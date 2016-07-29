import express from 'express';
import fetch from 'isomorphic-fetch';
import session from 'express-session';

const router = express.Router();

//活动列表
router.get('/:film_id', (req, res, next) => {
 // console.log(req.params.film_id);
	res.render('Video_details/Video_details');
});




export default router;
