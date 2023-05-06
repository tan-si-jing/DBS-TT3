module.exports = (sequelize, Sequelize) => {
  const Department = sequelize.define(
    "Department",
    {
      DepartmentCode: {
        type: Sequelize.STRING(20),
        primaryKey: true,
      },
      DepartmentName: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  return Department;
};
