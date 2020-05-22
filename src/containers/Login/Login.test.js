import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Grid} from '@material-ui/core';

import { Login } from './Login';

configure({adapter: new Adapter()});

describe('<Login />', () => {
    let wrapper;
    
    beforeEach(() => {
        wrapper = shallow(<Login />);
    });

    it('should render <Grid /> when receiving isAuthozized props', () => {
        wrapper.setProps({isAuthorized: false});
        expect(wrapper.find(Grid)).toHaveLength(1);
    });
});