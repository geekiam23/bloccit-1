const Topic = require("./models").Topic;
const Post = require("./models").Post;

module.exports = {
  getPosts(id, callback) {
    return Post.findById(id)

      .then((posts) => {
        callback(null, posts);
      })
      .catch((err) => {
        callback(err);
      })
  },

  //#1
  getAllTopics(callback) {
    return Topic.all()

      //#2
      .then((topics) => {
        callback(null, topics);
      })
      .catch((err) => {
        callback(err);
      })
  },

  addTopic(newTopic, callback) {
    return Topic.create({
      title: newTopic.title,
      description: newTopic.description
    })
      .then((topic) => {
        callback(null, topic);
      })
      .catch((err) => {
        callback(err);
      })
  },

  getTopic(id, callback) {
    //#2
    return Topic.findById(id, {
      //#3
      include: [{
        model: Post,
        as: "posts"
      }]
    })
      .then((topic) => {
        callback(null, topic);
      })
      .catch((err) => {
        callback(err);
      })
  },

  deleteTopic(id, callback) {
    // #1
    return Topic.findById(req.params.id)
      .then((topic) => {

        // #2
        const authorized = new Authorizer(req.user, topic).destroy();

        if (authorized) {
          // #3
          topic.destroy()
            .then((res) => {
              callback(null, topic);
            });

        } else {

          // #4
          req.flash("notice", "You are not authorized to do that.")
          callback(401);
        }
      })
      .catch((err) => {
        callback(err);
      });
  },

  updateTopic(id, updatedTopic, callback) {
    // #1
    return Topic.findById(req.params.id)
      .then((topic) => {
        // #2
        if (!topic) {
          return callback("Topic not found");
        }
        // #3
        const authorized = new Authorizer(req.user, topic).update();
        if (authorized) {
          // #4
          topic.update(updatedTopic, {
            fields: Object.keys(updatedTopic)
          })
            .then(() => {
              callback(null, topic);
            })
            .catch((err) => {
              callback(err);
            });
        } else {
          // #5
          req.flash("notice", "You are not authorized to do that.");
          callback("Forbidden");
        }
      });
  }
}