import './css/styles.css';
import { fetchData } from './apiCalls';
import Customer from '../src/classes/Customer';
import Room from '../src/classes/Room';
import Hotel from '../src/classes/Hotel';
import Booking from '../src/classes/Booking';
import BookingConfirmation from '../src/classes/BookingConfirmation';
import './images/hotel-icon.png'
import './images/hotel-carpet.png'

//global
let hotel;
let currentCustomer; 
let allRooms;
let allCustomers

Promise.all([fetchData('rooms'), fetchData('bookings'), fetchData('customers')])
.then(([roomsData, bookingsData, customersData]) => { 
     allRooms = roomsData.rooms.map(room=> {
    return new Room(room)
})
 allCustomers = customersData.customers.map(customer => {

    return new Customer(customer)
})
hotel = new Hotel(allRooms, allCustomers, bookingsData.bookings)
displayCustomerName()
setCurrentDate()
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
let roomTypeSelect = document.getElementById('roomTypeSelect')
let filterByTypeSection = document.getElementById('filterByTypeSection')
let pickADate = document.getElementById('pickADate')
let bookingConfirmedMessage = document.getElementById('bookingConfirmedMessage')
let displayAvailableRoomsForSelectedDate = document.getElementById('displayAvailableRoomsForSelectedDate')
let collapsibleBookingsMenu = document.getElementsByClassName("collapsible-bookings-menu");
let goBack = document.getElementById('goBack')

goBack

// let bookingsHistory = document.getElementById("bookingsHistory");




let i;
for (i = 0; i < collapsibleBookingsMenu.length; i++) {
collapsibleBookingsMenu[i].addEventListener('click', function() {
    this.classList.toggle("active");
    let bookingsHistory = this.nextElementSibling;
    if(bookingsHistory.style.display === 'block') {
        bookingsHistory.style.display = "none";
    } else {
        bookingsHistory.style.display = "block";

    }

})
}









//event listeners
// bookingsButton.addEventListener('click', showBookingsSection);
bookARoomSection.addEventListener('click', handleButtons)
bookARoomButton.addEventListener('click', showBookARoomSection);
datePickerInput.addEventListener('change', captureDate)
roomTypeSelect.addEventListener('change', filterByType)
goBack.addEventListener('click', goBacktoMain)

function handleButtons(event) {
    switch (event.target.id) {
      case "makeABookingButton":
        makeABookingWithHotel(event)
        break;
        case "searchNewDate":
        newSearch(event)
        break;
    default:
        break;
    }
  };

 function setCurrentDate() {
    let today = new Date().toJSON().slice(0,10)
    datePickerInput.min = today
  }

function updateBookingsData(booking) {
    event.preventDefault()
    fetch("http://localhost:3001/api/v1/bookings", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(booking)
    })
    .then(response => {if(!response.ok) {throw new Error(response.statusText) } else {return response.json()}})
    .then(data => fetchData('bookings')
    .then(bookingsData => { 
        confirmBooking()
        hotel = new Hotel(allRooms, allCustomers, bookingsData.bookings)
        displayCustomerName()
    }))
    .catch(error => homeSection.innerHTML += `<p>${error.message}</p>`)
}

function displayCustomerName() {
    currentCustomer = hotel.customers[2]
    userNameWelcome.innerHTML = `<p> Welcome ${currentCustomer.name}</p> 
    <p>Total amount spent on rooms ${hotel.customerBillingStatments(currentCustomer)}</p>
    <li class="hidden">${currentCustomer.userID}</li>`
    renderDashboard(currentCustomer)
}

function captureDate() {
    show(displayAvailableRoomsForSelectedDate)
    let  input = datePickerInput.value
    let selectedDate = input.split('-').join('/')
    renderAvailableRooms(selectedDate)
}

function makeABookingWithHotel(event){
    let  input = datePickerInput.value
    let selectedDate = input.split('-').join('/')
    let customerID = event.path[8].children[0].children[0].children[2].children[0].children[2].innerText
    let roomNum = event.path[2].children[2].children[3].innerText
    let integerifyroomNum = parseInt(roomNum)
    let integerifycustomerID = parseInt(customerID)
    let postBooking = hotel.makeBooking(integerifycustomerID, integerifyroomNum, selectedDate)
    console.log(postBooking)
    datePickerInput.value = null;
    updateBookingsData(postBooking)
}

function confirmBooking() {
    pickADate.innerHTML = `<h1 id="pickADate">Pick a date to book your room</h1>`
    datePickerInput.value = null; 
    hide(bookARoomSection);
    show(datePickerInput)
    hide(filterByTypeSection)
    availableRoomsDisplay.innerHTML = " "; 
    numberOfRoomsAvailable.innerHTML = " "
    hotel.notAvailableRoomNumbers = [];
    hotel.availableRoomObjects = []
    show(bookingConfirmedMessage)
    setTimeout(backToMain, 6000)
}

function backToMain() {
    hide(bookingConfirmedMessage)
    show(bookARoomButton)
}

function newSearch(event) {
    hide(displayAvailableRoomsForSelectedDate)

    pickADate.innerHTML = `<h1 id="pickADate">Pick a date to book your room</h1>`
    hide(filterByTypeSection);
    datePickerInput.value = null; 
    show(datePickerInput)
    availableRoomsDisplay.innerHTML = " "; 
    numberOfRoomsAvailable.innerHTML = " "
    hotel.notAvailableRoomNumbers = [];
    hotel.availableRoomObjects = []
}

function renderAvailableRooms(selectedDate) {
    availableRoomsDisplay.innerHTML = " ";
    let availableRoomsByDate = hotel.getVacantRoomsByDate(selectedDate)
    hotel.notAvailableRoomNumbers = [];
    numberOfRoomsAvailable.innerHTML = " ";
    pickADate.innerHTML = `<h1 class="showing-rooms-by-date" id="pickADate">Showing rooms for ${selectedDate} <button id="searchNewDate">Search New Date</button></h1>`
    numberOfRoomsAvailable.innerHTML += `<p>Total avaialble rooms: ${availableRoomsByDate.length}</p>`
    availableRoomsByDate.forEach(availableRoom => {
        availableRoomsDisplay.innerHTML +=  `<div class="available-room-container">
        <h4 class="available-room-type">Type of Room: ${availableRoom.type}</h4>
        <h4 class="available-room-cost"> Cost Per Night: ${availableRoom.costPerNight}</h4>
        <ul class="available-room-details">
            <li>Bed Size: ${availableRoom.bedSize}  </li>
            <li>Number of Beds: ${availableRoom.numBeds}   </li>
            <li> Has bidet:${availableRoom.bidet}   </li>
            <li class="hidden"> ${availableRoom.number} </li>
        </ul>
        <div>
        <button class="make-booking-button" id="makeABookingButton">Book this Room</button>
        </div>
        </div>`
    })
    show(filterByTypeSection);
    hide(datePickerInput)
}

function filterByType(event) {
    let roomsByType = hotel.filterAvailableRoomsByType(event.target.value)
        if(roomsByType.length === 0){
            numberOfRoomsAvailable.innerHTML = `<p>Total available ${event.target.value}s: ${roomsByType.length}</p>`
            availableRoomsDisplay.innerHTML = " "
            availableRoomsDisplay.innerHTML += `<h4 class="cannot-find-room">${"We apologize but this room type is not availble for your selected date.  Please pick a different room type or a different date"}</h4>`
         } else {
            availableRoomsDisplay.innerHTML = " "
            numberOfRoomsAvailable.innerHTML = `<p>Total available ${event.target.value}s: ${roomsByType.length}</p>`
             roomsByType.forEach(room => {
             availableRoomsDisplay.innerHTML +=  `<div class="available-room-container">
                 <h4 class="available-room-type">Type of Room: ${room.type}</h4>
                 <h4 class="available-room-cost"> Cost Per Night: ${room.costPerNight}</h4>
                 <ul class="available-room-details">
                    <li>Bed Size: ${room.bedSize}  </li>
                    <li>Number of Beds: ${room.numBeds}   </li>
                    <li> Has bidet: ${room.bidet}   </li>
                     <li class="hidden"> ${room.number} </li>
                </ul>
                    <div>
                     <button class="make-booking-button" id="makeABookingButton">Book this Room</button>
                    </div>
                </div>`
                })
        }
}

function renderDashboard(currentCustomer) {
     hotel.generateBookingConfirmation(currentCustomer).forEach(confirmation => {
        yourBookings.innerHTML += `<div class="confirmation-card-container">
        <p class="confirmation-card-date">Date of stay ${confirmation.date}</p>
        <p class="confirmation-card-room-number">Room ${confirmation.roomNumber}</p>
        <p class="confirmation-card-confirmation-number">confirmation number: ${confirmation.confirmationID}</p>
        </div>`
    } )
}

function goBacktoMain() {
    show(bookARoomButton);
    hide(bookARoomSection) 
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

