class BookingConfirmation {
    constructor(bookingData) {    
        this.confirmationID =  bookingData.id
        this.userID = bookingData.userID
        this.date = bookingData.date
        this.roomNumber = bookingData.roomNumber
    }
}

export default BookingConfirmation