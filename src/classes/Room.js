class Room {
    constructor(roomsData) {
        this.number = roomsData.number;
        this.type = roomsData.roomType;
        this.bidet = roomsData.bidet;
        this.bedSize = roomsData.bedSize
        this.numBeds = roomsData.numBeds;
        this.costPerNight = roomsData.costPerNight
    }
}

export default Room