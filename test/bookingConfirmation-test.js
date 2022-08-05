import chai from 'chai';
const expect = chai.expect;
import sampleCustomersData from '../src/data/sampleCustomers';
import sampleBookingsData from '../src/data/sampleBookings';
import BookingConfirmation from '../src/classes/BookingConfirmation';
import Customer from '../src/classes/Customer';
import Room from '../src/classes/Room';


describe('BookingConfirmation', function() { 
    let bookingConfirmation1;

    beforeEach(() => {
      bookingConfirmation1 = new BookingConfirmation(sampleBookingsData.bookings[0]);
     });

  it('Should be a function', function(){
    expect(BookingConfirmation).to.be.a('function');
  });

  it('Should be a new instance of Booking', function() {
    expect(bookingConfirmation1).to.be.an.instanceOf(BookingConfirmation)
  });

  it('should have a confirmation id', function() {
    expect(bookingConfirmation1.confirmationID).to.equal("5fwrgu4i7k55hl6sz")
  });

  it('should hold a customers userId', function() {
    expect(bookingConfirmation1.userID).to.equal(1)
  });

  it('should indicate the date of the booking ', function() {
    expect(bookingConfirmation1.date).to.equal("2022/04/20")
  });
  
  it('should indicate the number of the booked room', function() {
    expect(bookingConfirmation1.roomNumber).to.equal(15)
  });

});