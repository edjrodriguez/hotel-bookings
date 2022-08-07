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

  it.only('Should be able to filter available rooms by selected date 1 "2022/04/20', function() {
    expect(hotel.getVacantRoomsByDate(selectedDate1)).to.deep.equal([
      {
        number: 12,
        type: 'single room',
        bidet: false,
        bedSize: 'twin',
        numBeds: 2,
        costPerNight: 172.09
      },
      {
        number: 14,
        type: 'residential suite',
        bidet: false,
        bedSize: 'twin',
        numBeds: 1,
        costPerNight: 457.88
      },
      {
        number: 9,
        type: 'single room',
        bidet: true,
        bedSize: 'queen',
        numBeds: 1,
        costPerNight: 200.39
      },
      {
        number: 5,
        type: 'single room',
        bidet: true,
        bedSize: 'queen',
        numBeds: 2,
        costPerNight: 340.17
      },
      {
        number: 13,
        type: 'single room',
        bidet: false,
        bedSize: 'queen',
        numBeds: 2,
        costPerNight: 423.92
      },
     {
        number: 18,
        type: 'junior suite',
        bidet: false,
        bedSize: 'king',
        numBeds: 2,
        costPerNight: 496.41
      }
    ])
  
  });

  it('Should be able to filter available rooms by selected date 2 "2022/10/31', function() {
  expect(hotel.getVacantRoomsByDate(selectedDate2)).to.deep.equal([
    {
    number: 15,
    type: 'residential suite',
    bidet: false,
    bedSize: 'full',
    numBeds: 1,
    costPerNight: 294.56
  },
   {
    number: 24,
    type: 'suite',
    bidet: false,
    bedSize: 'queen',
    numBeds: 1,
    costPerNight: 327.24
  },
  {
    number: 12,
    type: 'single room',
    bidet: false,
    bedSize: 'twin',
    numBeds: 2,
    costPerNight: 172.09
  },
  {
    number: 7,
    type: 'single room',
    bidet: false,
    bedSize: 'queen',
    numBeds: 2,
    costPerNight: 231.46
  },
  {
    number: 13,
    type: 'single room',
    bidet: false,
    bedSize: 'queen',
    numBeds: 2,
    costPerNight: 423.92
  },
   {
    number: 18,
    type: 'junior suite',
    bidet: false,
    bedSize: 'king',
    numBeds: 2,
    costPerNight: 496.41
  }])
});

  it('should be able to add Rooms to the available room numbers', function() {
    hotel.getVacantRoomsByDate(selectedDate1)
    expect(hotel.notAvailableRoomNumbers).to.deep.equal([12, 14, 9, 5, 13, 18 ])
  });

  it('Should be able to filter available rooms by residential type', function() {
    hotel.getVacantRoomsByDate(selectedDate2)
    expect(hotel.filterAvailableRoomsByType("residential suite")).to.deep.equal([
      {
        number: 15,
        type: 'residential suite',
        bidet: false,
        bedSize: 'full',
        numBeds: 1,
        costPerNight: 294.56
      }
    ])
  });

  it('Should be able to filter available rooms by single room type', function() {
    hotel.getVacantRoomsByDate(selectedDate2)
    expect(hotel.filterAvailableRoomsByType("single room")).to.deep.equal([
      {
        number: 12,
        type: 'single room',
        bidet: false,
        bedSize: 'twin',
        numBeds: 2,
        costPerNight: 172.09
      },
       {
        number: 7,
        type: 'single room',
        bidet: false,
        bedSize: 'queen',
        numBeds: 2,
        costPerNight: 231.46
      },
      {
        number: 13,
        type: 'single room',
        bidet: false,
        bedSize: 'queen',
        numBeds: 2,
        costPerNight: 423.92
      }
    ])
  });

  it('should be able to make a new Booking with a customer', function() {
    customer1 = new Customer(sampleCustomersData.customers[0]);
    let roomSelection = hotel.getVacantRoomsByDate(selectedDate2)[2]
    expect(hotel.makeBooking(customer1, roomSelection, selectedDate2 )).to.deep.equal(
      { userID: 1, date: '2022/10/31', roomNumber: 12 })
  });

  it('should make a list of booking confirmations for each customer', function() {
    customer1 = new Customer(sampleCustomersData.customers[0]);

    expect(hotel.generateBookingConfirmation(customer1)).to.deep.equal(
      [
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
      ]
    )
  });
  
it('should keep track of how much a customer has spent on rooms', function() {
  expect(hotel.customerBillingStatments(customer1)).to.equal('890.57')
});



});

