{ matchesGeoRate, closestGeoRate } = require '../'
{expect} = require 'chai'

describe 'matchesGeoRate', ->
  it 'L0 (Wild Card) Match', ->
    gr = {}

    [isMatch, level] = matchesGeoRate gr, 'us', 'ks', '', '66212'
    isMatch.should.be.true
    level.should.eq 0

  it 'L0 No Match', ->
    gr =
      country: 'US'
      state: 'KS'
      postalCodes: '66213'

    [isMatch, level] = matchesGeoRate gr, 'gb', 'bkm', '', 'sl8'
    isMatch.should.be.false
    level.should.eq 0

  it 'L1 (Country) Match', ->
    gr =
      country: 'US'
    [isMatch, level] = matchesGeoRate gr, 'us', 'ks', '', '66212'
    isMatch.should.be.true
    level.should.eq 1

  it 'L1 (Country) Partial Match', ->
    gr =
      country: 'US'
      state: 'MO'
    [isMatch, level] = matchesGeoRate gr, 'us', 'ks', '', '66212'
    isMatch.should.be.false
    level.should.eq 1

  it 'L2 (Country + State) Match', ->
    gr =
      country: 'US'
      state: 'KS'
    [isMatch, level] = matchesGeoRate gr, 'us', 'ks', '', '66212'
    isMatch.should.be.true
    level.should.eq 2

  it 'L2 (Country + State) Partial Match', ->
    gr =
      country: 'US'
      state: 'KS'
      postalCodes: '66213'

    [isMatch, level] = matchesGeoRate gr, 'us', 'ks', '', '66212'
    isMatch.should.be.false
    level.should.eq 2

  it 'L3 (Country + State + City) Match', ->
    gr =
      country: 'US'
      state: 'KS'
      city: 'OVERLANDPARK'

    [isMatch, level] = matchesGeoRate gr, 'us', 'ks', 'overland park', '66212'
    isMatch.should.be.true
    level.should.eq 3

  it 'L3 (Country + State + Postal Code) Match', ->
    gr =
      country: 'US'
      state: 'KS'
      postalCodes: '66212'

    [isMatch, level] = matchesGeoRate gr, 'us', 'ks', '', '66212'
    isMatch.should.be.true
    level.should.eq 3

  it 'L3 (Country + State + Postal Code List) Match', ->
    gr =
      country: 'US'
      state: 'KS'
      postalCodes: '66212,66213,66214'

    [isMatch, level] = matchesGeoRate gr, 'us', 'ks', '', '66212'
    isMatch.should.be.true
    level.should.eq 3

describe 'closestGeoRate', ->
  it 'Should Match Match with Highest Level', ->
    grs = [
      {
        country: 'US'
        state: 'KS'
      }
      {
        country: 'US'
        state: 'MO'
      }
      {
        country: 'US'
        state: 'KS'
        city: 'EMPORIA'
      }
      {
        country: 'US'
        state: 'KS'
        postalCodes: '66212'
      }
      {
        country: 'US'
      }
      {}
    ]

    [gr, level, idx] = closestGeoRate grs, 'us', 'ks', '', '66212'
    gr.should.eq grs[3]
    level.should.eq 3
    idx.should.eq 3

  it 'Should Return L0 Default Rates', ->
    grs = [
      {
        country: 'US'
        state: 'KS'
      }
      {
        country: 'US'
        state: 'MO'
      }
      {}
      {
        country: 'US'
        state: 'KS'
        city: 'EMPORIA'
      }
      {
        country: 'US'
        state: 'KS'
        postalCodes: '66212'
      }
      {
        country: 'US'
      }
    ]

    [gr, level, idx] = closestGeoRate grs, 'gb', 'bkm', '', 'sl8'
    gr.should.eq grs[2]
    level.should.eq 0
    idx.should.eq 2

  it 'Should Return L1 Country Rates', ->
    grs = [
      {
        country: 'US'
        state: 'KS'
      }
      {
        country: 'US'
        state: 'MO'
      }
      {}
      {
        country: 'US'
        state: 'KS'
        city: 'EMPORIA'
      }
      {
        country: 'US'
        state: 'KS'
        postalCodes: '66212'
      }
      {
        country: 'US'
      }
    ]

    [gr, level, idx] = closestGeoRate grs, 'US', 'ky', '', '12345'
    gr.should.eq grs[5]
    level.should.eq 1
    idx.should.eq 5

  it 'Should Return L2 State Rates', ->
    grs = [
      {
        country: 'US'
        state: 'KS'
      }
      {
        country: 'US'
        state: 'MO'
      }
      {}
      {
        country: 'US'
        state: 'KS'
        city: 'EMPORIA'
      }
      {
        country: 'US'
        state: 'KS'
        postalCodes: '66212'
      }
      {
        country: 'US'
      }
    ]

    [gr, level, idx] = closestGeoRate grs, 'us', 'kS', '', '12345'
    gr.should.eq grs[0]
    level.should.eq 2
    idx.should.eq 0

  it 'Should Return L3 City Rates', ->
    grs = [
      {
        country: 'US'
        state: 'KS'
      }
      {
        country: 'US'
        state: 'MO'
      }
      {}
      {
        country: 'US'
        state: 'KS'
        city: 'EMPORIA'
      }
      {
        country: 'US'
        state: 'KS'
        postalCodes: '66212'
      }
      {
        country: 'US'
      }
    ]

    [gr, level, idx] = closestGeoRate grs, 'us', 'kS', 'Emporia', ''
    gr.should.eq grs[3]
    level.should.eq 3
    idx.should.eq 3

  it 'Should Return L3 Postal Code Rates', ->
    grs = [
      {
        country: 'US'
        state: 'KS'
      }
      {
        country: 'US'
        state: 'MO'
      }
      {}
      {
        country: 'US'
        state: 'KS'
        city: 'EMPORIA'
      }
      {
        country: 'US'
        state: 'KS'
        postalCodes: '66212'
      }
      {
        country: 'US'
      }
    ]

    [gr, level, idx] = closestGeoRate grs, 'us', 'ks', '', '66212'
    gr.should.eq grs[4]
    level.should.eq 3
    idx.should.eq 4

  it 'Should Fail Without a Default Rate', ->
    grs = [
      {
        country: 'US'
        state: 'KS'
      }
      {
        country: 'US'
        state: 'MO'
      }
      {
        country: 'US'
        state: 'KS'
        city: 'EMPORIA'
      }
      {
        country: 'US'
        state: 'KS'
        postalCodes: '66212'
      }
      {
        country: 'US'
      }
    ]

    [gr, level, idx] = closestGeoRate grs, 'gb', 'bkm', '', 'sl8'
    expect(gr).to.be.null
    level.should.eq -1
    idx.should.eq -1

