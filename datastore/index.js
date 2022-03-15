const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');
const fileHandler = require('./fileHandler');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  counter.getNextUniqueId((id) => {
    items[id] = text;
    // DONE: Write file storage code
    fileHandler.storeListItem({ id, text }, exports.dataDir);
    callback(null, { id, text });
  });
};

exports.readAll = (callback) => {
  // DONE: Read all files and return array with {id: id, text: id}
  fileHandler.getListItems(exports.dataDir, (data) => {
    callback(null, data);
  });
};

exports.readOne = (id, callback) => {
  // DONE: refactor to read from file
  fileHandler.getListItem(id, exports.dataDir, (err, text) => {
    if (err) {
      callback(new Error(`No item with id: ${id}`));
    } else {
      callback(null, { id, text });
    }
  });
};

exports.update = (id, text, callback) => {
  // DONE: refactor to edit a file
  fileHandler.updateListItem(id, text, exports.dataDir, (err) => {
    if (err) {
      callback(new Error(`No item with id: ${id}`));
    } else {
      callback(null, { id, text });
    }
  });
};

exports.delete = (id, callback) => {
  // TODO: refactor to delete a file
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
