const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

var fileNameAndLoc = function (currentPath, name, needsTxt = true) {
  console.log(currentPath);
  if (needsTxt) {
    return path.join(path.join(currentPath, name + '.txt'));
  } else {
    return path.join(path.join(currentPath, name));
  }
  
};

exports.create = (text, callback) => {
  console.log("hi");
  counter.getNextUniqueId(function (err , id) {
    // console.log("hi");
    if (err) {
      throw ('error!');
    } else {
      // conosle.log("what up");
      var fileName = fileNameAndLoc(exports.dataDir, id);
      fs.writeFile(fileName, text, (err) => {
        if (err) {
          throw ('error writing counter');
        } 
      });
      callback(null, { id, text });
    }
  });
// callback(null, {text, text});
};

exports.readAll = (callback) => {
  fs.readdir(exports.dataDir, (err, files) => {
    if (err) {
      throw ('ERROR!!!');
    } else {
      // var data = [];
      // for (var i = 0; i < files.length; i++) {
        var data = _.map(files, function (fileNum) {
          var id = fileNum.substring(0, fileNum.length - 4);
          return {id, id}
        });
        callback(null, data)
        // var tempFileName = fileNameAndLoc(exports.dataDir, files[i], false);
        // fs.readFile(tempFileName, function (err, text) {
        //   if (err) {
        //     throw ('Error!');
        //   } else {
        //     console.log(files);
        //     console.log(i);
        //     var id = files[i].substring(0, files[i].length - 4); 
        //     data.push({id, text});
        //   }
        // });
        // callback(null, data);
      // }
      // console.log(data);
      // callback(null, data);
    }
  });  

};

exports.readOne = (id, callback) => {
  var directory = fileNameAndLoc(exports.dataDir, id);
  console.log(directory);
  fs.readFile(directory, (err, fileData) => {
    console.log("stuff", text);
    // console.log(exports.counterFile);
    if (err) {
      callback(new Error(`No item with id: ${id}`));
    } else {
      var text = fileData.toString('utf8');
      callback(null, { id, text});
    }
  });
  // var text = items[id];
  // if (!text) {
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   callback(null, { id, text });
  // }
};

exports.update = (id, text, callback) => {
  var directory = fileNameAndLoc(exports.dataDir, id);
  fs.writeFile(directory, text, (err) => {
    if (err) {
      callback(new Error(`No item with id: ${id}`));
    } else {
      callback(null, { id, text });
    }
  });  
  // var item = items[id];
  // if (!item) {
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   items[id] = text;
  //   callback(null, { id, text });
  // }
};

exports.delete = (id, callback) => {
  var directory = fileNameAndLoc(exports.dataDir, id);
  fs.unlink(directory, (err) => {
    if (err) {
    callback(new Error(`No item with id: ${id}`));
    } else {
      callback();
    }
  });  
  
  // var item = items[id];
  // delete items[id];
  // if (!item) {
  //   // report an error if item not found
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   callback();
  // }
};



// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');


exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
