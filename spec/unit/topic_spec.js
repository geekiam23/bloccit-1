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

    });//

    describe('#create()', () => {
        it('should create and store a new Topic', (done) => {
            Topic.create({
                title: 'test',
                description: 'textt',
                createdAt: '',
                updateAt: ''
            })
                .then((topic) => {
                    expect(topic).toBeDefined();
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    done();
                })
        });
    })//

    describe('#getPosts()', () => {
        it('should confirm posts are being retrieved', (done) => {

            Topic.getPosts()     //returns an array of Sequelize Model instances
                .then((posts) => {
                    console.log(posts[0].title);
                })
            done()
        })
    }) //
});