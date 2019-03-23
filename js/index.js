window.onload = function () {
    new Swiper('.swiper-container',{
        autoplay:5000,
        loop:true,
        pagination:'.swiper-pagination',
        autoplayDisableOnInteraction:false
    });
};