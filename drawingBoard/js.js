window.onload = function () {

    var db = document.getElementById('canvas');
    var context = db.getContext('2d');
    var lineWidth = 5

    autoSetCanvas(db)
    bg()
    listenToUser(db)


    var eraserEnabled = false
    pencil.onclick = function () {
        eraserEnabled = false
        pencil.classList.add('active')
        eraser.classList.remove('active')
    }
    eraser.onclick = function () {
        eraserEnabled = true
        eraser.classList.add('active')
        pencil.classList.remove('active')
    }

    down.onclick = function(){
        var url = db.toDataURL("image/png")
        var a = document.createElement('a')
        document.body.appendChild(a)
        a.href = url
        a.download = '我的作品'
        a.target = '_blank'
        a.click()
    }

    clear.onclick = function () {
        context.clearRect(0, 0, db.width, db.height)
    }

    black.onclick = function () {
        context.strokeStyle = 'black'
        context.fillStyle = 'black'
        black.classList.add('active')
        blue.classList.remove('active')
        green.classList.remove('active')
        red.classList.remove('active')
    }

    red.onclick = function () {
        context.strokeStyle = 'red'
        context.fillStyle = 'red'
        red.classList.add('active')
        green.classList.remove('active')
        blue.classList.remove('active')
        black.classList.remove('active')
    }

    green.onclick = function () {
        context.strokeStyle = 'green'
        context.fillStyle = 'green'
        green.classList.add('active')
        red.classList.remove('active')
        blue.classList.remove('active')
        black.classList.remove('active')
    }
    blue.onclick = function () {
        context.strokeStyle = 'blue'
        context.fillStyle = 'blue'
        blue.classList.add('active')
        green.classList.remove('active')
        red.classList.remove('active')
        black.classList.remove('active')
    }

    thin.onclick = function () {
        lineWidth = 5
    }

    thick.onclick = function () {
        lineWidth = 10
    }

    /***/
    function autoSetCanvas(canvas) {
        setCanvasSize()

        window.oversize = function () {
            setCanvasSize()

        }

        function setCanvasSize() {
            var pageWidth = document.documentElement.clientWidth
            var pageHeight = document.documentElement.clientHeight

            canvas.width = pageWidth
            canvas.height = pageHeight

        }

    }

    function drawCircle(x, y, radius) {
        context.beginPath()
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fill()
    }

    function drawLine(x1, y1, x2, y2) {
        context.beginPath()
        context.moveTo(x1, y1)
        context.lineWidth = lineWidth
        context.lineTo(x2, y2)
        context.stroke()
        context.closePath()

    }

    function bg() {
        context.fillStyle = '#FFFCF7'
        context.fillRect(0, 0, db.width, db.height)

    }

    //特性检测

    //非触屏
    function listenToUser(canvas) {


        var using = false
        var lastPoint = {x: undefined, y: undefined}
        if (document.body.ontouchstart !== undefined) {
            //触屏
            canvas.ontouchstart = function (a) {
                var x = a.touches[0].clientX
                var y = a.touches[0].clientY
                using = true
                if (eraserEnabled) {
                    context.clearRect(x - 5, y - 5, 10, 10)
                } else {
                    lastPoint = {"x": x, "y": y}
                }

            }

            canvas.ontouchmove = function (a) {
                var x = a.touches[0].clientX
                var y = a.touches[0].clientY

                if (!using) {
                    return
                }

                if (eraserEnabled) {

                    context.clearRect(x - 5, y - 5, 10, 10)


                } else {

                    var newPoint = {"x": x, "y": y}
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                    lastPoint = newPoint


                }
            }
            canvas.ontouchend = function (a) {
                using = false

            }


        } else {

            canvas.onmousedown = function (a) {
                var x = a.clientX
                var y = a.clientY
                using = true
                if (eraserEnabled) {
                    context.clearRect(x - 5, y - 5, 10, 10)
                } else {
                    lastPoint = {"x": x, "y": y}
                }


            }

            db.onmousemove = function (a) {
                var x = a.clientX
                var y = a.clientY

                if (!using) {
                    return
                }

                if (eraserEnabled) {

                    context.clearRect(x - 5, y - 5, 10, 10)


                } else {

                    var newPoint = {"x": x, "y": y}
                    drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                    lastPoint = newPoint


                }


            }

            db.onmouseup = function (a) {
                using = false

            }

        }


    }
}


