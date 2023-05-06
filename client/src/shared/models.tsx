export interface Employee {
  employeeID?: number;
  supervisorID: number;
  departmentCode: number;
  password: string;
  firstName: string;
  lastName: string;
  bankAccountNumber: string;
}

export interface EmployeeProjects {
  projectId?: number;
  employeeId: number;
  projectName: string;
  projectStatus: string;
  projectBudget: number;
  projectLeadId: string; // Maybe number
}

export interface ProjectExpensesClaims {
  claimId?: number;
  projectId: number;
  employeeId: number;
  currencyId: string;
  expenseDate: Date;
  amount: number;
  purpose: string;
  // Image
  alternativeDeptCode: string;
  status: string;
  lastEditedClaimDate: string;
}
