(function () {
    let requestAnimationFrame = window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        window.oRequestAnimationFrame;
    if (requestAnimationFrame == null) {
        return;
    }
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext('2d');
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    window.onresize = function () {
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
    }
    let arcList = [];

    window.onmousemove = function (e) {
        arcList.push(new arc(
            e.x,
            e.y,
            1,
            1,
            `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},${Math.random()})`
        ));
    }


    let arc = function (x, y, r, a, c) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.a = a;
        this.c = c;
    }
    arc.prototype.update = function () {
        this.r += Math.random() * 2;
        this.a = this.a - Math.random() * 0.05
    }
    arc.prototype.draw = function () {
        context.save();
        context.beginPath()
        context.globalAlpha = this.a
        context.fillStyle = this.c;
        context.translate(this.x, this.y);
        context.arc(0, 0, this.r, 0, Math.PI * 2)
        context.closePath()
        context.fill()
        context.restore();
    }

    function update() {
        for (let i = 0; i < arcList.length; i++) {
            arcList[i].update();
        }
        arcList = arcList.filter(value => {
            return value.a > 0.1
        })
    }

    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < arcList.length; i++) {
            arcList[i].draw();
        }

    }

    let stopFlag = requestAnimationFrame(function () {
        update();
        draw();
        stopFlag = requestAnimationFrame(arguments.callee);
    })


})()

