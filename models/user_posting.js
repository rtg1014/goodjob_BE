module.exports = (sequelize, DataTypes) => {
    const user_posting = sequelize.define(
      'user_posting',
      {
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        postingId: {
          type: DataTypes.INTEGER,
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
  
    user_posting.associate = (db) => {
      db.user_posting.belongsTo(db.User, {
        foreignKey: 'userId',
      });
  
      db.user_posting.belongsTo(db.Posting, {
        foreignKey: 'postingId',
      });
    };
  
    return user_posting;
  };
  