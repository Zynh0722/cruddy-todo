const fs = require('fs');
const _ = require('underscore');
const path = require('path');

const _getFileName = id => `${id}.txt`;

const _getPathToFile = (dir, id) => path.join(dir, _getFileName(id));

exports.storeListItem = (item, dir, cb = ()=>{}) => {
  fs.writeFile(_getPathToFile(dir, item.id), item.text, (err) => {
    if (err) {
      throw ('some err -> ', err);
    } else {
      console.log(`Wrote to file: ${_getFileName(item.id)}`);
    }
  });
};

exports.getListItems = (dir, cb = ()=>{}) => {
  fs.readdir(dir, (err, files) => {
    cb(_(files)
      .map(file => file.match(/(\d+)\.txt/)[1])
      .map(id => ({ id: id, 'text': id })));
  });
};

exports.getListItem = (id, dir, cb = ()=>{}) => {
  fs.readFile(_getPathToFile(dir, id), (err, text) => {
    if (err) {
      cb(err);
    } else {
      cb(null, String(text));
    }
  });
};