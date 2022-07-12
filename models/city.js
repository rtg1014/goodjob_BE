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

  City.associate = (db) => {
    db.City.hasOne(db.User_info);
    db.City.hasMany(db.Posting);
  };

  return City;
};
