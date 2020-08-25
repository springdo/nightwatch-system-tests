module.exports = {
  src_folders: ['e2e'], //tests is a folder in workspace which has the step definitions
  test_settings: {
    jenkins: {
      selenium_host: process.env.ZALENIUM_SERVICE_HOST || 'zalenium-labs-ci-cd.apps.who.emea-2.rht-labs.com',
      selenium_port: 80,
      use_ssl: false,
      end_session_on_fail: false,
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
        'goog:chromeOptions': {
          w3c: false,
          args: ['--disable-web-security', '--ignore-certificate-errors'],
        },
      },
    },
  },
};