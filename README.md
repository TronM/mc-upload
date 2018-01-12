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

### Configurations (TODO)
