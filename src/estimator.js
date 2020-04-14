/* eslint-disable linebreak-style */
// impact: currently Infected
const currentlyInfectedImpact = (data) => data.reportedCases * 10;
// severe impact
const currentlyInfectedSevereImpact = (data) => data.reportedCases * 50;

const convertToDays = (data) => {
  let days;

  if (data.periodType === 'days') {
    days = data.timeToElapse;
  } else if (data.periodType === 'weeks') {
    days = data.timeToElapse * 7;
  } else if (data.periodType === 'months') {
    days = data.timeToElapse * 30;
  }
};

// impact: infectionsByRequestedTime
const IBRTImpact = (data) => {
  const factor = Math.trunc(convertToDays(data) / 3);

  return currentlyInfectedImpact(data) * 2 ** factor;
};

// severe impact
const IBRT_SI = (data) => {
  const factor = Math.trunc(convertToDays(data) / 3);

  return currentlyInfectedSevereImpact(data) * 2 ** factor;
};

const SCBRTImpact = (data) => {
  return Math.trunc(IBRTImpact(data) * 0.15);
};

const SCBRT_SI = (data) => {
  return Math.trunc(IBRTImpact(data) * 0.15);
};

const HBBRTImpact = (data) => {
  const availBeds = data.totalHospitalBeds * 0.35;

  return Math.trunc(availBeds - SCBRTImpact(data));
};

const HBBRT_SI = (data) => {
  const availBeds = data.totalHospitalBeds * 0.35;

  return Math.trunc(availBeds - SCBRT_SI(data));
};

const CFICUBRTImpact = (data) => Math.trunc(0.05 * IBRTImpact(data));

const CFICUBRT_SI = (data) => Math.trunc(0.05 * IBRT_SI(data));

const CFVBRTImpact = (data) => Math.trunc(0.02 * IBRTImpact(data));

const CFVBRT_SI = (data) => Math.trunc(0.02 * IBRT_SI(data));

const DIFImpact = (data) => {
  const { region } = data;
  const { avgDailyIncomePopulation, avgDailyIncomeInUSD } = region;

  return Math.trunc(
    (IBRTImpact(data) * avgDailyIncomePopulation * avgDailyIncomeInUSD) /
    convertToDays(data)
  );
};

const DIF_SI = (data) => {
  const { region } = data;
  const { avgDailyIncomePopulation, avgDailyIncomeInUSD } = region;

  return Math.trunc(
    (IBRT_SI(data) * avgDailyIncomePopulation * avgDailyIncomeInUSD) /
    convertToDays(data)
  );
};

const covid19ImpactEstimator = (data) => ({
  data,
  impact: {
    currentlyInfected: currentlyInfectedImpact(data),
    infectionsByRequestedTime: IBRTImpact(data),
    severeCasesByRequestedTime: SCBRTImpact(data),
    hospitalBedsByRequestedTime: HBBRTImpact(data),
    casesForICUByRequestedTime: CFICUBRTImpact(data),
    casesForVentilatorsByRequestedTime: CFVBRTImpact(data),
    dollarsInFlight: DIFImpact(data)
  },
  severeImpact: {
    currentlyInfected: currentlyInfectedSevereImpact(data),
    infectionsByRequestedTime: IBRT_SI(data),
    severeCasesByRequestedTime: SCBRT_SI(data),
    hospitalBedsByRequestedTime: HBBRT_SI(data),
    casesForICUByRequestedTime: CFICUBRT_SI(data),
    casesForVentilatorsByRequestedTime: CFVBRT_SI(data),
    dollarsInFlight: DIF_IS(data)
  } 
});

export default covid19ImpactEstimator;