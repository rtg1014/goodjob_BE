module.exports = (sequelize, DataTypes) => {
  const Job = sequelize.define(
    'job',
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

  Job.associate = (db) => {
    db.Job.hasMany(db.User_info); 
    db.Job.belongsToMany(db.Posting, {
      through: 'posting_job',
    });
  };

  return Job;
};
