import express from 'express';

import home from './home';
import book from './book';

const router = express.Router();

router.use('/', home);
router.use('/book', book);

export default router;
