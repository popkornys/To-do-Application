let to_do_thing = []

//This function calculates the number of tasks that are not yet completed.
function count_of_remaining_task(tasks){
    let count_of_remaining_quests = 0
    tasks.forEach(function(task){
        if (!task.completed) {
            count_of_remaining_quests++
        }
    })
    return count_of_remaining_quests
}

// This function is responsible for displaying the list of tasks that are not yet completed.
// It creates HTML elements to represent each task and appends them to the main container.
// If there are no tasks, it displays a message indicating this.
function view_tasks(tasks) {
    if (tasks.length < 1){
        console.log("No tasks")
        let no_tasks = document.createElement("p")
        no_tasks.textContent = "There are no tasks to display"
        no_tasks.style.textAlign = "center";
        no_tasks.style.justifyContent = "center"; 
        no_tasks.style.fontSize = "2em";
        no_tasks.style.color = "red"
        no_tasks.style.marginTop = "4em";
        document.querySelector("main").appendChild(no_tasks)
        return
    }
    tasks.forEach((task, index) => {
        if (!task.completed) { 
            console.log(tasks.length)

            /* create div for single task */
            let newDiv = document.createElement("div")
            newDiv.style.margin = "1em";
            newDiv.style.padding = "1em";
            newDiv.style.border = "1px solid #ccc";
            newDiv.style.borderRadius = "10px";
            newDiv.style.display = "flex";
            newDiv.style.flexDirection = "row";
            newDiv.style.alignItems = "center";
            newDiv.style.justifyContent = "space-between";
            newDiv.style.maxWidth = "800px"; 
            newDiv.style.width = "100%"; 
            newDiv.style.margin = "1em auto"; 
            document.querySelector("main").appendChild(newDiv) 

            /* create div for texts parts */
            let texts_div = document.createElement("div")
            texts_div.style.display = "flex";
            texts_div.style.flexDirection = "column";
            texts_div.style.flexGrow = "1"; 
            texts_div.style.marginLeft = "2em";
            texts_div.style.marginRight = "1em";

            /* create paragraph with title of task */
            let task_element = document.createElement("p")
            task_element.textContent = `${index+1}. ${task.title}`
            task_element.style.marginBottom = "0.1em"
            task_element.style.textAlign = "left";

            /* create paragraph for description of task */
            let description_element = document.createElement("p")
            description_element.textContent = task.description
            description_element.style.fontSize = "smaller"
            description_element.style.marginTop = "0.1em"
            description_element.style.textAlign = "left";

            /* create div for completed button */
            let button_div = document.createElement("div")
            button_div.style.marginRight = "2em"
            button_div.style.marginLeft = "1em"
            button_div.style.flexGrow = "1"

            /* create style of button */
            let complete_button = document.createElement("button")
            complete_button.textContent = "Complete"
            complete_button.style.marginTop = "1em";
            complete_button.style.padding = "0.5em 1em";
            complete_button.style.border = "none";
            complete_button.style.borderRadius = "5px";
            complete_button.style.backgroundColor = "#4CAF50";
            complete_button.style.color = "white";
            complete_button.style.cursor = "pointer";
            complete_button.style.float = "right";
            button_div.appendChild(complete_button);

            /*add action while press the button */
            complete_button.addEventListener("click", function() {
                handle_complete_task(task)
               })

            /* all divs together */
            texts_div.appendChild(task_element)
            texts_div.appendChild(description_element)
            newDiv.appendChild(texts_div)
            newDiv.appendChild(button_div)
        }
    })
}

// This function handles the completion of a task by removing it from the array and updating the user interface.
function handle_complete_task(task) {
    // Find and remove the task from the array
    let taskIndex = to_do_thing.indexOf(task);
    if (taskIndex !== -1) {
        to_do_thing.splice(taskIndex, 1);
    }
    // Clear the main container
    let mainContainer = document.querySelector("main");
    while (mainContainer.firstChild) {
        mainContainer.removeChild(mainContainer.firstChild);
    }
    // Update the remaining tasks count
    create_div_for_add_button_and_counter_of_tasks()
    // Call view_tasks to display the updated tasks
    view_tasks(to_do_thing);
}

// This function creates a new task with a given title and description.
// It also validates the inputs to ensure they are not empty.
function create_new_task(title, description){
    if ((title === null || title === undefined || title.length === 0) || (description === null || description === undefined || description.length === 0)){
        alert("Wrong title or description, please enter it propertly")
        return 
    }
    // Create a new task object.
    let new_task = {
        "title": title,
        "description": description,
        "completed": false
    }
    // Add the new task to the array of tasks.
    to_do_thing.push(new_task)
    // Clear the main container
    let mainContainer = document.querySelector("main");
    while (mainContainer.firstChild) {
        mainContainer.removeChild(mainContainer.firstChild);
    }
    // Update the remaining tasks count
    create_div_for_add_button_and_counter_of_tasks()
    // Call view_tasks to display the updated tasks
    view_tasks(to_do_thing);
}

// This function creates a new div element containing a counter of remaining tasks and an add task button.
// The div is appended to the main container of the webpage.
function create_div_for_add_button_and_counter_of_tasks(){
    // create div for part with add new task button and label of remaining tasks counter
    let new_div = document.createElement("div")
    new_div.style.display = "flex";
    new_div.style.flexDirection = "row";
    new_div.style.alignItems = "center";
    new_div.style.justifyContent = "space-between";
    new_div.style.maxWidth = "500px"; 
    new_div.style.width = "100%"; 
    new_div.style.margin = "1em auto"; 

    // create div for label of remaining tasks counter
    let count_of_tasks_div = document.createElement("div");
    let count_of_tasks = document.createElement("label");
    count_of_tasks.textContent = "Remaining tasks: " + count_of_remaining_task(to_do_thing);
    count_of_tasks.style.fontSize = "19px";
    count_of_tasks_div.appendChild(count_of_tasks);

    // create div for add new task button
    let button_for_new_task_div = document.createElement("div");
    let add_button = document.createElement("button");
    add_button.textContent = "Add new task";
    add_button.style.cursor = "pointer";
    add_button.style.border = "none"; // Remove the border
    add_button.style.borderRadius = "25px"; // Make the button a circle
    add_button.style.width = "150px"; // Adjust the width to your preference
    add_button.style.height = "50px"; // Adjust the height to your preference
    add_button.style.alignItems = "center";     // zarovná text horizontálně
    add_button.style.justifyContent = "center";     // zarovná text vodorovně
    add_button.style.backgroundColor = "#FFED3F"; // Barva pozadí tlačítka
    add_button.style.color = "black"; // Barva textu tlačítka
    add_button.style.fontSize = "19px"; // Velikost textu tlačítka

    // action when the button is pressed
    add_button.addEventListener("click", function() {
        create_new_task(prompt("Enter task title"), prompt("Enter task description"));
    });

    // all divs together
    button_for_new_task_div.appendChild(add_button);
    new_div.appendChild(count_of_tasks_div);
    new_div.appendChild(button_for_new_task_div);
    document.querySelector("main").appendChild(new_div);
}

// main function
function main(){
    create_div_for_add_button_and_counter_of_tasks()
    view_tasks(to_do_thing)
}

main()
