function init() {
  // const startButton = document.querySelector('#start')
  // startButton.addEventListener("click", startGame)

  const grid = document.querySelector('.grid')
  const moneyMade = document.querySelector('#money-display')
  const highestScore = document.querySelector('#highest-display')
  
  const cells = []
  const width = 10
  const numberOfCells = width * width
  //position of the colour tube

  let tube = 90
  const clientsStart = 0
  let direction = 1
  // make the grid

  function startGame() {
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
        if (client >= (width * 9)) {
          clearInterval(timerID)
          clients.forEach(client => {
            cells[client].classList.remove('fire')
          })
        }
      })



    }

    clientFire()
    function clientFire() {
      // let clientShooter = clients
      const availiableShooters = clients.slice(clients.length - 6)
      let clientShooter = availiableShooters[Math.floor(Math.random() * availiableShooters.length)]
      cells[clientShooter].classList.add('tears')
      const clientShootingTimer = setInterval(() => {   
        cells[clientShooter].classList.remove('tears')
        clientShooter = clientShooter + width
        cells[clientShooter].classList.add('tears')
               console.log(clientShooter)
        if (cells[clientShooter] .classList.contains('poo')){
          clearInterval(clientShootingTimer)
          cells[clientShooter].classList.remove('poo')
          console.log('help')
         
          console.log(clientShooter > 100)
          cells[clientShooter].classList.remove('tears')
         } else if (clientShooter > 100) {
       
          cells[clientShooter].classList.remove('tears')
        //  console.log(cells[clientShooter])
        // } else if (cells[bullet].classList.contains('fire')){
        //     cells[bullet].classList.remove('fire')
        // }
        //   cells[clientShooter].classList.remove('tears')
        // clearInterval(clientShootingTimer)
        
        }
      
      }, 1000)
    }


    // to fire bullets to take out the clients     
    function fireWeapon(e) {
      if (e.keyCode === 32) {
        let bullet = tube - width
          let client
        cells[bullet].classList.add('weapon')
        let shootingBullet = setInterval(() => { 
          cells[bullet].classList.remove('weapon')
          bullet = bullet - width
          if (bullet < 0){
            clearInterval(shootingBullet)
          } else if (cells[bullet].classList.contains('fire')){
            cells[bullet].classList.remove('fire')
            clients = clients.filter(client =>{
              return client !== bullet
            })
            clearInterval(shootingBullet)
          } else {
            cells[bullet].classList.add('weapon')
          }   
          if (clients.length === 0){
            console.log('game over')
          }
        }, 100)
       
      }
  
       
      
    }
  

    window.addEventListener('keyup', fireWeapon)

 
    //***********timer function is below**************
    const timerID = setInterval(clientsAttack, 1000)

 

 

    function highestScore() {

    }
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
  
  startGame()

}
window.addEventListener('DOMContentLoaded', init)
