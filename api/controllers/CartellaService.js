'use strict';

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
      "id": "d290f1ee-6c54-4b01-90e6-d701748f0851",
      "name": "string",
      "description": "string",
      "currentSetting": {
        "id": "d290f1ee-6c54-4b01-90e6-d701748f0851",
        "name": "string",
        "description": "string",
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
        "shareInCall": true,
        "shareInSM": true,
        "extraParams": [
          {
            "id": "d290f1ee-6c54-4b01-90e6-d701748f0851",
            "name": "string",
            "title": "string",
            "type": "InputText"
        }
      ]
      }
    },
    "sendTo": [
      {
        "id": "d290f1ee-6c54-4b01-90e6-d701748f0851",
        "contact": {
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
        "relationship": "dougther",
        "preference": {
          "shareWithMe": true,
          "shareInApp": true,
          "shareInCall": true,
          "shareInSM": true
        },
        "persona": {
          "id": "d290f1ee-6c54-4b01-90e6-d701748f0851",
          "name": "string",
          "suggestion": "string",
          "expectedReactions": [
          "worry"
        ],
          "members": [
            {
              "id": "d290f1ee-6c54-4b01-90e6-d701748f0851",
              "name": "string",
              "role": "resident",
              "contactInfos": [
                {
                  "type": "email",
                  "value": "rsadmin@gmail.com"
              }
            ]
          }
        ]
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