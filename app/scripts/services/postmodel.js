/* globals escape, unescape */
/* jshint camelcase: false */
'use strict';

angular.module('cmsApp')
.service('PostModel', function(jsyaml, DateUtil) {

  this.create = function(dataFromGit) {
    var post = {
      sha: '',
      filename: '',
      body: '',
      createdTime: DateUtil.getDate().toMilliseconds(),
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
        date: ''
      },
      fromMarkDown: function(data) {
        var parts = decodeURIComponent(escape(data)).split('---');

        this.body = parts.pop().replace(/^\n/, '');
        var metadata = jsyaml.load(parts.pop());

        angular.extend(this.metadata, metadata);

        this.createdTime = DateUtil.toJavaScriptTimeStamp(this.metadata.created);

        return this;
      },
      toMarkDown: function(){
        this.metadata.created = DateUtil.toRubyTimeStamp(this.createdTime);
        this.metadata.date = this.metadata.date || DateUtil.applyFormat('yyyy-MM-dd HH:mm:ss', this.createdTime);

        var compiled = ['---', jsyaml.dump(this.metadata), '---', this.body].join('\n');
        return unescape(encodeURIComponent(compiled));
      },
      toCommit: function(){
        return {
          sha: this.sha,
          content: btoa(this.toMarkDown()),
          message: 'commit from cms'
        };
      }
    };

    if(dataFromGit){
      post.fromMarkDown(atob(dataFromGit.content));
      post.sha = dataFromGit.sha;
      post.filename = dataFromGit.name;
    }

    return post;
  };
});
