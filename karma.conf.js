module.exports = function (config) {
  config.set({
      frameworks: ['jasmine', '@angular-devkit/build-angular'],
      plugins: [
          require('karma-jasmine'),
          require('karma-chrome-launcher'),
          require('karma-jasmine-html-reporter'),
          require('karma-coverage'),
          
      ],
      client: {
          jasmine: {},
          clearContext: false,
      },
      reporters: ['progress', 'kjhtml'],
      port: 9876,
      colors: true,
      logLevel: config.LOG_INFO,
      autoWatch: true,
      browsers: ['Chrome'],
      singleRun: false,
      restartOnFileChange: true
  });
};