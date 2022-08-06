import chai from 'chai';
const expect = chai.expect;
import sampleCustomersData from '../src/data/sampleCustomers';
import Customer from '../src/classes/Customer';
import Booking from '../src/classes/Booking';




describe('Customer', function() { 
  let customer1;
  let customer3;
  let selectedDate1;


  beforeEach(() => {
    customer1 = new Customer(sampleCustomersData.customers[0]);
    customer3 = new Customer(sampleCustomersData.customers[2]);
    selectedDate1 = "2022/04/20" 
 

   });

it('Should be a function', function(){
  expect(Customer).to.be.a('function');
});

it('Should be a new instance of Customer', function() {
  expect(customer1).to.be.an.instanceOf(Customer)
});

it('should have a userID', function() {
  expect(customer1.userID).to.equal(1)
  expect(customer3.userID).to.equal(3)
  
});

it('should have a name', function() {
  expect(customer1.name).to.equal("Leatha Ullrich")
  expect(customer3.name).to.equal("Kelvin Schiller")
});




});
