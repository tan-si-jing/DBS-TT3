SET SQL_SAFE_UPDATES = 0;

CREATE DATABASE IF NOT EXISTS ClaimSystem;
USE ClaimSystem;

DROP TABLE IF EXISTS ProjectExpenseClaims;
DROP TABLE IF EXISTS Currencies;
DROP TABLE IF EXISTS EmployeeProjects;
DROP TABLE IF EXISTS Projects;
DROP TABLE IF EXISTS Employees;
DROP TABLE IF EXISTS Departments;



CREATE TABLE Departments (
    DepartmentCode varchar(20) NOT NULL,
    DepartmentName varchar(50) NOT NULL,

    PRIMARY KEY (DepartmentCode)
);

CREATE TABLE Employees (
    EmployeeID int NOT NULL,
    SupervisorID int,
    DepartmentCode varchar(20) NOT NULL,
    Password varchar(255) NOT NULL,
    FirstName varchar(50) NOT NULL,
    LastName varchar(50) NOT NULL,
    BankAccountNumber varchar(50) NOT NULL,
    
    PRIMARY KEY (EmployeeID),
    FOREIGN KEY (SupervisorID) REFERENCES Employees(EmployeeID),
    FOREIGN Key (DepartmentCode) REFERENCES Departments(DepartmentCode)
);

CREATE TABLE Projects (
	ProjectID int NOT NULL,
	ProjectName varchar(100) NOT NULL,
    ProjectStatus varchar(255) NOT NULL,
    ProjectBudget float NOT NULL,
    ProjectLeadID int NOT NULL,
    
	PRIMARY KEY (ProjectID),
	FOREIGN KEY (ProjectLeadID) REFERENCES Employees(EmployeeID)
);

CREATE TABLE EmployeeProjects (
    ProjectID int NOT NULL,
    EmployeeID int NOT NULL,
	
    FOREIGN KEY (ProjectID) REFERENCES Projects(ProjectID),
    CONSTRAINT UC_EP UNIQUE (ProjectID,EmployeeID)
);

CREATE TABLE Currencies (
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
    FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID),
    FOREIGN KEY (CurrencyID) REFERENCES Currencies(CurrencyID),

    CONSTRAINT CheckClaimStatus CHECK (Status IN ('Pending', 'Approved', 'Rejected')),
    CONSTRAINT CheckEditedClaimDate CHECK (ExpenseDate <= LastEditedClaimDate)
);



INSERT INTO Departments (DepartmentCode, DepartmentName)
VALUES ("102", "Marketing");

INSERT INTO Departments (DepartmentCode, DepartmentName)
VALUES ("101", "Sales");

INSERT INTO Departments (DepartmentCode, DepartmentName)
VALUES ("103", "Human Resources");

INSERT INTO Departments (DepartmentCode, DepartmentName)
VALUES ("104", "Finance");

INSERT INTO Departments (DepartmentCode, DepartmentName)
VALUES ("105", "Information Technology");

INSERT INTO Departments (DepartmentCode, DepartmentName)
VALUES ("106", "Customer Service");

INSERT INTO Departments (DepartmentCode, DepartmentName)
VALUES ("107", "Engineering");

INSERT INTO Departments (DepartmentCode, DepartmentName)
VALUES ("108", "Research and Development");

INSERT INTO Departments (DepartmentCode, DepartmentName)
VALUES ("109", "Procurement");

INSERT INTO Departments (DepartmentCode, DepartmentName)
VALUES ("110", "Insurance");

INSERT INTO Employees (EmployeeID, SupervisorID, DepartmentCode, Password, FirstName, LastName, BankAccountNumber)
VALUES (10001, NULL, "101", "Singa@123", "Aisha", "Tan", "1234567890");
INSERT INTO Employees (EmployeeID, SupervisorID, DepartmentCode, Password, FirstName, LastName, BankAccountNumber)
VALUES (10004, NULL, "102", "GulaMelaka#1", "Siti", "Baiduri", "4567890123");
INSERT INTO Employees (EmployeeID, SupervisorID, DepartmentCode, Password, FirstName, LastName, BankAccountNumber)
VALUES (10009, NULL, "105", "ShiokLah88#", "Wei Ting", "Tan", "9012345678");
INSERT INTO Employees (EmployeeID, SupervisorID, DepartmentCode, Password, FirstName, LastName, BankAccountNumber)
VALUES (10010, NULL, "105", "Majulah_Sg99", "Johnny", "Ng", "1123456789");
INSERT INTO Employees (EmployeeID, SupervisorID, DepartmentCode, Password, FirstName, LastName, BankAccountNumber)
VALUES (10017, NULL, "109", "Majulah_Sg77", "Rahman", "Tan", "8901234566");
INSERT INTO Employees (EmployeeID, SupervisorID, DepartmentCode, Password, FirstName, LastName, BankAccountNumber)
VALUES (10018, NULL, "109", "SedapNyumyum66", "Ying Ying", "Loh", "9012345677");
INSERT INTO Employees (EmployeeID, SupervisorID, DepartmentCode, Password, FirstName, LastName, BankAccountNumber)
VALUES (10002, 10001, "101", "LaKopi123!", "Jia Hui", "Lee", "2345678901");
INSERT INTO Employees (EmployeeID, SupervisorID, DepartmentCode, Password, FirstName, LastName, BankAccountNumber)
VALUES (10003, 10001, "102", "SedapNyumyum77", "Nurul", "Lim", "3456789012");
INSERT INTO Employees (EmployeeID, SupervisorID, DepartmentCode, Password, FirstName, LastName, BankAccountNumber)
VALUES (10005, 10002, "103", "Majulah*Sg123", "Shan", "Chong", "5678901234");
INSERT INTO Employees (EmployeeID, SupervisorID, DepartmentCode, Password, FirstName, LastName, BankAccountNumber)
VALUES (10006, 10002, "103", "ShiokLah99!", "Kai Ming", "Tan", "6789012345");
INSERT INTO Employees (EmployeeID, SupervisorID, DepartmentCode, Password, FirstName, LastName, BankAccountNumber)
VALUES (10007, 10003, "104", "ChopeSeat_88", "Rajesh", "Kumar", "7890123456");
INSERT INTO Employees (EmployeeID, SupervisorID, DepartmentCode, Password, FirstName, LastName, BankAccountNumber)
VALUES (10008, 10003, "104", "SiaLah#123", "Siti", "Jamilah", "8901234567");
INSERT INTO Employees (EmployeeID, SupervisorID, DepartmentCode, Password, FirstName, LastName, BankAccountNumber)
VALUES (10011, 10006, "106", "SedapNyumyum55", "Siti", "Zubaidah", "2345678903");
INSERT INTO Employees (EmployeeID, SupervisorID, DepartmentCode, Password, FirstName, LastName, BankAccountNumber)
VALUES (10012, 10006, "106", "KayaToast789#", "Kok Wai", "Lee", "3456789014");
INSERT INTO Employees (EmployeeID, SupervisorID, DepartmentCode, Password, FirstName, LastName, BankAccountNumber)
VALUES (10013, 10007, "107", "LaKopi_123", "Deepa", "Padukone", "4567890125");
INSERT INTO Employees (EmployeeID, SupervisorID, DepartmentCode, Password, FirstName, LastName, BankAccountNumber)
VALUES (10015, 10008, "108", "ChopeSeat99#", "Saravanan", "Kumar", "6789012349");
INSERT INTO Employees (EmployeeID, SupervisorID, DepartmentCode, Password, FirstName, LastName, BankAccountNumber)
VALUES (10016, 10008, "108", "GulaMelaka11#", "Xiao Mei", "Goh", "7890123450");
INSERT INTO Employees (EmployeeID, SupervisorID, DepartmentCode, Password, FirstName, LastName, BankAccountNumber)
VALUES (10019, 10011, "110", "LaKopi11#", "Munirah", "Yasin", "0123456781");

INSERT INTO Projects (ProjectID, ProjectName, ProjectStatus, ProjectBudget, ProjectLeadID)
VALUES (10001, "Mobil100e Banking App", "In Progress", 15000, 10002);
INSERT INTO Projects (ProjectID, ProjectName, ProjectStatus, ProjectBudget, ProjectLeadID)
VALUES (10002, "Online Payment Gateway", "Completed", 25000, 10004);
INSERT INTO Projects (ProjectID, ProjectName, ProjectStatus, ProjectBudget, ProjectLeadID)
VALUES (10003, "ATM Upgrade", "In Progress", 18000, 10006);
INSERT INTO Projects (ProjectID, ProjectName, ProjectStatus, ProjectBudget, ProjectLeadID)
VALUES (10004, "Credit Scoring System", "Terminated", 30000, 10008);
INSERT INTO Projects (ProjectID, ProjectName, ProjectStatus, ProjectBudget, ProjectLeadID)
VALUES (10005, "Core Banking System Migration", "In Progress", 20000, 10010);
INSERT INTO Projects (ProjectID, ProjectName, ProjectStatus, ProjectBudget, ProjectLeadID)
VALUES (10006, "Digital Onboarding Platform", "Yet To Commence", 35000, 10012);
INSERT INTO Projects (ProjectID, ProjectName, ProjectStatus, ProjectBudget, ProjectLeadID)
VALUES (10007, "Trade Finance Automation", "Completed", 27000, 10014);
INSERT INTO Projects (ProjectID, ProjectName, ProjectStatus, ProjectBudget, ProjectLeadID)
VALUES (10008, "Customer Data Management System", "In Progress", 19000, 10016);
INSERT INTO Projects (ProjectID, ProjectName, ProjectStatus, ProjectBudget, ProjectLeadID)
VALUES (10009, "Risk Management Dashboard", "Terminated", 32000, 10018);

INSERT INTO EmployeeProjects (ProjectID, EmployeeID)
VALUES (10001, 10001);
INSERT INTO EmployeeProjects (ProjectID, EmployeeID)
VALUES (10002, 10003);
INSERT INTO EmployeeProjects (ProjectID, EmployeeID)
VALUES (10003, 10005);
INSERT INTO EmployeeProjects (ProjectID, EmployeeID)
VALUES (10004, 10007);
INSERT INTO EmployeeProjects (ProjectID, EmployeeID)
VALUES (10005, 10009);
INSERT INTO EmployeeProjects (ProjectID, EmployeeID)
VALUES (10006, 10011);
INSERT INTO EmployeeProjects (ProjectID, EmployeeID)
VALUES (10007, 10013);
INSERT INTO EmployeeProjects (ProjectID, EmployeeID)
VALUES (10008, 10015);
INSERT INTO EmployeeProjects (ProjectID, EmployeeID)
VALUES (10009, 10017);

INSERT INTO Currencies (CurrencyID, ExchangeRate)
VALUES ("CNY", 0.206);
INSERT INTO Currencies (CurrencyID, ExchangeRate)
VALUES ("HKD", 0.17);
INSERT INTO Currencies (CurrencyID, ExchangeRate)
VALUES ("IDR", 0.000093);
INSERT INTO Currencies (CurrencyID, ExchangeRate)
VALUES ("INR", 0.018);
INSERT INTO Currencies (CurrencyID, ExchangeRate)
VALUES ("JPY", 0.012);
INSERT INTO Currencies (CurrencyID, ExchangeRate)
VALUES ("KHR", 0.00025);
INSERT INTO Currencies (CurrencyID, ExchangeRate)
VALUES ("KRW", 0.0011);
INSERT INTO Currencies (CurrencyID, ExchangeRate)
VALUES ("SGD", 1);
INSERT INTO Currencies (CurrencyID, ExchangeRate)
VALUES ("TWD", 0.045);
INSERT INTO Currencies (CurrencyID, ExchangeRate)
VALUES ("VND", 0.000044);


INSERT INTO ProjectExpenseClaims (ClaimID, ProjectID, EmployeeID, CurrencyID, ExpenseDate, Amount, Purpose, ChargeToDefaultDept, AlternativeDeptCode, Status, LastEditedClaimDate)
VALUES (11147, 10001, 10011, "SGD", "2023-04-29T08:30:00+08:00", 100.50, "Banking tech", 0, "", "Pending", "2023-04-30T10:00:00+08:00");
INSERT INTO ProjectExpenseClaims (ClaimID, ProjectID, EmployeeID, CurrencyID, ExpenseDate, Amount, Purpose, ChargeToDefaultDept, AlternativeDeptCode, Status, LastEditedClaimDate)
VALUES (11148, 10002, 10015, "IDR", "2023-04-28T10:00:00+08:00", 250.75, "Operations", 0, "", "Approved", "2023-04-30T11:30:00+08:00");
INSERT INTO ProjectExpenseClaims (ClaimID, ProjectID, EmployeeID, CurrencyID, ExpenseDate, Amount, Purpose, ChargeToDefaultDept, AlternativeDeptCode, Status, LastEditedClaimDate)
VALUES (11149, 10003, 10014, "JPY", "2023-04-27T13:45:00+08:00", 500.00, "Banking operations", 0, "", "Rejected", "2023-04-30T12:15:00+08:00");
INSERT INTO ProjectExpenseClaims (ClaimID, ProjectID, EmployeeID, CurrencyID, ExpenseDate, Amount, Purpose, ChargeToDefaultDept, AlternativeDeptCode, Status, LastEditedClaimDate)
VALUES (11150, 10004, 10018, "SGD", "2023-04-26T15:30:00+08:00", 175.25, "Banking tech", 1, "105", "Pending", "2023-04-30T13:00:00+08:00");
INSERT INTO ProjectExpenseClaims (ClaimID, ProjectID, EmployeeID, CurrencyID, ExpenseDate, Amount, Purpose, ChargeToDefaultDept, AlternativeDeptCode, Status, LastEditedClaimDate)
VALUES (11152, 10006, 10012, "IDR", "2023-04-24T19:00:00+08:00", 50.00, "Banking tech", 0, "", "Approved", "2023-04-30T15:45:00+08:00");
INSERT INTO ProjectExpenseClaims (ClaimID, ProjectID, EmployeeID, CurrencyID, ExpenseDate, Amount, Purpose, ChargeToDefaultDept, AlternativeDeptCode, Status, LastEditedClaimDate)
VALUES (11164, 10004, 10011, "SGD", "2023-04-29T10:00:00+08:00", 25.0, "IT support", 0, "", "Pending", "2023-04-29T10:30:00+08:00");
INSERT INTO ProjectExpenseClaims (ClaimID, ProjectID, EmployeeID, CurrencyID, ExpenseDate, Amount, Purpose, ChargeToDefaultDept, AlternativeDeptCode, Status, LastEditedClaimDate)
VALUES (11165, 10005, 10012, "IDR", "2023-04-28T14:30:00+08:00", 2000000.0, "Hardware purchase", 1, "105", "Approved", "2023-04-29T09:30:00+08:00");
INSERT INTO ProjectExpenseClaims (ClaimID, ProjectID, EmployeeID, CurrencyID, ExpenseDate, Amount, Purpose, ChargeToDefaultDept, AlternativeDeptCode, Status, LastEditedClaimDate)
VALUES (11166, 10002, 10011, "KRW", "2023-04-28T16:45:00+08:00", 15000.0, "Printing materials", 0, "", "Rejected", "2023-04-29T11:00:00+08:00");
INSERT INTO ProjectExpenseClaims (ClaimID, ProjectID, EmployeeID, CurrencyID, ExpenseDate, Amount, Purpose, ChargeToDefaultDept, AlternativeDeptCode, Status, LastEditedClaimDate)
VALUES (11167, 10007, 10012, "VND", "2023-04-27T13:15:00+08:00", 750000.0, "Data entry software", 0, "", "Pending", "2023-04-29T08:45:00+08:00");
INSERT INTO ProjectExpenseClaims (ClaimID, ProjectID, EmployeeID, CurrencyID, ExpenseDate, Amount, Purpose, ChargeToDefaultDept, AlternativeDeptCode, Status, LastEditedClaimDate)
VALUES (11168, 10006, 10016, "CNY", "2023-04-26T11:30:00+08:00", 500.0, "Office supplies", 0, "", "Approved", "2023-04-29T10:15:00+08:00");
INSERT INTO ProjectExpenseClaims (ClaimID, ProjectID, EmployeeID, CurrencyID, ExpenseDate, Amount, Purpose, ChargeToDefaultDept, AlternativeDeptCode, Status, LastEditedClaimDate)
VALUES (11156, 10006, 10018, "JPY", "2023-04-29T09:12:00+08:00", 5000.00, "Banking software upgrade", 0, "", "Approved", "2023-04-30T13:28:00+08:00");
INSERT INTO ProjectExpenseClaims (ClaimID, ProjectID, EmployeeID, CurrencyID, ExpenseDate, Amount, Purpose, ChargeToDefaultDept, AlternativeDeptCode, Status, LastEditedClaimDate)
VALUES (11158, 10002, 10016, "SGD", "2023-04-27T15:45:00+08:00", 250.00, "Banking conference registration fee", 1, "104", "Pending", "2023-04-30T13:32:00+08:00");
INSERT INTO ProjectExpenseClaims (ClaimID, ProjectID, EmployeeID, CurrencyID, ExpenseDate, Amount, Purpose, ChargeToDefaultDept, AlternativeDeptCode, Status, LastEditedClaimDate)
VALUES (11159, 10008, 10010, "INR", "2023-04-26T10:20:00+08:00", 7500.00, "Operations training program fee", 0, "", "Approved", "2023-04-30T13:34:00+08:00");
INSERT INTO ProjectExpenseClaims (ClaimID, ProjectID, EmployeeID, CurrencyID, ExpenseDate, Amount, Purpose, ChargeToDefaultDept, AlternativeDeptCode, Status, LastEditedClaimDate)
VALUES (11160, 10009, 10019, "KHR", "2023-04-25T14:00:00+08:00", 150.00, "Banking seminar fee", 0, "", "Rejected", "2023-04-30T13:36:00+08:00");
INSERT INTO ProjectExpenseClaims (ClaimID, ProjectID, EmployeeID, CurrencyID, ExpenseDate, Amount, Purpose, ChargeToDefaultDept, AlternativeDeptCode, Status, LastEditedClaimDate)
VALUES (11161, 10003, 10015, "HKD", "2023-04-24T12:30:00+08:00", 2000.00, "Operations software upgrade", 0, "", "Pending", "2023-04-30T13:38:00+08:00");
INSERT INTO ProjectExpenseClaims (ClaimID, ProjectID, EmployeeID, CurrencyID, ExpenseDate, Amount, Purpose, ChargeToDefaultDept, AlternativeDeptCode, Status, LastEditedClaimDate)
VALUES (11170, 10009, 10019, "SGD", "2023-04-27T10:12:45+08:00", 232.50, "IT infrastructure upgrade", 0, "105", "Pending", "2023-04-29T13:45:00+08:00");
INSERT INTO ProjectExpenseClaims (ClaimID, ProjectID, EmployeeID, CurrencyID, ExpenseDate, Amount, Purpose, ChargeToDefaultDept, AlternativeDeptCode, Status, LastEditedClaimDate)
VALUES (11171, 10001, 10016, "JPY", "2023-04-28T08:30:15+08:00", 15900.00, "Bank reconciliation software", 0, "", "Pending", "2023-04-29T14:25:00+08:00");
INSERT INTO ProjectExpenseClaims (ClaimID, ProjectID, EmployeeID, CurrencyID, ExpenseDate, Amount, Purpose, ChargeToDefaultDept, AlternativeDeptCode, Status, LastEditedClaimDate)
VALUES (11174, 10005, 10013, "TWD", "2023-04-29T11:30:45+08:00", 20000.00, "Mobile banking app development", 0, "", "Pending", "2023-04-30T11:45:00+08:00");
INSERT INTO ProjectExpenseClaims (ClaimID, ProjectID, EmployeeID, CurrencyID, ExpenseDate, Amount, Purpose, ChargeToDefaultDept, AlternativeDeptCode, Status, LastEditedClaimDate)
VALUES (11175, 10002, 10010, "SGD", "2023-04-29T13:20:00+08:00", 750.00, "Travel expenses for IT training", 0, "", "Pending", "2023-04-30T14:30:00+08:00");
INSERT INTO ProjectExpenseClaims (ClaimID, ProjectID, EmployeeID, CurrencyID, ExpenseDate, Amount, Purpose, ChargeToDefaultDept, AlternativeDeptCode, Status, LastEditedClaimDate)
VALUES (11176, 10006, 10018, "CNY", "2023-04-30T08:45:00+08:00", 8000.00, "Cloud storage subscription", 0, "", "Pending", "2023-04-30T09:15:00+08:00");
INSERT INTO ProjectExpenseClaims (ClaimID, ProjectID, EmployeeID, CurrencyID, ExpenseDate, Amount, Purpose, ChargeToDefaultDept, AlternativeDeptCode, Status, LastEditedClaimDate)
VALUES (11177, 10003, 10015, "HKD", "2023-04-30T11:30:00+08:00", 5500.00, "Hardware maintenance contract renewal", 0, "", "Pending", "2023-04-30T12:00:00+08:00");
INSERT INTO ProjectExpenseClaims (ClaimID, ProjectID, EmployeeID, CurrencyID, ExpenseDate, Amount, Purpose, ChargeToDefaultDept, AlternativeDeptCode, Status, LastEditedClaimDate)
VALUES (11178, 10007, 10011, "KHR", "2023-04-30T14:15:30+08:00", 600000.00, "Server upgrade", 0, "", "Pending", "2023-04-30T14:45:00+08:00");
INSERT INTO ProjectExpenseClaims (ClaimID, ProjectID, EmployeeID, CurrencyID, ExpenseDate, Amount, Purpose, ChargeToDefaultDept, AlternativeDeptCode, Status, LastEditedClaimDate)
VALUES (11211, 10005, 10011, "KRW", "2023-04-28T14:20:00+08:00", 200000.00, "Training Course Fees", 0, "", "Pending", "2023-04-28T16:35:00+08:00");
INSERT INTO ProjectExpenseClaims (ClaimID, ProjectID, EmployeeID, CurrencyID, ExpenseDate, Amount, Purpose, ChargeToDefaultDept, AlternativeDeptCode, Status, LastEditedClaimDate)
VALUES (11212, 10003, 10016, "HKD", "2023-04-29T08:45:00+08:00", 2500.00, "Business Lunch Meeting", 1, "103", "Pending", "2023-04-29T12:20:00+08:00");
INSERT INTO ProjectExpenseClaims (ClaimID, ProjectID, EmployeeID, CurrencyID, ExpenseDate, Amount, Purpose, ChargeToDefaultDept, AlternativeDeptCode, Status, LastEditedClaimDate)
VALUES (11216, 10005, 10011, "SGD", "2023-04-29T08:30:00+08:00", 56.72, "Banking Operations Training", 1, "105", "Pending", "2023-04-29T14:30:00+08:00");
INSERT INTO ProjectExpenseClaims (ClaimID, ProjectID, EmployeeID, CurrencyID, ExpenseDate, Amount, Purpose, ChargeToDefaultDept, AlternativeDeptCode, Status, LastEditedClaimDate)
VALUES (11218, 10001, 10013, "IDR", "2023-04-26T15:15:00+08:00", 900000.00, "Marketing Campaign Expenses", 0, "", "Rejected", "2023-04-27T11:30:00+08:00");
INSERT INTO ProjectExpenseClaims (ClaimID, ProjectID, EmployeeID, CurrencyID, ExpenseDate, Amount, Purpose, ChargeToDefaultDept, AlternativeDeptCode, Status, LastEditedClaimDate)
VALUES (11219, 10003, 10014, "HKD", "2023-04-24T12:30:00+08:00", 1200.50, "Office Supplies Purchase", 0, "", "Pending", "2023-04-26T16:45:00+08:00");
INSERT INTO ProjectExpenseClaims (ClaimID, ProjectID, EmployeeID, CurrencyID, ExpenseDate, Amount, Purpose, ChargeToDefaultDept, AlternativeDeptCode, Status, LastEditedClaimDate)
VALUES (11221, 10007, 10016, "INR", "2023-04-22T14:45:00+08:00", 3000.00, "Travel Expenses", 0, "", "Pending", "2023-04-24T16:30:00+08:00");
INSERT INTO ProjectExpenseClaims (ClaimID, ProjectID, EmployeeID, CurrencyID, ExpenseDate, Amount, Purpose, ChargeToDefaultDept, AlternativeDeptCode, Status, LastEditedClaimDate)
VALUES (11222, 10008, 10014, "VND", "2023-04-22T13:30:00+08:00", 450000.00, "Banking equipment repair", 0, "103", "Rejected", "2023-04-23T14:00:00+08:00");
INSERT INTO ProjectExpenseClaims (ClaimID, ProjectID, EmployeeID, CurrencyID, ExpenseDate, Amount, Purpose, ChargeToDefaultDept, AlternativeDeptCode, Status, LastEditedClaimDate)
VALUES (11223, 10006, 10019, "HKD", "2023-04-27T09:00:00+08:00", 800.00, "Banking operations training course", 0, "", "Pending", "2023-04-27T16:30:00+08:00");
INSERT INTO ProjectExpenseClaims (ClaimID, ProjectID, EmployeeID, CurrencyID, ExpenseDate, Amount, Purpose, ChargeToDefaultDept, AlternativeDeptCode, Status, LastEditedClaimDate)
VALUES (11224, 10005, 10017, "CNY", "2023-04-25T15:00:00+08:00", 600.00, "Banking software maintenance", 0, "", "Approved", "2023-04-26T10:15:00+08:00");
INSERT INTO ProjectExpenseClaims (ClaimID, ProjectID, EmployeeID, CurrencyID, ExpenseDate, Amount, Purpose, ChargeToDefaultDept, AlternativeDeptCode, Status, LastEditedClaimDate)
VALUES (12230, 10004, 10013, "SGD", "2023-04-29T08:00:00+08:00", 250.00, "Banking Operations", 0, "", "Pending", "2023-04-29T12:30:00+08:00");
INSERT INTO ProjectExpenseClaims (ClaimID, ProjectID, EmployeeID, CurrencyID, ExpenseDate, Amount, Purpose, ChargeToDefaultDept, AlternativeDeptCode, Status, LastEditedClaimDate)
VALUES (11225, 10007, 10016, "IDR", "2023-04-28T14:30:00+08:00", 300.00, "Banking Tech", 0, "", "Pending", "2023-04-28T18:45:00+08:00");