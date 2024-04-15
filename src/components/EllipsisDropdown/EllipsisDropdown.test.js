import React from 'react';
import { render, fireEvent, queryByText } from '@testing-library/react';
import EllipsisDropdown from './EllipsisDropdown';

describe('EllipsisDropdown Component', () => {

    const dropdown = ['Delete Entire List', 'Delete Item', 'Edit Item'];
    const handleEdit = jest.fn();
    const handleDelete = jest.fn();
    const handleDeleteAll = jest.fn();

    it('renders ellipsis icon', () => {
        const { getByAltText } = render(<EllipsisDropdown dropdown={[]} />);
        const ellipsisIcon = getByAltText('Ellipsis Icon');
        expect(ellipsisIcon).toBeInTheDocument();
    });

    it('opens dropdown on click', () => {
        const { getByAltText, getByText } = render(
            <EllipsisDropdown dropdown={['Delete Entire List', 'Edit Item', 'Delete Item']} />
        );
        const ellipsisIcon = getByAltText('Ellipsis Icon');
        fireEvent.click(ellipsisIcon);
        const deleteListOption = getByText('Delete Entire List');
        const editOption = getByText('Edit Item');
        const deleteOption = getByText('Delete Item');
        expect(deleteListOption).toBeInTheDocument();
        expect(editOption).toBeInTheDocument();
        expect(deleteOption).toBeInTheDocument();
    });

    it('closes dropdown when clicked outside', () => {
        const { getByAltText, queryByText } = render(
            <>
                <EllipsisDropdown dropdown={['Delete Entire List', 'Edit Item', 'Delete Item']} />
                <div>Outside Element</div>
            </>
        );
        const ellipsisIcon = getByAltText('Ellipsis Icon');
        fireEvent.click(ellipsisIcon);
        const outsideElement = queryByText('Outside Element');
        fireEvent.click(outsideElement);
        const deleteListOption = queryByText('Delete Entire List');
        const editOption = queryByText('Edit Item');
        const deleteOption = queryByText('Delete Item');
        expect(deleteListOption).not.toBeInTheDocument();
        expect(editOption).not.toBeInTheDocument();
        expect(deleteOption).not.toBeInTheDocument();
    });

    it('displays dropdown items correctly', () => {

        const { getByAltText, getByText } = render(
            <EllipsisDropdown
                dropdown={dropdown}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleDeleteAll={handleDeleteAll}
            />
        );

        // Open the dropdown
        const ellipsisIcon = getByAltText('Ellipsis Icon');
        fireEvent.click(ellipsisIcon);

        // Check if all dropdown items are rendered
        expect(getByText('Delete Entire List')).toBeInTheDocument();
        expect(getByText('Delete Item')).toBeInTheDocument();
        expect(getByText('Edit Item')).toBeInTheDocument();
    });

});
