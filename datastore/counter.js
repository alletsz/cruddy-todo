const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;

var counter = 0;
// Private helper functions ////////////////////////////////////////////////////

// Zero padded numbers can only be represented as strings.
// If you don't know what a zero-padded number is, read the
// Wikipedia entry on Leading Zeros and check out some of code links:
// https://www.google.com/search?q=what+is+a+zero+padded+number%3F

const zeroPaddedNumber = (num) => {
  return sprintf('%05d', num);
};

const readCounter = (callback) => {
  
  fs.readFile(exports.counterFile, (err, fileData) => {
    console.log(exports.counterFile);
    console.log("before err if statement");
    if (err) {
      callback(null, 0);
    } else {
      callback(null, Number(fileData));
    }
  });
};

const writeCounter = (count, callback) => {
  var counterString = zeroPaddedNumber(count);
  fs.writeFile(exports.counterFile, counterString, (err) => {
    if (err) {
      throw ('error writing counter');
    } else {
      console.log("writing things");
      callback(null, counterString);
    }
  });
};

// // Public API - Fix this function //////////////////////////////////////////////

exports.getNextUniqueId = (err, callback) => { 
// 1- call readCounter, if file exists, set counter to the number inside the file, 
// else set counter to 0.

// 2- save the current value of counter to be the nuber that we will return as a seperate variable. 
 
 readCounter(function(err, num){
   if (err) {
     throw ("error");
   } else {
    num = num + 1;
    writeCounter(num, callback);
  }
 });
  // return zeroPaddedNumber(counter);
};
//read data file
//


// Configuration -- DO NOT MODIFY //////////////////////////////////////////////

exports.counterFile = path.join(__dirname, 'counter.txt');
