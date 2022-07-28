module.exports = (sequelize, DataTypes) => {
  const CompanyType = sequelize.define(
    'companyType',
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

  CompanyType.associate = (db) => {
    db.CompanyType.hasMany(db.User_info);
    db.CompanyType.hasMany(db.Posting);
  };

  return CompanyType;
};
