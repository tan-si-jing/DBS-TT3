SET SQL_SAFE_UPDATES = 0;

CREATE DATABASE IF NOT EXISTS ClaimSystem;
USE ClaimSystem;

DROP TABLE IF EXISTS ProjectExpenseClaims;
DROP TABLE IF EXISTS Currency;
DROP TABLE IF EXISTS EmployeeProjects;
DROP TABLE IF EXISTS Projects;
DROP TABLE IF EXISTS Employee;
DROP TABLE IF EXISTS Department;



CREATE TABLE Department (
    DepartmentCode varchar(20) NOT NULL,
    DepartmentName varchar(50) NOT NULL,

    PRIMARY KEY (DepartmentCode)
);

CREATE TABLE Employee (
    EmployeeID int NOT NULL,
    SupervisorID int,
    DepartmentCode varchar(20) NOT NULL,
    Password varchar(255) NOT NULL,
    FirstName varchar(50) NOT NULL,
    LastName varchar(50) NOT NULL,
    BankAccountNumber varchar(50) NOT NULL,
    
    PRIMARY KEY (EmployeeID),
    FOREIGN KEY (SupervisorID) REFERENCES Employee(EmployeeID),
    FOREIGN Key (DepartmentCode) REFERENCES Department(DepartmentCode)
);

CREATE TABLE Projects (
	ProjectID int NOT NULL,
	ProjectName varchar(100) NOT NULL,
    ProjectStatus varchar(255) NOT NULL,
    ProjectBudget float NOT NULL,
    ProjectLeadID int NOT NULL,
    
	PRIMARY KEY (ProjectID),
	FOREIGN KEY (ProjectLeadID) REFERENCES Employee(EmployeeID)
);

CREATE TABLE EmployeeProjects (
    ProjectID int NOT NULL,
    EmployeeID int NOT NULL,
	
    FOREIGN KEY (ProjectID) REFERENCES Projects(ProjectID),
    CONSTRAINT UC_EP UNIQUE (ProjectID,EmployeeID)
);

CREATE TABLE Currency (
    CurrencyID varchar(50) NOT NULL,
    ExchangeRate float NOT NULL,

    PRIMARY KEY (CurrencyID)
);


CREATE TABLE ProjectExpenseClaims (
    ClaimID int NOT NULL,
    ProjectID int NOT NULL,
    EmployeeID int NOT NULL,
    CurrencyID varchar(50) NOT NULL,
    ExpenseDate DATETIME NOT NULL,
    Amount float NOT NULL,
    Purpose varchar(255) NOT NULL,
    ChargeToDefaultDept boolean,
    AlternativeDeptCode varchar(255),
    Status varchar(20),
    LastEditedClaimDate DATETIME,

    PRIMARY KEY (ClaimID),
    FOREIGN KEY (ProjectID) REFERENCES Projects(ProjectID),
    FOREIGN KEY (EmployeeID) REFERENCES Employee(EmployeeID),
    FOREIGN KEY (CurrencyID) REFERENCES Currency(CurrencyID),

    CONSTRAINT CheckClaimStatus CHECK (Status IN ('pending', 'approved', 'rejected')),
    CONSTRAINT CheckEditedClaimDate CHECK (ExpenseDate <= LastEditedClaimDate)
);



INSERT INTO Department (DepartmentCode, DepartmentName)
VALUES ("102", "Marketing");

INSERT INTO Department (DepartmentCode, DepartmentName)
VALUES ("101", "Sales");

INSERT INTO Department (DepartmentCode, DepartmentName)
VALUES ("103", "Human Resources");

INSERT INTO Department (DepartmentCode, DepartmentName)
VALUES ("104", "Finance");

INSERT INTO Department (DepartmentCode, DepartmentName)
VALUES ("105", "Information Technology");

INSERT INTO Department (DepartmentCode, DepartmentName)
VALUES ("106", "Customer Service");

INSERT INTO Department (DepartmentCode, DepartmentName)
VALUES ("107", "Engineering");

INSERT INTO Department (DepartmentCode, DepartmentName)
VALUES ("108", "Research and Development");

INSERT INTO Department (DepartmentCode, DepartmentName)
VALUES ("109", "Procurement");

INSERT INTO Department (DepartmentCode, DepartmentName)
VALUES ("110", "Insurance");

INSERT INTO Employee (EmployeeID, SupervisorID, DepartmentCode, Password, FirstName, LastName, BankAccountNumber)
VALUES (10001, NULL, "101", "Singa@123", "Aisha", "Tan", "1234567890");
INSERT INTO Employee (EmployeeID, SupervisorID, DepartmentCode, Password, FirstName, LastName, BankAccountNumber)
VALUES (10004, NULL, "102", "GulaMelaka#1", "Siti", "Baiduri", "4567890123");
INSERT INTO Employee (EmployeeID, SupervisorID, DepartmentCode, Password, FirstName, LastName, BankAccountNumber)
VALUES (10009, NULL, "105", "ShiokLah88#", "Wei Ting", "Tan", "9012345678");
INSERT INTO Employee (EmployeeID, SupervisorID, DepartmentCode, Password, FirstName, LastName, BankAccountNumber)
VALUES (10010, NULL, "105", "Majulah_Sg99", "Johnny", "Ng", "1123456789");
INSERT INTO Employee (EmployeeID, SupervisorID, DepartmentCode, Password, FirstName, LastName, BankAccountNumber)
VALUES (10017, NULL, "109", "Majulah_Sg77", "Rahman", "Tan", "8901234566");
INSERT INTO Employee (EmployeeID, SupervisorID, DepartmentCode, Password, FirstName, LastName, BankAccountNumber)
VALUES (10018, NULL, "109", "SedapNyumyum66", "Ying Ying", "Loh", "9012345677");
INSERT INTO Employee (EmployeeID, SupervisorID, DepartmentCode, Password, FirstName, LastName, BankAccountNumber)
VALUES (10002, 10001, "101", "LaKopi123!", "Jia Hui", "Lee", "2345678901");
INSERT INTO Employee (EmployeeID, SupervisorID, DepartmentCode, Password, FirstName, LastName, BankAccountNumber)
VALUES (10003, 10001, "102", "SedapNyumyum77", "Nurul", "Lim", "3456789012");
INSERT INTO Employee (EmployeeID, SupervisorID, DepartmentCode, Password, FirstName, LastName, BankAccountNumber)
VALUES (10005, 10002, "103", "Majulah*Sg123", "Shan", "Chong", "5678901234");
INSERT INTO Employee (EmployeeID, SupervisorID, DepartmentCode, Password, FirstName, LastName, BankAccountNumber)
VALUES (10006, 10002, "103", "ShiokLah99!", "Kai Ming", "Tan", "6789012345");
INSERT INTO Employee (EmployeeID, SupervisorID, DepartmentCode, Password, FirstName, LastName, BankAccountNumber)
VALUES (10007, 10003, "104", "ChopeSeat_88", "Rajesh", "Kumar", "7890123456");
INSERT INTO Employee (EmployeeID, SupervisorID, DepartmentCode, Password, FirstName, LastName, BankAccountNumber)
VALUES (10008, 10003, "104", "SiaLah#123", "Siti", "Jamilah", "8901234567");
INSERT INTO Employee (EmployeeID, SupervisorID, DepartmentCode, Password, FirstName, LastName, BankAccountNumber)
VALUES (10011, 10006, "106", "SedapNyumyum55", "Siti", "Zubaidah", "2345678903");
INSERT INTO Employee (EmployeeID, SupervisorID, DepartmentCode, Password, FirstName, LastName, BankAccountNumber)
VALUES (10012, 10006, "106", "KayaToast789#", "Kok Wai", "Lee", "3456789014");
INSERT INTO Employee (EmployeeID, SupervisorID, DepartmentCode, Password, FirstName, LastName, BankAccountNumber)
VALUES (10013, 10007, "107", "LaKopi_123", "Deepa", "Padukone", "4567890125");
INSERT INTO Employee (EmployeeID, SupervisorID, DepartmentCode, Password, FirstName, LastName, BankAccountNumber)
VALUES (10015, 10008, "108", "ChopeSeat99#", "Saravanan", "Kumar", "6789012349");
INSERT INTO Employee (EmployeeID, SupervisorID, DepartmentCode, Password, FirstName, LastName, BankAccountNumber)
VALUES (10016, 10008, "108", "GulaMelaka11#", "Xiao Mei", "Goh", "7890123450");
INSERT INTO Employee (EmployeeID, SupervisorID, DepartmentCode, Password, FirstName, LastName, BankAccountNumber)
VALUES (10019, 10011, "110", "LaKopi11#", "Munirah", "Yasin", "0123456781");
INSERT INTO Employee (EmployeeID, SupervisorID, DepartmentCode, Password, FirstName, LastName, BankAccountNumber)
VALUES (10020, 10011, "110", "SiaLah33#", "Ganesan", "Laksamana", "1234567892");

INSERT INTO Projects (ProjectID, ProjectName, ProjectStatus, ProjectBudget, ProjectLeadID)
VALUES (10005, "Project Name", "in progress", 0.99, 10003);



INSERT INTO EmployeeProjects (ProjectID, EmployeeID)
VALUES (10005, 10001);

INSERT INTO Currency (CurrencyID, ExchangeRate)
VALUES ("CNY", 0.206);
INSERT INTO Currency (CurrencyID, ExchangeRate)
VALUES ("HKD", 0.17);
INSERT INTO Currency (CurrencyID, ExchangeRate)
VALUES ("IDR", 0.000093);
INSERT INTO Currency (CurrencyID, ExchangeRate)
VALUES ("INR", 0.018);
INSERT INTO Currency (CurrencyID, ExchangeRate)
VALUES ("JPY", 0.012);
INSERT INTO Currency (CurrencyID, ExchangeRate)
VALUES ("KHR", 0.00025);
INSERT INTO Currency (CurrencyID, ExchangeRate)
VALUES ("KRW", 0.0011);
INSERT INTO Currency (CurrencyID, ExchangeRate)
VALUES ("SGD", 1);
INSERT INTO Currency (CurrencyID, ExchangeRate)
VALUES ("TWD", 0.045);
INSERT INTO Currency (CurrencyID, ExchangeRate)
VALUES ("VND", 0.000044);

INSERT INTO ProjectExpenseClaims (ClaimID, ProjectID, EmployeeID, CurrencyID, ExpenseDate, Amount, Purpose, ChargeToDefaultDept, AlternativeDeptCode, Status, LastEditedClaimDate)
VALUES (11147, 10005, 10001, "MYR", '2023-11-11', 20000.0, "Venue Procurement", true, "103", "pending", null)