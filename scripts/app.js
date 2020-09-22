function init() {
  const startButton = document.querySelector('#start')
  const blurb = document.querySelector('.blurb')
  const grid = document.querySelector('.grid')
  const moneyMade = document.querySelector('#money-display')
  const highScore = document.querySelector('#highest-display')
  const gameOver = document.querySelector('.game-over')
  const restart = document.querySelector('.restart')
  const heading = document.querySelector('.heading')
  const backgroundColor = document.querySelector('.container-1')
  const result = document.querySelector('.winner')
  const audio = document.querySelector('#myAudio')


  restart.addEventListener('click', restartGame)
  //local storage for highest score
  const saveKeyStore = 'highScore'
  let highestScore = localStorage.getItem(saveKeyStore)
  let cells = []
  const width = 10
  const numberOfCells = width * width
  //position of the colour tube
  let tube = 90
  // const clientsStart = 0
  let direction = 1
  let money = 1000
  let clientShootingTimer
  let timerID
  let rightEdgeValue

  // make the grid



  function gameOverResult() {
    gameOver.style.display = 'block'
    restart.style.display = 'block'
    clearInterval(timerID)
    clearInterval(clientShootingTimer)
  }

  function restartGame() {
    window.location.reload()

  }

  function gamePlayingPage() {
    startButton.style.display = 'none'
    blurb.style.display = 'none'
    heading.style.display = 'none'
    backgroundColor.style.backgroundColor = 'black'
    clearInterval(timerID)
    clearInterval(clientShootingTimer)
  }

  function winner() {
    result.style.display = 'block'
    restart.style.display = 'block'
    clearInterval(timerID)
    clearInterval(clientShootingTimer)
  }


  function startGame() {
    gamePlayingPage()

    for (let i = 0; i < numberOfCells; i++) {
      const cell = document.createElement('div')
      cells.push(cell)
      //maybe delete the i later
      grid.appendChild(cell)
    }
    cells[tube].classList.add('poo')
    //bullets
    //making all the clients
    let clients = [0, 1, 2, 3, 4, 5, 6, 10, 11, 12, 13, 14, 15, 16, 20, 21, 22, 23, 24, 25, 26, 30, 31, 32, 33, 34, 35, 36, 40, 41, 42, 43, 44, 45, 46]
    console.log(clients)
    clients.forEach(client => {
      cells[client].classList.add('fire')
    })


    function findRightEdge(array, size) {
      rightEdgeValue = array[0]
      for (let i = 1; i <= size; i++) {
        if (Math.floor(array[0] / width) !== Math.floor(array[i] / width)) {
          return rightEdgeValue
        } else {
          rightEdgeValue = array[i]
        }
      }
      return rightEdgeValue
    }


    function clientsAttack() {

      //boolean to check if clients at left or right edge
      const leftEdge = clients[0] % width === 0
      const rightEdge = findRightEdge(clients, 6) % width === width - 1
      //condition if clients touched the edge of the grid, therefor move down
      if ((leftEdge && direction === -1) || (rightEdge && direction === 1)) {
        // to move down, set direction equals to width
        direction = width
      // eslint-disable-next-line brace-style
      }
      // if above is false, then code below which is
      // means direction is equal to width, therefor needs to be change to move right or left
      else if (direction === width) {
        // if clients are on the leftedge, move right, means direction +1
        if (leftEdge === true) {
          // move right
          direction = 1
        }
        //move left
        else direction = -1
      }
      // remove fire from the cells
      for (let i = 0; i <= clients.length - 1; i++) {
        cells[clients[i]].classList.remove('fire')
      }
      // add direction to clients to make them move
      for (let i = 0; i <= clients.length - 1; i++) {
        clients[i] += direction
      }
      // add fire to cells
      for (let i = 0; i <= clients.length - 1; i++) {
        cells[clients[i]].classList.add('fire')

      }
      clients.some(client => {
        if (client >= (width * 10)) {
          gameOverResult()
          clearInterval(timerID)
          clients.forEach(client => {
            cells[client].classList.remove('fire')

            clearInterval(timerID)

          })
          // need to end the game
          gameOverResult()
          clearInterval(timerID)
        }

      })
      //for the clients to shoot
      clientFire()

    }


    function clientFire() {
      // let clientShooter = clients
      const availiableShooters = clients.slice(clients.length - 6)
      let clientShooter = availiableShooters[Math.floor(Math.random() * availiableShooters.length)]
      console.log(availiableShooters)
      cells[clientShooter].classList.add('tears')
      clientShootingTimer = setInterval(() => {
        cells[clientShooter].classList.remove('tears')
        clientShooter = clientShooter + width
        if (clientShooter >= 100) {

          return clearInterval(clientShootingTimer)
        }
        cells[clientShooter].classList.add('tears')

        console.log(clientShooter)
        if (cells[clientShooter].classList.contains('poo')) {
          womanScream()
          cells[clientShooter].classList.add('blownup')

          gameOverResult()


          cells[clientShooter].classList.remove('poo')
          moneyMade.innerHTML = money
          money -= 1000

        }
      }, 50)
    }


    function playSound() {
      audio.src = './audio/splooge.wav'
      audio.play()
    }

    function womanScream() {
      audio.src = './audio/womanScream.mp3'
      audio.play()
    }

    function cashTill() {
      audio.src = './audio/cashSound.mp3'
      audio.play()
    }
    audio.addEventListener('keydown', playSound)

    // to fire bullets to take out the clients
    function fireWeapon(e) {
      if (e.keyCode === 70) {
        e.preventDefault()
        playSound()
        let bullet = tube
        let client
        cells[bullet].classList.add('weapon')
        let shootingBullet = setInterval(() => {
          cells[bullet].classList.remove('weapon')
          bullet = bullet - width
          if (bullet < 0) {
            clearInterval(shootingBullet)
          } else if (cells[bullet].classList.contains('fire')) {
            //add to score
            cashTill()
            moneyMade.innerHTML = money
            money += 1000
            //check high score
            highScore.innerHTML = highestScore
            if (money > highestScore) {
              highestScore = money
              localStorage.setItem(saveKeyStore, highestScore)
            }


            //turn ppl into money
            setTimeout(() => {
              cells[bullet].classList.add('cash')
            }, 50)

            cells[bullet].classList.remove('fire')

            clients = clients.filter(client => {
              return client !== bullet
            })

            clearInterval(shootingBullet)
          } else {
            cells[bullet].classList.add('weapon')
          }
          if (clients.length === 0) {
            winner()

          }

        }, 200)

      }
    }
    window.addEventListener('keyup', fireWeapon)

    //***********for the clients attack function*************
    timerID = setInterval(clientsAttack, 1000)
  }
  window.addEventListener('keydown', handleKeyDown)

  function handleKeyDown(e) {
    cells[tube].classList.remove('poo')
    switch (e.keyCode) {
      //RIGHT
      case 39:
        if (tube % width < width - 1) {
          tube++
        }
        break
        //LEFT
      case 37:
        if (tube % width !== 0) {
          tube--
        }
        break
      default:
        break
    }
    cells[tube].classList.add('poo')
  }



  startButton.addEventListener('click', startGame)
}
window.addEventListener('DOMContentLoaded', init)
