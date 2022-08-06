import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/hotel-icon.png'
import './images/hotel-carpet.png'

//query selectors
let bookingsButton = document.getElementById('yourBookingsButton')
let yourTransactionsButton = document.getElementById('yourTransactionsButton')
let bookARoomButton = document.getElementById('bookARoomButton')
let bookARoomButtonHeading = document.getElementById('bookARoomButtonHeading')

let homeSection = document.getElementById('homeSection')
let bookingsSection = document.getElementById('bookingsSection')
let transactionsSection = document.getElementById('transactionsSection')
let bookARoomSection = document.getElementById('bookARoomSection')
let homeButton = document.getElementById('homeButton')

//event listeners
bookingsButton.addEventListener('click', showBookingsSection);
yourTransactionsButton.addEventListener('click', showTransactionsSection);
bookARoomButton.addEventListener('click', showBookARoomSection);
homeButton.addEventListener('click', goHome);


function goHome() {
    hide(homeButton)
    show(homeSection);
    hide(transactionsSection);
    hide(bookingsSection);
    hide(bookARoomSection)  
    hide(bookARoomButtonHeading)
}
function showBookingsSection () {
    hide(homeSection);
    show(bookingsSection)
    hide(transactionsSection);
    show(homeButton)
    show(bookARoomButtonHeading)
}


function showTransactionsSection () {
    hide(homeSection);
    hide(bookingsSection);
    show(transactionsSection)   
    show(homeButton)

}

function showBookARoomSection () {
    hide(homeSection);
    show(bookARoomSection)  
    hide(transactionsSection);
    show(homeButton)

}

function show(event) {
    event.classList.remove('hidden')
  };
  
function hide(event) {
    
    event.classList.add('hidden')
  };