const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

const root = __dirname;

const defaultConfig = getDefaultConfig(root);

module.exports = mergeConfig(defaultConfig, {
  projectRoot: root,


  watchFolders: [
    path.resolve(root),
  ],

  resolver: {
    extraNodeModules: new Proxy({}, {
      get: (_, name) => path.join(root, 'node_modules', name),
    }),
  },
});
