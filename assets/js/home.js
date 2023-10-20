const input = document.getElementById("search-student");
const table = document.getElementById("student-table");
const statusChange = document.getElementById("changebutton");
const trow = table.getElementsByTagName("tr");
Array.from(trow).forEach((row, index) => {
  row.addEventListener('click', (event) => {
    console.log("target is ",event.target);
    console.log("row is ", row);
    if(event.target.id == "changebutton"){
        let item = row.getElementsByClassName("select");
        console.log("item is ", item);
        // item.remove(item.selectedIndex);
        item.querySelector("#delete-option");
        // row.find("#istatus").prop( "disabled", false );
        console.log(item.selectedIndex);
        row.getElementByNames("isStatus")[0].attr("disabled", "false");
    }
  });
}); 


input.addEventListener("keyup", filterTable);


function filterTable(){
    var filter, td, i, txtValue;
    filter = input.value.toUpperCase();
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
        }
    }
}

function changeInterviewStatus(){
    let self = this;
    console.log(self);
}