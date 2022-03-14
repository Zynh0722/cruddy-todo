const fs = require('fs');
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

