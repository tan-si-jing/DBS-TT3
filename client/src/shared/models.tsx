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
    claimId?: number | null;
    projectId: number | null;
    employeeId: number;
    currencyId: string;
    expenseDate: Date | null;
    amount: number;
    purpose: string;
    // Image
    alternativeDeptCode: string;
    status: string;
    lastEditedClaimDate: string;
}


