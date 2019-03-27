 /*自定义tap事件，因zepto的tap事件有兼容问题*/
var bindTapEvent = function (dom, callback) {
            var isMove = false;
            var startTime =0;
            dom.addEventListener('touchstart', function () {
                startTime = Date.now();
            });
            dom.addEventListener('touchmove', function () {
                isMove = true;
            });
            dom.addEventListener('touchend', function (e) {
                if (!isMove && (Date.now() - startTime) <= 150){
                    callback && callback.call(this,e);
                }
                isMove = false;
                startTime =0;
            });
};
