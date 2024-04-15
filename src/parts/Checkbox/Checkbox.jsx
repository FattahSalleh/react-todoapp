import { useState } from 'react';
import checkboxIcon from '../../assets/images/checkbox/Vector.svg'
import checkmarkIcon from '../../assets/images/checkmark/Vector.svg'

function Checkbox({ todo, handleCheckboxTrue, handleCheckboxFalse }) {
    const [isChecked, setIsChecked] = useState(todo.isCompleted);

    const toggleCheckbox = () => {
        setIsChecked(!isChecked);
        console.log('toggle');

        if (todo.isCompleted === true) {
            handleCheckboxFalse(todo._id, false);
        } else {
            handleCheckboxTrue(todo._id, !isChecked);
        }
    }

    return (
        <div className="Checkbox" onClick={toggleCheckbox}>
            <img src={checkboxIcon} alt="Checkbox Icon" />
            {todo.isCompleted && (
                <img src={checkmarkIcon} alt="Checkmark Icon" className='checkmarkIcon' />
            )}
        </div>
    );
}

export default Checkbox;