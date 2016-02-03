chai = require 'chai'
chai.should()
chai.use require 'chai-as-promised'

Api = require 'crowdstart.js'

before ->
  global.client = new Api
    debug:    false
    endpoint: 'https://api.staging.crowdstart.com'
    key:      'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJiaXQiOjQ1MDM2MTcwNzU2NzUxNzYsImp0aSI6InY2Mk4zZUtTRnlFIiwic3ViIjoiRXFUR294cDV1MyJ9.6tWiv5G1z2dNAhnY3N02-v5-MBMcuUvn_fzRS2LTmNkkDF0Sb9a-GcLKr9tOcIGf-8IkoZUEINXhkXGCC6fmVg'
