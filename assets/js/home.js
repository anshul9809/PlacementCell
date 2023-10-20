const input = document.getElementById("search-student");
const table = document.getElementById("student-table");
const statusChange = document.getElementById("changebutton");
const trow = table.getElementsByTagName("tr");


input.addEventListener("keyup", filterTable);
Array.from(trow).forEach((row, index) => {
  row.addEventListener('click', (event) => {
    if(event.target.id == "changebutton"){
        let select = row.getElementsByClassName("select")[0];
        select.removeChild(select.getElementsByTagName("option")[0]);
        select.disabled = false;
    }
  });
}); 




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
