import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Grid} from '@material-ui/core';

import { Signup } from './Signup';

configure({adapter: new Adapter()});

describe('<Signup />', () => {
    let wrapper;
    
    beforeEach(() => {
        wrapper = shallow(<Signup />);
    });

    it('should render <Grid /> when receiving isAuthozized props', () => {
        wrapper.setProps({isAuthorized: false});
        expect(wrapper.find(Grid)).toHaveLength(1);
    });
});