function init() {

  const grid = document.querySelector('.grid')
  const moneyMade = document.querySelector('#money-display')
  const highestScore = document.querySelector('#highest-display')

  const cells = []


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



    //making all the clients
    let clients = [0, 1, 2, 3, 4, 5, 6, 10, 11, 12, 13, 14, 15, 16, 20, 21, 22, 23, 24, 25, 26, 30, 31, 32, 33, 34, 35, 36, 40, 41, 42, 43, 44, 45, 46]
    console.log(clients)

    let groupedClients = clients.forEach(client => {
      cells[client].classList.add('fire')
    })
    //testing the layout

    // move clients
    clientsAttack()

    function clientsAttack() { 
      console.log(clients[0])
      const leftEdge = clients[0] % width === 0
      const rightEdge = clients[clients.length - 1] % width === width - 1
      if((leftEdge && direction === -1) || (rightEdge && direction === 1)){
        direction = width
      } else if (direction === width) {
      if (leftEdge === true){
         direction = 1
      }
      else direction = -1
      }
      for (let i = 0; i <= clients.length - 1; i++) {
        cells[clients[i]].classList.remove('fire')
      }
      for (let i = 0; i <= clients.length - 1; i++) {
        clients[i] += direction
      }
      for (let i = 0; i <= clients.length - 1; i++) {
        cells[clients[i]].classList.add('fire')
        }
    

    }


    //***********timer function is below**************
    // const timer setInterval( clientAttacks(), 3000)

    //?function to stop time is below//
    //clearInterval(timer)

    function updateScore(){

    }


    function highestScore(){

    }





  }
  window.addEventListener('keydown', handleKeyDown)


  function handleKeyDown(e) {
    console.log(tube)
    cells[tube].classList.remove('poo')
    switch (e.keyCode) {
      //RIGHT
      case 39:
        if (tube % width < width -1) {
          tube++
        }
        break
        LEFT
      case 37:
        if (tube % width  !==0 ) {
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