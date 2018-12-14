const fs = require('fs');
const { join } = require('path');
const mkdir = require('make-dir');
const archiver = require('archiver');
const { version } = require('../package.json');

const folder = join(__dirname, '..', 'releases');
const dist = join(__dirname, '..', 'dist');
const filename = join(folder, `yuzu-devtools-${version}.zip`);

mkdir.sync(folder);

const output = fs.createWriteStream(filename);

const archive = archiver('zip', {
  zlib: { level: 9 }, // Sets the compression level.
});

output.on('end', () => {
  console.log(`Archive "${filename}" created`);
});

archive.on('error', (err) => {
  throw err;
});

archive.pipe(output);

archive.directory(dist, false);
archive.finalize();
