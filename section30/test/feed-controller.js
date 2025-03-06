const { expect } = require("chai");
const sinon = require("sinon");
const mongoose = require("mongoose");

const User = require("../models/user");
const Post = require("../models/post");
const FeedController = require("../controllers/feed");

describe("Feed controller", function () {
  before(function (done) {
    const MONGODB_URI =
      "mongodb+srv://carlosaraujo:mongopass@cluster0.7jhtq.mongodb.net/test-db?retryWrites=true&w=majority&appName=Cluster0";

    mongoose
      .connect(MONGODB_URI)
      .then((result) => {
        const user = new User({
          email: "test@test.com",
          password: "12345",
          name: "test",
          posts: [],
          _id: "67c5cd90dddb415599d624b3",
        });
        return user.save();
      })
      .then(() => {
        done();
      });
  });
  it("should add a created posts to the posts of the creator", (done) => {
    const req = {
      body: {
        title: "Test post",
        content: "testttt",
      },
      file: {
        path: "qwe",
      },
      userId: "67c5cd90dddb415599d624b3",
    };

    const res = {
      status: function () {
        return this;
      },
      json: function () {},
    };

    FeedController.createPost(req, res, () => {}).then((savedUser) => {
      expect(savedUser).to.have.property("posts");
      expect(savedUser.posts).to.have.length(1);
      done();
    });
  });

  after(function (done) {
    User.deleteMany({})
      .then(() => {
        return mongoose.disconnect();
      })
      .then(() => {
        done();
      });
  });
});
