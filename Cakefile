use 'sake-bundle'
use 'sake-outdated'
use 'sake-publish'
use 'sake-version'

task 'clean', 'clean project', ->
  exec 'rm -rf lib'

task 'build', 'build project', ->
  b = new Bundle
    entry: 'src/index.coffee'
    compilers:
      coffee: version: 1
  Promise.all [
    b.write format: 'es'
    b.write format: 'cjs', include: ['es-is']
  ]

task 'build:min', 'build project', ['build'], ->
  bundle.write
    entry:     'src/index.coffee'
    format:    'web'
    external:  false
    minify:    true
    sourceMap: false

task 'test', 'Run tests', ['build'], (opts) ->
  bail     = opts.bail     ? true
  coverage = opts.coverage ? false
  grep     = opts.grep     ? ''
  test     = opts.test     ? 'test/'
  verbose  = opts.verbose  ? ''

  bail    = '--bail' if bail
  grep    = "--grep #{opts.grep}" if grep
  verbose = 'DEBUG=nightmare VERBOSE=true CROWDSTART_DEBUG=1' if verbose

  if coverage
    bin = 'istanbul --print=none cover _mocha --'
  else
    bin = 'mocha'

  {status} = yield exec.interactive "NODE_ENV=test CROWDSTART_KEY='' CROWDSTART_ENDPOINT='' #{verbose}
        #{bin}
        --colors
        --reporter spec
        --timeout 10000000
        --compilers coffee:coffee-script/register
        --require co-mocha
        --require postmortem/register
        #{bail}
        #{grep}
        #{test}"

  process.exit status

task 'test-ci', 'Run tests', (opts) ->
  invoke 'test', bail: true, coverage: true

task 'coverage', 'Process coverage statistics', ->
  exec '''
    cat ./coverage/lcov.info | coveralls
    cat ./coverage/coverage.json | codecov
    rm -rf coverage/
    '''

task 'watch', 'watch for changes and recompile project', ->
  exec 'bebop -o'

task 'watch:test', 'watch for changes and re-run tests', ->
  invoke 'watch'

  require('vigil').watch __dirname, (filename, stats) ->
    if /^src/.test filename
      invoke 'test'

    if /^test/.test filename
      invoke 'test', test: filename
