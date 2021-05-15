let liList = [];
let addTaskButton = $(".buttonTask").click(function(){addTask();});
let inputField = $(".inputTask");

inputField.on('keyup', function(e) {
    if (e.key === "Enter") {
        addTask();
    }
});

function getStructure() {
    if (localStorage.getItem("listEntries") != null) {
        JSON.parse(localStorage.getItem("listEntries")).li.forEach(i => {
            addTask(i);
        });
    }

    $("ul").listview().listview('refresh');

    saveActualList();
}

function addOnClickListeners() {
    $(".close").click(function(){
        $(this).parent().remove();
        $("ul").listview().listview('refresh');
        saveActualList();
    });
}

function addTask(element = null) {
    let value = inputField[0].value;
    if (element === null && value !== "") {
        $("ul").append('<li class="hoverEffect">' + value + '<span class="close"> 	x</span></li>')
    } else if (element !== null) {
        $("ul").append('<li class="hoverEffect">' + element + '<span class="close"> 	x</span></li>')
    }

    inputField[0].value = "";
    saveActualList();
   
    $("ul").listview().listview('refresh');

    addOnClickListeners();
}

function saveActualList() {
    liList = [];
    $("ul").children().toArray().forEach(i => {
        liList.push(i.firstChild.data);
    });

    localStorage.setItem("listEntries", JSON.stringify({"li": liList}))
}

getStructure();
addOnClickListeners();