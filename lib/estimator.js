/* eslint-disable linebreak-style */
// impact: currently Infected
const currentlyInfectedImpact = data => data.reportedCases * 10;
// severe impact
const currentlyInfectedSevereImpact = data => data.reportedCases * 50;

// severe impact
// const severeCasesByRequestedTime = (data) => data.infectionsByRequestedTime * 0.15;

// impact: infectionsByRequestedTime
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
};

// severe impact
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

// severe case requiring bed
/* const SCBRT_I = (data) => {
  let factor;
  if (data.periodType === 'days') {
    factor = Math.floor(data.timeToElapse / 3);
  } else if (data.periodType === 'weeks') {
    factor = Math.floor((data.timeToElapse * 7) / 3);
  } else if (data.periodType === 'months') {
    factor = Math.floor((data.timeToElapse * 30) / 3);
  }
  return severeCasesByRequestedTime(data) * (2 ** factor);
} */

const covid19ImpactEstimator = data => ({

  impact: {

    currentlyInfected: currentlyInfectedImpact(data),
    infectionsByRequestedTime: IBRTImpact(data)
  },
  severeImpact: {
    currentlyInfected: currentlyInfectedSevereImpact(data),
    infectionsByRequestedTime: IBRT_SI(data)

    /* severeCase: {
      currentlyInfected: severeCasesByRequestedTime(data),
      infectionsByRequestedTime: SCBRT_I(data),
    } */

  } });

export default covid19ImpactEstimator;