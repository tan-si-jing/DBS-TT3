from flask import db
from sqlalchemy.orm import relationship

class Employee(db.Model): 
    tablename = 'Employee' 
    EmployeeID = db.Column(db.Intger, primary_key=True) 
    SupervisorID = db.Column(db.Integer, db.ForeignKey("Employee.EmployeeID")) 
    supervisor = relationship('Employee', foreign_key='SupervisorID') 
    DepartmentCode = db.Column(db.String(50), db.Foreignkey('Department.DepartmentCode')) 
    departmentcode = relationship('departmentcode', foreign_key='DepartmentCode') 
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
    employee = db.relationship("Employee", foreign_key='EmployeeID') 
    projectName= db.Column(db.String(100), unique=True, nullable=False)
    projectStatus = db.Column(db.String(225), nullable=False)
    budget= db.Column(db.float, nullable=False)
    projectLeadID = db.Column(db.string(225), nullable=False)

class ProjectExpenseClaim(db.model):
    tablename = 'ProjectExpenseClaim' 
    claimID = db.Column(db.Integer, primary_key=True)
    EmployeeID = db.Column(db.Integer, db.ForeignKey('EmployeeProjects.EmployeeID'))
    employee = db.relationship("EmployeeProjects", foreign_key="EmployeeID")
    ProjectID = db.Column(db.Integer, db.ForeignKey('EmployeeProjects.projectID'))
    project = db.relationship("EmployeeProjects", foreign_key="projectID") 
    CurrencyID = db.Column(db.Integer, db.ForeignKey('EmployeeProjects.CurrencyID'))
    currency = db.relationship("Currency", foreign_key="CurrencyID")
    
class Currency(db.Model):
    tablename = 'Currency'
    CurrencyID = db.Column(db.Integer, primary_key=True)
    ExchangeRate =  db.Column(db.float, nullable=False)
