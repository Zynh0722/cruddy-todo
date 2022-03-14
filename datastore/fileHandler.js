const fs = require('fs');
const _ = require('underscore');
const path = require('path');

exports.storeListItem = (item, dir, cb = ()=>{}) => {
  fs.writeFile(path.join(dir, `${item.id}.txt`), item.text, (err) => {
    if (err) {
      throw ('some err -> ', err);
    } else {
      console.log(`Wrote to file: ${item.id}.txt`);
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