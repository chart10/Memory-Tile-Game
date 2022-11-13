// Christian Hart 001-68-3628

let employees = [];

function beginPayroll() {
    let curName;
    let curHours;
    let curPay;
    while (curName != -1) {
        curName = prompt("Please enter employee name (type -1 to end):", "John Doe");
        if (curName == -1) {break};
        curHours = prompt("Enter " + curName + "\'s hours worked this week:");
        if (curHours <= 40) {
            curPay = '$' + (curHours * 15).toFixed(2);
        } else {
            curPay = '$' + (40 * 15 + (curHours - 40) * 1.5 * 15 .toFixed(2));
        }
        let employee = { Name:curName, Hours:curHours, Pay:curPay};
        employees.push(employee);
    }  
    if (employees.length == 0) {
        document.getElementById("empty").innerHTML = "No Information entered.";
        return;
    }
    buildPayroll();
}


function buildPayroll() {
    
    let table = document.querySelector("table");
    let data = Object.keys(employees[0]);
    generateTable(table, employees);
    generateTableHead(table, data);
    document.querySelector('#btn').disabled = true;
    document.getElementById("empty").innerHTML = "";

}

let payroll = [
    { Employee: "Billy Goat", ID: 1, Hours: 35, Pay: "$525" },
  ];

function generateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
}
function generateTable(table, data) {
    for (let element of data) {
      let row = table.insertRow();
      for (key in element) {
        let cell = row.insertCell();
        let text = document.createTextNode(element[key]);
        cell.appendChild(text);
      }
    }
}
  
