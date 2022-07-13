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
    let backgroundColor = "#FFF"
    let arcList = [];
    let color = [
        "#f80232",
        "#ffae00",
        "#f8f402",
        "#40f802",
        "#02f8cb",
        "#023bf8",
        "#bb02f8",
    ];
    window.onmousemove = function (e) {
        arcList.push(new arc(
            e.x,
            e.y,
            1,
            1,
            color[parseInt((Math.random() * 100) % (color.length - 1))]
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
        this.r += Math.random();
        this.a = this.a * 0.80
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
        context.fillStyle = backgroundColor;
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fill();
        for (let i = 0; i < arcList.length; i++) {
            arcList[i].draw();
        }

    }

    function drawDangFlag() {
        context.save();
        context.beginPath()
        context.lineWidth = 1;
        context.strokeStyle = backgroundColor
        context.fillStyle = color[0];
        context.translate(window.innerWidth / 2, window.innerHeight / 2);
        //画镰刀
        context.arc(0, 0, 350.5, 0, Math.PI * 2)
        context.closePath()
        context.fill()
        context.stroke()
        context.clip()

        context.beginPath()
        context.fillStyle = backgroundColor;
        context.arc(-80, -80, 300.5, 0, Math.PI * 2)
        context.closePath()
        context.fill()

        context.beginPath()
        context.fillStyle = backgroundColor;
        context.translate(-320, 40);
        context.rotate(45 * Math.PI / 180);
        context.fillRect(0, 0, 120, 120)
        context.closePath()
        context.fill()

        context.restore();

        context.save();
        context.beginPath()
        context.fillStyle = color[0];
        context.translate(window.innerWidth / 2, window.innerHeight / 2);
        context.arc(-280, 280, 50, 0, Math.PI * 2)
        context.closePath()
        context.fill()

        context.rotate(45 * Math.PI / 180);
        context.fillRect(-30, 320, 60, 60)
        context.restore();

        //画锤子
        context.save();
        context.beginPath()
        context.fillStyle = color[0];
        context.translate(window.innerWidth / 2, window.innerHeight / 2);
        context.rotate(45 * Math.PI / 180);
        context.fillRect(-200, -60, 620, 100)
        context.closePath()
        context.fill()
        context.restore();

        context.save();
        context.beginPath()
        context.fillStyle = color[0];
        context.translate(window.innerWidth / 2, window.innerHeight / 2);
        context.rotate(45 * Math.PI / 180);
        context.fillRect(-200, -170, 100, 340)
        context.closePath()
        context.fill()
        context.restore();

        context.save();
        context.beginPath()
        context.fillStyle = backgroundColor;
        context.translate(window.innerWidth / 2, window.innerHeight / 2);
        context.rotate(45 * Math.PI / 180);
        context.arc(-200, -170, 50, 0, Math.PI * 2)
        context.closePath()
        context.fill()
        context.restore();

    }

    let stopFlag = requestAnimationFrame(function () {
        update();
        draw();
        drawDangFlag()
        stopFlag = requestAnimationFrame(arguments.callee);
    })


})()

