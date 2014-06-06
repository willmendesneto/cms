/* globals escape, unescape */
'use strict';

angular.module('cmsApp').service('Post', function Post(_, jsyaml) {

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

      self.convertContentToJekyllData = function () {
        if (!self.content) {
          return '';
        }

        var compiled = ['---', jsyaml.dump(self.content.meta), '---', self.content.text].join('\n');
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

      self.setImagesHD = function(imagesHD) {
        if (!self.content) {
          return;
        }

        if (!imagesHD) {
          self.content.meta.imagesHD = '';
          return;
        }

        self.content.meta.imagesHD = imagesHD;
      };

      self.addNewTag = function(customTag) {
        if (!self.content.meta.tags) {
          return;
        }

        customTag = 'personalizada:'+customTag;
        self.content.meta.tags.push(customTag);
      };

      return self;
    }
  };

  // AngularJS will instantiate a singleton by calling "new" on this function
});
