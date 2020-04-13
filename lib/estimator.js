"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/* eslint-disable linebreak-style */
// impact: currently Infected
const currentlyInfectedImpact = data => data.reportedCases * 10; // severe impact


const currentlyInfectedSevereImpact = data => data.reportedCases * 50; // impact: infectionsByRequestedTime


const IBRTImpact = data => {
  let factor;

  if (data.periodType === 'days') {
    factor = Math.floor(data.timeToElapse / 3);
  } else if (data.periodType === 'weeks') {
    factor = Math.floor(data.timeToElapse * 7 / 3);
  } else if (data.periodType === 'months') {
    factor = Math.floor(data.timeToElapse * 30 / 3);
  }

  return currentlyInfectedImpact(data) * 2 ** factor;
}; // severe impact


const IBRT_SI = data => {
  let factor;

  if (data.periodType === 'days') {
    factor = Math.floor(data.timeToElapse / 3);
  } else if (data.periodType === 'weeks') {
    factor = Math.floor(data.timeToElapse * 7 / 3);
  } else if (data.periodType === 'months') {
    factor = Math.floor(data.timeToElapse * 30 / 3);
  }

  return currentlyInfectedSevereImpact(data) * 2 ** factor;
};

const covid19ImpactEstimator = data => ({
  impact: {
    currentlyInfected: currentlyInfectedImpact(data),
    infectionsByRequestedTime: IBRTImpact(data)
  },
  severeImpact: {
    currentlyInfected: currentlyInfectedSevereImpact(data),
    infectionsByRequestedTime: IBRT_SI(data)
  }
});

var _default = covid19ImpactEstimator;
exports.default = _default;