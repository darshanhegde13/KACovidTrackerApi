const karnatakaCovidData = require('./updateKarnatakaCovidData');

let updateCovidData = () => {
    karnatakaCovidData.updateAllDistrictQuarantinePatientData();
}
module.exports = updateCovidData;