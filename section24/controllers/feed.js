exports.getPosts = (req, res, next) => {
  res.status(200).json({ posts: [{ title: "first post", content: "test" }] });
};

exports.createPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  // create post
  res.status(201).json({
    message: "Success",
    post: { id: new Date().toISOString(), title, content },
  });
};
