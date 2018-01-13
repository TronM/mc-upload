# mc-upload

A tiny Node.js utility for uploading local folder recursively to minio server

## Docker Container

### Build

```
docker build -t tron-m/mc-upload .
```

### Usage

```
docker run --rm tron-m/mc-upload npm start -- --source.root=uploads
```

## Install from Source

### Usage

```
# Install all dependencies
npm install

# Start uploading with custom configurations
npm start -- --source.root=uploads
```

### Configurations

All the following configurations are allowed to be used in both configurations
file and command line arguments.
While using command line argument, both `.` and `:` are valid splitter for
a nested configurations property, such as `minio.port`

#### Configuration Example for Minio Play

```json
{
  "minio": {
    "endPoint": "play.minio.io",
    "port": 9000,
    "secure": true,
    "accessKey": "Q3AM3UQ867SPQQA43P2F",
    "secretKey": "zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG"
  },
  "source": {
    "root": "uploads"
  },
  "target": {
    "bucketName": "mc-uploads"
  }
}
```

### Available Environment Variables

* MINIO_HOST - minio endpoint
* MINIO_PORT - minio port
* MINIO_SECURE - enable client TLS verification
* MINIO_ACCESS_KEY - access key of minio instance
* MINIO_SECRET_KEY - secret key of minio instance
* SOURCE_ROOT - root directory of upload source
* TARGET_BUCKET - bucket name of upload target
