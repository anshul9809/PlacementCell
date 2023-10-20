let studentsList = document;
console.log(studentsList);
let select = document.getElementById("studentname");
let checked = 0;
const batchName = document.getElementById("batchname");

select.addEventListener("click", fillNames);
batchName.addEventListener("click", batchField);

function batchField(){
    clicked=0;
    select.empty();
}

function fillNames(){
    console.log("clicked");
    let batch = batchName.value;
    console.log(batch);
    for(let st of studentsList){
                    
        if(batchvalue === st.batch && clicked == 0 ){
           let newoption = `<option value=${st._id}>${st.name} ( ${st.email} )</option>`;
           selectname.append(newoption);
        }
    }
    clicked=1;

}