module.exports = (sequelize, DataTypes) => {
  const Study = sequelize.define(
    'study',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      totalMember: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      online: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      week: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      day: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      time: {
        type: DataTypes.STRING,
        allowNull: true,
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

  return Study;
};
