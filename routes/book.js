import express from 'express';
import fetch from 'isomorphic-fetch';

const router = express.Router();

router.get('/:isbn', (req, res, next) => {
  fetch(`https://api.douban.com/v2/book/isbn/${req.params.isbn}`)
    .then(response => response.json())
    .then(book => res.render('book', { book }))
    .catch(next);
});

export default router;
