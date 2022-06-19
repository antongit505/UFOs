//importar la data
const tableData=data;

//get the table references, es decir donde el codigo deberá encontrar la tabla
var tbody = d3.select("tbody");

//construir la tabla
function buildTable(data) {
    tbody.html("");
    //crear la tabla, primero agregar una fila por la longitud de la información
    data.forEach( (dataRow) => {
            let row = tbody.append("tr");
    Object.values(dataRow).forEach( (val) => {
            let cell = row.append("td");
            cell.text(val);
        });
    });
};

//Create a variable to store inputs from user
let filters={}; 

function updateFilters() {
    // 4a. Create a variable that saves the element that was changed using d3.select().
    let changedElement = d3.select(this);
    // 4b. Save the value that was changed as a variable.
    let elementValue = changedElement.property("value");
    // 4c. Save the id of the filter that was changed as a variable.
    let filterId = changedElement.attr("id");
    // 5. If a filter value was entered then add that filterId and value
    // to the filters list. Otherwise, clear that filter from the filters object.
    if (elementValue) {
      filters[filterId] = elementValue;
    }
    else {
      delete filters[filterId];
    }

    // 6. Call function to apply all filters and rebuild the table
    filterTable();
  };

 // 7. Use this function to filter the table when data is entered.
 function filterTable() { 
    // 8. Set the filtered data to the tableData.
    var filteredData = tableData;

    // 9. Loop through all of the filters and keep any data that
    function filterRows(row){

      var condition=true;
      var userKeys=Object.keys(filters)

      //Convert to lowercase values entered by user
      for (key in filters){
        filters[key]=filters[key].toLowerCase()
        console.log(filters[key]);
      }
      //Map a function for every value entered by user
      userKeys.map( key => {
        if ( filters[key] != row[key] ){
          condition=false; }
        }
      );
         
        return condition
     }; 
    filteredData = filteredData.filter(filterRows);

    // 10. Finally, rebuild the table using the filtered data
    buildTable(filteredData);
};

//Add an event listener for changes to each filter
d3.selectAll("input").on("change",updateFilters)

// Build the table when the page loads
buildTable(tableData);