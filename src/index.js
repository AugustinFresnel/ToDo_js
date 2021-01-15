const $ = jQuery;
const todos = [];
const finished = [];
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

    done() {
        this.done = true;
    }

    delete() {
        this.delete = true;
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
    renderToDo();
}


// event added for high button
$(document).ready(() => {
    $("#prioButton").on("click", () => {
        let text = $("textarea").val();
        createToDo(text, true);
        $("textarea").val("");
    })
});

// event added for norm button
$(document).ready(() => {
    $("#normButton").on("click", () => {
        let text = $("textarea").val();
        createToDo(text, false);
        $("textarea").val("");
    })
});

const createCard = (text, prio) => {
    const prioString = prio ? "prio" : "norm";
    const html = `<div class="card todos">
    <div class="todoText">
        <p>${text}</p>
    </div>
    <div class=${prioString}>
    </div>
</div>`;
    return html;

}


const renderToDo = () => {
    $(".todos").remove();
    todos.forEach(el => {
        const html = createCard(el.text, el.prio)
        $(".todo").append(html);
    })
}