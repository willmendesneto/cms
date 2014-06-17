/* globals escape, unescape */
'use strict';

angular.module('cmsApp')
  .service('Post', function Post(_, jsyaml, CustomTag, DateUtil) {

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
                      type: '',
                      support_line: '',
                      section: '',
                      hat: '',
                      label: '',
                      images_hd: ''
              }
            };
        };

        self.getContent = function(){
          if(!self.content.meta.created){
            self.content.meta.created = DateUtil.getTime().getTime();
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

        self.addNewTag = function(customTag) {
          if (!self.content.meta.tags) {
            return;
          }

          var customTagJason = {'personalizada': customTag};
          CustomTag.addNewCustomTag(customTagJason);

          var customTagMeta = 'personalizada:'+customTag;
          self.content.meta.tags.push(customTagMeta);
        };

        self.deleteTag = function(customTag){
          if (!self.content.meta.tags) {
            return;
          }
          self.content.meta.tags = _.without(self.content.meta.tags, 'personalizada:'+customTag);
        };

        return self;
      }
    };
  // AngularJS will instantiate a singleton by calling "new" on this function
  });
