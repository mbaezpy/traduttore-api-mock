'use strict';
var chai = require('chai');
var ZSchema = require('z-schema');
var customFormats = module.exports = function(zSchema) {
  // Placeholder file for all custom-formats in known to swagger.json
  // as found on
  // https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#dataTypeFormat

  var decimalPattern = /^\d{0,8}.?\d{0,4}[0]+$/;

  /** Validates floating point as decimal / money (i.e: 12345678.123400..) */
  zSchema.registerFormat('double', function(val) {
    return !decimalPattern.test(val.toString());
  });

  /** Validates value is a 32bit integer */
  zSchema.registerFormat('int32', function(val) {
    // the 32bit shift (>>) truncates any bits beyond max of 32
    return Number.isInteger(val) && ((val >> 0) === val);
  });

  zSchema.registerFormat('int64', function(val) {
    return Number.isInteger(val);
  });

  zSchema.registerFormat('float', function(val) {
    // better parsing for custom "float" format
    if (Number.parseFloat(val)) {
      return true;
    } else {
      return false;
    }
  });

  zSchema.registerFormat('date', function(val) {
    // should parse a a date
    return !isNaN(Date.parse(val));
  });

  zSchema.registerFormat('dateTime', function(val) {
    return !isNaN(Date.parse(val));
  });

  zSchema.registerFormat('password', function(val) {
    // should parse as a string
    return typeof val === 'string';
  });
};

customFormats(ZSchema);

var validator = new ZSchema({});
var supertest = require('supertest');
var api = supertest('https://virtserver.swaggerhub.com'); // supertest init;
var expect = chai.expect;

describe('/sync/shareable', function() {
  describe('get', function() {
    it('should respond with 200 Successful operation', function(done) {
      /*eslint-disable*/
      var schema = {
        "type": "object",
        "properties": {
          "isShareable": {
            "type": "boolean",
            "description": "Indicates whether the event is shareable"
          },
          "eventConfig": {
            "type": "object",
            "properties": {
              "id": {
                "allOf": [
                  {
                    "type": "string",
                    "format": "uuid",
                    "example": "\"d290f1ee-6c54-4b01-90e6-d701748f0851\""
                  },
                  {
                    "readOnly": true
                  }
                ]
              },
              "name": {
                "type": "string",
                "description": "Name of the Event sharing configuration"
              },
              "description": {
                "type": "string",
                "description": "Description of the Event sharing configuration"
              },
              "currentSetting": {
                "type": "object",
                "properties": {
                  "id": {
                    "allOf": [
                      {
                        "type": "string",
                        "format": "uuid",
                        "example": "\"d290f1ee-6c54-4b01-90e6-d701748f0851\""
                      },
                      {
                        "readOnly": true
                      }
                    ]
                  },
                  "name": {
                    "type": "string",
                    "description": "Name of this version of the settings"
                  },
                  "description": {
                    "type": "string",
                    "description": "Description of this version of the settings"
                  },
                  "startDate": {
                    "allOf": [
                      {
                        "type": "string",
                        "format": "date-time"
                      }
                    ]
                  },
                  "endDate": {
                    "allOf": [
                      {
                        "type": "string",
                        "format": "date-time"
                      }
                    ]
                  },
                  "isActive": {
                    "type": "boolean",
                    "description": "Indicates whether the current setting is active"
                  },
                  "isShareable": {
                    "type": "boolean",
                    "description": "Indicates whether the event is shareable"
                  },
                  "reqConfirmation": {
                    "type": "boolean",
                    "description": "Indicates whether the event sharing requires confirmation. If not, the event is shared automatically."
                  },
                  "reqStaffComment": {
                    "type": "boolean",
                    "description": "Indicates whether the event sharing requires the staff personalised comment"
                  },
                  "shareOnInsert": {
                    "type": "boolean",
                    "description": "Indicates whether the event should be shared at the moment it is entered in the system."
                  },
                  "optSnooze": {
                    "type": "boolean",
                    "description": "Indicates whether the event sharing can be delayed (snoozed) by the Staff"
                  },
                  "optCancel": {
                    "type": "boolean",
                    "description": "Indicates whether the event sharing can be cancelled by the Staff"
                  },
                  "shareInApp": {
                    "type": "boolean",
                    "description": "Indicates whether the event should be shared via the Traduttore app"
                  },
                  "shareInCall": {
                    "type": "boolean",
                    "description": "Indicates whether the event should be shared via phone call"
                  },
                  "shareInSM": {
                    "type": "boolean",
                    "description": "Indicates whether the event should be shared via a messaging app (e.g., WhatsApp)"
                  },
                  "extraParams": {
                    "type": "array",
                    "description": "Defines the event-specific parameters required",
                    "items": {
                      "type": "object",
                      "required": [
                        "name",
                        "title",
                        "type"
                      ],
                      "properties": {
                        "id": {
                          "allOf": [
                            {
                              "type": "string",
                              "format": "uuid",
                              "example": "\"d290f1ee-6c54-4b01-90e6-d701748f0851\""
                            },
                            {
                              "readOnly": true
                            }
                          ]
                        },
                        "name": {
                          "type": "string",
                          "description": "Name of the parameter"
                        },
                        "title": {
                          "type": "string",
                          "description": "Title that will be shown when requesting the parameter"
                        },
                        "type": {
                          "type": "string",
                          "description": "Type of parameter",
                          "example": "InputText"
                        }
                      },
                      "description": "Resource representing the extra input params for a event sharing"
                    }
                  }
                },
                "description": "Detailed settings of a sharing configuration"
              }
            },
            "description": "Resource representing the event sharing configuration of the RSA"
          },
          "sendTo": {
            "type": "array",
            "description": "Information about the people the event should be shared with",
            "items": {
              "type": "object",
              "properties": {
                "id": {
                  "allOf": [
                    {
                      "type": "string",
                      "format": "uuid",
                      "example": "\"d290f1ee-6c54-4b01-90e6-d701748f0851\""
                    },
                    {
                      "readOnly": true
                    }
                  ]
                },
                "contact": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "allOf": [
                        {
                          "type": "string",
                          "format": "uuid",
                          "example": "\"d290f1ee-6c54-4b01-90e6-d701748f0851\""
                        }
                      ]
                    },
                    "name": {
                      "type": "string",
                      "description": "Name of the user"
                    },
                    "role": {
                      "type": "string",
                      "description": "Role of the user",
                      "example": "resident"
                    },
                    "contactInfos": {
                      "type": "array",
                      "description": "Contact information of the user",
                      "readOnly": true,
                      "items": {
                        "type": "object",
                        "properties": {
                          "type": {
                            "type": "string",
                            "description": "Type of contact information",
                            "example": "email"
                          },
                          "value": {
                            "type": "string",
                            "description": "Contact information",
                            "example": "rsadmin@gmail.com"
                          }
                        }
                      }
                    }
                  }
                },
                "relationship": {
                  "type": "string",
                  "example": "dougther",
                  "description": "Relationship of the family member with the resident"
                },
                "preference": {
                  "type": "object",
                  "properties": {
                    "shareWithMe": {
                      "type": "boolean",
                      "description": "Indicates whether the person wants to be informed of this event"
                    },
                    "shareInApp": {
                      "type": "boolean",
                      "description": "Person preference towards being informed via the Traduttore app"
                    },
                    "shareInCall": {
                      "type": "boolean",
                      "description": "Person preference towards being informed via phone call"
                    },
                    "shareInSM": {
                      "type": "boolean",
                      "description": "Person preference towards being informed via messaging apps"
                    }
                  },
                  "description": "Resource representing the sharing preferences of the family member"
                },
                "persona": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "allOf": [
                        {
                          "type": "string",
                          "format": "uuid",
                          "example": "\"d290f1ee-6c54-4b01-90e6-d701748f0851\""
                        },
                        {
                          "readOnly": true
                        }
                      ]
                    },
                    "name": {
                      "type": "string",
                      "description": "Name of the Sharing Persona"
                    },
                    "suggestion": {
                      "type": "string",
                      "description": "Written suggestions on how to deal with this \"Persona\""
                    },
                    "expectedReactions": {
                      "type": "array",
                      "example": [
                        "worry"
                      ],
                      "description": "List of potential reactions of this \"Persona\"",
                      "items": {
                        "type": "string"
                      }
                    },
                    "members": {
                      "type": "array",
                      "description": "List of family members belonging to this \"Persona\"",
                      "items": {
                        "type": "object",
                        "properties": {
                          "id": {
                            "allOf": [
                              {
                                "type": "string",
                                "format": "uuid",
                                "example": "\"d290f1ee-6c54-4b01-90e6-d701748f0851\""
                              }
                            ]
                          },
                          "name": {
                            "type": "string",
                            "description": "Name of the user"
                          },
                          "role": {
                            "type": "string",
                            "description": "Role of the user",
                            "example": "resident"
                          },
                          "contactInfos": {
                            "type": "array",
                            "description": "Contact information of the user",
                            "readOnly": true,
                            "items": {
                              "type": "object",
                              "properties": {
                                "type": {
                                  "type": "string",
                                  "description": "Type of contact information",
                                  "example": "email"
                                },
                                "value": {
                                  "type": "string",
                                  "description": "Contact information",
                                  "example": "rsadmin@gmail.com"
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              },
              "description": "Resource representing sharing information of the family member"
            }
          }
        },
        "description": "Resource representing the sharing information for a specific event"
      };

      /*eslint-enable*/
      api.get('/api/v1.0/sync/shareable')
      .query({
eventTypeId: 'DATA GOES HERE',residentId: 'DATA GOES HERE'
      })
      .set('Content-Type', 'application/json')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);

        expect(validator.validate(res.body, schema)).to.be.true;
        done();
      });
    });

    it('should respond with 400 Request was sent in...', function(done) {
      /*eslint-disable*/
      var schema = {
        "properties": {
          "status": {
            "type": "integer",
            "minimum": 100,
            "maximum": 600
          },
          "error": {
            "type": "string"
          }
        }
      };

      /*eslint-enable*/
      api.get('/api/v1.0/sync/shareable')
      .query({
eventTypeId: 'DATA GOES HERE',residentId: 'DATA GOES HERE'
      })
      .set('Content-Type', 'application/json')
      .expect(400)
      .end(function(err, res) {
        if (err) return done(err);

        expect(validator.validate(res.body, schema)).to.be.true;
        done();
      });
    });

    it('should respond with 401 Access forbidden, invalid...', function(done) {
      /*eslint-disable*/
      var schema = {
        "properties": {
          "status": {
            "type": "integer",
            "minimum": 100,
            "maximum": 600
          },
          "error": {
            "type": "string"
          }
        }
      };

      /*eslint-enable*/
      api.get('/api/v1.0/sync/shareable')
      .query({
eventTypeId: 'DATA GOES HERE',residentId: 'DATA GOES HERE'
      })
      .set('Content-Type', 'application/json')
      .expect(401)
      .end(function(err, res) {
        if (err) return done(err);

        expect(validator.validate(res.body, schema)).to.be.true;
        done();
      });
    });

    it('should respond with 404 Resource was not found', function(done) {
      /*eslint-disable*/
      var schema = {
        "properties": {
          "status": {
            "type": "integer",
            "minimum": 100,
            "maximum": 600
          },
          "error": {
            "type": "string"
          }
        }
      };

      /*eslint-enable*/
      api.get('/api/v1.0/sync/shareable')
      .query({
eventTypeId: 'DATA GOES HERE',residentId: 'DATA GOES HERE'
      })
      .set('Content-Type', 'application/json')
      .expect(404)
      .end(function(err, res) {
        if (err) return done(err);

        expect(validator.validate(res.body, schema)).to.be.true;
        done();
      });
    });

  });

});
