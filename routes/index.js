import express from 'express';

import home from './home';
import plan from './plan';
import book from './book';
import active from './active';
import weixin from './weixin';
import user from './user';
import filmnews from './filmnews';
import pay from './pay';
import cinema from './cinema';
import Video_details from './Video_details';
import sign from './check_sign';
import setdata from '../middlewares/setdata';
import Member from './Member';
import selectCinema from './selectCinema';
const router = express.Router();

global.api_url = 'http://10.10.11.15:8086/mobileApi/';


router.use('/',setdata,home);
router.use('/plan', plan);
router.use('/book', book);
router.use('/active', active);
router.use('/user', user);
router.use('/filmnews', filmnews);
router.use('/weixin',weixin);
router.use('/pay',pay);
router.use('/cinema',cinema);
router.use('/Video_details',Video_details);
router.use('/sign',sign);
router.use('/Member',Member);
router.use('/selectCinema',selectCinema);

export default router;





