var data = "\
---\n\
layout: post\n\
title: 'Post Title'\n\
created: 1323977240\n\
images: []\n\
video:\n\
tags:\n\
- menu:menuitem\n\
---\n\
\n\
post content";

describe('Post', function() {
  it('should load content from jekyll data', function() {
    var post = makePost();
    post.loadContentFromJekyllData(data);

    expect(post.content.text).toBe("\n\npost content");

    expect(post.content.meta.layout).toBe("post");
    expect(post.content.meta.title).toBe("Post Title");
    expect(post.content.meta.tags).toContain("menu:menuitem");
  });
});
