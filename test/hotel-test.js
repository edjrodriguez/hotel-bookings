import chai from 'chai';
const expect = chai.expect;
import sampleBookingsData from '../src/data/sampleBookings';
import sampleCustomersData from '../src/data/sampleCustomers';
import Customer from '../src/classes/Customer';
import Room from '../src/classes/Room';
import sampleRoomsData from '../src/data/sampleRooms';
import Hotel from '../src/classes/Hotel';


describe('Hotel', function() { 
    let allRooms;
    let allCustomers;
    let hotel;
    let customer1;
    let selectedDate1 = "2022/04/20" 
    let selectedDate2 = "2022/10/31" 

    beforeEach(() => {
        
        allRooms = sampleRoomsData.rooms.map(room => {
            return new Room(room)
        })
        allCustomers = sampleCustomersData.customers.map(customer => {
            return new Customer(customer)
        })
        hotel = new Hotel(allRooms, allCustomers, sampleBookingsData.bookings);
    });
    
  it('Should be a function', function(){
    expect(Hotel).to.be.a('function');
  });

  it('Should be a new instance of Hotel', function() {
    expect(hotel).to.be.an.instanceOf(Hotel)
  });

  it('should have rooms', function() {
    expect(hotel.rooms).to.deep.equal(allRooms)
  });

  it('should know all customers', function() {
    expect(hotel.customers).to.deep.equal(allCustomers)
  });

  it('should be able to see all bookings data', function() {
    expect(hotel.bookings).to.deep.equal([
      {
        id: "5fwrgu4i7k55hl6sz",
        userID: 1,
        date: "2022/04/20",
        roomNumber: 15
        },
        {
        id: "5fwrgu4i7k55hl6t5",
        userID: 2,
        date: "2022/04/20",
        roomNumber: 24
        },
        {
        id: "5fwrgu4i7k55hl6t6",
        userID: 3,
        date: "2022/04/20",
        roomNumber: 12
        },
        {
        id: "5fwrgu4i7k55hl6t7",
        userID: 2,
        date: "2022/04/20",
        roomNumber: 7
        },
        {
        id: "5fwrgu4i7k55hl6t8",
        userID: 1,
        date: "2022/10/31",
        roomNumber: 12
        },
        {
        id: "5fwrgu4i7k55hl6t9",
        userID: 3,
        date: "2022/10/31",
        roomNumber: 14
        },
        {
        id: "5fwrgu4i7k55hl6ta",
        userID: 3,
        date: "2022/10/31",
        roomNumber: 9
        },
        {
        id: "5fwrgu4i7k55hl6tb",
        userID: 2,
        date: "2022/10/31",
        roomNumber: 5
        },
        {
        id: "5fwrgu4i7k55hl6tc",
        userID: 1,
        date: "2022/07/04",
        roomNumber: 13
        },
        {
        id: "5fwrgu4i7k55hl6td",
        userID: 3,
        date: "2022/07/04",
        roomNumber: 18
        }
      ])
  });

  it('should know all customers', function() {
    expect(hotel.customers).to.deep.equal(allCustomers)
  });

  it('should start with no available room numbers', function() {
    expect(hotel.notAvailableRoomNumbers).to.deep.equal([])
  });

  it('Should be able to filter available rooms by selected date 1 "2022/04/20', function() {
    expect(hotel.getVacantRoomsByDate(selectedDate1)).to.deep.equal([
      {
      number: 1,
      roomType: "residential suite",
      bidet: true,
      bedSize: "queen",
      numBeds: 1,
      costPerNight: 358.4
      },
      {
      number: 2,
      roomType: "suite",
      bidet: false,
      bedSize: "full",
      numBeds: 2,
      costPerNight: 477.38
      },
      {
      number: 3,
      roomType: "single room",
      bidet: false,
      bedSize: "king",
      numBeds: 1,
      costPerNight: 491.14
      },
      {
      number: 4,
      roomType: "single room",
      bidet: false,
      bedSize: "queen",
      numBeds: 1,
      costPerNight: 429.44
      },
      {
      number: 5,
      roomType: "single room",
      bidet: true,
      bedSize: "queen",
      numBeds: 2,
      costPerNight: 340.17
      },
      {
      number: 6,
      roomType: "junior suite",
      bidet: true,
      bedSize: "queen",
      numBeds: 1,
      costPerNight: 397.02
      },
      {
      number: 8,
      roomType: "junior suite",
      bidet: false,
      bedSize: "king",
      numBeds: 1,
      costPerNight: 261.26
      },
      {
      number: 9,
      roomType: "single room",
      bidet: true,
      bedSize: "queen",
      numBeds: 1,
      costPerNight: 200.39
      },
      {
      number: 10,
      roomType: "suite",
      bidet: false,
      bedSize: "twin",
      numBeds: 1,
      costPerNight: 497.64
      },
      {
      number: 11,
      roomType: "single room",
      bidet: true,
      bedSize: "twin",
      numBeds: 2,
      costPerNight: 207.24
      },
      {
      number: 13,
      roomType: "single room",
      bidet: false,
      bedSize: "queen",
      numBeds: 2,
      costPerNight: 423.92
      },
      {
      number: 14,
      roomType: "residential suite",
      bidet: false,
      bedSize: "twin",
      numBeds: 1,
      costPerNight: 457.88
      },
      {
      number: 16,
      roomType: "single room",
      bidet: false,
      bedSize: "full",
      numBeds: 2,
      costPerNight: 325.6
      },
      {
      number: 17,
      roomType: "junior suite",
      bidet: false,
      bedSize: "twin",
      numBeds: 2,
      costPerNight: 328.15
      },
      {
      number: 18,
      roomType: "junior suite",
      bidet: false,
      bedSize: "king",
      numBeds: 2,
      costPerNight: 496.41
      },
      {
      number: 19,
      roomType: "single room",
      bidet: false,
      bedSize: "queen",
      numBeds: 1,
      costPerNight: 374.67
      },
      {
      number: 20,
      roomType: "residential suite",
      bidet: false,
      bedSize: "queen",
      numBeds: 1,
      costPerNight: 343.95
      },
      {
      number: 21,
      roomType: "single room",
      bidet: false,
      bedSize: "full",
      numBeds: 2,
      costPerNight: 429.32
      },
      {
      number: 22,
      roomType: "single room",
      bidet: false,
      bedSize: "full",
      numBeds: 2,
      costPerNight: 350.31
      },
      {
      number: 23,
      roomType: "residential suite",
      bidet: false,
      bedSize: "queen",
      numBeds: 2,
      costPerNight: 176.36
      },
      {
        number: 25,
        roomType: "single room",
        bidet: true,
        bedSize: "queen",
        numBeds: 1,
        costPerNight: 305.85
      }
    ])   
  });



  it('should be able to add Rooms to the not available room numbers', function() {
    hotel.getVacantRoomsByDate(selectedDate1)
    expect(hotel.notAvailableRoomNumbers).to.deep.equal([15, 24, 12, 7 ])
  });


  it('Should be able to filter available rooms by residential suite type', function() {
    hotel.getVacantRoomsByDate(selectedDate1)
    expect(hotel.filterAvailableRoomsByType("residential suite")).to.deep.equal([
      {
      number: 1,
      roomType: "residential suite",
      bidet: true,
      bedSize: "queen",
      numBeds: 1,
      costPerNight: 358.4
      }, 
      {
      number: 14,
      roomType: "residential suite",
      bidet: false,
      bedSize: "twin",
      numBeds: 1,
      costPerNight: 457.88
      },
      {
      number: 20,
      roomType: "residential suite",
      bidet: false,
      bedSize: "queen",
      numBeds: 1,
      costPerNight: 343.95
      },
      {
      number: 23,
      roomType: "residential suite",
      bidet: false,
      bedSize: "queen",
      numBeds: 2,
      costPerNight: 176.36
      },  

    ])
  });

  it('Should be able to filter available rooms by junior suite type', function() {
    hotel.getVacantRoomsByDate(selectedDate2)
    expect(hotel.filterAvailableRoomsByType("junior suite")).to.deep.equal([
      {
      number: 6,
      roomType: "junior suite",
      bidet: true,
      bedSize: "queen",
      numBeds: 1,
      costPerNight: 397.02
      }, 
      {
      number: 8,
      roomType: "junior suite",
      bidet: false,
      bedSize: "king",
      numBeds: 1,
      costPerNight: 261.26
      },
      {
      number: 17,
      roomType: "junior suite",
      bidet: false,
      bedSize: "twin",
      numBeds: 2,
      costPerNight: 328.15
      },
      {
      number: 18,
      roomType: "junior suite",
      bidet: false,
      bedSize: "king",
      numBeds: 2,
      costPerNight: 496.41
      },
    ])
  });

  it('should be able to make a new Booking with a customer', function() {
    customer1 = new Customer(sampleCustomersData.customers[0]);
    let roomSelection = hotel.getVacantRoomsByDate(selectedDate2)[2]
    expect(hotel.makeBooking(customer1.userID, roomSelection.number, selectedDate2 )).to.deep.equal(
      { userID: 1, date: '2022/10/31', roomNumber: 3 })
  });

  it('should make a list of booking confirmations for each customer', function() {
    customer1 = new Customer(sampleCustomersData.customers[0]);
    expect(hotel.generateBookingConfirmation(customer1)).to.deep.equal([
      {
      confirmationID: '5fwrgu4i7k55hl6sz',
      userID: 1,
      date: '2022/04/20',
      roomNumber: 15
      },
      {
      confirmationID: '5fwrgu4i7k55hl6t8',
      userID: 1,
      date: '2022/10/31',
      roomNumber: 12
      },
      {
      confirmationID: '5fwrgu4i7k55hl6tc',
      userID: 1,
      date: '2022/07/04',
      roomNumber: 13
      }
    ])
  });
  
  it('should keep track of how much a customer has spent on rooms', function() {
    expect(hotel.customerBillingStatments(customer1)).to.equal('890.57')
  });
});

