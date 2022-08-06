import './css/styles.css';
import { fetchData } from './apiCalls';
import { Datepicker } from 'vanillajs-datepicker';
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
// const elem = document.querySelector('input[name="date-picker"]');
// const datepicker = new Datepicker(elem, {
//     buttonClass: 'date-picker-btn',
// }); 



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
let yourBookings = document.getElementById('yourBookings')
let datePickerInput = document.getElementById('datePickerInput')
let bookARoomButton = document.getElementById('bookARoomButton')
let bookARoomButtonHeading = document.getElementById('bookARoomButtonHeading')
let userNameWelcome = document.getElementById('userNameWelcome')
let homeSection = document.getElementById('homeSection')
let bookingsSection = document.getElementById('bookingsSection')
let transactionsSection = document.getElementById('transactionsSection')
let bookARoomSection = document.getElementById('bookARoomSection')
let availableRoomsDisplay = document.getElementById('availableRoomsDisplay')
let homeButton = document.getElementById('homeButton')
let numberOfRoomsAvailable = document.getElementById('numberOfRoomsAvailable')


//event listeners
// bookingsButton.addEventListener('click', showBookingsSection);
// yourTransactionsButton.addEventListener('click', showTransactionsSection);
bookARoomButton.addEventListener('click', showBookARoomSection);
homeButton.addEventListener('click', goHome);
datePickerInput.addEventListener('input', captureDate)
window.onload = function () {
    displayCustomerName()
}

function displayCustomerName(param) {
    let currentCustomer= hotel.customers[0]
    userNameWelcome.innerHTML = `<p> Welcome ${currentCustomer.name}</p> 
    <p>Total amount spent on rooms ${hotel.customerBillingStatments(currentCustomer)}</p>`
    renderDashboard(currentCustomer)
}
function captureDate() {
    let  input = datePickerInput.value
    let selectedDate = input.split('-').join('/')
    renderAvailableRooms(selectedDate)
    datePickerInput.value = null;
}

function renderAvailableRooms(selectedDate) {
    // availableRoomsDisplay.innerHTML = " "
    let availableRoomsByDate = hotel.getVacantRoomsByDate(selectedDate)
    hotel.notAvailableRoomNumbers = [];
    // numberOfRoomsAvailable += " ";
    numberOfRoomsAvailable.innerHTML += availableRoomsByDate.length
    availableRoomsByDate.forEach(availableRoom => {
        
        availableRoomsDisplay.innerHTML +=  `<div class="available-room-container">
        <h3 class="available-room-container">Type of Room: ${availableRoom.type}</h3>
        <h3 class="available-room-container"> Cost Per Night ${availableRoom.costPerNight}</h3>
        </div>`
        // <p class="confirmation-card-confirmation-number">confirmation number: ${confirmation.confirmationID}</p>
        // </div>`
    })
}

function renderDashboard(currentCustomer) {
     hotel.generateBookingConfirmation(currentCustomer).forEach(confirmation => {

        yourBookings.innerHTML += `<div class="confirmation-card-container">
        <h3 class="confirmation-card-date">Date of stay ${confirmation.date}</h3>
        <h3 class="confirmation-card-room-number">Room ${confirmation.roomNumber}</h3>
        <p class="confirmation-card-confirmation-number">confirmation number: ${confirmation.confirmationID}</p>
        </div>`
    } )



}

function goHome() {
    hide(homeButton)
    show(homeSection);
    hide(transactionsSection);
    hide(bookingsSection);
    hide(bookARoomSection)  
    hide(bookARoomButtonHeading)
}

function showBookARoomSection () {
    hide(bookARoomButton);
    show(bookARoomSection)  

}

function show(event) {
    event.classList.remove('hidden')
  };
  
function hide(event) {
    
    event.classList.add('hidden')
  };