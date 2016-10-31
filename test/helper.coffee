chai = require 'chai'
chai.should()
chai.use require 'chai-as-promised'

Api = require 'crowdstart.js'

before ->
  global.window =
    analytics:
      track: ()->
        global.analyticsArgs = arguments
  global.client = new Api
    debug:    false
    endpoint: 'https://api.staging.crowdstart.com'
    key:      'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJiaXQiOjQ1MDM2MTcwNzU2NzUxNzYsImp0aSI6IkNTaWFDckhpdDQ0Iiwic3ViIjoiRXFUR294cDV1MyJ9.fRcRQRRe0CrcnGSW12fmQ_8Cly6mqByIc5wTnANPdPWP3V1Bx9AIGbTVPTx_3KbBEziGewKJtNT1ys6WDXegyg'
