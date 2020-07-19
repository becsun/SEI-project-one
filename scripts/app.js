function init() {

  const grid = document.querySelector('.grid')
  const moneyMade = document.querySelector('#money-display')
  const highestScore = document.querySelector('#highest-display')

  const cells = []


  let width = 10
  const numberOfCells = width * width
  //position of the colour tube
  let tube = 94
  let clients = null
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
      clients.forEach(client => {
        cells[client].classList.remove('fire')
        console.log(cells[client])
      })
      console.log(clients.length)
      const x = cells[clients] % width
      console.log(x)
      const y = Math.floor(cells[clients] / width)
    }


    clients.forEach(client => {
      cells[client].classList.add('fire')

    })
    // for (let client in clients){
    //   cells[client].classList.remove('fire')
    // }
    // for (let i = 0; i < 10; clients.length){
    //   clients[i] = clients[i] + 1 
    //  }

    // setInterval( clientAttacks(), 3000)






  }
  window.addEventListener('keydown', handleKeyDown)


  function handleKeyDown(e) {
    console.log(tube)
    cells[tube].classList.remove('poo')
    switch (e.keyCode) {
      //RIGHT
      case 39:
        if (tube < 99) {
          tube++
        }
        break
        //LEFT
      case 37:
        if (tube > 90) {
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