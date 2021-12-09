import React from "react";
import { render, screen } from "@testing-library/react"
import AdminLogin from "./AdminLogin";
import { Context } from "../store";
import { Layout } from "antd";

window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
    };
};


describe (' Admin login page', () => {
    const context = {
        auth: {
            token: null,
            user: null
        }
    }
    const dispatch = jest.fn()

    it('Checks if Admin login exists ', () => {  
        render((
            <Context.Provider value={[context, dispatch]}>
                <AdminLogin />
            </Context.Provider>
        ),Layout)
        const AdminLoginExist = screen.queryByText("Admin Login")
        expect(AdminLoginExist).not.toBeNull()
    })

    it('Checks if Admin Log in button exist ', () => {  
        render((
            <Context.Provider value={[context, dispatch]}>
                <AdminLogin />
            </Context.Provider>
        ),Layout)
        const AdminLoginExist = screen.queryByText("Log in")
        expect(AdminLoginExist).not.toBeNull()
    })

});