export interface Employee {
  employeeID?: number;
  supervisorID: number;
  departmentCode: number;
  password: string;
  firstName: string;
  lastName: string;
  bankAccountNumber: string;
}

export interface Projects {
    projectId?: number;
    projectName: string;
    projectStatus: string;
    projectBudget: number;
    projectLeadId: string; // Maybe number
}

export interface ProjectExpensesClaims {
    ClaimID?: number | null;
    ProjectID: number | null;
    EmployeeID: number;
    CurrencyID: string;
    ExpenseDate: Date | null;
    Amount: number;
    Purpose: string;
    // Image
    AlternativeDeptCode: string;
    Status: string;
    LastEditedClaimDate: string;
}


