module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    }
  );

  User.associate = (db) => {
    db.User.hasOne(db.User_info);
    db.User.belongsToMany(db.Schedule, {
      through: 'user_schedule',
      foreignKey: 'userId',
    });
  };

  return User;
};
