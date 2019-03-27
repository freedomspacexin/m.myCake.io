window.onload = function () {
    new Swiper('#swiper-container',{
        autoplay:5000,
        loop:true,
        pagination:'.swiper-pagination',
        autoplayDisableOnInteraction:false
    });

    new Swiper('#swiper-artricle', {
        slidesPerView: 'auto',
        spaceBetween: 10,
    });
};



$(function(){
    var $menuIcon = $('.left-icon');
    var $menu = $('.top-header-menu');
    /*左上菜单*/
    bindTapEvent($menuIcon[0],function(){
        if ($menu.hasClass('show')){
            $menu.removeClass('show');
            $menuIcon.children('i').removeClass('icomoon_font_close').addClass('icomoon_font_menu');
        } else {
            $menu.addClass('show');
            $menuIcon.children('i').removeClass('icomoon_font_menu').addClass('icomoon_font_close');
        }
    });
    /*删除公告*/
    var $closeNotice = $('.close-notice');
    bindTapEvent($closeNotice[0], function(){
        $closeNotice.parent().hide();
    });

    loadLazy();
    function loadLazy(){
        var imgEles = $("img[data-original][lazyload]");
        $.each(imgEles,function(index,element){
            var $ele = $(element);
            if ($ele.attr('data-original') == ""){
                return;
            }
            if (isOnScreen($ele)){
                var img = new Image();
                img.src = $ele.attr("data-original");
                img.onload = function() {
                    $ele.attr('src', img.src);
                }
                $ele.removeAttr('data-original');
                $ele.removeAttr('lazyload');
            }
        });
    }
    //元素是否在屏幕上
    function isOnScreen(element) {
        var ON_SCREEN_HEIGHT =50;
        var ON_SCREEN_WIDTH = 50;
        element = element.get(0);
        var rect = element.getBoundingClientRect();
        var windowHeight = window.innerHeight || document.documentElement.clientHeight;
        var windowWidth = window.innerWidth || document.documentElement.clientWidth;

        var elementHeight = element.offsetHeight;
        var elementWidth = element.offsetWidth;
        var onScreenHeight = ON_SCREEN_HEIGHT > elementHeight ? elementHeight : ON_SCREEN_HEIGHT;
        var onScreenWidth = ON_SCREEN_WIDTH > elementWidth ? elementWidth : ON_SCREEN_WIDTH;
        // 元素在屏幕上?
        var elementBottomToWindowTop = rect.top + elementHeight;
        var bottomBoundingOnScreen = elementBottomToWindowTop >= onScreenHeight;

        // 元素在屏幕下?
        var elementTopToWindowBottom = windowHeight - (rect.bottom - elementHeight);
        var topBoundingOnScreen = elementTopToWindowBottom >= onScreenHeight;

        // 元素在屏幕左?
        var elementRightToWindowLeft = rect.left + elementWidth;
        var rightBoundingOnScreen = elementRightToWindowLeft >= onScreenWidth;

        // 元素在屏幕右?
        var elementLeftToWindowRight = windowWidth - (rect.right - elementWidth);
        var leftBoundingOnScreen = elementLeftToWindowRight >= onScreenWidth;

        return bottomBoundingOnScreen && topBoundingOnScreen && rightBoundingOnScreen; /*&& leftBoundingOnScreen;*/
    };

     $(window).scroll(loadLazy);
});