import $ from 'jquery';
function Pop_Up(text){
  $('.Pop_up').remove();
  $('html,body').addClass('ovfHiden');
  var html = '';
html+='<div class="Pop_up">';
    html+='<div class="mask"></div>';
    html+='<div class="Pop_body">';
      html+='<p class="Pop_body_text">'+text+' </p>';
     html+='<p class="Btn_ok_p">我知道啦</p>';
    html+='</div>';
  html+='</div>';
    //您选择的是<span class="color_red">明天07-09</span>的场次
    $('body').append(html);
    var obj_hei = $('.Pop_body').height(),
        win_hei = $(window).height();
    $('.Pop_body').css({
        "top":win_hei/2-obj_hei/2
    })
    $('.Btn_ok_p').on('click',function(){
      $('.Pop_up').remove();
      $('html,body').removeClass('ovfHiden');
    })


}

function init(){
  $('.huan_Btn').on('click',function(){
      $('.Popup_shows').show();
  })

}
init();

