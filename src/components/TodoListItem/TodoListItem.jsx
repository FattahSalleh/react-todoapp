import { useEffect, useRef, useState } from "react";
import Checkbox from "../../parts/Checkbox/Checkbox";
import EllipsisDropdown from "../EllipsisDropdown/EllipsisDropdown";
import confirmIcon from '../../assets/images/checkmark/Vector.svg'
import cancelIcon from '../../assets/images/uncheck/Vector.svg'

function TodoListItem({ todo, handleEdit, handleSave, handleDelete, handleCancel, handleCheckboxTrue, handleCheckboxFalse }) {

    const [text, setText] = useState(todo.title);
    // Store the initial text for canceling edits
    const [initialText, setInitialText] = useState(todo.title); 
    const inputRef = useRef(null);

    useEffect(() => {
        // Focus the input field when editing mode is activated
        if (todo.isEditing) {
            inputRef.current.focus();
        }
    }, [todo.isEditing]);

    const handleChange = (event) => {
        setText(event.target.value);
    }

    const handleConfirmChange = () => {
        handleSave(todo._id, text);
        setInitialText(text);
    }

    const handleCancelEdit = () => {
        // Cancel editing mode and revert any changes made
        setText(initialText);
        // Exit editing mode
        handleCancel(todo.id);
    }


    return (
        <div className="TodoListItem" data-testid="todo-list-item">
            <div className="content">
                <div className="left">
                    <p>
                        {todo.isEditing ? (
                            <input
                                type="text"
                                value={text}
                                onChange={handleChange}
                                ref={inputRef}
                            />
                        ) : (
                            <span className="TodoListItemText">
                                <b>{todo.title}</b>
                            </span>
                        )}
                    </p>
                    {todo.isEditing && (
                        <div className="confirmBtnContainer">
                            <button className="btn btn-ConfirmEdit" onClick={handleConfirmChange}>
                                <img src={confirmIcon} alt="Confirm Icon" />
                            </button>
                            <button className="btn btn-CancelEdit" onClick={handleCancelEdit}>
                                <img src={cancelIcon} alt="Cancel Icon" />
                            </button>
                        </div>
                    )}
                </div>
                <div className="right">
                    <Checkbox
                        todo={todo}
                        handleCheckboxTrue={handleCheckboxTrue}
                        handleCheckboxFalse={handleCheckboxFalse}
                    />
                    <EllipsisDropdown
                        dropdown={['Edit Item', 'Delete Item']}
                        handleEdit={() => handleEdit(todo._id)}
                        handleDelete={() => handleDelete(todo._id)}
                    />
                </div>
            </div>
            <hr />
        </div>
    );
}

export default TodoListItem;