 /*
import React from "react";
import { render, screen } from "@testing-library/react";
import EditStorage from "./EditStorage"
import { Context } from "../store";
import { Layout } from "antd";

window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
    };
};


describe (' About us page', () => {
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

}); */