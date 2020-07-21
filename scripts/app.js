function init() {

  const grid = document.querySelector('.grid')
  const moneyMade = document.querySelector('#money-display')
  const highestScore = document.querySelector('#highest-display')

  const cells = []
  const squiggles = []
  const tears = []

  let width = 10
  const numberOfCells = width * width
  //position of the colour tube
  let tube = 90
  let clientsStart = 0
  let direction = 1
  // make the grid
  function startGame() {
    for (let i = 0; i < numberOfCells; i++) {
      const cell = document.createElement('div')
      cells.push(cell)
      //maybe delete the i later
      cell.innerHTML = i
      grid.appendChild(cell)
    }

    cells[tube].classList.add('poo')

    //bullets



    //making all the clients
    let clients = [0, 1, 2, 3, 4, 5, 6, 10, 11, 12, 13, 14, 15, 16, 20, 21, 22, 23, 24, 25, 26, 30, 31, 32, 33, 34, 35, 36, 40, 41, 42, 43, 44, 45, 46]
    console.log(clients)

    let groupedClients = clients.forEach(client => {
      cells[client].classList.add('fire')
    })
    //testing the layout

    // move clients
    //clientsAttack()

    function clientsAttack() {
      console.log(clients[0])
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
    // to b b       
    function fireWeapon(e) {
      if (e.keyCode === 32) {
        squiggles.push(tube)
        console.log(tube)
        // basically directin equals 15
        let fire = cells[tube].classList.add('weapon')
      }
    }


    // to get rid of the bullet when it collides
    function bulletMoving() {
      bulletDirection = width * -1
      for (let i = 0; i <= squiggles.length; i++) {
        for (let j = 0; j<= clients.length; j++ ){
          if (squiggles[i] === cells[clients[j]]) {
            cells[squiggles[i]].classList.remove('weapon')
            cells[clients[j]].classList.remove('fire')
            squiggles.pop(clients[j])
          }
        }
      }
    }
      // Code to move bullets up in a column
      // remove fire from the cells
      for (let i = 0; i <= squiggles.length - 1; i++) {
        cells[squiggles[i]].classList.remove('weapon')
      }
      // add direction to clients to make them move
      for (let i = 0; i <= squiggles.length - 1; i++) {
        squiggles[i] += bulletDirection
      }
      // add fire to cells
      for (let i = 0; i <= squiggles.length - 1; i++) {
        cells[squiggles[i]].classList.add('weapon')
      }

    
     

    window.addEventListener('keydown', fireWeapon)

    let fireInterval = setInterval(bulletMoving, 5000)

    //***********timer function is below**************
    let timerID = setInterval(clientsAttack, 200)

    //?function to stop time is below//
    //clearInterval(timer)

    function updateScore() {

    }


    function highestScore() {

    }





  }
  window.addEventListener('keydown', handleKeyDown)


  function handleKeyDown(e) {
    console.log(tube)
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