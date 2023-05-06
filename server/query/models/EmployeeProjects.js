module.exports = (sequelize, Sequelize) => {
  const EmployeeProjects = sequelize.define(
    "EmployeeProjects",
    {
      ProjectID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      ProjectName: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      ProjectStatus: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      ProjectBudget: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
    }, { timestamps: false }
  );
  return EmployeeProjects;
};
