$(document).ready(function () {

    console.log("READY");


    $(".close").click(function () {
        $('.fade-out').css({
            opacity: '0',
            transition: 'visibility 0s linear 1000ms, opacity 1000ms'
        });
        $('.modal').css({
            'z-index': '0'
        });

    });

});