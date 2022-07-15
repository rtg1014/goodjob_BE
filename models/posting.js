module.exports = (sequelize, DataTypes) => {
  const Posting = sequelize.define(
    'posting',
    {
      companyName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      deadline: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
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

  Posting.associate = (db) => {
    db.Posting.hasMany(db.Schedule); //user, Schedule 1:N 관계 하나의 포스팅을 여러명이 스크랩 할수 있나? yes 그래서 has many
    db.Posting.belongsTo(db.CompanyType);
    db.Posting.belongsTo(db.City);
    db.Posting.belongsTo(db.Career);
    db.Posting.belongsToMany(db.Job, {
      through: 'posting_job',
    });
  };

  return Posting;
};
