export const todos = []
export const auditlog = []
let nextId = 1

export function createTodo(title) {
    const todo = {
        id: nextId++,
        title,
        completed: false,
    }
    todos.push(todo)
    return todo
}

export function getTodo(id) {
    return todos.find((todo) => todo.id === id)
}
export function updateTodo(id, updates) {
    const todo = getTodo(id)    
    if (!todo) return null
    if (updates.title !== undefined) todo.title = updates.title
    if (updates.completed !== undefined) todo.completed = updates.completed
    return todo
}

export function deleteTodo(id) {
    const index = todos.findIndex((todo) => todo.id === id)
    if (index === -1) return false
    todos.splice(index, 1)
    return true
}