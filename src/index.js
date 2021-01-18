const $ = jQuery;
const todos = [];
let counter = 0;

const prio = $("#prioButton");
const norm = $("#normButton");

class ToDo {
    constructor(id, text, prio) {
        this.id = id;
        this.text = text;
        this.prio = prio;
        this.done = false;
        this.deleted = false;
    }

    setDone() {
        this.done = true;
    }

    setDeleted() {
        this.deleted = true;
    }
}

const postName = (i) => {
    let iString = i.toString();
    let iPad = iString.padStart(5, '0');
    return 'Todo' + iPad;
};

const createToDo = (text, prio) => {
    counter++;
    let id = postName(counter);
    todos.push(new ToDo(id, text, prio));
    construction();
}


// event added for high button
$(document).ready(() => {
    $("#prioButton").on("click", () => {
        let text = $("textarea").val();
        if (text !== '') { 
            createToDo(text, true);
            $("textarea").val("");

        }
    $("textarea").focus();
    })
});

// event added for norm button
$(document).ready(() => {
    $("#normButton").on("click", () => {
        let text = $("textarea").val();
        if (text !== '') { 
            createToDo(text, false);
            $("textarea").val("");
        }
    $("textarea").focus();
    })
});

//event added for done Button
$(document).ready(() => {
    $(".todo").on("click", "#doneBtn", () => {
       let id = $( "#doneBtn" ).parent().attr("id");
       let element = todos.findIndex(el => el.id === id);
       todos[element].setDone();
       construction();
    })
});

//event added for delete Button
$(document).ready(() => {
    $(".done").on("click", "#deleteBtn", () => {
       let id = $( "#deleteBtn" ).parent().attr("id");
       let element = todos.findIndex(el => el.id === id);
       todos[element].setDeleted();
       construction();
    })
});

const createCard = (text, prio, id, done, deleted) => {
    const prioString = prio ? "prio" : "norm";
    const doneBtn = !done ? "doneBtn" : "deleteBtn";
    const doneString = done ? "closed" : "todos"; 
    const html = 
    `<div class="card ${doneString}" id="${id}">
        <div class="todoText">
            <p>${text}</p>
        </div>
        <div class="${prioString}" id="${doneBtn}">
            <p class="hoverDone">done</p>
            <p class="hoverDeleted">delete</p>
        </div>
    </div>`;
    return html;

}


const renderToDo = (array) => {
    array.forEach(el => {
        const html = createCard(el.text, el.prio, el.id, el.done, el.deleted)
        $(".todo").append(html);
    });
}
const renderDone = (array) => {
    array.forEach(el => {
        const html = createCard(el.text, el.prio, el.id, el.done, el.deleted)
        $(".done").append(html);
    });
}

const clearList = () => {
    $(".todos").remove();
    $(".closed").remove();
}

const sort = () => {
    const prioArray = todos.filter(el => {
        return (el.prio === true) && (el.done === false) && (el.deleted === false)
    });
    const normArray = todos.filter(el => {
        return (el.prio === false) && (el.done === false) && (el.deleted === false)
    });
    const doneArray = todos.filter(el => {
        return (el.done === true) && (el.deleted === false)
    });
    return {
            prio: prioArray, 
            norm: normArray, 
            done: doneArray
        };
}

const construction = () => {
    clearList();
    let obj = sort();

    renderToDo(obj.prio);
    renderToDo(obj.norm);
    renderDone(obj.done);
}

//swipe for mobile view
document.addEventListener("swiped-left", () => {
    $(".done").css("display", "initial");
    $(".todo").css("display", "none");
    $(".swipeDot2").css("background-color", "rgb(45, 50, 60)")
    $(".swipeDot1").css("background-color", "rgb(170, 170, 185)")
});

//swipe for mobile view
document.addEventListener("swiped-right", () => {
    $(".done").css("display", "none");
    $(".todo").css("display", "initial");
    $(".swipeDot1").css("background-color", "rgb(45, 50, 60)")
    $(".swipeDot2").css("background-color", "rgb(170, 170, 185)")
});