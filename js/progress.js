(function (windox) {
    function Progress($progressBar, $progressLine, $progressDot) {
        return new Progress.prototype.init($progressBar, $progressLine, $progressDot);
    }
    Progress.prototype = {
        constructor: Progress,
        init: function ($progressBar, $progressLine, $progressDot) {
            this.$progressBar = $progressBar;
            this.$progressLine = $progressLine;
            this.$progressDot = $progressDot;
        },
        isMove: false,
        //鼠标点击
        progressClick: function (callback) {
            var $this = this;
            var maxWidth=this.$progressBar.width();
            this.$progressBar.click(function (event) {
                var normalLeft = $(this).offset().left;
                var eventLeft = event.pageX;
                $this.$progressLine.css("width", eventLeft - normalLeft)
                $this.$progressDot.css("left", eventLeft - normalLeft)
                //计算进度条比例
                var value = (eventLeft - normalLeft) / maxWidth;
                callback(value);
            })
        },
        //鼠标移动
        progressMove: function (callback) {
            //鼠标点击
            var $this = this;
            var maxWidth=this.$progressBar.width();
            var normalLeft = this.$progressBar.offset().left;
            var value;
            this.$progressBar.mousedown(function () {
                //鼠标移动
                $this.isMove = true;
                $(document).mousemove(function () {
                    var eventLeft = event.pageX;
                    var a = eventLeft - normalLeft;
                    $this.isMove = true;
                    value = (eventLeft - normalLeft) / maxWidth;
                    if(a>maxWidth){
                        $this.$progressLine.css("width", maxWidth)
                    }else{
                        $this.$progressLine.css("width", a)
                    }
                    if (a > maxWidth) {
                        $this.$progressDot.css("left", maxWidth+"px")
                    } else {
                        if (a < 0) {
                            $this.$progressDot.css("left", 0)
                        } else {
                            $this.$progressDot.css("left", a)
                        }
                    }
                })
                $(document).mouseup(function () {
                    $(document).off("mousemove");
                    callback(value);
                })
            });
            //鼠标抬起

        },
        //跟随音乐
        setProgress: function (value) {
            if (this.isMove) return;
            if (value < 0 || value > 100) return;
            this.$progressLine.css({
                width: value + "%"
            }),
             this.$progressDot.css({
                left: value + "%"
            })
        }
    }
    Progress.prototype.init.prototype = Progress.prototype;
    windox.Progress = Progress;
})(window);