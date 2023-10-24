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

function getCurrentTimestamp() {
    const now = new Date();
  
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
    const year = now.getFullYear();
    
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }

export { Service,Counter,Ticket,getCurrentTimestamp};