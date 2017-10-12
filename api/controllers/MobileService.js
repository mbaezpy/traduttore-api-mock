'use strict';

var db = require('./db');



module.exports.getCalendarEvents = function (args, res, next) {
/**
  * parameters expected in the args:
  * dateFrom (Date)
  * dateTo (Date)
  * calendarType (List)
  * limit (Integer)
  * skip (Integer)
  **/  
  
  var examples = {};
  examples['application/json'] = db.CALENDAR_ENTRIES; 
  
  res.setHeader('Content-Type', 'application/json');
  
  if (Object.keys(examples).length > 0) {      
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }    
  
};

module.exports.getPNEvent = function (args, res, next) {
/**
  * parameters expected in the args:
  * eventId (UUID)
  **/  
  
  var eventId = args.eventId.value;
  var event = db.PNEEDS.find(function(item){
    return item.id == eventId;
  });  
  
  var examples = {};
  examples['application/json'] = event; 
  
  res.setHeader('Content-Type', 'application/json');
  
  if (event){  
    if (Object.keys(examples).length > 0) {      
      res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
    } else {
      res.end();
    }  
  } else {
    res.status(404);
    res.end({status: 404, error: "Event not found"});    
  }  
  
};

module.exports.getHSEvent = function (args, res, next) {
/**
  * parameters expected in the args:
  * eventId (UUID)
  **/  
  
  var eventId = args.eventId.value;
  var event = db.HSTATUS.find(function(item){
    return item.id == eventId;
  });  
  
  var examples = {};
  examples['application/json'] = event; 
  
  res.setHeader('Content-Type', 'application/json');
  
  if (event){  
    if (Object.keys(examples).length > 0) {      
      res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
    } else {
      res.end();
    }  
  } else {
    res.status(404);
    res.end({status: 404, error: "Event not found"});    
  }  
  
};

module.exports.getActivityById = function (args, res, next) {
  /**
   * parameters expected in the args:
  * activityId (UUID)
  **/  
  var activityId = args.activityId.value;
  var activity = db.ACTIVITIES.find(function(item){
    return item.id == activityId;
  });  
  
  var examples = {};
  examples['application/json'] = activity; 
  
  res.setHeader('Content-Type', 'application/json');
  
  if (activity){  
    if (Object.keys(examples).length > 0) {      
      res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
    } else {
      res.end();
    }  
  } else {
    res.status(404);
    res.end({status: 404, error: "Activity not found"});    
  }  
  
};

module.exports.updateActivity = function (args, res, next) {
/**
  * parameters expected in the args:
  * activityId (UUID)
  * body (Activity)
  **/    
  var activityId = args.activityId.value;  
  var body = args.body.value; 
  
  var activity = db.ACTIVITIES.find(function(item){
    return item.id == activityId;
  }); 
  
  //TODO: Implement update function
  
  if (!activity){
    res.status(404);
    res.setHeader('Content-Type', 'application/json');
    res.end({status: 404, error: "Activity not found"});        
    
  } else {  
    res.end();  
  }
    
};

module.exports.createActivity = function (args, res, next) {
/**
  * parameters expected in the args:
  * body (Activity)
  **/    
  
  var activity = args.body.value;   
  var activityId = "3000f1ee-6c54-4b01-90e6-d701748f085" + db.ACTIVITIES.length ;  
  

  activity.id = activityId;
  activity.createdOn = (new Date()).toISOString();
  activity.organisedBy = db.USERS[1];  
  activity.editions = [];
  
  if (activity.canRequestAppointments){
    activity.appointmentRequests = [];
  }

  if (activity) {
    db.ACTIVITIES.push(activity);
    res.location('/activity/' + activityId);
    res.end();  
  } else {
    res.status(422);
    res.end({status: 422, error: "Invalid information"});
  }  
};

module.exports.getActivityEditions = function (args, res, next) {
/**
  * parameters expected in the args:
  * activityId (UUID)
  **/
  
  var activityId = args.activityId.value;
  var activity = db.ACTIVITIES.find(function(item){
    return item.id == activityId;
  });  
  
  var examples = {};
  examples['application/json'] = activity.editions; 
  
  res.setHeader('Content-Type', 'application/json');
  
  if (activity){  
    if (Object.keys(examples).length > 0) {      
      res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
    } else {
      res.end();
    }  
  } else {
    res.status(404);
    res.end({status: 404, error: "Activity not found"});    
  }    
  
};

module.exports.createActivityEdition = function (args, res, next) {
/**
  * parameters expected in the args:
  * activityId (UUID)
  * body (ActivityEdition)
  **/  
  var edition = args.body.value;   
  var activityId = args.activityId.value;
  
  var editionId = "1000f1ee-6c54-4b01-90e6-d701748f085" + db.ACTIVITY_EDITIONS.length ;    

  var activity = db.ACTIVITIES.find(function(item){
    return item.id == activityId;
  });     
  
  edition.id = editionId;
  edition.comments = [];
  edition.multimedia = [];
  
  if (edition.canRequestAppointments){
    edition.appointments = [];
  } else {
    edition.participants = [];
  }  

  if (activity) {
    activity.editions.push(edition);  
    db.ACTIVITY_EDITIONS.push(edition);
    res.location('/activity_edition/' + editionId);
    res.end();  
  } else {
    res.status(422);
    res.setHeader('Content-Type', 'application/json');
    res.end({status: 422, error: "Invalid activity information"});
  }  
};

module.exports.createAppointment = function (args, res, next) {
/**
  * parameters expected in the args:
  * activityId (UUID)
  * body (Consultation)
  **/
  // no response value expected for this operation  
  var appointment = args.body.value;   
  var activityId = args.activityId.value;
  
  var appointmentId = "7790f1ee-6c54-4b01-90e6-d701748f085" + CONSULTATIONS.length ;    

  var activity = db.ACTIVITIES.find(function(item){
    return item.id == activityId;
  });  
  
  appointment.id = appointmentId;
  appointment.requestedOn = (new Date()).toISOString();
  appointment.staffComment = [];
  appointment.requestedBy = db.USERS[0];
    
  
  if (activity) {
    activity.appointmentRequests.push(appointment);  
    db.CONSULTATIONS.push(appointment);
    res.location('/appointment/' + appointmentId);
    res.end();  
  } else {
    res.status(422);
    res.setHeader('Content-Type', 'application/json');
    res.end({status: 422, error: "Invalid activity information"});
  }    
  
};

module.exports.getActivityAppointments = function (args, res, next) {
/**
  * parameters expected in the args:
  * activityId (UUID)
  **/
  
  var activityId = args.activityId.value;
  var activity = db.ACTIVITIES.find(function(item){
    return item.id == activityId;
  });  
  
  var examples = {};
  examples['application/json'] = activity.appointmentRequests; 
  
  res.setHeader('Content-Type', 'application/json');
  
  if (activity && activity.canRequestAppointments){  
    if (Object.keys(examples).length > 0) {      
      res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
    } else {
      res.end();
    }  
  } else if (activity){
    res.status(422);
    res.end({status: 404, error: "Activity does not support appointments"});        
  } else {
    res.status(404);
    res.end({status: 404, error: "Activity not found"});    
  }      
};

module.exports.getActivityEditionById = function (args, res, next) {
/**
  * parameters expected in the args:
  * editionId (UUID)
  **/  
  var editionId = args.editionId.value;
  var edition = db.ACTIVITY_EDITIONS.find(function(item){
    return item.id == editionId;
  });  
  
  var examples = {};
  examples['application/json'] = edition; 
  
  res.setHeader('Content-Type', 'application/json');
  
  if (edition){  
    if (Object.keys(examples).length > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
    } else {
      res.end();
    }  
  } else {
    res.status(404);
    res.end({status: 404, error: "Activity edition not found"});    
  }  
};

module.exports.updateActivityEdition = function (args, res, next) {
/**
  * parameters expected in the args:
  * editionId (UUID)
  * body (ActivityEdition)
  **/    
  var editionId = args.editionId.value;
  var body = args.body.value; 
  
  var edition = db.ACTIVITY_EDITIONS.find(function(item){
    return item.id == editionId;
  });
  
  //TODO: Implement update function
  
  if (!edition){
    res.status(404);
    res.setHeader('Content-Type', 'application/json');
    res.end({status: 404, error: "Event update not found"});        
    
  } else {  
    res.end();  
  }
    
};

module.exports.getActivityEditionParticipations = function (args, res, next) {
/**
  * parameters expected in the args:
  * editionId (UUID)
  **/  
  
  var editionId = args.editionId.value;
  var edition = db.ACTIVITY_EDITIONS.find(function(item){
    return item.id == editionId;
  });  
  
  var examples = {};
  examples['application/json'] = edition.participants; 
  
  res.setHeader('Content-Type', 'application/json');
  
  if (activity && ! activity.canRequestAppointments){  
    if (Object.keys(examples).length > 0) {      
      res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
    } else {
      res.end();
    }  
  } else if (activity){
    res.status(422);
    res.end({status: 404, error: "Activity does not support participations"});        
  } else {
    res.status(404);
    res.end({status: 404, error: "Activity not found"});    
  }     
};

module.exports.addActivityEditionParticipant = function (args, res, next) {
/**
  * parameters expected in the args:
  * editionId (UUID)
  * body (ActivityParticipation)
  **/
  // no response value expected for this operation    

  var participation = args.body.value;   
  var editionId = args.editionId.value;
  
  var participationId = "8890f1ee-6c54-4b01-90e6-d701748f085" + ACTIVITY_PARTICIPATIONS.length ;    

  var edition = db.ACTIVITY_EDITIONS.find(function(item){
    return item.id == editionId;
  });  
  
  participation.id = participationId;
  participation.createdOn = (new Date()).toISOString();
  participation.participant = db.USERS.find(function(item){
    return item.id == participation.participant.id;
  });
        
  
  if (edition && participation.participant) {
    edition.participations.push(participation);  
    db.ACTIVITY_PARTICIPATIONS.push(participation);
    res.location('/activity_participation/' + participationId);
    res.end();  
  } else {
    res.status(422);
    res.setHeader('Content-Type', 'application/json');
    res.end({status: 422, error: "Invalid edition or participant information"});
  }     
  
};

module.exports.getActivityEditionParticipationById = function (args, res, next) {
  /**
   * parameters expected in the args:
  * participationId (UUID)
  **/
  var participationId = args.participationId.value;
  var participation = db.ACTIVITY_PARTICIPATIONS.find(function(item){
    return item.id == participationId;
  });  
  
  var examples = {};
  examples['application/json'] = participation; 
  
  res.setHeader('Content-Type', 'application/json');
  
  if (participation){  
    if (Object.keys(examples).length > 0) {      
      res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
    } else {
      res.end();
    }  
  } else {
    res.status(404);
    res.end({status: 404, error: "Activity Participation not found"});    
  }  
};

module.exports.updateActivityEditionParticipation = function (args, res, next) {
  /**
   * parameters expected in the args:
  * participationId (UUID)
  * body (ActivityParticipation)
  **/
  // no response value expected for this operation  
  var participationId = args.participationId.value;
  var body = args.body.value; 
  
  var participation = db.ACTIVITY_PARTICIPATIONS.find(function(item){
    return item.id == participationId;
  });
  
  //TODO: Implement update function
  
  if (!participation){
    res.status(404);
    res.setHeader('Content-Type', 'application/json');
    res.end({status: 404, error: "Activity Participation not found"});        
    
  } else {  
    res.end();  
  }
    
};

module.exports.getAppointmentById = function (args, res, next) {
  /**
   * parameters expected in the args:
  * appointmentId (UUID)
  **/  
  var appointmentId = args.appointmentId.value;
  var appointment = db.CONSULTATIONS.find(function(item){
    return item.id == appointmentId;
  });  
  
  var examples = {};
  examples['application/json'] = appointment; 
  
  res.setHeader('Content-Type', 'application/json');
  
  if (appointment){  
    if (Object.keys(examples).length > 0) {      
      res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
    } else {
      res.end();
    }  
  } else {
    res.status(404);
    res.end({status: 404, error: "Appointment not found"});    
  }  
};

module.exports.updateAppointment = function (args, res, next) {
  /**
   * parameters expected in the args:
  * appointmentId (UUID)
  * body (Consultation)
  **/
  // no response value expected for this operation  
  var appointmentId = args.appointmentId.value;
  var body = args.body.value; 
  
  var appointment = db.CONSULTATIONS.find(function(item){
    return item.id == appointmentId;
  });
  
  //TODO: Implement update function
  
  if (!appointment){
    res.status(404);
    res.setHeader('Content-Type', 'application/json');
    res.end({status: 404, error: "Event update not found"});        
    
  } else {  
    res.end();  
  }
    
};

exports.createFeedback = function(args, res, next) {
  /**
   * parameters expected in the args:
  * body (Feedback)
  **/
  // no response value expected for this operation
  res.end();
}

exports.createFeedbackComment = function(args, res, next) {
  /**
   * parameters expected in the args:
  * feedbackId (UUID)
  * body (UserComment)
  **/
  // no response value expected for this operation
  res.end();
}

exports.getCommentById = function(args, res, next) {
  /**
   * parameters expected in the args:
  * commentId (UUID)
  **/
    var examples = {};
  examples['application/json'] = {
  "comment" : "The resident is doing great"
};
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
}

exports.getFeedbackById = function(args, res, next) {
  /**
   * parameters expected in the args:
  * feedbackId (UUID)
  **/
  
}

exports.getFeedbackComments = function(args, res, next) {
  /**
   * parameters expected in the args:
  * feedbackId (UUID)
  **/

  
}

exports.getFeedbacks = function(args, res, next) {
  /**
   * parameters expected in the args:
  * feedbackOn (List)
  * limit (Integer)
  * skip (Integer)
  **/

}

exports.updateComment = function(args, res, next) {
  /**
   * parameters expected in the args:
  * commentId (UUID)
  * body (UserComment)
  **/
  // no response value expected for this operation
  res.end();
}

exports.updateFeedback = function(args, res, next) {
  /**
   * parameters expected in the args:
  * feedbackId (UUID)
  * body (Feedback)
  **/
  // no response value expected for this operation
  res.end();
}


