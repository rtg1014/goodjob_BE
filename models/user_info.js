module.exports = (sequelize, DataTypes) => {
  const User_info = sequelize.define(
    'user_info',
    {
      type: {
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

  User_info.associate = (db) => {
    db.User_info.belongsTo(db.User); //user, userinfo 1:1관계
    db.User_info.belongsTo(db.City); //User_info, City 1:N관계
    db.User_info.belongsTo(db.Job); //User_info, Job 1:1관계
    db.User_info.belongsTo(db.Career); //User_info, Career 1:1관계
    db.User_info.belongsTo(db.CompanyType); //User_info, CompanyType 1:1관계
  };

  return User_info;
};
