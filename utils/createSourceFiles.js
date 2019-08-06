var glob = require('glob'),
    fs = require('fs'),
    path = require('path'), 
    sourceFolderName = 'static',
    destinationFolderName = 'destDir', 
    sourceDir = path.join(_getPathHigher(__dirname, 1), sourceFolderName),
    destDir = path.join(_getPathHigher(__dirname, 1), destinationFolderName), 
    globOptions = {
      cwd: sourceDir
    };

let createSourceFiles = () => { 

  glob('**/*.mp3', globOptions, function (err, files) {
    if (err) {
      console.log(err);
    } else {
      files.forEach(function (file) {
        let sourcePath = path.join(sourceDir, file),
          destPath = path.join(destDir, file.replace(/\//g, '~')); 
          fs.copyFileSync(sourcePath, destPath); 
      });
    }
  
  });
}; 

function _getPathHigher(currPath, levelsUp) { 
  return '/' + path.join.apply(null, currPath.split('/').splice(1, currPath.split('/').length - levelsUp -1).concat()); 
}

module.exports = createSourceFiles; 