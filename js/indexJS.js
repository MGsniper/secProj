//header复用
$("header").load("commonHeader.html");
$("footer").load("commonFooter.html");
$(".floatBar").load("floatBar.html");
//目录栏
$(function () {
    let str1=new Array();
        $.get("js/data.json",
            function (msg) {
                        $.each(msg.first,
                            function(index,data) {
                                str1[index]=data.name;

                            });
                str1.forEach(function (value) {

                    $(".lessonTags .nav").append
                    (`<li role="presentation" id=${value}>
                      <a href="#">${value}</a>
                      </li>`)
                })
                });
            });




$(".contents li").each(
    function()
    {

        $(this).mouseenter
        (

            function () {
                let index=$(this).index();
                let str=new Array();
                console.log(index);
                $.post("js/data.json",
                    function (msg) {
                        switch(index)
                        {
                            case 0:
                                $.each(msg.first,
                                    function(index,data) {
                                        str[index]=data.name;
                                        console.log(str);
                                    });
                                break;
                            case 1:
                                $.each(msg.second,
                                    function(index,data) {
                                        str[index]=data.name;
                                     /*   console.log(str);*/
                                    });
                                break;
                            case 2:
                                $.each(msg.third,
                                    function(index,data) {
                                        str[index]=data.name;
                                    /*    console.log(str);*/
                                    });
                                break;
                        }

                        $(".lessonTags .nav").html("");
                        str.forEach(function(value){
                                $(".lessonTags .nav")
                                    .append(`<li role="presentation" id=${value}>
                                            <a href="#">${value}</a>
                                            </li>`)
                            }
                        )
                    })
            }
        )
    }
);

//轮播
{
    let currIndex=0;

    $(function(){$.get("js/data.json",function (msg) {

        con="";
        $.each(msg.mainAddr,function (index,data) {
            con+=`<li><img src="${data.src}"></li>`;
        });
        $("#showPic").html(con);
        con="";
        $.each(msg.btnAddr,function (index,data) {
            con+=`<li><img src="${data.src}"></li> `
        });
        $("#preview").html(con);
        slideNext();
    })});




    $("#next").click(function () {
        slideNext();
        clearInterval(clock1);
        clock1=setInterval(function () {
            slideNext();

        },4000);
    });
    $("#previous").click(function () {
        slidePrevious();
        clearInterval(clock1);
        clock1=setInterval(function () {
            slideNext();
        },4000);

    });

    $("#preview").on("click","li",function () {
        currIndex=$(this).index();
        slideTo();
        clearInterval(clock1);
        clock1=setInterval(function () {
            slideNext();
        },4000);
    });

    $("#showPic img").css("opacity", "0");
    $("#showPic img").eq(0).css("opacity","1");
    $("#preview img").css("opacity", "0.5");
    $("#preview img").eq(0).css("opacity", "1");

    function slideTo() {

        $("#showPic img").css("opacity", "0");
        $("#preview img").css("opacity", "0.5");
        $("#showPic img").eq(currIndex).css("opacity","1");
        $("#preview img").eq(currIndex).css("opacity","1");


    }

    function slidePrevious() {
        currIndex--;
        /*   console.log(currIndex);*/
        if(currIndex===-1)
        {
            currIndex=2;
        }
        slideTo();
    }

    function slideNext() {
        currIndex++;
        if (currIndex ===3 ) {
            currIndex = 0;
        }
        slideTo();
        /*  console.log(currIndex);*/
    }

    clock1=setInterval(function () {
        slideNext();
    },4000);
}


$.get("js/data.json",function (msg)
{
    let str=new Array();
    $.each(msg.basic,
        function(index,data) {
            str[index]=data.lesson;
           /* console.log(str);*/
            let rank=parseInt(index)+1;
            $(".boardList").append(
                `<p><span class="badge">${rank}</span>     
                                           <span>${str[index]}</span></p>`
            )
        });
});
//board
 $(".boardTitle .col-md-6").each(function()
     {


         $(this).mouseenter
         (
             function ()
             {
                 let index=$(".boardTitle .col-md-6").index(this);
                 let str=new Array();
                 $(".boardList").html("");
                 $.get("js/data.json",function (msg)
                     {
                         if(index=="0")
                         {
                             $.each(msg.basic,
                                 function(index,data) {
                                     str[index]=data.lesson;
                                    /* console.log(str);*/
                                     let rank=parseInt(index)+1;
                                     $(".boardList").append(
                                         `<p><span class="badge">${rank}</span>     
                                           <span>${str[index]}</span></p>`
                                     )
                                 });
                         }
                         else if(index=="1")
                         {
                             $.each(msg.advanced,
                                 function (index,data)
                                 {
                                     str[index]=data.lesson;
                                     console.log(str);
                                     let rank=parseInt(index)+1;
                                     $(".boardList").append
                                     (
                                         `<p><span class="badge">${rank}</span>     
                                           <span>${str[index]}</span></p>`
                                     )
                                 })

                         }
                     }
                    )
             }
     )
    }
);


//lazeload
function loadPic() {
    count++;
    $.ajax(
        {
            url: "js/data.json",
            async: true,
            type: "GET",
            data: {},
            dataType: 'json',
            success: function (msg) {
                console.log(msg.word);
                $.each(msg.word, function (index, data) {
                    $("#lessons").append(`<div class="lesson">
                            <img  src=${data.src}>
                            <p>${data.title}</p>
                            <button type="button" class="btn btn-success">Apply now!</button>                    
                        </div>`);
                })

            },
            error: function () {
                alert("failed");
            }
        }
    )
}
function loadPic1() {
    count++;
    $.ajax(
        {
            url: "js/data.json",
            async: true,
            type: "GET",
            data: {},
            dataType: 'json',
            success: function (msg) {
                console.log(msg.ppt);
                $.each(msg.ppt, function (index, data) {
                    $("#lessons").append(`<div class="lesson">
                            <img  src=${data.src}>
                            <p>${data.title}</p>
                            <button type="button" class="btn btn-success">Apply now!</button>                    
                        </div>`);
                })

            },
            error: function () {
                alert("failed");
            }
        }
    )
}
//first load


let count=0;
let toggle="word";
loadPic();
$(".lessonTags ul").on("click",
    "#ppt",function () {
        count=0;
        toggle="ppt";
        $("#lessons").empty();
        $("#lessons").append(` <div class="row title">
                ALL CLASSES
            </div>`);
        loadPic1();
    }
    );


$(".lessonTags ul").on("click",
    "#word",function () {
        count=0;
        toggle="word";
        $("#lessons").empty();
        $("#lessons").append(` <div class="row title">
                ALL CLASSES
            </div>`);
        loadPic();


    }
);

$(document).scroll(function(){

    lazyLoad()
});

function lazyLoad() {
    console.log(count);
    var top = $(document).scrollTop();
    var winH = $(window).height();
    var nowH = top + winH;
    var goodsH = $('.lesson:last').offset().top;
    //console.log(goodsH)
    if(count>4){
        count=0;
        toggle="stop"
    }
    if (nowH > goodsH) {
        //alert("再次加载")
        count++;
        if(toggle=="ppt")
        loadPic1();
        else if(toggle=="word")
        loadPic();
    }
}





