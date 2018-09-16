//goTop
$(".floatBar").on("click","#goTop",
    function () {
        $('html,body').animate( {scrollTop: 0}, 100);
    });


//qrcode
$(".floatBar").on("mouseover","#showCode",
    function () {
        $(".floatBar").css(
            "overflow","visible"
        )
    });


$(".floatBar").on("mouseout","#showCode",
    function () {
        $(".floatBar").css(
            "overflow","hidden"
        )
    });
