from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship, backref

db = SQLAlchemy()

class Employee(db.Model): 
    tablename = 'employee' 
    EmployeeID = db.Column(db.Integer, primary_key=True) 
    SupervisorID = db.Column(db.Integer, db.ForeignKey("employee.EmployeeID")) 
    supervisor = relationship('Employee', remote_side=[EmployeeID]) 

    DepartmentCode = db.Column(db.String(50), db.ForeignKey('Department.DepartmentCode')) 
    # departmentcode = relationship('Department', remote_side=[Department]) 

    Password = db.Column(db.VARCHAR(255)) 
    FirstName = db.Column(db.VARCHAR(50)) 
    LastName = db.Column(db.VARCHAR(50)) 
    BankAccountNumber = db.Column(db.VARCHAR(50)) 


class Department(db.Model): 
    tablename = 'Department' 
    DepartmentCode = db.Column(db.VARCHAR(20), primary_key=True) 
    DepartmentName = db.Column(db.VARCHAR(50))

class EmployeeProjects(db.Model):
    tablename = 'EmployeeProjects' 
    projectID = db.Column(db.Integer, primary_key=True)
    EmployeeID = db.Column(db.Integer, db.ForeignKey('Employee.EmployeeID'))
    # employee = db.relationship("Employee") 
    projectName= db.Column(db.String(100), unique=True, nullable=False)
    projectStatus = db.Column(db.String(225), nullable=False)
    budget= db.Column(db.Float, nullable=False)
    projectLeadID = db.Column(db.String(225), nullable=False)

class ProjectExpenseClaim(db.Model):
    tablename = 'ProjectExpenseClaim' 
    claimID = db.Column(db.Integer, primary_key=True)
    EmployeeID = db.Column(db.Integer, db.ForeignKey('EmployeeProjects.EmployeeID'))
    # employee = db.relationship("EmployeeProjects")
    ProjectID = db.Column(db.Integer, db.ForeignKey('EmployeeProjects.projectID'))
    # project = db.relationship("EmployeeProjects") 
    CurrencyID = db.Column(db.Integer, db.ForeignKey('EmployeeProjects.CurrencyID'))
    # currency = db.relationship("Currency")
    
class Currency(db.Model):
    tablename = 'Currency'
    CurrencyID = db.Column(db.Integer, primary_key=True)
    ExchangeRate =  db.Column(db.Float, nullable=False)
