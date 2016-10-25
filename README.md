Empty project shell for an angular 1 project in typescript
# Dependencies
Make sure that you have [node+npm](https://nodejs.org/en/download/), [gulp-cli](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md) and [typings](https://github.com/typings/typings) installed.

# Install
Install all node dependencies
```
npm install
```
Install the proper typings for typecscript dependencies.
```
typings install
```

# Run
This will compile everything into the dist folder and open the browser on this folder.
```
gulp
```

# Build
This will compile everything in a minified version in the dist folder. This is ready for production.
```
gulp dist
```
