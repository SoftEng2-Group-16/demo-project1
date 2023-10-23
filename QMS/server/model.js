"use strict";


function Service(id, type, description) {
    this.id = id;
    this.type = type;
    this.description = description;
}

function Counter(id, services) {
    this.id = id;
    this.type = services;
}

function Ticket(id, counterId, timestampCreated,timestampFinished,serviceType,employeeId) {
    this.id = id;
    this.counterId = counterId;
    this.timestampCreated = timestampCreated;
    this.timestampFinished = timestampFinished;
    this.serviceType = serviceType;
    this.employeeId = employeeId;
}


module.exports = { Service,Counter,Ticket};