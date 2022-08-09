import chai from 'chai';
const expect = chai.expect;
import sampleCustomersData from '../src/data/sampleCustomers';
import sampleRoomsData from '../src/data/sampleRooms';
import Booking from '../src/classes/Booking';
import Customer from '../src/classes/Customer';
import Room from '../src/classes/Room';


describe('Booking', function() { 
  let booking1;
  let booking2;
  let booking3;
  let customer1;
  let customer3;
  let room1;
  let room4;
  let dayOfFutureStay1;
  let dayOfFutureStay2;
  let dayOfFutureStay3;

  beforeEach(() => {
    dayOfFutureStay1 = "2022/02/05"
    dayOfFutureStay2 = "2023/02/07"
    dayOfFutureStay3 = "2022/02/05"
    customer1 = new Customer(sampleCustomersData.customers[0]);
    customer3 = new Customer(sampleCustomersData.customers[2]);
    room1 = new Room(sampleRoomsData.rooms[0]);
    room4 = new Room(sampleRoomsData.rooms[3]);
    booking1 = new Booking(customer1.userID, room1.number, dayOfFutureStay1);
    booking2 = new Booking(customer3.userID, room4.number, dayOfFutureStay2);
      booking3 = new Booking(customer3.userID, room1.number, dayOfFutureStay3);
  });

  it('Should be a function', function(){
    expect(Booking).to.be.a('function');
  });

  it('Should be a new instance of Booking', function() {
    expect(booking1).to.be.an.instanceOf(Booking)
  });

  it('should hold a customers userId', function() {
    expect(booking1.userID).to.equal(1)
    expect(booking2.userID).to.equal(3)
  });

  it('should indicate the date of the booking ', function() {
    expect(booking1.date).to.equal("2022/02/05")
    expect(booking2.date).to.equal("2023/02/07")
    expect(booking3.date).to.equal("2022/02/05")
  });
  
  it('should indicate the number of the booked room', function() {
    expect(booking1.roomNumber).to.equal(1)
    expect(booking2.roomNumber).to.equal(4)
  });
});