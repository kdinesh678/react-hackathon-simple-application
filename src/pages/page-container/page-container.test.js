import { mount } from "enzyme";
import React from 'react';
import {PageContainer} from './page-container'
import { getUserDetails } from "../../util";

import { logout } from "../../external/external-proxy";

import { useRouteMatch, useHistory } from "react-router";

jest.mock('react-router');
jest.mock("../../util");
jest.mock("../../external/external-proxy");

useRouteMatch.mockReturnValue({path: '/', url: ''});
useHistory.mockReturnValue([]);
getUserDetails.mockReturnValue({username: 'Dinesh', userId: '1'});

describe('Page Container',()=>{
    let wrapper;

    beforeEach(()=>{
        wrapper = mount(<PageContainer />)
    });

    it('should show username and logout button in header',()=>{
        expect(wrapper.find('.logout').exists()).toEqual(true);
        expect(wrapper.find('.username').exists()).toEqual(true);
    });

    it('should invoke logout function when logout button is clicked',()=>{
        wrapper.find('.logout').simulate('click');
        expect(logout).toHaveBeenCalled();
    });
});