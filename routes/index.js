import express from 'express';

import home from './home';
import book from './book';
import active from './active';
import weixin from './weixin';
import user from './user';
import filmnews from './filmnews';

import setdata from '../middlewares/setdata';

const router = express.Router();

global.api_url = 'http://10.10.16.173/test/';


router.use('/', setdata, home);
router.use('/book', book);
router.use('/active', setdata, active);
router.use('/user', user);
router.use('/filmnews', filmnews);
router.use('/weixin',weixin);

export default router;





