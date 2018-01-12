/**
 * @author    Junxiang Wei {@link http://www.nodeunify.com}
 * @copyright Copyright (c) 2018, Junxiang Wei
 * @license   MIT
 */

'use strict';

const Promise = require('bluebird');
const Minio = require('minio');
const _ = require('lodash');
const nconf = require('nconf');
const readdirp = require('readdirp');

(async function () {
  try {
    nconf
      .argv({
        parseValues: true,
      })
      .env({
        whitelist: [
          'MINIO_HOST',
          'MINIO_PORT',
          'MINIO_SECURE',
          'MINIO_ACCESS_KEY',
          'MINIO_SECRET_KEY',
          'SOURCE_ROOT',
          'TARGET_BUCKET',
        ],
        parseValues: true
      })
      .file(`./cfg/config_default.json`);

    // Load environments
    const defaults = {
      minio: {
        endPoint: nconf.get('MINIO_HOST'),
        port: nconf.get('MINIO_PORT'),
        secure: nconf.get('MINIO_SECURE'),
        accessKey: nconf.get('MINIO_ACCESS_KEY'),
        secretKey: nconf.get('MINIO_SECRET_KEY'),
      },
      source: {
        root: nconf.get('SOURCE_ROOT'),
      },
      target: {
        bucketName: nconf.get('TARGET_BUCKET'),
      }
    };

    const { root } = _.defaults(defaults.source, nconf.get('source'));
    const { files } = await new Promise((resolve, reject) => {
      readdirp({ root }, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
    const minioConfig = _.defaults(defaults.minio, nconf.get('minio'));
    const minioClient = new Minio.Client(minioConfig);
    const { bucketName } = _.defaults(defaults.target, nconf.get('target'));
    console.log('Minio', minioConfig);
    console.log('Source', { root });
    console.log('Target', { bucketName });
    await minioClient.bucketExists(bucketName);
    for (let { path, fullPath } of files) {
      console.log(`Uploading file: ${path}...`);
      // use path.join here
      const etag = await minioClient.fPutObject(bucketName, `${path}`, fullPath, 'application/octet-stream');
      console.log(`File uploaded. Etag: ${etag}`);
    }
    console.log('Upload complete.');
  } catch (err) {
    console.log('Error', err);
    console.log('Upload failed.');
    process.exit(1);
  }
})();
