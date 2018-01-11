/**
 * @author    Junxiang Wei {@link http://www.nodeunify.com}
 * @copyright Copyright (c) 2018, Junxiang Wei
 * @license   MIT
 */

'use strict';

const Promise = require('bluebird');
const readdirp = require('readdirp');

const nconf = require('nconf');
nconf
    .argv()
    .env(['NODE_ENV'])
    .defaults({
      NODE_ENV: 'development'
    });

const nodeEnv = nconf.get('NODE_ENV');
nconf.file(`./cfg/config_${nodeEnv}.json`);

const Minio = require('minio');
const minioClient = new Minio.Client(nconf.get('minio'));

(async function () {
  try {
    const { root } = nconf.get('source');
    const { files } = await new Promise((resolve, reject) => {
      readdirp({ root }, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
    const { bucketName, basePath } = nconf.get('target');
    for (let { path, fullPath } of files) {
      console.log(`Uploading file: ${path}...`);
      // use path.join here
      const etag = await minioClient.fPutObject(bucketName, `${basePath}${path}`, fullPath, 'application/octet-stream');
      console.log(`File uploaded. Etag: ${etag}`);
    }
    console.log('Upload complete.');
  } catch (err) {
    console.log('Upload failed.');
    process.exit(1);
  }
})();

