module.exports = (sequelize, DataTypes) => {
  const CompanyType = sequelize.define(
    'companyType',
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

  CompanyType.associate = (db) => {
    db.CompanyType.hasMany(db.User_info);
    db.CompanyType.hasMany(db.Posting);
  };

  return CompanyType;
};
