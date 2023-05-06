module.exports = (sequelize, Sequelize) => {
    const Employee = sequelize.define("Employee", {
      EmployeeID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      FirstName: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      LastName: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      Password: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      BankAccountNumber: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
      }
    }, { timestamps: false });
    return Employee;
  };
  
  // each employee has one supervisor, one department, many projects and many claims
  
  /*
  primaryKey: true
  autoIncrement: true
  unique: true
  allowNull: false
  */