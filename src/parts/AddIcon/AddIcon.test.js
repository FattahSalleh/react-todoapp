import { getByAltText, render } from "@testing-library/react";
import AddIcon from "./AddIcon";

describe('AddIcon component', () => {
    it('renders add icon', () => {
        const { getByAltText } = render(<AddIcon />);
        const addIcon = getByAltText('Add Icon');
        expect(addIcon).toBeInTheDocument();
    });
});