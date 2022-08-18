const fs = require('fs');

const file = 'Log.txt';

const writeLog = (loc, lat, lon, des, oldData = null) => {
  const mergedData = `
{
    "Location": ${loc},
    "Latitude": ${lat},
    "Longitude": ${lon},
    "Description: ${des}
}
${oldData}
  `;
  fs.writeFile(file, mergedData, (err) => {
    if (err) {
      console.log('fs.writeFile ERR: ', err);
    }
    console.log('Recorded new txt data!');
  });
};

const readLog = (cb) => {
  fs.readFile(file, (err, txtFileData) => {
    if (err) {
      cb(err);
    } else {
      cb(null, txtFileData);
    }
  });
};

const passData = (loc, lat, lon, des) => {
  readLog((err, txt) => {
    if (err) {
      console.log('[function] "readData" ERROR: ', err);
    } else {
      writeLog(loc, lat, lon, des, txt);
    }
  });
};

module.exports = passData;
