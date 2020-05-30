/**
 * Copy folders manually that have not gone through the TypeScript compiler.
 */

const { copySync, readdirSync } = require('fs-extra');
const { join } = require('path');

/** folders to copied */
const folders = process.argv.splice(2);

if (!folders.length) return;

const srcFiles = readdirSync(__dirname, { withFileTypes: true });

/** availables directories */
const dirs = srcFiles.filter(d => d.isDirectory()).map(d => d.name);

/** restricted directores */
const restricted = [
  'common',
  'helpers',
  'http',
  'modules',
  'router',
  'services',
  'typings',
];

for (const folder of folders) {
  // verify folders passed
  if (!dirs.some(d => d === folder)) {
    throw new Error(`Folder "${folder}" doesn't exist in the source project.`);
  }

  // non-restricted folder
  if (restricted.some(v => v === folder)) {
    throw new Error(`Folder "${folder}" can't copy, it's a restricted.`);
  }

  // execute copy
  copySync(join(__dirname, folder), join(__dirname, '..', 'build', folder));

  console.info(`[copyfiles]: Folder "${folder}" copied.`);
}

console.info('');
