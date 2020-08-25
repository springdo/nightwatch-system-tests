const {
  setDefaultTimeout,
  AfterAll,
  BeforeAll
} = require('cucumber');
const {
  createSession,
  closeSession,
  startWebDriver,
  stopWebDriver,
} = require('nightwatch-api');

const reporter = require('cucumber-html-reporter');

setDefaultTimeout(60000);

BeforeAll(async () => {
  if (!process.env.CI) {
    console.info("Running in LOCAL mode")
    await startWebDriver();
    await createSession({
      env: 'default',
      configFile: 'nightwatch.conf.js',
      silent: false,
    });
  } else {
    console.info("Running in CI mode")
    await createSession({
      env: 'jenkins',
      configFile: 'nightwatch.conf.ci.js',
      silent: false,
    });
  }
});

AfterAll(async () => {
  await closeSession();
  if (!process.env.CI) {
    await stopWebDriver();
  }
  setTimeout(() => {
    reporter.generate({
      theme: 'bootstrap',
      jsonFile: 'reports/cucumber_report.json',
      output: 'reports/index.html',
      reportSuiteAsScenarios: true,
      launchReport: false,
      metadata: {
        'App': 'LXP System Tests',
        'Environment': 'labs-test'
      }
    });
  }, 1000);
});