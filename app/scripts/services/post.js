/* globals escape, unescape */
'use strict';

angular.module('cmsApp')
  .service('Post', function Post(_, jsyaml, DateUtil) {

    return {
      makePost: function(data) {
        var self = {};
        _.extend(self, data);

        self.loadContentFromJekyllData = function (data) {
          var parts = decodeURIComponent(escape(data)).split('---');
          self.content = {
            text: parts.pop().replace(/^\n/, ''),
            meta: jsyaml.load(parts.pop())
          };
          self.loadTags();
          self.loadFiles();
        };

        self.create = function(){
      /*jshint camelcase: false */
          self.content = {
              text: '',
              meta: { layout: 'post',
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
                      published: false
              }
            };
        };

        self.getContent = function(){
          if(!self.content.meta.created){
            self.content.meta.created = Math.round(DateUtil.getTime().getTime() / 1000);
          }

          return self.content.meta;
        };

        self.convertContentToJekyllData = function () {
          if (!self.content) {
            return '';
          }

          var compiled = ['---', jsyaml.dump(self.getContent()), '---', self.content.text].join('\n');
          return unescape(encodeURIComponent(compiled));
        };

        self.commitData = function() {
          self.prepareTags();
          self.prepareFiles();
          return {
            sha: self.sha,
            content: btoa(self.convertContentToJekyllData()),
            message: 'commit from cms'
          };
        };

        self.setMenuItem = function(menuItemName) {
          if (!self.content) {
            return;
          }

          self.content.meta.tags = _.filter(self.content.meta.tags, function (el) {
            return !(/^menu:/).test(el);
          });

          self.content.meta.files = [];

          if (!!menuItemName){
            self.content.meta.tags.push('menu:'+menuItemName);
          }
        };

        self.getMenuItem = function() {
          if (!self.content) {
            return '';
          }

          var menuItem = _.filter(self.content.meta.tags, function(tag){
            return (/^menu:/).test(tag);
          });

          if(menuItem.length === 0){
            return '';
          }

          return menuItem[0].substr(5);
        };

        self.setLabel = function(label) {
          if (!self.content) {
            return;
          }

          if (!label) {
            self.content.meta.label = '';
            return;
          }

          self.content.meta.label = label.value;
        };

        self.getLabel = function() {
          if (!self.content) {
            return '';
          }
          return self.content.meta.label;
        };

        self.setSection = function(section) {
          if (!self.content) {
            return;
          }

          if (!section) {
            self.content.meta.section = '';
            return;
          }

          self.content.meta.section = section.value;
        };

        self.getSection = function() {
          if (!self.content) {
            return '';
          }
          return self.content.meta.section;
        };

        self.setImagesHD = function(imagesHD) {
          if (!self.content) {
            return;
          }
      /*jshint camelcase: false */
          if (!imagesHD) {
            self.content.meta.images_hd = '';
            return;
          }

          self.content.meta.images_hd = imagesHD;
        };

        self.getImagesHD = function() {
          if (!self.content) {
            return '';
          }
      /*jshint camelcase: false */
          return self.content.meta.images_hd;
        };

        self.tags = [];

        self.files = [];

        self.loadTags = function(){
          if (!self.content.meta.tags) {
            return;
          }

          var tags = _.filter(self.content.meta.tags, function (el) {
            return (/^tag:/).test(el);
          });

          self.tags = [];
          _.each(tags, function(tag){
            var value = tag.match(/tag:(.*)/)[1];
            self.tags.push({ text:value });
          });
        };

        self.loadFiles = function(){
          if (!self.content.meta.files) {
            return;
          }

          var files = self.content.meta.files;

          self.files = [];
          _.each(files, function(file){
            var linkValue = file.match(/link:(.*),/)[1];
            var titleValue = file.match(/title:(.*),/)[1];
            var thumbnailValue = file.match(/thumbnail:(.*)}/)[1];
            self.files.push({ link:linkValue, title:titleValue, thumbnail:thumbnailValue });
          });
        };

        self.prepareTags = function(){
          if (!self.content.meta.tags) {
            return;
          }
          var otherTags = _.filter(self.content.meta.tags, function (el) {
            return !(/^tag:/).test(el);
          });

          self.content.meta.tags = otherTags;

          _.each(self.tags, function(tag){
            self.content.meta.tags.push('tag:'+tag.text);
          });
        };

        self.prepareFiles = function(){
          if (!self.content.meta.files) {
            return;
          }

          _.each(self.files, function(file){
            self.content.meta.files.push('{link:' + file.link + ',title:' + file.title + ',thumbnail:' + file.thumbnail + '}');
          });
        };

        return self;
      }
    };
  // AngularJS will instantiate a singleton by calling "new" on this function
  });
