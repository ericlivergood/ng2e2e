module.exports = function(config) {
  config.set({

    frameworks: ['jasmine', 'karma-typescript'],
    files: [
      'node_modules/reflect-metadata/Reflect.js',
      'src/**/*.ts',
      'test/**/*.ts'
    ],
    exclude: [
    ],
    preprocessors: {
      '**/*.ts': ['karma-typescript']
    },
    reporters: ['progress', 'karma-typescript'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  })
}
