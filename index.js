let myLeads = [];
const inputBtn = document.querySelector(`#input-btn`);
const inputEl = document.querySelector(`#input-el`);
const ulEl = document.querySelector(`#ul-el`);
const deleteBtn = document.querySelector(`#delete-btn`);
const leadsFromLocalStorage = JSON.parse(localStorage.getItem(myLeads));
const saveBtn = document.querySelector(`#save-btn`);

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}
 
saveBtn.addEventListener(`click`, function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.getItem(`myLeads`, JSON.stringify(myLeads));
        render(myLeads);
    });
});

function render(leads){
    let listItems = "";
    for (let i = 0; i < leads.length; i++){
        listItems += `
        <li>
            <a target="_blank" href="${leads[i]}">
                ${leads[i]}
            </a>
        </li>`;    
        console.log(listItems);
    }
    ulEl.innerHTML = listItems;
}

deleteBtn.addEventListener("dblclick", function (){
    localStorage.clear();
    myLeads = [];
    render(myLeads);
});

inputBtn.addEventListener(`click`, function () {
    myLeads.push(inputEl.value);
    inputEl.value = "";

    localStorage.getItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);

});



