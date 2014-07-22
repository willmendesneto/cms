/* globals escape, unescape */
/* jshint camelcase: false */
'use strict';

angular.module('cmsApp')
.factory('PostModel', function(jsyaml) {

  var factory = {
    sha: '',
    filename: '',
    body: '',
    metadata: {
      layout: 'post',
      title: '',
      legacy_url: '',
      created: 0,
      images: '',
      video: '',
      tags: [],
      files: [],
      type: '',
      support_line: '',
      section: '',
      hat: '',
      label: '',
      images_hd: '',
      menu: '',
      published: true,
    }
  };

  factory.fromMarkDown = function(data) {
    var parts = decodeURIComponent(escape(data)).split('---');

    this.body = parts.pop().replace(/^\n/, '');
    var metadata = jsyaml.load(parts.pop());

    angular.extend(this.metadata, metadata);
    return this;
  };

  factory.toMarkDown = function(){
    var compiled = ['---', jsyaml.dump(this.metadata), '---', this.body].join('\n');
    return unescape(encodeURIComponent(compiled));
  };

  factory.toCommit = function(){
    return {
      sha: this.sha,
      content: btoa(this.toMarkDown()),
      message: 'commit from cms'
    };
  };

  return factory;
});
