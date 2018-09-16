
$("header").load("commonHeader.html");
$("footer").load("commonFooter.html");
$(".floatBar").load("floatBar.html");
//ad
$(function () {
    $(".ad").fadeIn();
});
$(".ad #cancel").click(
    function () {
        $(".ad").fadeOut();
    }
);

//banner
let offset=0;
let timer=setInterval(function () {
    slideTo("next");
},3500);
$('#previous').click(function () {

    slideTo("previous");
    clearInterval(timer);
    timer=setInterval(function () {
        slideTo("next");
    },3500);

});

$('#next').click(function () {

    slideTo("next");
    clearInterval(timer);
    timer=setInterval(function () {
        slideTo("next");
    },3500);

});

function slideTo(direction) {


    if(direction==="next")
        offset+=600;
    else if(direction==="previous")
        offset-=600;

    if(offset===-600)
    {
        offset=2400;     //4*w

        $("#picBox").css({marginLeft:offset});
        offset-=600;
    }
    if(offset===3000)  //5*w
    {
        offset=0;
        $("#picBox").css({marginLeft:offset});
        offset+=600;
    }

    console.log(offset);
    $("#picBox").animate({marginLeft:offset});
}

$(".subjectLine").mouseenter(
    function () {
        $("#more").html("");
        let str=new Array();
        id=$(this).attr("id");

        $.get("js/data.json",function (msg) {

            switch(id){
                case "CM":
                 $.each(msg.CM,function (index,data) {
                     str[index]=data.title;
                 });
                    break;
                case "TS":
                    $.each(msg.TS,function (index,data) {
                        str[index]=data.title;
                    });
            }
            console.log(str);
            str.forEach(function (title) {
                let addr=title+".html";
                $("#more").append(`<a href=${addr}>${title}</a>`)
            });
        });



    }
);

$(".side").hover(function(){
        $(".side").css("overflow","visible");
},
    function(){
        $(".side").css("overflow","hidden");
    }

);




