describe('PostSearchFilter', function() {
  var aaaaPost = makePost({name: "aaaa"});
  var bbbbPost = makePost({name: "bbbb"});
  var abbaPost = makePost({name: "abba"});
  var accaPost = makePost({name: "acca"});

  var posts = [aaaaPost, bbbbPost, abbaPost, accaPost];

  it('should return all posts with no search term', function() {
    var filteredPosts = postSearchFilter(posts, "");

    expect(filteredPosts).toEqual(posts);
  });

  it('should filter posts by the typed term', function() {
    var filteredPosts = postSearchFilter(posts, "bb");

    expect(filteredPosts).toContain(bbbbPost);
    expect(filteredPosts).toContain(abbaPost);
    expect(filteredPosts).not.toContain(aaaaPost);
    expect(filteredPosts).not.toContain(accaPost);
  });
});
