function init() {

  const grid = document.querySelector('.grid')
  const cells = []

  const width = 10
  const numberOfCells = width * width
  //position of the colour tube
  let tube = 94
  let client = null
  // make the grid
  function startGame() {
    for (let i = 0; i < numberOfCells; i++) {
      const cell = document.createElement('div')
      cells.push(cell)
      //maybe delete the number later
      cell.innerHTML = i
      grid.appendChild(cell)
    }

    cells[tube].classList.add('poo')

   

    //making all the clients
    let client = [2, 3, 4, 5, 6, 7, 12, 13, 14, 15, 16, 17, 22, 23, 24, 25, 26, 27, 32, 33, 34, 35, 36, 37, 42, 43, 44, 45, 46, 47]
    console.log(client)

    client.forEach(function (person) {
      cells[person].classList.add('fire')
    })
    //testing the layout
    
    
     //move clients














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
        if (tube > 90 ) {
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