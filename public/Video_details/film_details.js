import $ from 'jquery';
var html = $("#hide_input").val(),
    html_hide = html.substring(0,30);
$(".span2").html(html_hide+"......");
$(".span2_1").html(html);
var index = 0;
$(".Btn_p").on("click",function(){
    index++;
    if(index%2==1){
        $(".span2_1").show().siblings('.span2').hide();
    }else{
       $(".span2").show().siblings('.span2_1').hide();
    }

})

