import './css/styles.css';
import { fetchData } from './apiCalls';
import Customer from '../src/classes/Customer';
import Room from '../src/classes/Room';
import Hotel from '../src/classes/Hotel';
import './images/hotel-icon.png'
import './images/hotel-carpet.png'

//global
let hotel;
let currentCustomer; 
let allRooms;
let allCustomers
let customerNumber;

Promise.all([fetchData('rooms'), fetchData('bookings'), fetchData('customers')])
.then(([roomsData, bookingsData, customersData]) => { 
    allRooms = roomsData.rooms.map(room=> {return new Room(room)})
    allCustomers = customersData.customers.map(customer => {return new Customer(customer)})
    hotel = new Hotel(allRooms, allCustomers, bookingsData.bookings)
                displayCustomerName()  

    setCurrentDate()
})

//query selectors
let yourBookings = document.getElementById('yourBookings')
let datePickerInput = document.getElementById('datePickerInput')
let bookARoomButton = document.getElementById('bookARoomButton')
let userNameWelcome = document.getElementById('userNameWelcome')
let homeSection = document.getElementById('homeSection')
let bookARoomSection = document.getElementById('bookARoomSection')
let availableRoomsDisplay = document.getElementById('availableRoomsDisplay')
let userLoginName = document.getElementById('userLoginName')
let userPassword = document.getElementById('userPassword')
let loginSubmit = document.getElementById('loginSubmit')
let numberOfRoomsAvailable = document.getElementById('numberOfRoomsAvailable')
let roomTypeSelect = document.getElementById('roomTypeSelect')
let filterByTypeSection = document.getElementById('filterByTypeSection')
let pickADate = document.getElementById('pickADate')
let bookingConfirmedMessage = document.getElementById('bookingConfirmedMessage')
let displayAvailableRoomsForSelectedDate = document.getElementById('displayAvailableRoomsForSelectedDate')
let goBack = document.getElementById('goBack')
let userNameOrPasswordError = document.getElementById('userNameOrPasswordError')
let loginPage = document.getElementById('loginPage')
let collapsibleBookingsMenu = document.getElementsByClassName("collapsible-bookings-menu");

// this is waht allows my bookings menu to collapse.  need to refactor for loop
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
// loginSubmit.addEventListener('click', login)



// function login(event) {
//     event.preventDefault()
//     let customerLoginId = userLoginName.value.split('r')[1]
//     let integerifycustomerLoginID = parseInt(customerLoginId)
//     customerNumber = (integerifycustomerLoginID-1)
//     allCustomers.find(customer =>{
//         if(customer.userID === integerifycustomerLoginID && userPassword.value === "overlook2021" ){
//             hide(userNameOrPasswordError)
//             hide(loginPage)
//             show(homeSection)
//             show(userNameWelcome)
//             displayCustomerName(customerNumber)  
//         } else if (customer.userID !== integerifycustomerLoginID || userPassword.value !== "overlook2021" || integerifycustomerLoginID === " " || userPassword.value === " " ||integerifycustomerLoginID === undefined ||  userPassword.value === undefined || integerifycustomerLoginID === NaN) {
//             show(userNameOrPasswordError)
//         }
//     })
// }

function displayCustomerName(customerNumber) {
    currentCustomer = hotel.customers[2]
    userNameWelcome.innerHTML = `<p class="user-name" id="userNameWelcome"> Welcome, ${currentCustomer.name}</p> 
    <p class="user-amount-spent-on-rooms" id="userHotelTotals">Total amount spent on rooms: $${hotel.customerBillingStatments(currentCustomer)}</p>
    <li class="hidden">${currentCustomer.userID}</li>`
    renderDashboard(currentCustomer)
}

function handleButtons(event) {
    switch (event.target.id) {
      case "makeABookingButton":
        makeABookingWithHotel(event)
        break;
      case "searchNewDate":
        newSearch(event)
        break;
      case "goBack":
        goBacktoMain(event)
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
    .then(response => {
        if(!response.ok) {
            throw new Error(response.statusText) 
        } else {
            confirmBooking()
            return response.json()}})
    .then(data => fetchData('bookings')
    .then(bookingsData => { 
        hotel = new Hotel(allRooms, allCustomers, bookingsData.bookings)
        displayCustomerName(customerNumber)
    }))
    .catch(error => {
        availableRoomsDisplay.innerHTML = `<p>${error.message}</p>
        <p>There was an error with making your booking. Please contact the hotel directly to confirm your booking.</p> `
        setTimeout(goBacktoMain, 5000)
        setTimeout(newSearch, 5500)
    })
}

function captureDate() {
    show(displayAvailableRoomsForSelectedDate)
    let  input = datePickerInput.value
    let selectedDate = input.split('-').join('/')
    renderAvailableRooms(selectedDate)
}

function makeABookingWithHotel(event){
    console.log(event)

    let input = datePickerInput.value
    let selectedDate = input.split('-').join('/')


    let roomNum = event.path[2].children[2].children[3].innerText
    let customerID = event.path[8].children[0].children[1].children[2].innerText



    let integerifyroomNum = parseInt(roomNum)
    let integerifycustomerID = parseInt(customerID)
    console.log(integerifycustomerID)
    console.log(integerifyroomNum)
    let postBooking = hotel.makeBooking(integerifycustomerID, integerifyroomNum, selectedDate)
    console.log(postBooking)
    datePickerInput.value = null;
    updateBookingsData(postBooking)
}

function confirmBooking() {
    pickADate.innerHTML = 
    ` <h1 class="pick-a-date" id="pickADate">Pick a date to book your room 
    <div class="go-back-button-container"> 
      <button class="go-back-button " id="goBack">Back to main</button>
    </div>
  </h1>`
    datePickerInput.value = null; 
    hide(bookARoomSection);
    show(datePickerInput)
    hide(filterByTypeSection)
    availableRoomsDisplay.innerHTML = " "; 
    numberOfRoomsAvailable.innerHTML = " ";
    hotel.notAvailableRoomNumbers = [];
    hotel.availableRoomObjects = []
    show(bookingConfirmedMessage)
    setTimeout(backToMain, 7000)
}

function backToMain() {
    hide(bookingConfirmedMessage)
    show(bookARoomButton)
}

function newSearch(event) {
    hide(displayAvailableRoomsForSelectedDate)
    pickADate.innerHTML =     
    ` <h1 class="pick-a-date" id="pickADate">Pick a date to book your room 
    <div class="go-back-button-container"> 
      <button class="go-back-button " id="goBack">Back to main</button>
    </div>
  </h1>`
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

