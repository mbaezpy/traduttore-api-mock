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

describe('/activity/{activityId}/appointments', function() {
  describe('post', function() {
    it('should respond with 201 Successful operation', function(done) {
      api.post('/api/v1.0/activity/{activityId PARAM GOES HERE}/appointments')
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
      api.post('/api/v1.0/activity/{activityId PARAM GOES HERE}/appointments')
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
      api.post('/api/v1.0/activity/{activityId PARAM GOES HERE}/appointments')
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
      api.post('/api/v1.0/activity/{activityId PARAM GOES HERE}/appointments')
      .set('Content-Type', 'application/json')
      .send({
        body: 'DATA GOES HERE'
      })
      .expect(404)
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
            "requestedOn": {
              "description": "Datetime the consultation requested was created",
              "allOf": [
                {
                  "type": "string",
                  "format": "date-time"
                }
              ]
            },
            "requestedFor": {
              "description": "Date requested for the consultation",
              "allOf": [
                {
                  "type": "string",
                  "format": "date-time"
                }
              ]
            },
            "scheduledFor": {
              "description": "Date assigned for the consultation",
              "allOf": [
                {
                  "type": "string",
                  "format": "date-time"
                }
              ]
            },
            "staffComment": {
              "readOnly": true,
              "description": "Notes of the RSA Staff on the consultation request",
              "allOf": [
                {
                  "type": "object",
                  "required": [
                    "comment"
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
                    "createdBy": {
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
                    "createdOn": {
                      "description": "Datetime the comment was created",
                      "allOf": [
                        {
                          "type": "string",
                          "format": "date-time"
                        }
                      ]
                    },
                    "comment": {
                      "type": "string",
                      "description": "The content of the comment",
                      "example": "The resident is doing great"
                    }
                  }
                }
              ]
            },
            "requestedBy": {
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
      };

      /*eslint-enable*/
      api.get('/api/v1.0/activity/{activityId PARAM GOES HERE}/appointments')
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
      api.get('/api/v1.0/activity/{activityId PARAM GOES HERE}/appointments')
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
      api.get('/api/v1.0/activity/{activityId PARAM GOES HERE}/appointments')
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
      api.get('/api/v1.0/activity/{activityId PARAM GOES HERE}/appointments')
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
