'use strict';

var USERS = [
{
    "id": "aa90f1ee-6c54-4b01-90e6-d701748f0850",
    "name": "Carla Sartori",
    "role": "family",
    "contactInfos": [{
        "type": "email",
        "value": "carla@gmail.com"
    }]
},
{
    "id": "aa90f1ee-6c54-4b01-90e6-d701748f0851",
    "name": "Enrico Fermi",
    "role": "staff",
    "contactInfos": [{
        "type": "email",
        "value": "enrico@rsa.com"
    }]
},
{
    "id": "aa90f1ee-6c54-4b01-90e6-d701748f0852",
    "name": "Stefano Macci",
    "role": "resident",
    "contactInfos": [{
        "type": "email",
        "value": "stefano@libero.com"
    }]
}   
];

var EVENT_UPDATES = [
    {
      "id": "cc90f1ee-6c54-4b01-90e6-d701748f0850",
      "status": "shared",
      "phase": "closed",
      "createdOn": "2017-10-09T12:01:10Z",
      "createdBy": USERS[1],
      "statusChangedOn": "2017-10-09T12:01:10Z",
      "statusChangedBy": USERS[1],
      "staffComment": "The resident enjoyed the meal",
      "staffInternalNote": "No comments",
      "sharedFrom": "Data Entering",
      "sharedInApp": true,
      "sharedInCall": false,
      "sharedInSM": false,
      "updateData": [
        {
          "id": "0090f1ee-6c54-4b01-90e6-d701748f0850",
          "name": "meal-completeness",
          "value": "100"
        }
      ]
    }
]

var EVENTS = [{
  "id": "bb90f1ee-6c54-4b01-90e6-d701748f0850",
  "eventIdCartella": 11,
  "resident": USERS[2],
  "createdOn": "2017-10-09T12:01:10Z",
  "currentPhase": "closed",
  "updates": [EVENT_UPDATES[0]]
}];

exports.getShareable = function (args, res, next) {
  /**
   * parameters expected in the args:
   * eventTypeId (UUID)
   * residentId (UUID)
   **/
  var examples = {};
  examples['application/json'] = {

    "isShareable": true,
    "eventConfig": {
      "id": "a290f1ee-6c54-4b01-90e6-d701748f0851",
      "name": "Meals completion configuration",
      "description": "Configuration of the meals consumption event",
      "currentSetting": {
        "id": "b290f1ee-6c54-4b01-90e6-d701748f0851",
        "name": "Default meals completion configuration",
        "description": "Configuration of the meals consumption event",
        "startDate": "2017-10-09T08:35:40Z",
        "endDate": "2017-10-09T08:35:40Z",
        "isActive": true,
        "isShareable": true,
        "reqConfirmation": true,
        "reqStaffComment": true,
        "shareOnInsert": true,
        "optSnooze": true,
        "optCancel": true,
        "shareInApp": true,
        "shareInCall": false,
        "shareInSM": false,
        "extraParams": [{
            "id": "c290f1ee-6c54-4b01-90e6-d701748f0851",
            "name": "meal-completness",
            "title": "Meal completness",
            "type": "numeric"
        }]
      }
    },
    "sendTo": [
      {
        "id": "d290f1ee-6c54-4b01-90e6-d701748f0851",
        "contact": USERS[0],
        "relationship": "dougther",
        "preference": {
          "shareWithMe": true,
          "shareInApp": true,
          "shareInCall": false,
          "shareInSM": false
        },
        "persona": {
          "id": "d290f1ee-6c54-4b01-90e6-d701748f0851",
          "name": "Worrisome",
          "suggestion": "Explain the data with care, as it might affect the person",
          "expectedReactions": [
          "worry"
        ],
          "members": [{
          "id": "d290f1ee-6c54-4b01-90e6-d701748f0851",
          "contact": USERS[0]          
         }]
        }
    }
  ]
  };
  
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

exports.getEvents = function (args, res, next) {
/**
  * parameters expected in the args:
  * delegatedTo (UUID)
  * optSnooze (Boolean)
  * limit (Integer)
  * skip (Integer)
  **/
  
  var examples = {};
  examples['application/json'] = EVENTS;
  
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }  
  
};

exports.getEventById = function (args, res, next) {
  
  var examples = {};
  examples['application/json'] = EVENTS[0]; 
  
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }  
  
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
  
  var updateId = "cc90f1ee-6c54-4b01-90e6-d701748f0850" + EVENT_UPDATES.length ;    

  update.id = updateId;
  update.createdOn = (new Date()).toISOString();
  update.statusChangedOn = update.createdOn;
  update.createdBy = USERS[1];
  update.statusChangedBy = USERS[1];
  
  var event = EVENTS.find(function(item){
    return item.id == eventId;
  });
  

  if (event) {
    event.updates.push(update);  
    EVENT_UPDATES.push(event);
    res.location('/sync/event_update/' + updateId);
    res.end();  
  } else {
    res.status(422);
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
  res.end();  
  
};

