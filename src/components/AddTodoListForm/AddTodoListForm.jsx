import { useEffect, useRef, useState } from "react";

function AddTodoListForm({ isFormVisible, toggleFormVisibility, handleAdd }) {

    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        // Focus the add form when add button is clicked
        if (isFormVisible) {
            inputRef.current.focus();
        }
    }, [isFormVisible]);

    if (!isFormVisible) {
        return null;
    }

    const handleTextChange = (event) => {
        setInputValue(event.target.value);
    }

    const clickCreate = () => {
        handleAdd(inputValue);
        setInputValue('');
        toggleFormVisibility(false);
    }

    const clickCancel = () => {
        setInputValue('');
        toggleFormVisibility(false);
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            clickCreate();
        }
    };

    return (
        <div className="AddTodoListForm" data-testid="add-todo-list-form">
            <input
                type="text"
                placeholder="What needs to be done?"
                value={inputValue}
                onChange={handleTextChange}
                onKeyDown={handleKeyDown}
                ref={inputRef}
            />
            <div className="right">
                <button type="button" className="btn btn-create"
                    onClick={clickCreate}
                    disabled={inputValue.trim().length === 0}>Create</button>
                <button type="button" className="btn btn-cancel"
                    onClick={clickCancel}>Cancel</button>
            </div>
        </div>
    );
}

export default AddTodoListForm;