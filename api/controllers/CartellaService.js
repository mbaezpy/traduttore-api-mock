'use strict';

var EVENTS = [{
  "id": "dd90f1ee-6c54-4b01-90e6-d701748f0850",
  "eventIdCartella": "11",
  "resident": {
    "id": "d290f1ee-6c54-4b01-90e6-d701748f0851",
    "name": "string",
    "role": "resident",
    "contactInfos": [
      {
        "type": "email",
        "value": "rsadmin@gmail.com"
      }
    ]
  },
  "createdOn": "2017-10-09T12:01:10Z",
  "currentPhase": "string",
  "updates": [
    {
      "id": "d290f1ee-6c54-4b01-90e6-d701748f0851",
      "status": "shared",
      "phase": "string",
      "createdOn": "2017-10-09T12:01:10Z",
      "createdBy": {
        "id": "d290f1ee-6c54-4b01-90e6-d701748f0851",
        "name": "string",
        "role": "resident",
        "contactInfos": [
          {
            "type": "email",
            "value": "rsadmin@gmail.com"
          }
        ]
      },
      "statusChangedOn": "2017-10-09T12:01:10Z",
      "statusChangedBy": {
        "id": "d290f1ee-6c54-4b01-90e6-d701748f0851",
        "name": "string",
        "role": "resident",
        "contactInfos": [
          {
            "type": "email",
            "value": "rsadmin@gmail.com"
          }
        ]
      },
      "staffComment": "string",
      "staffInternalNote": "string",
      "sharedFrom": "string",
      "sharedInApp": true,
      "sharedInCall": true,
      "sharedInSM": true,
      "updateData": [
        {
          "id": "d290f1ee-6c54-4b01-90e6-d701748f0851",
          "name": "string",
          "value": "string"
        }
      ]
    }
  ]
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
            "name": "menu",
            "title": "Menu of the day",
            "type": "InputText"
        }]
      }
    },
    "sendTo": [
      {
        "id": "d290f1ee-6c54-4b01-90e6-d701748f0851",
        "contact": {
          "id": "e290f1ee-6c54-4b01-90e6-d701748f0851",
          "name": "Carla Sartori",
          "role": "resident",
          "contactInfos": [{
              "type": "email",
              "value": "carla@gmail.com"
          }]
        },
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
          "contact": {
            "id": "e290f1ee-6c54-4b01-90e6-d701748f0851",
            "name": "Carla Sartori",
            "role": "resident",
            "contactInfos": [{
                "type": "email",
                "value": "carla@gmail.com"
            }]
          }
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
    
  var event = args.body;    
  var eventId = "dd90f1ee-6c54-4b01-90e6-d701748f085" + EVENTS.length ;  
  event.id = eventId;
  
  EVENTS.push(event);
  
  res.location('/sync/event/' + eventId);
  
  res.end();  
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
  examples['application/json'] = [];
  
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
  res.end();  
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

