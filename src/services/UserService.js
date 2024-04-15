// FETCH API
const BASE_URL = 'https://demo-todo.moneymatch.technology:8444';

// Fetch Todo LIST
async function fetchTodoList() {
    try {
        const response = await fetch(`${BASE_URL}/api/v1/todo`);
        if (!response.ok) {
            if (response.status === 404) {
                console.log('Todo list items is empty.');
                return [];
            } else {
                throw new Error('Failed to fetch Todo List');
            }
        }

        const data = await response.json();

        return data.todos.map(todo => ({
            ...todo,
            isEditing: false
        }));

    } catch (err) {
        console.error('Error fetching Todo List', err);
        return [];
    }
}

// Add Todo Item
async function addTodoItem(newTodoItem) {
    try {
        const response = await fetch(`${BASE_URL}/api/v1/todo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: newTodoItem, description: "Todo items description."})
        });
        if (!response.ok) {
            throw new Error('Failed to add Todo item');
        }
        const data = await response.json();
        return data.todo;
    } catch (err) {
        console.error('Error adding Todo item', err);
        throw err;
    }
}

// Delete Todo Item
async function deleteTodoItem(todoId) {
    try {
        const response = await fetch(`${BASE_URL}/api/v1/todo/${todoId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete Todo item');
        }
        const data = await response.json();
        return data.todo;
    } catch (err) {
        console.error('Error deleting Todo item', err);
        throw err;
    }
}

// Update Todo Item Title
async function updateTodoItemTitle(todoId, newTitle) {
    try {
        const response = await fetch(`${BASE_URL}/api/v1/todo/${todoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: newTitle })
        });
        if (!response.ok) {
            throw new Error('Failed to update Todo item title');
        }
        const data = await response.json();
        return data.todo;
    } catch (err) {
        console.error('Error updating Todo item title', err);
        throw err;
    }
}

// Mark Todo Item Title as Complete 
async function updateTodoItemCheckbox(todoId) {
    try {
        const response = await fetch(`${BASE_URL}/api/v1/todo/${todoId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            // body: JSON.stringify({ isCompleted: isCompleted })
        });
        if (!response.ok) {
            throw new Error('Failed to update Todo item checkbox');
        }
        const data = await response.json();

        console.log(data);
        console.log(data.todo);
        return data.todo;
    } catch (err) {
        console.error('Error updating Todo item checkbox', err);
        throw err;
    }
}

// Mark Todo Item Title as InComplete 
async function updateTodoItemCheckboxFalse(todoId, isCompleted) {
    try {
        const response = await fetch(`${BASE_URL}/api/v1/todo/${todoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ isCompleted: isCompleted })
        });
        if (!response.ok) {
            throw new Error('Failed to update Todo item checkbox = incompleted');
        }
        const data = await response.json();
        return data.todo;
    } catch (err) {
        console.error('Error updating Todo item checkbox = incompleted', err);
        throw err;
    }
}

export { fetchTodoList, addTodoItem, deleteTodoItem, updateTodoItemTitle, updateTodoItemCheckbox, updateTodoItemCheckboxFalse }