'use strict';

var expect = require('chai').expect;
var net = require('net');
var fs = require('fs');

describe('TCP server', function() {

  var fileName;

  before(function(done) {
    var client = net.connect(3000);
    client.on('data', function(data) {
      fileName = data.toString().split(': ')[1];
    });
    client.end();
    done();
  });

  it('should have created a connection', function() {
    expect(fileName).to.not.equal(undefined);
  });

  it('should have created a log file', function() {
    expect(fs.statSync('./out/' + fileName + '.txt').isFile()).to.equal(true);
  });

});

