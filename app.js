import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import Express from 'express';
import exphbs from 'express-handlebars';
import morgan from 'morgan';
import path from 'path';
import session from 'express-session';

import routes from './routes';

const { NODE_ENV } = process.env;
const isDevelopment = NODE_ENV === 'development';

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
app.use(morgan(isDevelopment ? 'dev' : 'combined'));

// 静态文件配置
if (isDevelopment) {
  app.use('/assets', Express.static('./build'));
}

// 模版设置
const hbs = exphbs.create({
  extname: '.hbs',
  // Specify helpers which are only registered on this instance.
  helpers: {
    CDN: () => (isDevelopment ? '/assets' : '//cdn.example.com'),
  },
});
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

// 路由设置
app.use('/', routes);

export default app;
