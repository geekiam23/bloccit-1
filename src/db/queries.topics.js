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
    return Topic.destroy({
      where: { id }
    })
      .then((topic) => {
        callback(null, topic);
      })
      .catch((err) => {
        callback(err);
      })
  },

  updateTopic(id, updatedTopic, callback) {
    return Topic.findById(id)
      .then((topic) => {
        if (!topic) {
          return callback("Topic not found");
        }

        //#1
        topic.update(updatedTopic, {
          fields: Object.keys(updatedTopic)
        })
          .then(() => {
            callback(null, topic);
          })
          .catch((err) => {
            callback(err);
          });
      });
  }
}