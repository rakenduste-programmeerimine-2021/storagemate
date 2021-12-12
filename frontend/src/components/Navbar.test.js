import React from "react";
import { useContext, useState, useRef } from "react";
import  { render, screen } from "@testing-library/react";
import { Context } from "../store";
import { Layout } from "antd";
import {useHistory} from 'react-router-dom';
import Navbar from "./Navbar";
import { BrowserRouter } from 'react-router-dom';
import { act } from "react-dom/test-utils";



window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
    };
};


describe (' Edit storage page', () => {
  
    const context = {
        auth: {
            token: null,
            user: null
        }
    }
    const dispatch = jest.fn()
    

   it('Checks if Edit storage header home exists ', async () => {  
    act(() => {
        render((
            <Context.Provider value={[context, dispatch]}>
                <BrowserRouter>
                    <Navbar />
                </BrowserRouter>
            </Context.Provider>
        ),Layout)
    });
        const EditHeader = await screen.queryByText("Home")
        expect(EditHeader).not.toBeNull()
    });

    it('Checks if Edit storage save button exists ', async () => {  
        act(() => {
        render((
            
            <Context.Provider value={[context, dispatch]}>
                <BrowserRouter>
                    <Navbar/>
                </BrowserRouter>
            </Context.Provider>
        ),Layout)
        });
        const EditStorageSave = await  screen.queryByText("Storages")
        expect(EditStorageSave).not.toBeNull()
    });

});