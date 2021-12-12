/*import React from "react";
//import jest from "jest";
import { useContext, useState, useRef } from "react";
import  { render, screen } from "@testing-library/react";
import EditStorage from "./EditStorage"
import { Context } from "../store";
import { Layout } from "antd";
import {useHistory} from 'react-router-dom';
//import{ mock, mockReturnValue } from 'jest';
//import '@testing-library/jest-dom';

jest.mock('react-router-dom', () => ({
    useLocation: jest.fn().mockReturnValue({
      hash: '',
      key: 'ywidwq',
      pathname: '/EditStorage',
      search: '',
      state: {id: "619e32e1335fec5c992d15b8e", name: "ladu 1", number: "1", volume: "10m3", floorspace: "4m2", name: "ladu 1", priceperday: "5"}
    }),
}));
const realUseState = React.useState

// Stub the initial state
const stubInitialState = ['stub data']

// Mock useState before rendering your component
jest
  .spyOn(React, 'useState')
  .mockImplementationOnce(() => realUseState(stubInitialState))


/* const useLocation = () => {
    return({
      hash: '',
      key: 'ywidwq',
      pathname: '/EditStorage',
      search: '',
      state: {id: "619e32e1335fec5c992d15b8e", name: "ladu 1", number: "1", volume: "10m3", floorspace: "4m2", name: "ladu 1", priceperday: "5"}
    })
}; */


/* const mockUseLocationValue = ({
    hash: '',
    key: 'ywidwq',
    pathname: '/EditStorage',
    search: '',
    state: {id: "619e32e1335fec5c992d15b8e", name: "ladu 1", number: "1", volume: "10m3", floorspace: "4m2", name: "ladu 1", priceperday: "5"}
  });



jest.mock('react-router-dom', () => ({
    ...jest.requireActual("react-router-dom", () => ({
    useLocation: jest.fn().mockImplementation(() => {
        return mockUseLocationValue;
    })
    }) 
) })); */


/* jest.mock('react-router-dom', () => ({
    useHistory: () => jest.fn().mockReturnValue({
        push: jest.fn(),       
    }),
})); */

/*window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
    };
};*/

/*
describe (' Edit storage page', () => {
    const context = {
        auth: {
            token: null,
            user: null
        }
    }
    const dispatch = jest.fn()

   it('Checks if Edit storage header exists ', () => {  
        render((
            <Context.Provider value={[context, dispatch]}>
                <EditStorage />
            </Context.Provider>
        ),Layout)
        const EditHeader = screen.queryByText("Edit storage")
        expect(EditHeader).not.toBeNull()
    })

    it('Checks if Edit storage save button exists ', () => {  
        render((
            <Context.Provider value={[context, dispatch]}>
                <EditStorage/>
            </Context.Provider>
        ),Layout)
        const EditStorageSave = screen.queryByText("Save")
        expect(EditStorageSave).not.toBeNull()
    })

});
*/
import EditStorage from './EditStorage'

it('checks if Edit Storage renders', () => {
    const component = <EditStorage shouldRender />
    expect(component).toBeDefined()
})