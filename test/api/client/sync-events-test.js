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

describe('/sync/events', function() {
  describe('post', function() {
    it('should respond with 201 Event was successfully...', function(done) {
      api.post('/api/v1.0/sync/events')
      .set('Content-Type', 'application/json')
      .send({
        body: 'DATA GOES HERE'
      })
      .expect(201)
      .end(function(err, res) {
        if (err) return done(err);

        expect(res.body).to.equal(null); // non-json response or no schema
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
      api.post('/api/v1.0/sync/events')
      .set('Content-Type', 'application/json')
      .send({
        body: 'DATA GOES HERE'
      })
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
      api.post('/api/v1.0/sync/events')
      .set('Content-Type', 'application/json')
      .send({
        body: 'DATA GOES HERE'
      })
      .expect(401)
      .end(function(err, res) {
        if (err) return done(err);

        expect(validator.validate(res.body, schema)).to.be.true;
        done();
      });
    });

    it('should respond with 422 Invalid data was sent', function(done) {
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
      api.post('/api/v1.0/sync/events')
      .set('Content-Type', 'application/json')
      .send({
        body: 'DATA GOES HERE'
      })
      .expect(422)
      .end(function(err, res) {
        if (err) return done(err);

        expect(validator.validate(res.body, schema)).to.be.true;
        done();
      });
    });

  });

  describe('get', function() {
    it('should respond with 200 Successful operation', function(done) {
      /*eslint-disable*/
      var schema = {
        "type": "array",
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
            "eventIdCartella": {
              "description": "Event identifier in the Cartella system",
              "allOf": [
                {
                  "type": "integer",
                  "example": "11"
                }
              ]
            },
            "resident": {
              "description": "Resident that is affected by the event",
              "allOf": [
                {
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
              ]
            },
            "createdOn": {
              "description": "Event creation datetime",
              "allOf": [
                {
                  "type": "string",
                  "format": "date-time"
                }
              ]
            },
            "currentPhase": {
              "description": "Current phase in the event process (if any)",
              "type": "string"
            },
            "updates": {
              "type": "array",
              "description": "Event updates, containing the actual event data",
              "readOnly": true,
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
                  "status": {
                    "type": "string",
                    "description": "Indicates the status of the event update \"sharing\"",
                    "enum": [
                      "shared",
                      "snoozed",
                      "cancelled"
                    ]
                  },
                  "phase": {
                    "type": "string",
                    "description": "Indicates the phase this event update is related to"
                  },
                  "createdOn": {
                    "allOf": [
                      {
                        "type": "string",
                        "format": "date-time"
                      }
                    ]
                  },
                  "createdBy": {
                    "description": "Staff member who created the event update",
                    "allOf": [
                      {
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
                    ]
                  },
                  "statusChangedOn": {
                    "allOf": [
                      {
                        "type": "string",
                        "format": "date-time"
                      }
                    ]
                  },
                  "statusChangedBy": {
                    "description": "Staff member who last updated the status of the event update",
                    "allOf": [
                      {
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
                    ]
                  },
                  "staffComment": {
                    "description": "Staff comments and notes on the event update (mandatory if reqStaffComment)",
                    "type": "string"
                  },
                  "staffInternalNote": {
                    "description": "Staff comments for audit purposes",
                    "type": "string"
                  },
                  "sharedFrom": {
                    "description": "Encodes from where in the Cartella the event was shared",
                    "type": "string"
                  },
                  "sharedInApp": {
                    "description": "Indicates whether the event udpate was shared via Traduttore",
                    "type": "boolean"
                  },
                  "sharedInCall": {
                    "description": "Indicates whether the event was communicated via phone call",
                    "type": "boolean"
                  },
                  "sharedInSM": {
                    "description": "Indicates whether the event was communicated via messaging",
                    "type": "boolean"
                  },
                  "updateData": {
                    "type": "array",
                    "description": "Data to be shared",
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
                        "name": {
                          "type": "string",
                          "description": "Name of the parameter (to match the EventSharingExtraParam)"
                        },
                        "value": {
                          "type": "string",
                          "description": "Value of the parameter"
                        }
                      },
                      "description": "Resource representing the event update data to be shared"
                    }
                  }
                }
              }
            }
          }
        }
      };

      /*eslint-enable*/
      api.get('/api/v1.0/sync/events')
      .query({
delegatedTo: 'DATA GOES HERE',optSnooze: 'DATA GOES HERE',limit: 'DATA GOES HERE',skip: 'DATA GOES HERE'
      })
      .set('Content-Type', 'application/json')
      .expect(200)
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
      api.get('/api/v1.0/sync/events')
      .query({
delegatedTo: 'DATA GOES HERE',optSnooze: 'DATA GOES HERE',limit: 'DATA GOES HERE',skip: 'DATA GOES HERE'
      })
      .set('Content-Type', 'application/json')
      .expect(401)
      .end(function(err, res) {
        if (err) return done(err);

        expect(validator.validate(res.body, schema)).to.be.true;
        done();
      });
    });

  });

});
