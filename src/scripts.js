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
let currentCustomer; 

Promise.all([fetchData('rooms'), fetchData('bookings'), fetchData('customers')])
.then(([roomsData, bookingsData, customersData]) => { 
    let allRooms = roomsData.rooms.map(room=> {
    return new Room(room)
})
let allCustomers = customersData.customers.map(customer => {
    return new Customer(customer)
})
hotel = new Hotel(allRooms, allCustomers, bookingsData.bookings)
displayCustomerName()

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
bookARoomSection.addEventListener('click', handleButtons)
bookARoomButton.addEventListener('click', showBookARoomSection);
homeButton.addEventListener('click', goHome);
datePickerInput.addEventListener('input', captureDate)
// window.onload = function () {
//     displayCustomerName()
// }

function handleButtons(event) {
    switch (event.target.id) {
      case "makeABookingButton":
        makeABookingWithHotel(event)
        break;
    default:
        break;
    }
  };

function updateBookingsData(booking) {
    console.log(booking)

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
    .then(bookingsData => { displayCustomerName()}))

    .catch(error => homeSection.innerHTML += `<p>${error.message}</p>`)
}


//                              (newIngredient, event) {
//     event.preventDefault()
//     fetch("http://localhost:3001/api/v1/bookings", {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(newIngredient)
//     })
//     .then(response => {if(!response.ok) {throw new Error(response.statusText) } else {return response.json()}})
//     .then(data => fetchData('users')
//     .then(userData => {
//         userData.forEach(person => {
//         if(person.id === newIngredient.userID) {
//         user = new User(person);
//       listUsersIngredients()
//         }
//     })
//   })
//     )
//     .catch(error => yourPantry.innerHTML += `<p>${error.message}</p>`)
//   }


function displayCustomerName() {
    currentCustomer = hotel.customers[2]
    userNameWelcome.innerHTML = `<p> Welcome ${currentCustomer.name}</p> 
    <p>Total amount spent on rooms ${hotel.customerBillingStatments(currentCustomer)}</p>
    <li class="hidden">${currentCustomer.userID}</li>`
    renderDashboard(currentCustomer)
}
function captureDate() {
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

function renderAvailableRooms(selectedDate) {
    // availableRoomsDisplay.innerHTML = " "
    let availableRoomsByDate = hotel.getVacantRoomsByDate(selectedDate)
    hotel.notAvailableRoomNumbers = [];
    // numberOfRoomsAvailable += " ";
    numberOfRoomsAvailable.innerHTML = " ";

    numberOfRoomsAvailable.innerHTML += `<p>Number of avaialble Rooms: ${availableRoomsByDate.length}</p>`
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