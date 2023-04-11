// Bug: In case file couldn't be written, we couldn't trace the error, only displayed 'success' message;
// Bug 2: In case file couldn't be read, there wasn't a check if data is an error or actual file data.

// Solution for 1: Include 'err' parameter in writeFile's callback; if it comes with value, we don't react console.log statement;
// Solution for 2: Include check if data is instance of Error and stop the execution

const fs = require('fs');

function readFile(path, callback) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      callback(err)
    } else {
      callback(data);
    }
  });
}

function writeFile(path, data, callback) {
  fs.writeFile(path, data, 'utf8', err => {
    if (err) {
      callback(err);
    } else {
      callback();
    }
  });
}

readFile('input.txt', data => {
  if (data instanceof Error) {
    console.log(`Error during reading input file: ${data.message}`);
    return;
  }

  const newData = data.toUpperCase();

  writeFile('output.txt', newData, err => {
    if (err)
      return console.log(`Error during writing output file: ${err.message}`)

    console.log('File written successfully');
  });
});
