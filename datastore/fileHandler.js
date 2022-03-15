const fs = require('fs');
const _ = require('underscore');
const path = require('path');

const _getFileName = id => `${id}.txt`;

const _getPathToFile = (dir, id) => path.join(dir, _getFileName(id));

exports.storeListItem = (item, dir, cb = ()=>{}) => {
  fs.writeFile(_getPathToFile(dir, item.id), item.text, (err) => {
    if (err) {
      cb('some err -> ', err);
    } else {
      cb(null, item);
      console.log(`Wrote to file: ${_getFileName(item.id)}`);
    }
  });
};

exports.getListItems = (dir, cb = ()=>{}) => {
  fs.readdir(dir, (err, files) => {
    Promise.all(_(files)
      .map(file => fs.promises.readFile(path.join(dir, file))
        .then(text => ({ id: file.match(/(\d+)\.txt/)[1], text: String(text)}))
      ))
      .then(values => cb(values));
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

exports.updateListItem = ({ id, text }, dir, cb = ()=>{}) => {
  fs.access(_getPathToFile(dir, id), fs.constants.F_OK, (err) => {
    if (!err) {
      fs.writeFile(_getPathToFile(dir, id), text, cb);
    } else {
      cb(err);
    }
  });
};

exports.deleteListItem = (id, dir, cb = ()=>{}) => {
  fs.unlink(_getPathToFile(dir, id), cb);
};