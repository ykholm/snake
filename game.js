import SnakePart from "./snake.js"

export const DIRECTION = {
    UP: "UP",
    RIGHT: "RIGHT",
    DOWN: "DOWN",
    LEFT: "LEFT"
}

class Game {
    constructor() {
        this.score = 0
        this.direction = DIRECTION.LEFT // DIRECTION

        // can be move to movePlayerAnimation
        this.lastFrameTimeSec = 0
        this.deltaFrameTimeSec = 144

        // snake player
        this.snake = SnakePart()
    }

    // getSize returns size of player screen
    getSize() {
        switch (this.direction) {
            case DIRECTION.LEFT:
            case DIRECTION.RIGHT: {
                return window.innerWidth
            }
            case DIRECTION.UP:
            case DIRECTION.DOWN: {
                return window.innerHeight
            }

            default: {
                console.log("underfined direction case", this.direction)
            }
        }
    }

    renderPlayer() {
        this.direction = DIRECTION.RIGHT
        this.snake.setXPosition(0)
        this.snake.setYPosition(0)
        window.requestAnimationFrame(this.movePlayerAnimation);
    }

    movePlayerAnimation(t) {
        const currFrameTimeSec = t * 1000
        if (currFrameTimeSec - this.lastFrameTimeSec >= this.deltaFrameTimeSec) {

            console.log('direction', this.direction, 'x', this.snake.xPosition, 'y', this.snake.yPosition)

            switch (this.direction) {
                case DIRECTION.LEFT: {
                    moveHorizontal()
                    if (player.offsetLeft <= -PLAYER_SIZE) {
                        this.snake.setXPosition(this.getSize())
                    }
                    break
                }

                case DIRECTION.RIGHT: {
                    moveHorizontal()
                    if (player.offsetLeft >= this.getSize()) {
                        this.snake.setXPosition(0)
                    }
                    break
                }
                case DIRECTION.UP: {
                    moveVertical()
                    if (player.offsetTop <= -PLAYER_SIZE) {
                        this.snake.setYPosition(this.getSize())
                    }
                    break
                }

                case DIRECTION.DOWN: {
                    moveVertical()
                    if (player.offsetLeft === 0) {
                        this.snake.setYPosition(0)
                    }
                    break
                }
            }

            ///track collision
            const playerRect = player.getBoundingClientRect()
            console.log('rect', playerRect)

            const l1 = { x: playerRect.top, y: playerRect.right }
            const r1 = { x: playerRect.bottom, y: playerRect.left }

            const collectable = document.getElementById('collectable')
            if (collectable) {
                const collectableRect = collectable.getBoundingClientRect()

                const l2 = { x: collectableRect.top, y: collectableRect.right }
                const r2 = { x: collectableRect.bottom, y: collectableRect.left }

                console.log(l1, r1)
                console.log(l2, r2)

                const collides = isCollide(l1, r1, l2, r2)
                if (collides) {
                    console.log('collides', collides)
                    const bonusElem = document.getElementById("collectable")
                    bonusElem.remove()
                    score++
                    scoreElem.innerText = score

                    // create new bonus element
                    spawnCollectable()
                }
            }

        }
        window.requestAnimationFrame(movePlayerAnimation);
    }
}

export default Game