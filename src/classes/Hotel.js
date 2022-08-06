import Booking from './Booking';
import BookingConfirmation from './BookingConfirmation';

class Hotel {
    constructor(allRooms, allCustomers, bookingsData) {
        this.rooms = allRooms
        this.customers = allCustomers
        this.bookings = bookingsData
        this.availableRoomNumbers = []
        this.availableRoomObjects = []
        this.roomByType = []
    }
    getVacantRoomsByDate(selectedDate){
        this.bookings.forEach(booking => {
            if(booking.date !== selectedDate){
                this.availableRoomNumbers.push(booking.roomNumber)
            }
        })
       return this.availableRoomNumbers.reduce((acc, currRmNumber) => {
            this.rooms.forEach(room => {
                if(currRmNumber === room.number){
                    this.availableRoomObjects.push(room)
                    acc.push(room)
                }
            })
            return acc
        },[])
    }
    filterAvailableRoomsByType(type){ 
        return this.availableRoomObjects.reduce((acc, currRoom) => {
            if(currRoom.type === type) {
                this.roomByType.push(currRoom)
                acc.push(currRoom)
            }
            return acc
        }, [])
    }
    makeBooking(customer, roomNumber, date) {
        let booking;
      return booking = new Booking(customer, roomNumber, date) 
    }

    generateBookingConfirmation(customer){
        let customerBookingRoomNumbers = this.bookings.reduce((array, currBooking) => {
                if(currBooking.userID === customer.userID){
                    array.push(currBooking)
                }
            return array
        }, [])
     return customerBookingRoomNumbers.flatMap(booking =>{
            return new BookingConfirmation(booking)
        })
    }
    customerBillingStatments(customer) {
        let customerBookingRoomNumbers = this.bookings.reduce((array, currBooking) => {
            if(currBooking.userID === customer.userID){
                array.push(currBooking.roomNumber)
            }
        return array
    }, [])
  let total = this.rooms.reduce((sum, currRoom) => {
        customerBookingRoomNumbers.forEach(roomNum =>{
            if(currRoom.number === roomNum) {
                sum += currRoom.costPerNight
            }
        })
        return sum
    }, 0)
    return total.toFixed(2)
    }
}

export default Hotel



