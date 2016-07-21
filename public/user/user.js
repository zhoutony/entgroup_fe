import $ from 'jquery';
$('.order_li').click(function(){
  var li_num = $(this).index();
  $('.order_li:eq('+li_num+')').addClass('order_li_on').siblings().removeClass('order_li_on');
  $('.list:eq('+li_num+')').css('display','block').siblings('.list').css('display','none');
});