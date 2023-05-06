const Sequelize = require('sequelize')
const dbConfig = require('../config/dbConfig')

const db = {}

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.user,
  dbConfig.password,
  { host: dbConfig.host,
    dialect: dbConfig.dialect
  })

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.')
}).catch((error) => {
  console.error('Unable to connect to the database: ', error)
})

db.sequelize = sequelize
db.Sequelize = Sequelize

db.employee = require('./Employee')(sequelize, Sequelize)
db.project = require('./Project')(sequelize, Sequelize)
db.claim = require('./ProjectExpenseClaims')(sequelize, Sequelize)
db.currency = require('./Currency')(sequelize, Sequelize)
db.dept = require('./Department')(sequelize, Sequelize)

// each project has many employees, one currency, many claims
db.project.belongsToMany(db.employee, {
  through: 'EmployeeProjects',
  timestamps: false
});
db.project.hasMany(db.claim, {
  onDelete: 'CASCADE'
});

// each currency has many claims
db.currency.hasMany(db.claim);

// each employee has one supervisor, one department, many projects and many claims
db.employee.belongsTo(db.employee, {
  foreignKey: "supervisor_id"
});
db.employee.belongsTo(db.dept);
db.employee.belongsToMany(db.project, {
  through: 'EmployeeProjects',
  timestamps: false
});
db.employee.hasMany(db.claim, {
  onDelete: 'CASCADE'
});

// each claim has one project and one employee
db.claim.belongsTo(db.project);
db.claim.belongsTo(db.employee);
db.claim.belongsTo(db.currency);

// each dept has many employees
db.dept.hasMany(db.employee)

module.exports = db