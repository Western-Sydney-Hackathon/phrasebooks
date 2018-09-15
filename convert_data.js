// Converting xml data to json for the project.

// Import libraries
const fs = require('fs');
const convert = require('xml-js');

// Read in the xml file and to a js object
var xml = fs.readFileSync('Dictionary.xml', 'utf8');
var options = {ignoreComment: true, alwaysChildren: true, compact: true};
var result = convert.xml2js(xml, options);



var result_string = JSON.stringify(result, null, '  ');

fs.writeFile("test.json", result_string, (err) => {
  // throws an error, you could also catch it here
    if (err) throw err;
    // success case, the file was saved
    console.log('File converted!');
});
