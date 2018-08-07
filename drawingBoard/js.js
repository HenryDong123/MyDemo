window.onload = function () {
    var db = document.getElementById('canvas');
    var context = db.getContext('2d');
    autoSetCanvas(db)
    listenToUser(db)


    var eraserEnabled = false
    pencil.onclick = function(){
        eraserEnabled = false
        pencil.classList.add('active')
        eraser.classList.remove('active')
    }
    eraser.onclick = function(){
        eraserEnabled = true
        eraser.classList.add('active')
        pencil.classList.remove('active')
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
        context.fillStyle = 'black'
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.fill()
    }

    function drawLine(x1, y1, x2, y2) {
        context.beginPath()
        context.moveTo(x1, y1)
        context.lineWidth = 5
        context.lineTo(x2, y2)
        context.stroke()
        context.closePath()

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
                    context.clearRect(x-5, y-5, 10, 10)
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

                    context.clearRect(x-5, y-5, 10, 10)


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


