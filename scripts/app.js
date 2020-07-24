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


  //local storage for highest score
  const saveKeyStore = 'highScore'
  let highestScore = localStorage.getItem(saveKeyStore)
  const cells = []
  const width = 10
  const numberOfCells = width * width
  //position of the colour tube

  let tube = 90
  // const clientsStart = 0
  let direction = 1
  let money = 1000





  // make the grid

  function startGame() {
    startButton.style.display = 'none'
    blurb.style.display = 'none'
    heading.style.display = 'none'
    backgroundColor.style.backgroundColor = 'black'

    for (let i = 0; i < numberOfCells; i++) {
      const cell = document.createElement('div')
      cells.push(cell)
      //maybe delete the i later
      // cell.innerHTML = i
      grid.appendChild(cell)
    }

    cells[tube].classList.add('poo')

    //bullets



    //making all the clients
    let clients = [0, 1, 2, 3, 4, 5, 6, 10, 11, 12, 13, 14, 15, 16, 20, 21, 22, 23, 24, 25, 26, 30, 31, 32, 33, 34, 35, 36, 40, 41, 42, 43, 44, 45, 46]
    console.log(clients)

    const groupedClients = clients.forEach(client => {
      cells[client].classList.add('fire')
    })
    //testing the layout

    // move clients
    clientsAttack()



    function gameOverPage() {
      grid.style.display = 'none'
      gameOver.style.display = 'inline'
    }


    function clientsAttack() {
      //boolean to check if clients at left or right edge
      const leftEdge = clients[0] % width === 0
      const rightEdge = clients[clients.length - 1] % width === width - 1
      //condition if clients touched the edge of the grid, therefor move down
      if ((leftEdge && direction === -1) || (rightEdge && direction === 1)) {
        // to move down, set direction equals to width
        direction = width
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

          clearInterval(timerID)
          clients.forEach(client => {
            cells[client].classList.remove('fire')

            // return clearInterval(timerID)

          })
          gameOver.style.display = 'block'
        }
      })


      clientFire()
    }






    function clientFire() {

      // let clientShooter = clients
      const availiableShooters = clients.slice(clients.length - 6)

      let clientShooter = availiableShooters[Math.floor(Math.random() * availiableShooters.length)]
      console.log(availiableShooters)
      cells[clientShooter].classList.add('tears')
      const clientShootingTimer = setInterval(() => {

        cells[clientShooter].classList.remove('tears')
        clientShooter = clientShooter + width
        if (clientShooter >= 100) {

          //??? gameOver.style.display = 'block'
          return clearInterval(clientShootingTimer)

        }
        cells[clientShooter].classList.add('tears')

        console.log(clientShooter)
        if (cells[clientShooter].classList.contains('poo')) {
          gameOver.style.display = 'block'
          clearInterval(clientShootingTimer)
          console.log(clientShooter)
          cells[clientShooter].classList.remove('poo')
          moneyMade.innerHTML = money
          money -= 1000

          ///???????? dont know why it wont stop

        }
      }, 1000)

    }




    const audio = document.querySelector('#myAudio')
    // const womanScream = document.querySelector('#myAudio')


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
    // playSound()
    // to fire bullets to take out the clients     
    function fireWeapon(e) {
      if (e.keyCode === 32) {
        playSound()
        let bullet = tube
        //  - width
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
            ////???? make the money disappear
            cells[bullet].classList.add('cash')
            cells[bullet].classList.remove('fire')



            clients = clients.filter(client => {
              return client !== bullet
            })
            clearInterval(shootingBullet)
          } else {
            cells[bullet].classList.add('weapon')
          }
          if (clients.length === 0) {
            console.log('game over')
          }
        }, 100)

      }



    }


    window.addEventListener('keyup', fireWeapon)


    //***********timer function is below**************
    const timerID = setInterval(clientsAttack, 1000)






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


  restart.addEventListener('click', startGame)  
  startButton.addEventListener('click', startGame)

}
window.addEventListener('DOMContentLoaded', init)