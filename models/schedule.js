module.exports = (sequelize, DataTypes) => {
  const Schedule = sequelize.define(
    'schedule',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      place: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      companyName: {
        type: DataTypes.STRING,
        allowNull: true,
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

  Schedule.associate = (db) => {
    db.Schedule.belongsToMany(db.User, {
      through: 'user_schedule',
    });
    db.Schedule.belongsTo(db.Posting, {
      foreignKey: 'postingId',
    });
  };

  return Schedule;
};
