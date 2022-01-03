const { DataTypes } = require('sequelize')

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addColumn('blogs', 'year', {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        customValidator(value) {
          if (value < 1991 && value > new Date().getFullYear()) {
            throw new Error(
              `Year must be between 1991 - ${new Date().getFullYear()}.`
            )
          }
        },
      },
    })
  },
  down: async (queryInterface) => {
    await queryInterface.removeColumn('blogs', 'year')
  },
}
