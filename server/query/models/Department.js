module.exports = (sequelize, Sequelize) => {
  const Department = sequelize.define(
    "Department",
    {
      DepartmentCode: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
