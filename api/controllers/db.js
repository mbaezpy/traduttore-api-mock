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

var SYNC_INFOS = [{

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
  }
];

var EVENT_TYPES = [
{
    "id": "1190f1ee-6c54-4b01-90e6-d701748f0850",
    "name": "Lunch",
    "description": "Daily lunch",
    "explanation": "Meals are personalised to the nutritional needs of each resident. Residents are expected to eat 75% of their meals.",
    "category": "Meals",
    "startDate": "2017-10-09T13:02:06Z",
    "repeatsEvery": "daily",
    "repeatsOn": [
      "Monday",
      "Tuesday"
    ]
  },
  {
    "id": "1190f1ee-6c54-4b01-90e6-d701748f0851",
    "name": "Blood pressure",
    "description": "Blood pressure measurement",
    "explanation": "Values above 110 are considered critical",
    "category": "Vital signs",
    "startDate": "2017-10-09T13:02:06Z",
    "repeatsEvery": "daily",
    "repeatsOn": [
      "Monday",
      "Tuesday"
    ]
  }   
];

var COMMENTS = [
{
    "id": "2290f1ee-6c54-4b01-90e6-d701748f0850",
    "createdBy": USERS[1],
    "createdOn": "2017-10-09T13:02:06Z",
    "comment": "The resident completed the full meal and enjoyed it!"
},  
{
    "id": "2290f1ee-6c54-4b01-90e6-d701748f0851",
    "createdBy": USERS[1],
    "createdOn": "2017-10-09T13:02:06Z",
    "comment": "Blood pressure is within values for the resident. Nothing to worry about."
},
{
    "id": "2290f1ee-6c54-4b01-90e6-d701748f0852",
    "createdBy": USERS[1],
    "createdOn": "2017-10-09T13:02:06Z",
    "comment": "We have comfirmed your appointment. Please be on time."
},
{
    "id": "2290f1ee-6c54-4b01-90e6-d701748f0853",
    "createdBy": USERS[1],
    "createdOn": "2017-10-09T13:02:06Z",
    "comment": "We'll be praying to what the Pope recommended."
}  
];

var EVENT_DETAILS = [
{
    "id": "3390f1ee-6c54-4b01-90e6-d701748f0850",
    "createdBy": USERS[1],
    "name": "Meal Completeness",
    "description": "Portion of the meal eaten",
    "valueText": "",
    "valueNum": 100
},
{
    "id": "3390f1ee-6c54-4b01-90e6-d701748f0851",
    "createdBy": USERS[1],
    "name": "Blood pressure, lower value",
    "description": "Blood pressure, lower value",
    "valueText": "",
    "valueNum": 80
},
{
    "id": "3390f1ee-6c54-4b01-90e6-d701748f0851",
    "createdBy": USERS[1],
    "name": "Blood pressure, higher value",
    "description": "Blood pressure, higher value",
    "valueText": "",
    "valueNum": 100
}    
];

var PNEEDS = [
{
  "id": "4490f1ee-6c54-4b01-90e6-d701748f0850",
  "createdOn": "2017-10-09T13:02:06Z",
  "type": EVENT_TYPES[0],
  "staffComment": COMMENTS[0],
  "indicator": EVENT_DETAILS[0],
  "details": [EVENT_DETAILS[0]]
}
];

var HS_UPDATES = [
{
  "id": "5590f1ee-6c54-4b01-90e6-d701748f0850",
  "createdOn": "2017-10-09T13:02:06Z",
  "staffComment": COMMENTS[1],
  "indicators": [EVENT_DETAILS[1], EVENT_DETAILS[2]],
  "severity": "normal values",
  "details": [EVENT_DETAILS[1], EVENT_DETAILS[2]]
}  
];

var HSTATUS = [
{
  "id": "6690f1ee-6c54-4b01-90e6-d701748f0850",
  "createdOn": "2017-10-09T13:02:06Z",
  "type": EVENT_TYPES[1] ,
  "currentIndicators": [EVENT_DETAILS[1], EVENT_DETAILS[2]],
  "currentSeverity": "normal values",
  "updates": [HS_UPDATES[0]]
}  
];

var CONSULTATIONS =[
{
  "id": "7790f1ee-6c54-4b01-90e6-d701748f0850",
  "requestedOn": "2017-10-09T13:02:06Z",
  "requestedFor": "2017-10-09T13:02:06Z",
  "scheduledFor": "2017-10-09T13:02:06Z",
  "staffComment": COMMENTS[2],
  "requestedBy": USERS[0]
}  
];

var ACTIVITY_PARTICIPATIONS = [
{
  "id": "8890f1ee-6c54-4b01-90e6-d701748f0850",
  "participant": USERS[0],
  "createdOn": "2017-10-09T13:02:06Z",
  "participatedOn": "2017-10-09T13:02:06Z",
  "status": "confirmed",
  "role": "attendee",
  "feedback": "ParticipationFeeedback"
}  
];

var MULTIMEDIA = [
{
  "id": "9990f1ee-6c54-4b01-90e6-d701748f0850",
  "uploadedBy": USERS[1],
  "uploadedOn": "2017-10-09T13:02:06Z",
  "mimeType": "image/jpeg",
  "url": "http://fake.com/image.jpg"
}  
];

var ACTIVITY_EDITIONS = [
{
  "id": "1000f1ee-6c54-4b01-90e6-d701748f0850",
  "startDate": "2017-10-09T13:02:06Z",
  "endDate": "2017-10-09T13:02:06Z",
  "status": "finished",
  "location": "Room 22, Building B",
  "canVolunteer": true,
  "canParticipate": true,
  "canRequestAppointments": false,
  "participants": [ACTIVITY_PARTICIPATIONS[0]],
  "appointments": [],
  "comments": [COMMENTS[3]],
  "multimedia": [MULTIMEDIA[0]]
},
{
  "id": "2000f1ee-6c54-4b01-90e6-d701748f0851",
  "startDate": "2017-12-09T13:02:06Z",
  "endDate": "2017-10-09T13:02:06Z",
  "status": "confirmed",
  "location": "Room 1, Building A",
  "canVolunteer": false,
  "canParticipate": false,
  "canRequestAppointments": true,
  "participants": [],
  "appointments": [CONSULTATIONS[0]],
  "comments": [],
  "multimedia": []
}  
];

var ACTIVITIES = [
{
  "id": "3000f1ee-6c54-4b01-90e6-d701748f0850",
  "createdOn": "2017-10-09T13:02:06Z",
  "duration": "2",
  "name": "Recita del rosario",
  "description": "Recita del santo rosario organizato dalle nonne",
  "benefits": "Spiritual support is important",
  "category": "Religious",
  "repeatsEvery": "weekly",
  "repeatsOn": [
    "Monday",
    "Tuesday"
  ],
  "location": "Room 10, Building C",
  "canVolunteer": true,
  "canParticipate": true,
  "canRequestAppointments": true,
  "organisedBy": USERS[1],
  "appointmentRequests": [],
  "editions": [ACTIVITY_EDITIONS[0]]
},
{
  "id": "3000f1ee-6c54-4b01-90e6-d701748f0851",
  "createdOn": "2017-10-09T13:02:06Z",
  "duration": "3",
  "name": "Consultations with Dr. Kirk",
  "description": "Dr. Kirk is the psychologist of the RSA. Consultations are free of charge",
  "benefits": "Expert support is important to pass through difficult times",
  "category": "Consultations",
  "repeatsEvery": "weekly",
  "repeatsOn": [
    "Thursday"
  ],
  "location": "Room 1, Building A",
  "canVolunteer": true,
  "canParticipate": true,
  "canRequestAppointments": true,
  "organisedBy": USERS[1],
  "appointmentRequests": [],
  "editions": [ACTIVITY_EDITIONS[1]]
}   
];


var CALENDAR_ENTRIES = [];


exports.EVENTS = EVENTS;
exports.EVENT_UPDATES = EVENT_UPDATES;
exports.USERS = USERS;
exports.SYNC_INFOS = SYNC_INFOS;

exports.CALENDAR_ENTRIES = CALENDAR_ENTRIES;
exports.PNEEDS = PNEEDS;
exports.EVENT_TYPES = EVENT_TYPES;
exports.HSTATUS = HSTATUS;
exports.HS_UPDATES = HS_UPDATES;
exports.COMMENTS = COMMENTS;

exports.ACTIVITIES = ACTIVITIES;
exports.ACTIVITY_EDITIONS = ACTIVITY_EDITIONS;
exports.CONSULTATIONS = CONSULTATIONS;
exports.ACTIVITY_PARTICIPATIONS = ACTIVITY_PARTICIPATIONS;

