import chai from 'chai';
const expect = chai.expect;
import sampleRoomsData from '../src/data/sampleRooms';
import Room from '../src/classes/Room';

describe('Room', function() { 
  let room1;
  let room2;
  let room4;

  beforeEach(() => {
    room1 = new Room(sampleRoomsData.rooms[0]);
    room2 = new Room(sampleRoomsData.rooms[1]);
    room4 = new Room(sampleRoomsData.rooms[3]);
  });

  it('Should be a function', function(){
    expect(Room).to.be.a('function');
  });

  it('Should be a new instance of Room', function() {
    expect(room1).to.be.an.instanceOf(Room)
  });

  it('should have a room number', function() {
    expect(room1.number).to.equal(1)
    expect(room2.number).to.equal(2)
    expect(room4.number).to.equal(4)
  });

  it('should have a room type', function() {
    expect(room1.roomType).to.equal('residential suite')
    expect(room2.roomType).to.equal('suite')
    expect(room4.roomType).to.equal('single room')
  });

  it('should indicate if it has a bidet', function() {
    expect(room1.bidet).to.equal(true)
    expect(room2.bidet).to.equal(false)
    expect(room4.bidet).to.equal(false)
  });
  
  it('should indicate the bed size', function() {
    expect(room1.bedSize).to.equal("queen")
    expect(room2.bedSize).to.equal("full")
    expect(room4.bedSize).to.equal("queen")
  });

  it('should indicate the number of beds', function() {
    expect(room1.numBeds).to.equal(1)
    expect(room2.numBeds).to.equal(2)
    expect(room4.numBeds).to.equal(1)
  });

  it('should display the cost per night', function() {
    expect(room1.costPerNight).to.equal(358.4)
    expect(room2.costPerNight).to.equal(477.38)
    expect(room4.costPerNight).to.equal(429.44)
  });
});