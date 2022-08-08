class Booking {
    constructor(customer, room, dayOfFutureStay) { 
        this.userID = customer.userID
        this.date = dayOfFutureStay 
        this.roomNumber = room.number
    }
}
export default Booking