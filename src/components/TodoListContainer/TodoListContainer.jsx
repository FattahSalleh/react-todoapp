import { useEffect, useState } from "react";
import TodoListContent from "../TodoListContent/TodoListContent";
import TodoListHeader from "../TodoListHeader/TodoListHeader";
import { addTodoItem, fetchTodoList, deleteTodoItem, updateTodoItemTitle, updateTodoItemCheckbox, updateTodoItemCheckboxFalse } from "../../services/UserService";

function TodoListContainer() {

    const [isFormVisible, setIsFormVisible] = useState(false);
    const [todos, setTodos] = useState([]);

    // Properties of todo list items:
    // cardColor
    // description
    // isCompleted
    // isEditing (added for editing)
    // onDate
    // timestamps
    // title
    // _id

    useEffect(() => {
        fetchTodoList().then((list) => {
            setTodos(list);
        });
    }, []);

    // TODO: It runs infinitely???
    // Function to fetch todo list data
    // const fetchTodos = () => {
    //     fetchTodoList()
    //         .then((list) => {
    //             setTodos(list);
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching todo list: ', error);
    //         });
    // };

    // Fetch todo list data when the component mounts
    // fetchTodos();
    
    // Function to handle addition of todo item
    const handleAdd = async (newTodoText) => {
        try {
            const newTodo = await addTodoItem(newTodoText);
            setTodos([newTodo, ...todos]);

        } catch (err) {
            console.error('Error adding todo: ', err);
        }
    };
    // Function to handle deletion of todo item
    const handleDelete = async (id) => {
        try {
            await deleteTodoItem(id);
            const updatedTodoList = await fetchTodoList(); // After successful deletion, refetch the todo list
            setTodos(updatedTodoList);
        } catch (err) {
            console.error('Error deleting todo: ', err);
        }
    };

    // Function to handle deletion of all todo item
    const handleDeleteAll = async () => {
        try {
            for (const todo of todos) {
                await deleteTodoItem(todo._id);
            }
            const updatedTodoList = await fetchTodoList(); // After successful deletion, refetch the todo list
            setTodos(updatedTodoList);
        } catch (err) {
            console.error('Error deleting all todo items: ', err);
            throw err;
        }
    }


    // Function to handle editing of todo item text
    const handleEdit = (id) => {
        setTodos(todos.map(todo => {
            if (todo._id === id) {
                return { ...todo, isEditing: true };
            } else {
                return todo;
            }
        }));
    };

    // Function to handle saving edited text
    const handleSave = async (id, newText) => {

        try {
            await updateTodoItemTitle(id, newText);

            // Update the local state with the modified todo item
            setTodos(todos.map(todo => {
                if (todo._id === id) {
                    return { ...todo, title: newText, isEditing: false };
                } else {
                    return todo;
                }
            }));

        } catch (err) {
            console.error('Error saving todo: ', err);
        }
    };

    // Function to handle changing checbox status to True
    const handleCheckboxTrue = async (id, newCheckbox) => {

        console.log('handleCheckboxTrue');

        try {
            await updateTodoItemCheckbox(id, newCheckbox);

            // Update the local state with the modified todo item
            setTodos(todos.map(todo => {
                if (todo._id === id) {
                    return { ...todo, isCompleted: newCheckbox };
                } else {
                    return todo;
                }
            }));

        } catch (err) {
            console.error('Error saving checkbox status: ', err);
        }
    };

    // Function to handle changing checbox status to False
    const handleCheckboxFalse = async (id, newCheckbox) => {

        console.log('handleCheckboxFalse');

        try {
            await updateTodoItemCheckboxFalse(id, newCheckbox);

            // Update the local state with the modified todo item
            setTodos(todos.map(todo => {
                if (todo._id === id) {
                    return { ...todo, isCompleted: newCheckbox };
                } else {
                    return todo;
                }
            }));

        } catch (err) {
            console.error('Error saving checkbox status to false: ', err);
        }
    };

    // Function to handle cancel editing text
    const handleCancel = (id) => {
        setTodos(todos.map(todo => {
            if (todo._id === id) {
                return { ...todo, isEditing: false };
            } else {
                return todo;
            }
        }));
    };

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
    };

    return (
        <div className="TodoListContainer">

            <TodoListHeader toggleFormVisibility={toggleFormVisibility} handleDeleteAll={handleDeleteAll} />

            <hr />

            <TodoListContent
                isFormVisible={isFormVisible}
                toggleFormVisibility={toggleFormVisibility}
                todos={todos}
                handleAdd={handleAdd}
                handleEdit={handleEdit}
                handleSave={handleSave}
                handleDelete={handleDelete}
                handleCancel={handleCancel}
                handleCheckboxTrue={handleCheckboxTrue}
                handleCheckboxFalse={handleCheckboxFalse}
            />

            <div className="small">
                <small>Don't miss out an important tasks anymore</small>
            </div>
        </div>
    );
}

export default TodoListContainer;