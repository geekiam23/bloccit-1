'use strict';
module.exports = (sequelize, DataTypes) => {
  var Topic = sequelize.define('Topic', {
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});

  // associations can be defined here

  Topic.associate = function (models) {
    Topic.hasMany(models.Banner, {
      foreignKey: "topicId",
      as: "banners",
    });
  };

  Topic.associate = function (models) {
    Topic.hasMany(models.Rule, {
      foreignKey: "topicId",
      as: "rules",
    });
  };
}