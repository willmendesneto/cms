'use strict';

describe('Service: DateUtil', function () {

  beforeEach(module('cmsApp'));

  var DateUtilService;
  beforeEach(inject(function (_DateUtil_) {
    DateUtilService = _DateUtil_;
  }));

  it('service should exist', function () {
    expect(!!DateUtilService).toBe(true);
  });

  describe('#getTimestamp ', function() {
    it('should return zero, when inputs are empty', function (){
      var timestamp = DateUtilService.getTimestamp(undefined,undefined);

      expect(timestamp).toBe(0);
    });

    it('should return zero, when date or time is invalid', function (){
      var timestamp = DateUtilService.getTimestamp('invalid','invalid');

      expect(timestamp).toBe(0);
    });

    it('should convert date and time to timestamp', function(){
      var date = new Date('June 14 2014 17:41:08');
      var time = new Date('June 14 2014 6:41:08');

      var timestamp = DateUtilService.getTimestamp(date, time);

      expect(timestamp).toBe(1402738860000);
    });
  });

});
