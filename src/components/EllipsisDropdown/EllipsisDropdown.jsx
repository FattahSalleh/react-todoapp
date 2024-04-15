import { useEffect, useRef, useState } from 'react';
import ellipsisIcon from '../../assets/images/more/Vector.svg';
import deleteIcon from '../../assets/images/delete/delete.svg';
import editIcon from '../../assets/images/edit/Vector.svg';


function EllipsisDropdown({ dropdown, handleEdit, handleDelete, handleDeleteAll }) {

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const iconMappings = {
        'Delete Entire List': {
            icon: <img src={deleteIcon} alt="Delete Icon" />,
            action: handleDeleteAll
        },
        'Delete Item': {
            icon: <img src={deleteIcon} alt="Delete Icon" />,
            action: handleDelete
        },
        'Edit Item': {
            icon: <img src={editIcon} alt="Edit Icon" />,
            action: handleEdit
        }
    };

    const handleClick = (option) => {
        const { action } = iconMappings[option];
        if (action) {
            action();
        }
        setIsOpen(false);
    };

    // Close the dropdown if clicked outside of the dropdown
    const handleOutsideClick = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    // Remove the click event listener when dropdown is closed
    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    const renderItems = () => {
        return dropdown.map((option, index) => {
            const { icon } = iconMappings[option];
            return (
                <div key={index} className='ellipsisItemRow' onClick={() => handleClick(option)}>
                    {icon}
                    {option}
                </div>
            );
        });
    };

    return (
        <div className="EllipsisDropdown" ref={dropdownRef}>
            <img
                src={ellipsisIcon}
                onClick={() => setIsOpen(!isOpen)}
                alt="Ellipsis Icon" />
            {isOpen && (
                <div className="ellipsisItem" data-testid="ellipsis-dropdown-item" >
                    {renderItems()}
                </div>
            )}
        </div>
    );
}

export default EllipsisDropdown;
