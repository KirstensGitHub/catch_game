function animate(lastFrameTime) {
            var requestId = requestAnimationFrame(function () {
                animate(lastFrameTime);
            });

            var time = new Date().getTime();
            var delay = scoreboard.getSpeed();

            if (lastFrameTime + delay < time) {

                if (!scoreboard.isGameOver()) {

                    if (canMove(fallingShape, down)) {
                        move(down);
                    } else {
                        shapeHasLanded();
                    }
                    draw();
                    lastFrameTime = time;

                } else {
                    cancelAnimationFrame(requestId);