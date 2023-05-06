import json
  
# Opening JSON file
f = open('data.json')
  
# returns JSON object as 
# a dictionary
data = json.load(f)["tables"][0]["columns"]
print(data)
  
# Iterating through the json
# list
for i in data:
    print("INSERT INTO Employee (EmployeeID, SupervisorID, DepartmentCode, Password, FirstName, LastName, BankAccountNumber)")
    v =  list(i.values())
    print(f'VALUES ({v[0]}, {v[1]}, "{v[2]}", "{v[3]}", "{v[4]}", "{v[5]}", "{v[6]}");')
  
# Closing file
f.close()