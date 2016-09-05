import $ from 'jquery';
$(".flim_list_huo .img_show_hide").on("click",function(){
  var true_false = $(this).hasClass("show_img");
  //console.log(true_false)
  if(true_false){
    $(".show_img").hide().siblings('.hidde_img').show();
  }else{
    $(".show_img").show().siblings('.hidde_img').hide();
  }
})
