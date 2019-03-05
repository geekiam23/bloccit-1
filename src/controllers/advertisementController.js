module.exports = {
    index(req, res, next) {
      res.render("advertisements/index", { title: "Ads" });
    },
  }