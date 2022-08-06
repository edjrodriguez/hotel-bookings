import './css/styles.css';
import { fetchData } from './apiCalls';
import Customer from '../src/classes/Customer';
import Room from '../src/classes/Room';
import Hotel from '../src/classes/Hotel';
import Booking from '../src/classes/Booking';
import BookingConfirmation from '../src/classes/BookingConfirmation';




// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/hotel-icon.png'
import './images/hotel-carpet.png'

//global
let hotel;



Promise.all([fetchData('rooms'), fetchData('bookings'), fetchData('customers')])
.then(([roomsData, bookingsData, customersData]) => { let allRooms = roomsData.rooms.map(room=> {
    return new Room(room)
})
let allCustomers = customersData.customers.map(customer => {
    return new Customer(customer)
})
hotel = new Hotel(allRooms, allCustomers, bookingsData.bookings)
})


//query selectors
let bookingsButton = document.getElementById('yourBookingsButton')
let yourTransactionsButton = document.getElementById('yourTransactionsButton')
let bookARoomButton = document.getElementById('bookARoomButton')
let bookARoomButtonHeading = document.getElementById('bookARoomButtonHeading')
let userNameWelcome = document.getElementById('userNameWelcome')
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
window.onload = function () {
    displayCustomerName()
}

function displayCustomerName(param) {
    let currentCustomer= hotel.customers[3]
    userNameWelcome.innerHTML = `<p> Welcome ${currentCustomer.name}</p>`
    renderExpenses(currentCustomer)
}

function renderExpenses(currentCustomer) {
   
    bookingsButton.innerHTML = hotel.generateBookingConfirmation(currentCustomer)
    yourTransactionsButton.innerHTML = hotel.customerBillingStatments(currentCustomer)

}

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