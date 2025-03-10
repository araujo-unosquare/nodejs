const { expect } = require("chai");
const sinon = require("sinon");
const mongoose = require("mongoose");

const User = require("../models/user");
const AuthController = require("../controllers/auth");

describe("Auth controller - login", function () {
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
  it("should throw an error with code 500 if accessing the database fails", (done) => {
    sinon.stub(User, "findOne");
    User.findOne.throws();

    const req = {
      body: {
        email: "test@test.com",
        password: "12345",
      },
    };

    AuthController.login(req, {}, () => {}).then((result) => {
      expect(result).to.be.an("error");
      expect(result).to.have.property("statusCode", 500);
      done();
    });

    User.findOne.restore();
  });

  it("should send a response with valid user status", function (done) {
    const req = { userId: "67c5cd90dddb415599d624b3" };
    const res = {
      statusCode: 500,
      userStatus: null,
      status: function (code) {
        this.statusCode = code;
        return this;
      },
      json: function (data) {
        this.userStatus = data.status;
      },
    };
    AuthController.getUserStatus(req, res, () => {}).then(() => {
      expect(res.statusCode).to.be.equal(200);
      expect(res.userStatus).to.be.equal("I am new!");
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
