const postQueries = require("../db/queries.posts.js");
const Authorizer = require("../policies/topic");

module.exports = {
  new(req, res, next) {
    const authorized = new Authorizer(req.user).new();

    if (authorized) {
      res.render("posts/new");
    } else {
      req.flash("notice", "You are not authorized to do that.");
      res.redirect("/posts");
    }
  },

  create(req, res, next) {
    const authorized = new Authorizer(req.user).create();

    // #2
    if (authorized) {
      let newPost = {
        title: req.body.title,
        body: req.body.body,
        topicId: req.params.topicId,
        userId: req.user.id
      };
      postQueries.addPost(newPost, (err, topic) => {
        if (err) {
          res.redirect(500, "posts/new");
        } else {
          res.redirect(303, `/topics/${topic.id}/posts`);
        }
      });
    } else {

      // #3
      req.flash("notice", "You are not authorized to do that.");
      res.redirect("/topics/posts");
    }
  },

  show(req, res, next) {
    postQueries.getPost(req.params.id, (err, post) => {
      if (err || post == null) {
        res.redirect(404, "/");
      } else {
        res.render("posts/show", { post });
      }
    });
  },

  destroy(req, res, next) {
    postQueries.deletePost(req, (err, post) => {
      if (err) {
        res.redirect(500, `/topics/${req.params.topicId}/posts/${req.params.id}`)
      } else {
        res.redirect(303, `/topics/${req.params.topicId}`)
      }
    });
  },

  edit(req, res, next) {
    postQueries.getPost(req.params.id, (err, post) => {
      if (err || post == null) {
        res.redirect(404, "/");
      } else {
        res.render("posts/edit", { post });
      }
    });
    // #1
    postQueries.getPost(req.params.id, (err, post) => {
      if (err || post == null) {
        res.redirect(404, "/");
      } else {
        // #2
        const authorized = new Authorizer(req.user, post).edit();

        // #3
        if (authorized) {
          res.render("posts/edit", { post });
        } else {
          req.flash("You are not authorized to do that.")
          res.redirect(`/topics/${req.params.topicId}`)
        }
      }
    });
  },
  update(req, res, next) {
    postQueries.updatePost(req, req.body, (err, post) => {
      if (err || post == null) {
        res.redirect(401, `/topics/${req.params.topicId}/posts/${req.params.id}/edit`);
      } else {
        res.redirect(`/topics/${req.params.topicId}/posts/${req.params.id}`);
      }
    });
  }
}
