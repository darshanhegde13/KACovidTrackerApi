const XLSX = require('xlsx')
request = require('request');
const _ = require("lodash");
const redisService = require('./redisService');

const karnatakaGovUrl = 'https://karunadu.karnataka.gov.in/hfw/kannada/homequarantivedocs/';

const kaDistricts = [
    "BAGALKOTE",
    "BALLARI",
    "BELAGAVI",
    "BENGALURU",
    "BIDAR",
    "CHAMRAJANAGARA",
    "CHIKKABALLAPURA",
    "CHIKKAMAGALURU",
    "CHITRADURGA",
    "DAKSHINA KANNADA",
    "DAVANGERE",
    "DHARWAD",
    "GADAG",
    "KALABURAGI",
    "HASSAN",
    "HAVERI",
    "KODAGU",
    "KOLAR",
    "KOPPALA",
    "MANDYA",
    "MYSORE",
    "RAICHUR",
    "RAMANAGARA",
    "SHIVAMOGGA",
    "TUMAKURU",
    "UDUPI",
    "UTTARA KANNADA",
    "VIJAYAPURA",
    "YADAGIRI"
]

let updateAllDistrictQuarantinePatientData = () =>{
    
    kaDistricts.forEach(districtName =>{
        updateKarnatakaDistrictQuarantinePatientData(districtName);
    });
}

let updateKarnatakaDistrictQuarantinePatientData = (name) => {

    request(karnatakaGovUrl + name + '.xls', { encoding: null }, function (err, res, data) {
        if (err || res.statusCode !== 200) return;
        var workbook = XLSX.read(data, { type: 'buffer' });
        var first_sheet_name = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[first_sheet_name];
        let districtRawData = XLSX.utils.sheet_to_json(worksheet);
        
        let pincodeData = _.groupBy(districtRawData,'PIN');
        for (const pin in pincodeData) {
            if(pin.length < 3){
                //console.log(name+ '_unknown')
                redisService.getRedis().set(name+ '_unknown',JSON.stringify( pincodeData[pin]));
            }else{
                //console.log(pincodeData[pin]);
                redisService.getRedis().set(pin,JSON.stringify( pincodeData[pin]));
            }
        }

        console.log(name + ' district data updated successfully');
        
    });
}

module.exports = {
    updateAllDistrictQuarantinePatientData 
}