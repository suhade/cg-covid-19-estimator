/* eslint-disable linebreak-style */
import covid19Estimator from './estimator';

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

const result = covid19Estimator(data);

// eslint-disable-next-line no-undef
Console.log(result);
