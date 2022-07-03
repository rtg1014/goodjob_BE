module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    'comment',
    {
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    }
  );

  // 관계설정은 나중에
  // User.associate = (db) => {
  //   db.Badge.belongsToMany(db.User, { through: "UserBadge", as: "Challengers" });
  //   db.Badge.hasMany(db.User, { as: "MasterBadge", foreignKey: "masterBadgeId" })
  // };

  return Comment;
};
