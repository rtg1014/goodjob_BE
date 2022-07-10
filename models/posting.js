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
        career: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        education: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        address: {
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
        }
      },
      {
        timestamps: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  
    Posting.associate = (db) => {
        db.Posting.hasMany(db.Schedule); //user, Schedule 1:N 관계 하나의 포스팅을 여러명이 스크랩 할수 있나? yes 그래서 has many
    };
  
    return Posting;
  };
  