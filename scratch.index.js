'use strict'; 

const fetch = require('node-fetch'), 
  fs = require('fs'), 
  path = require('path'),
  play = require('audio-play'),
  load = require('audio-loader');

const audioAPIURL = "https://drumserver.herokuapp.com/"; 

const sourceFolderName = 'static', 
  destinationFolderName = 'destDir', 
  sourcePath =  _getAbsolutePathFromRelative(sourceFolderName); 
console.log('sourcePath', sourcePath); 
walkFolders(sourcePath); 

function walkFolders(directory) { 
  fetchAudio(directory)   
    // .then(response => playAudio(response))
    // .then(data => renameAudioFilesToRelativePath(directory, data))
    // .then(data => moveAudioFilesToDestinationPath(directory, data))
    // .then(audioFiles => console.log('data', audioFiles))
    .then(() => moveToNewFolder(directory, walkFolders))
    .catch(err =>  { 
      console.error(err)
    }); 
}; 

function moveToNewFolder(directory, callback) { 
  fs.readdirSync(directory).forEach(file => { 
    if (_isDirentDirectory(_getDirent(directory, file))) { 
      callback(_getDirent(directory, file)); 
    }
  }); 
};

function fetchAudio(directory) { 
  return new Promise((resolve, reject) => { 
      _makeApiRequest(_getEndpoint(directory))
        .then(data => resolve(data))
        .catch(err => reject(err)); 
  }); 
};


function renameAudioFilesToRelativePath(directory, data) { 
  return data.audio.map(file => _getFileNameFromRelativePath(directory, file))
};

function _makeApiRequest(endpoint){ 
  console.log('endpoint', endpoint); 
  return new Promise((resolve, reject) => { 
    fetch(endpoint, {
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin':'*'
      }
    })
    .then (response => { 
      resolve(response.json()); 
    }) 
    .catch(err => { 
      reject(err); 
    }); 

  }); 
};

function _getAbsolutePathFromRelative(relative) { 
  return path.join(__dirname, relative); 
}; 

function _getRelativePathFromAbsolute(absolute) { 
  return absolute.split('/').splice(__dirname.split('/').length + 1).join('/'); 
}; 

function _getEndpoint(directory) { 
  return audioAPIURL + _getRelativePathFromAbsolute(directory); 
}; 

function _getDestinationPath() { 
  return _getDirent(__dirname, destinationFolderName); 
}; 

function _isDirentDirectory(dirent) { 
  return fs.statSync(dirent).isDirectory(); 
};

function _getDirent(directory, file) { 
  return path.join(directory, file); 
};

function _getFileNameFromRelativePath(directory, file) { 
  return _getRelativePathFromAbsolute(_getDirent(directory, file)).replace(/\//g, '~');
};

function _isAudioApiResponseEmpty(response){ 

}


function playAudio(data) { 
  return new Promise((resolve, reject) => { 
    
    if (data.hasOwnProperty('audio')) { 
      data.audio.forEach(file => { 
        load(file).then(() => {  
          play(); 
          setTimeout()
        });
      }); 
    }
  })

  
}

// function moveAudioFilesToDestinationPath(directory, data){ 

//   data.audio.forEach(file => { 
//     console.log('dir', directory + '/' + file, _getDestinationPath()); 
//     fs.copyFileSync(directory + '/' + file, _getDestinationPath());
//   }); 

//   return; 
// };


 
