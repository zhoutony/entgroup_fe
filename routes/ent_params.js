import crypto from 'crypto';
/**
 * ent_params() 处理请求mobileApi参数
 *
 * @param  get_params {object} 请求mobileApi参数
 * @param  username  {string}  影城用户名
 * @return {string}
 */
var ent_params = function (get_params,username) {

  var cinema_key = 'ASDFASDF_'+username+'_123456_';
  //对象转换成字符串
  var jsonparameter = JSON.stringify(get_params);
	var text = cinema_key+jsonparameter;
  //使用node cryto进行md5加密
	var hasher=crypto.createHash("md5");
	hasher.update(text);
	var hashmsg=hasher.digest('hex');
  //加密数据进行大写转换
	var md5y = hashmsg.toUpperCase()
	return '?jsonparameter='+jsonparameter+'&md5y='+md5y+'&username='+username;
};


module.exports = ent_params;
