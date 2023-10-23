"use strict";


function Service(id, type, description, serviceTime) {
    this.id = id;
    this.type = type;
    this.description = description;
    this.serviceTime = serviceTime;
}

function Counter(id, services) {
    this.id = id;
    this.services = services;
}

function Ticket(id, counterId, timestampCreated,timestampFinished,serviceType,employeeId,status) {
    this.id = id;
    this.counterId = counterId;
    this.timestampCreated = timestampCreated;
    this.timestampFinished = timestampFinished;
    this.serviceType = serviceType;
    this.employeeId = employeeId;
    this.status = status;
}


module.exports = { Service,Counter,Ticket};