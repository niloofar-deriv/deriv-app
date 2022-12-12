import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CloseButton from '../close-button.jsx';

configure({ adapter: new Adapter() });

describe('CloseButton', () => {
    it('should render one <CloseButton /> component', () => {
        const wrapper = shallow(<CloseButton />);
        expect(wrapper).toHaveLength(1);
    });
    it('should render one <CloseButton /> component', () => {
        const wrapper = shallow(<CloseButton />);
        expect(wrapper.prop('onClick').isRequired).toBe(true);
    });
});
