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

```
Environment Variables:
  MINIO_HOST - minio endpoint
  MINIO_PORT - minio port
  MINIO_SECURE - enable client TLS verification
  MINIO_ACCESS_KEY - access key of minio instance
  MINIO_SECRET_KEY - secret key of minio instance
```