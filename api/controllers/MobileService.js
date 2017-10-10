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
  
  var event = args.body.value;   
  var eventId = "bb90f1ee-6c54-4b01-90e6-d701748f085" + EVENTS.length ;  

  event.id = eventId;
  event.createdOn = (new Date()).toISOString();
  event.resident = USERS.find(function(user){
    return user.id == event.resident.id;
  });
  event.updates = [];  

  if (event.resident) {
    EVENTS.push(event);
    res.location('/sync/event/' + eventId);
    res.end();  
  } else {
    res.status(422);
    res.end({status: 422, error: "Invalid resident information"});
  }  
};

module.exports.getActivityEditions = function (args, res, next) {
  /**
   * parameters expected in the args:
  * activityId (UUID)
  **/
};

module.exports.createActivityEdition = function (args, res, next) {
  
};

module.exports.createAppointment = function (args, res, next) {
  /**
   * parameters expected in the args:
  * activityId (UUID)
  * body (Consultation)
  **/
  // no response value expected for this operation  
};

module.exports.getActivityAppointments = function (args, res, next) {
  
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
};

module.exports.addActivityEditionParticipant = function (args, res, next) {
  /**
   * parameters expected in the args:
  * editionId (UUID)
  * body (ActivityParticipation)
  **/
  // no response value expected for this operation  
  res.end(); 
  
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


