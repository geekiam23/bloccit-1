const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe("Topic", () => {

    beforeEach((done) => {
        //#1
        this.topic;
        this.post;
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
                            console.log('done')
                            done();
                        });
                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
        });

    });

    describe("#create()", () => {

        it("should create and store a topic object", (done) => {
            //#1
            Topic.create({
                title: "title",
                description: "description"
            })
                .then((topic) => {

                    //#2
                    expect(topic.title).toBe("title");
                    expect(topic.description).toBe("description");
                    done();

                })
                .catch((err) => {
                    console.log(err);
                    done();
                });
        });

        it("should not create a topic with missing title or description", (done) => {
            Topic.create({
                title: "title"
            })
                .then((post) => {
                    done();

                })
                .catch((err) => {
                    expect(err.message).toContain("Topic.description cannot be null");
                    done();

                })
        });

    });

    describe("#getPosts()", () => {

        it("should return the associated posts", (done) => {

            this.topic.getPosts()
                .then((associatedPosts) => {
                    expect(associatedPosts).toBeDefined();
                    done();
                });

        });

    });


});