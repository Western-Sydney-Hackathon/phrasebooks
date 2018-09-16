const fs = require('fs');
const process = require('process');
const csv = require('csv');
const _ = require('lodash');


  fs.readFile("Mark_withcolor.csv"), (err, data) => {
    if (err) throw err;
    csv.parse(data, { columns: true }, (err, awards) => {
      if (err) throw err;

      var mapData = awards.map(award => {
        let value = csv.parseFloat(award.current_total_value_of_award);
        if (_.isNaN(value)) {
          value = 0;
        }
        return {
          fiscalYear: award.fiscal_year,
          currentValue: award.current_total_value_of_award,
          name: _.find(decorations, { duns: award.recipient_duns }).cleanName,
          duns: award.recipient_duns,
          multiYear: "false"
        };
      });
      checkYears(mapData);

      csv.stringify(
        mapData,
        {
          header: true,
          columns: ["fiscalYear", "currentValue", "name", "duns", "multiYear"]
        },
        (err, output) => {
          if (err) throw err;
          fs.writeFile(path.join("data", "rain", "rainData.csv"), output, err => {
            if (err) throw err;
            process.stdout.write("WE DID THE RAIN THING\n");
          }); // close fs.writeFile callback.
        }
      ); //end stringify
    }); //end csv.parse
  });


