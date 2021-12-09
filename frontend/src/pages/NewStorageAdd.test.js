import React from "react";
import { render, screen } from "@testing-library/react"
import NewStorageAdd from "./NewStorageAdd";
import { Context } from "../store";
import { Layout } from "antd";

window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
    };
};


describe (' Home page', () => {
    const context = {
        auth: {
            token: null,
            user: null
        }
    }
    const dispatch = jest.fn()

    it('Checks if new storage add header exists', () => {  
        render((
            <Context.Provider value={[context, dispatch]}>
                <NewStorageAdd />
            </Context.Provider>
        ),Layout)
        const NewStorageAddHeader = screen.queryAllByText("Add new storage")
        expect(NewStorageAddHeader).not.toBeNull()
    })

    it('Checks if new storage add save button exists', () => {  
        render((
            <Context.Provider value={[context, dispatch]}>
                <NewStorageAdd />
            </Context.Provider>
        ),Layout)
        const NewStorageAddSave = screen.queryAllByText("Save")
        expect(NewStorageAddSave).not.toBeNull()
    })


});