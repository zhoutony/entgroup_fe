import express from 'express';

import home from './home';
import book from './book';
import active from './active';
import weixin from './weixin';
import user from './user';
import filmnews from './filmnews';
import pay from './pay';
import cinema from './cinema';
import Video_details from './Video_details';

import setdata from '../middlewares/setdata';

const router = express.Router();

global.api_url = 'http://10.10.12.3/test/';


router.use('/', setdata, home);
router.use('/book', book);
router.use('/active', active);
router.use('/user', user);
router.use('/filmnews', filmnews);
router.use('/weixin',weixin);
router.use('/pay',pay);
router.use('/cinema',cinema);
router.use('/Video_details',Video_details);

export default router;





