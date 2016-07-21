import express from 'express';

import home from './home';
import book from './book';
import active from './active';
import weixin from './weixin';
import user from './user';
import filmnews from './filmnews';

const router = express.Router();

router.use('/', home);
router.use('/book', book);
router.use('/active', active);
router.use('/user', user);
router.use('/filmnews', filmnews);
router.use('/weixin',weixin);

export default router;





