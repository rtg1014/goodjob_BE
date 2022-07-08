module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define(
    'schedule',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      place: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      d_day: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    }
  );

  Schedule.associate = (db) => {
    db.Schedule.belongsToMany(db.User, {
      through: 'user_schedule',
      foreignKey: 'scheduleId',
    });
    db.Schedule.belongsTo(db.Posting, {
      foreignKey: 'postingId',
    });
  };

  return Schedule;
};
