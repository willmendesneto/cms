var PostBuilder =  {
  jekyllData: "---\n" +
    "layout: post\n" +
    "title: 'Post Title'\n" +
    "created: 1323977240\n" +
    "images: []\n" +
    "video:\n" +
    "tags:\n" +
    "section:\n" +
    "- menu:menuitem\n" +
    "---\n" +
    "post content",
  build: function () {
    return makePost();
  },
  buildAndLoadJekyllData: function () {
    var post = this.build();
    post.loadContentFromJekyllData(this.jekyllData);
    return post;
  }
};
