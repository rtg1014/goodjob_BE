module.exports = (sequelize, DataTypes) => {
  const City = sequelize.define(
    'city',
    {
      main: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      sub: {
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

  return City;
};
