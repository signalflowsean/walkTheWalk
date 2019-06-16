var glob = require('glob'),
    fs = require('fs'),
    // TODO: use __dir or whatever the node relative path is
    sourceDir = '/Users/signalflowsean/Developer/Music/walk/static',
    destDir = '/Users/signalflowsean/Developer/Music/walk/destDir',

    // some options
    options = {

        cwd: sourceDir

    };

console.log('start');
glob('**/*.mp3', options, function (err, files) {

    if (err) {

        console.log(err);

    } else {

        // a list of paths to javaScript files in the current working directory
        console.log(files);

        files.forEach(function (file) {

            var sourcePath = sourceDir + '/' + file,
                destPath = destDir + '/' + file.replace(/\//g, '~');

            fs.copyFileSync(sourcePath, destPath);

        });

    }

});