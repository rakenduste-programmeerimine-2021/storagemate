/*import React from "react";
import { render, screen } from "@testing-library/react"
import PasswordEdit from "./PasswordEdit";
import { Context } from "../store";
import { Layout } from "antd";

window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
    };
};


describe (' Password edit page', () => {
    const context = {
        auth: {
            token: null,
            user: null
        }
    }
    const dispatch = jest.fn()

    it('Checks if password edit change your password header exists', () => {  
        render((
            <Context.Provider value={[context, dispatch]}>
                <PasswordEdit />
            </Context.Provider>
        ),Layout)
        const PasswordEditHeader = screen.queryByText("Chnage your password")
        expect(PasswordEditHeader).not.toBeNull()
    })

    it('Checks if password edit change password button exists', () => {  
        render((
            <Context.Provider value={[context, dispatch]}>
                <PasswordEdit />
            </Context.Provider>
        ),Layout)
        const PasswordEditP = screen.queryAllByText("Change password")
        expect(PasswordEditP).not.toBeNull()
    })


});*/