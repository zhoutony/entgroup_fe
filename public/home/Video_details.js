import $ from 'jquery';
var indexs = 0;
$('.Btn_p').on('click',function(){
  indexs++;
  if(indexs%2==1){
    $('.span2_1').show();
    $('.span2').hide();
  }else{
    $('.span2').show();
    $('.span2_1').hide();
  }
})
