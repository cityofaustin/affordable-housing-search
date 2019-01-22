var express = require('express');
var router = express.Router();
var cors = require('cors');
var _ = require("underscore");

var dbHelper = require('../model/database.js');
var propertyFieldsMap = require('../model/propertyFieldsMap').fieldsMap;

function addVerificationFlags(properties, verifications) {
  function isPropertyInfoVerified(property, verifs) {
      if (!_.has(verifs, property.id)) {
          return false;
      }

      var propVerifs = verifications[property.id];
      for (var field in propertyFieldsMap) {
          var fieldVal = propertyFieldsMap[field];
          if (!fieldVal.editable || !fieldVal.active || fieldVal.group == 'Affordability Information') {
              continue;
          }

          if (!_.has(propVerifs, field)) {
              return false;
          }
          if (propVerifs[field] == 0) {
              return false;
          }
      }

      return true;
  }

  function isAffordabilityInfoVerified(property, verifs) {
      if (!_.has(verifs, property.id)) {
          return false;
      }

      var propVerifs = verifications[property.id];
      for (var field in propertyFieldsMap) {
          var fieldVal = propertyFieldsMap[field];
          if (!fieldVal.editable || !fieldVal.active || fieldVal.group != 'Affordability Information') {
              continue;
          }

          if (!_.has(propVerifs, field)) {
              return false;
          }
          if (propVerifs[field] == 0) {
              return false;
          }
      }

      return true;
  }

  function isBasicPropertyInfoVerified(property, verifs) {
      if (!_.has(verifs, property.id)) {
          return false;
      }

      var propVerifs = verifications[property.id];
      for (var field in propertyFieldsMap) {
          var fieldVal = propertyFieldsMap[field];
          if (!fieldVal.editable || !fieldVal.active || !fieldVal.tags || !_.contains(fieldVal.tags, 'Basic Property Info')) {
              continue;
          }

          if (!_.has(propVerifs, field)) {
              return false;
          }
          if (propVerifs[field] == 0) {
              return false;
          }
      }

      return true;

  }

  function isTenantCriteriaVerified(property, verifs) {
      if (!_.has(verifs, property.id)) {
          return false;
      }

      var propVerifs = verifications[property.id];
      for (var field in propertyFieldsMap) {
          var fieldVal = propertyFieldsMap[field];
          if (!fieldVal.editable || !fieldVal.active || !fieldVal.tags || !_.contains(fieldVal.tags, 'Tenant Criteria Info')) {
              continue;
          }

          if (!_.has(propVerifs, field)) {
              return false;
          }
          if (propVerifs[field] == 0) {
              return false;
          }
      }

      return true;
  }

  for (var p in properties) {
      var property = properties[p];
      if (isPropertyInfoVerified(property, verifications)) {
          properties[p].propertyInfoVerified = true;
      } else {
          properties[p].propertyInfoVerified = false;
      }
      if (isAffordabilityInfoVerified(property, verifications)) {
          properties[p].affordabilityInfoVerified = true;
      } else {
          properties[p].affordabilityInfoVerified = false;
      }
      if (isBasicPropertyInfoVerified(property, verifications)) {
          properties[p].basicPropertyInfoVerified = true;
      } else {
          properties[p].basicPropertyInfoVerified = false;
      }
      if (isTenantCriteriaVerified(property, verifications)) {
          properties[p].tenantCriteriaVerified = true;
      } else {
          properties[p].tenantCriteriaVerified = false;
      }
  }
  return properties;
}


/* GET property listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.options('*', cors());

router.get('/get_all_properties', async (req, res) => {
  function isCityAustin(city) {
      if (!city) {
          return false;
      }
      var tempCity = city.toLowerCase();
      if (tempCity.match(/.*austin.*/)) {
          return true;
      } else {
          return false;
      }
  }

  try {
      var result = await dbHelper.getAllProperties();
      var verifications = await dbHelper.getAllPropertyVerifications();
      result = addVerificationFlags(result, verifications);
      result = _.filter(result, function(property) {
          return property.basicPropertyInfoVerified;
      });
      return res.status(200).send({success: true, data: result});
  } catch (e) {
      return res.status(500).send({success: false, error: e.stack.toString(), serverSideError: true});
  }
});


router.get('/get_all_data', async(req, res) => {
  try {
      var result = await dbHelper.getAllPropertiesAllFields();
      return res.status(200).send({success: true, data: result});
  } catch (e) {
      return res.status(500).send({success: false, error: e.stack.toString(), serverSideError: true});
  }
});



module.exports = router;