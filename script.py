import json
  
# Opening JSON file
f = open('data.json')
  
# # returns JSON object as 
# # a dictionary
# data = json.load(f)["tables"][0]["columns"]
# print(data)
  
# # Iterating through the json
# # list
# for i in data:
#     print("INSERT INTO Employee (EmployeeID, SupervisorID, DepartmentCode, Password, FirstName, LastName, BankAccountNumber)")
#     v =  list(i.values())
#     print(f'VALUES ({v[0]}, {v[1]}, "{v[2]}", "{v[3]}", "{v[4]}", "{v[5]}", "{v[6]}");')

# returns JSON object as 
# a dictionary
# data = json.load(f)["tables"][0]["columns"]
# print(data)
  
# # Iterating through the json
# # list
# print(" ")
# for i in data:
#     print("INSERT INTO Projects (ProjectID, ProjectName, ProjectStatus, ProjectBudget, ProjectLeadID)")
#     v =  list(i.values())
#     print(f'VALUES ({v[0]}, "{v[2]}", "{v[3]}", {v[4]}, {v[5]});')

# INSERT INTO Projects (ProjectID, ProjectName, ProjectStatus, ProjectBudget, ProjectLeadID)
# VALUES (10005, "Project Name", "in progress", 0.99, 10003);

# a dictionary
data = json.load(f)["tables"][0]["columns"]
  
# Iterating through the json
# list
print("statr")

for i in data:
    v =  list(i.values())
    print("INSERT INTO ProjectExpenseClaims (ClaimID, ProjectID, EmployeeID, CurrencyID, ExpenseDate, Amount, Purpose, ChargeToDefaultDept, AlternativeDeptCode, Status, LastEditedClaimDate)")
    print(f'VALUES ({v[0]}, {v[1]}, {v[3]}, "{v[2]}", "{v[4]}", {v[5]}, "{v[6]}", {v[7]}, "{v[8]}", "{v[9]}", "{v[10]}");')
# Closing file
f.close()