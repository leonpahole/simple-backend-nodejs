"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    let generatedKittens = [];
    for (let i = 0; i < 2; i++) {
      generatedKittens.push({
        name: `Mykitten ${i}`,
        age: i + 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    return queryInterface.bulkInsert("Kittens", generatedKittens);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Kittens", null, {});
  },
};
