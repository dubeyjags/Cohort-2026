const columns = document.querySelectorAll('.column');
let draggedTask = null;

document.addEventListener('click',  (event) => {
    if (event.target.classList.contains('add-btn')) {
        const text = prompt('Enter card text:');
        if (!text) return;

        const task = document.createElement('div');
        task.classList.add('task');
        task.textContent = text;

        task.setAttribute('draggable', 'true');

        event.target.previousElementSibling.appendChild(task);


    };
});

document.addEventListener('dragstart', (event) => {
    if (event.target.classList.contains('task')) {
        event.target.classList.add('dragging');
    }
    draggedTask = event.target;
});

document.addEventListener('dragend', (event) => {
    if (event.target.classList.contains('task')) {
        event.target.classList.remove('dragging');
    }
    draggedTask = null;
});

columns.forEach(column => {
    column.addEventListener('dragover', (event) => {
        event.preventDefault();
        column.classList.add('drag-over');
    });
    column.addEventListener('dragleave', () => {
        column.classList.remove('drag-over');
    });
    column.addEventListener('drop', (event) => {
        event.preventDefault();
        column.classList.remove('drag-over');
        if(draggedTask) {
            column.querySelector('.tasks').appendChild(draggedTask);
        }
    });
});