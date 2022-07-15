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
        allowNull: true,
      },
      color: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      memo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      sticker: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      coverImage: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      createdAt: {
        type: 'TIMESTAMP',
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
      updatedAt: {
        type: 'TIMESTAMP',
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: true,
      },
    },
    {
      timestamps: false,
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
