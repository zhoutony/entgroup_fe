import express from 'express';

import home from './home';
import book from './book';
import active from './active';

const router = express.Router();

router.use('/', home);
router.use('/book', book);
router.use('/active', active);

export default router;
