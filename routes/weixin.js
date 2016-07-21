import express from 'express';
import fetch from 'isomorphic-fetch';
import session from 'express-session';

const router = express.Router();

//router.get('/', (req, res, next) => res.render('home'));
router.get('/', (req, res, next) => {

// 	 req.session.user = 'lastPage';//写入至session
// 	 req.session.user = null;
// 	var user_id=req.session.user;
// console.log(user_id);
//   if(user_id==null||user_id==undefined){
//       res.render('login', { title: '用户登陆'});
//        return;
//    }
   //console.log(user_id);
  fetch(`https://api.douban.com/v2/book/isbn/9787508654294`)

    .then(response => response.json())

    .then(zzz =>{
    	console.log(zzz)

    	console.log(1111)
     	res.render('weixin', { zzz })
 	})
    //console.log(book)
    .catch(next);
});
router.get('/weixin', (req, res, next) => {

// 	 req.session.user = 'lastPage';//写入至session
// 	 req.session.user = null;
// 	var user_id=req.session.user;
// console.log(user_id);
//   if(user_id==null||user_id==undefined){
//       res.render('login', { title: '用户登陆'});
//        return;
//    }
   //console.log(user_id);
  fetch(`https://api.douban.com/v2/book/isbn/9787508654294`)

    .then(response => response.json())

    .then(zzz =>{
    	console.log(zzz)

    	console.log(1111)
     	res.render('weixin', { zzz })
 	})
    //console.log(book)
    .catch(next);
});

export default router;
