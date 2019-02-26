'use strict';
module.exports = (sequelize, DataTypes) => {
  var Topic = sequelize.define('Topic', {
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});

  Topic.associate = function (models) {
    Topic.hasMany(models.Banner, {
      foreignKey: "topicId",
      as: "banners",
    });
    // associations can be defined here
  };
  return Topic;
};