module.exports = (sequelize, DataTypes) => {
  const Career = sequelize.define(
    'career',
    {
      type: {
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

  Career.associate = (db) => {
    db.Career.hasMany(db.User_info);
    db.Career.hasMany(db.Posting);
  };

  return Career;
};
