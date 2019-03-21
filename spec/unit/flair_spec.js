const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const Flair = require("../../src/db/models").Flair;

describe("Post", () => {

  beforeEach((done) => {
    //#1
    this.topic;
    this.post;
    this.flair;
    sequelize.sync({ force: true }).then((res) => {

      //#2
      Topic.create({
        title: "Expeditions to Alpha Centauri",
        description: "A compilation of reports from recent visits to the star system."
      })
        .then((topic) => {
          this.topic = topic;
          //#3
          Post.create({
            title: "My first visit to Proxima Centauri b",
            body: "I saw some rocks.",
            //#4
            topicId: this.topic.id
          })
            .then((post) => {
              this.post = post;

              Flair.create({
                name: "red",
                color: "red",
                topicId: this.topic.id,
                postId: this.post.id
              })
                .then((flair) => {
                  this.flair = flair;
                  console.log('done')
                  done();
                })
            });
        })
        .catch((err) => {
          console.log(err);
          done();
        });
    });

  });

  describe("#create()", () => {

    it("should create a flair", (done) => {
      //#1
      Flair.create({
        name: "test",
        color: "test",
        topicId: this.topic.id,
        postId: this.post.id
      })
        .then((flair) => {

          //#2
          expect(flair.name).toBe("test");
          expect(flair.color).toBe("test");
          done();

        })
        .catch((err) => {
          console.log(err);
          done();
        });
    });

    it("should not create a flair with missing name, color, topicId or postId", (done) => {
      Flair.create({
        name: "test"
      })
        .then((post) => {
          done();

        })
        .catch((err) => {

          expect(err.message).toContain("Flair.color cannot be null");
          expect(err.message).toContain("Flair.postId cannot be null");
          expect(err.message).toContain("Flair.topicId cannot be null");
          done();

        })
    });

  });

  describe("#getFlair()", () => {

    it("should return the associated flair", (done) => {

      this.flair.getFlair()
        .then((associatedFlair) => {
          expect(associatedFlair.name).toBe("test");
          done();
        });

    });

  });


});