module.exports = (sequelize, DataTypes) => {
    const AuthEmail = sequelize.define(
      'authEmail',
      {
        email: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        authNumber: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        type: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        timestamps: true,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  
    return AuthEmail;
  };
  