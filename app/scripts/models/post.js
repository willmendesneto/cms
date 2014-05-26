function makePost(data) {
  var self = {};
  _.extend(self, data);

  self.loadContentFromJekyllData = function (data) {
    var parts = decodeURIComponent(escape(data)).split('---');
    self.content = {
      text: parts.pop().replace(/^\n/, ""),
      meta: jsyaml.load(parts.pop())
    };
  };

  self.convertContentToJekyllData = function () {
    if (!self.content) return "";

    var compiled = ['---', jsyaml.dump(self.content.meta), '---', self.content.text].join('\n');
    return unescape(encodeURIComponent(compiled));
  };

  self. commitData = function() {
    return {
      sha: self.sha,
      content: btoa(self.convertContentToJekyllData()),
      message: 'commit from cms'
    };
  };

  self.setMenuItem = function(menuItemName) {
    if (!self.content) return;

    self.content.meta.tags = _.filter(self.content.meta.tags, function (el) {
      return !(/^menu:/).test(el);
    });

    if (!!menuItemName){
      self.content.meta.tags.push("menu:"+menuItemName);
    }
  };

  self.setSection = function(section) {
    if (!self.content) return;

    if (!section) {
      self.content.meta.section = "";
      return;
    }

    self.content.meta.section = section.value;
  };

  return self;
}
