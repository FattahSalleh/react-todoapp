import AddIcon from '../../parts/AddIcon/AddIcon';
import EllipsisDropdown from '../EllipsisDropdown/EllipsisDropdown';

function TodoListHeader({ toggleFormVisibility, handleDeleteAll }) {

    return (
        <div className="TodoListHeader">
            <div className="left">
                <p>To Do List</p>
            </div>
            <div className="right">
                <div onClick={toggleFormVisibility}>
                    <AddIcon />
                </div>
                <EllipsisDropdown dropdown={['Delete Entire List']} handleDeleteAll={handleDeleteAll} />
            </div>
        </div>
    );
}

export default TodoListHeader;