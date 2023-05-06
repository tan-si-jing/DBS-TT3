module.exports = (sequelize, Sequelize) => {
  const ProjectExpenseClaims = sequelize.define(
    "ProjectExpenseClaims",
    {
      ClaimID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ExpenseDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      Purpose: {
        type: Sequelize.STRING(255),
      },
      Amount: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      Status: {
        type: Sequelize.STRING(20),
        allowNull: false,
        defaultValue: "Pending",
        isIn: [["Pending", "Accepted", "Rejected"]],
      },
      ChargeToDefaultDept: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      AlternativeDeptCode: {
        type: Sequelize.STRING(20),
      },
    },
    {
      timestamps: true,
      createdAt: false,
      updatedAt: "lastEditedClaimDate",
    }
  );
  return ProjectExpenseClaims;
};
