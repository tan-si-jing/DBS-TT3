module.exports = (sequelize, Sequelize) => {
    const Currency = sequelize.define(
      "Currency",
      {
        CurrencyID: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        ExchangeRate: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
      },
      { timestamps: false }
    );
  
    return Currency;
  };
  