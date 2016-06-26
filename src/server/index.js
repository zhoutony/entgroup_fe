/* eslint no-console: "off", global-require: "off" */
import _ from 'lodash';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import Express from 'express';
import morgan from 'morgan';
import path from 'path';
import session from 'express-session';

import page from './middlewares/page';

// 启动服务器的入口
export default (universalTools) => {
  const { PORT = 3000 } = process.env;

  // 实例化服务器
  const app = new Express();

  // body设置
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  // cookie设置
  app.use(cookieParser());

  // 会话设置
  app.use(session({ secret: 'entgroup', resave: true, saveUninitialized: true }));

  // 日志设置
  app.use(morgan(__DEVELOPMENT__ ? 'dev' : 'combined'));

  // 静态文件配置
  app.use('/assets', Express.static(path.resolve(__dirname, '../../build/assets')));

  // 页面渲染的中间件, 传入了获取静态资源的方法
  app.use('/', page(universalTools.chunks));

  // 启动服务器
  app.listen(PORT, (err) => {
    if (err) {
      console.error(err);
    }

    console.info(`Listening on port ${PORT}.`);
  });
};
