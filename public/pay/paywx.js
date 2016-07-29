import $ from 'jquery';
window.onload = function(){

	callpay();
};
function jsApiCall()
 {
     WeixinJSBridge.invoke(
         'getBrandWCPayRequest',
     {
         "appId" : "wx7e33da89622c3fac", //公众号名称，由商户传入
         "timeStamp" : "1469693515", //时间戳，自1970年以来的秒数
         "nonceStr" : "9gheupttr3few60y40hkq85gre1klt5p", //随机串
         "package" : "prepay_id=wx20160728161155a0af8aa1da0014138887",
         "signType" : "MD5", //微信签名方式：
         "paySign" : "092F3F0B341497234BB60B373FA633BB" //微信签名
     },
         function (res)
     {
     	alert(res.err_msg);
         //WeixinJSBridge.log(res.err_msg);
         //alert(res.err_code+res.err_desc+res.err_msg);
         //判断支付返回的参数是否支付成功并跳转
     }
     );
 }

 function callpay()
 {

     	
     if (typeof WeixinJSBridge == "undefined")
     {
         if (document.addEventListener)
         {
             document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
         }
         else if (document.attachEvent)
         {
             document.attachEvent('WeixinJSBridgeReady', jsApiCall);
             document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
         }
     }
     else
     {
         jsApiCall();
     }
 }
