import express from 'express';

const router = express.Router();

router.get('/', (req, res, next) => res.render('film/film'));
// router.use('/', function(req,res,next){
//   console.log(req.originalUrl);
// });

export default router;
