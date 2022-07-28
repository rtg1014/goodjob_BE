'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert("companyTypes", [
      {
        type: "전체",
      }, 
      {
        type: "대기업",
      }, 
      {
        type: "중견·중소",
      }, 
      {
        type: "공기업·공사",
      }, 
      {
        type: "외국계",
      }, 
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};