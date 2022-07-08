module.exports = (sequelize, DataTypes) => {
  const user_schedule = sequelize.define(
    'user_schedule',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      scheduleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      memo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      sticker: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      coverImage: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      timestamps: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    }
  );

  user_schedule.associate = (db) => {
    db.user_schedule.belongsTo(db.User, {
      foreignKey: 'userId',
    });

    db.user_schedule.belongsTo(db.Schedule, {
      foreignKey: 'scheduleId',
    });
  };

  return user_schedule;
};
