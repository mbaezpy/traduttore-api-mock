'use strict';

var db = null;


exports.setDB = function(paramDB){
  db = paramDB;  
}

exports.getShareable = function (args, res, next) {
  /**
   * parameters expected in the args:
   * eventTypeId (UUID)
   * residentId (UUID)
   **/
  var examples = {};
  examples['application/json'] = db.SYNC_INFOS[0];
  
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }

}

exports.postEvent = function (args, res, next) {
  /**
   * parameters expected in the args:
  * body (EventSharing)
  **/
  // no response value expected for this operation
    
  var event = args.body.value;   
  var eventId = "bb90f1ee-6c54-4b01-90e6-d701748f085" + db.EVENTS.length ;  

  event.id = eventId;
  event.createdOn = (new Date()).toISOString();
  event.resident = db.USERS.find(function(user){
    return user.id == event.resident.id;
  });
  event.updates = [];  

  if (event.resident) {
    db.EVENTS.push(event);
    res.location('/sync/event/' + eventId);
    res.end();  
  } else {
    res.status(422);
    res.setHeader('Content-Type', 'application/json');
    res.end({status: 422, error: "Invalid resident information"});
  }
  
};

exports.getEvents = function (args, res, next) {
/**
  * parameters expected in the args:
  * delegatedTo (UUID)
  * optSnooze (Boolean)
  * limit (Integer)
  * skip (Integer)
  **/
  
  var examples = {};
  examples['application/json'] = db.EVENTS;
  
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }  
  
};

exports.getEventById = function (args, res, next) {
  
  var eventId = args.eventId.value;
  var event = db.EVENTS.find(function(item){
    return item.id == eventId;
  });  
  
  var examples = {};
  examples['application/json'] = event; 
  
  if (event){  
    if (Object.keys(examples).length > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
    } else {
      res.end();
    }  
  } else {
    res.status(404);
    res.setHeader('Content-Type', 'application/json');
    res.end({status: 404, error: "Event not found"});    
  }
  
};


var pushToCollegamenti = function(update){
  
  if (update.status != "shared") return;
  
  var eventId = "4490f1ee-6c54-4b01-90e6-d701748f085" + db.PNEEDS.length;
  
  var comment = {
    "id": "2290f1ee-6c54-4b01-90e6-d701748f085" + db.COMMENTS.length,
    "createdBy": update.createdBy,
    "createdOn": update.createdOn,
    "comment": update.staffComment
  };
  
  var eventDetail = {
    "id": "3390f1ee-6c54-4b01-90e6-d701748f085" + db.EVENT_DETAILS.length,
    "createdBy": update.createdBy,
    "name": update.updateData[0].name,
    "description": "Portion of the meal eaten",
    "valueText": "",
    "valueNum": parseInt(update.updateData[0].value)
  };
  
  
  var pneeds = {
    "id": eventId,
    "createdOn": "2017-10-09T13:02:06Z",
    "type": db.EVENT_TYPES[0],
    "staffComment": comment,
    "indicator": eventDetail,
    "details": [eventDetail]
  };  
  
  var calendarEntry = {
      "name": pneeds.type.name,
      "category": pneeds.type.category,
      "startDate": pneeds.createdOn,
      "endDate": pneeds.createdOn,
      "type": pneeds.type,
      "event": pneeds
    };

  db.CALENDAR_ENTRIES[0].pneeds.push(calendarEntry);
  
  db.PNEEDS.push(pneeds);
  
};


exports.postEventUpdate = function (args, res, next) {
  /**
   * parameters expected in the args:
  * eventId (UUID)
  * body (EventSharingUpdate)
  **/
  // no response value expected for this operation
  var update = args.body.value;   
  var eventId = args.eventId.value;
  
  var updateId = "cc90f1ee-6c54-4b01-90e6-d701748f0850" + db.EVENT_UPDATES.length ;    

  update.id = updateId;
  update.createdOn = (new Date()).toISOString();
  update.statusChangedOn = update.createdOn;
  update.createdBy = db.USERS[1];
  update.statusChangedBy = db.USERS[1];
  
  var event = db.EVENTS.find(function(item){
    return item.id == eventId;
  });
  

  if (event) {
    event.updates.push(update);  
    db.EVENT_UPDATES.push(event);
    pushToCollegamenti(update);
    
    res.location('/sync/event_update/' + updateId);    
    res.end();  
  } else {
    res.status(422);
    res.setHeader('Content-Type', 'application/json');
    res.end({status: 422, error: "Invalid event information"});
  }
};

exports.putEventUpdateById = function (args, res, next) {
  /**
   * parameters expected in the args:
  * updateId (UUID)
  * body (EventSharingUpdate)
  **/
  // no response value expected for this operation
  var updateId = args.updateId.value;
  var body = args.body.value; 
  
  var update = db.EVENT_UPDATES.find(function(item){
    return item.id == updateId;
  });
  
  //TODO: Implement update function
  
  if (!update){
    res.status(404);
    res.setHeader('Content-Type', 'application/json');
    res.end({status: 404, error: "Event update not found"});        
    
  } else {  
    res.end();  
  }
  
};

exports.getSharingSettingById = function (args, res, next) {
  var settingId = args.settingId.value;
  var setting = db.SHARING_SETTINGS.find(function(item){
    return item.id == settingId;
  });  
  
  var examples = {};
  examples['application/json'] = setting; 
  
  if (setting){  
    if (Object.keys(examples).length > 0) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
    } else {
      res.end();
    }  
  } else {
    res.status(404);
    res.setHeader('Content-Type', 'application/json');
    res.end({status: 404, error: "Sharing setting not found"});    
  }
  
};

var setifDef = function (o, n, k){
   return n[k] != undefined ? n[k] : o[k];  
};

exports.updateSharingSetting = function (args, res, next) {
  var settingId = args.settingId.value;
  var body = args.body.value; 
  
  var setting = db.SHARING_SETTINGS.find(function(item){
    return item.id == settingId;
  });  
  
  //TODO: Implement update function
  
  if (!setting){
    res.status(404);
    res.setHeader('Content-Type', 'application/json');
    res.end({status: 404, error: "Event update not found"});            
  } else {  
            
    setting.isShareable = setifDef(setting, body, "isShareable");
    setting.reqConfirmation = setifDef(setting, body, "reqConfirmation");
    setting.reqStaffComment = setifDef(setting, body, "reqStaffComment");
    setting.shareOnInsert = setifDef(setting, body, "shareOnInsert");
    setting.optSnooze = setifDef(setting, body, "optSnooze");
    setting.optCancel = setifDef(setting, body, "optCancel");
    setting.shareInApp = setifDef(setting, body, "shareInApp");
    setting.shareInCall = setifDef(setting, body, "shareInCall");    
    
    res.end();  
  }
  
};



