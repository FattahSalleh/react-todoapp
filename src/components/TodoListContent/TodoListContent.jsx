import TodoListItem from "../TodoListItem/TodoListItem";
import AddTodoListForm from "../AddTodoListForm/AddTodoListForm";

function TodoListContent({ isFormVisible, toggleFormVisibility, todos, handleAdd, handleEdit, handleSave, handleDelete, handleCancel, handleCheckboxTrue, handleCheckboxFalse }) {

    return (
        <div className="TodoListContent">
            {todos.map(todo => (
                <TodoListItem
                    key={todo._id}
                    todo={todo}
                    handleEdit={handleEdit}
                    handleSave={handleSave}
                    handleDelete={handleDelete}
                    handleCancel={() => handleCancel(todo._id)}
                    handleCheckboxTrue={handleCheckboxTrue}
                    handleCheckboxFalse={handleCheckboxFalse}
                />
            ))}

            <AddTodoListForm
                todo={todos}
                isFormVisible={isFormVisible}
                toggleFormVisibility={toggleFormVisibility}
                handleAdd={handleAdd}
            />

        </div>
    );
}

export default TodoListContent;