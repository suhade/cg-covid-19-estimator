"use strict";

var _estimator = _interopRequireDefault(require("./estimator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable linebreak-style */
const data = {
  periodType: 'days',
  population: 2024978,
  region: {
    avgAge: 19.7,
    avgDailyIncomeInUSD: 3,
    avgDailyIncomePopulation: 0.73,
    name: 'Africa'
  },
  reportedCases: 100,
  timeToElapse: 30,
  totalHospitalBeds: 678874
};
const result = (0, _estimator.default)(data);
console.log(result);