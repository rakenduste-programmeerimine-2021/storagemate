import React from "react";
import { render, screen } from "@testing-library/react"
import Login from "./Login";
import { Context } from "../store";
import { Layout } from "antd";

window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
    };
};


describe (' users login page', () => {
    const context = {
        auth: {
            token: null,
            user: null
        }
    }
    const dispatch = jest.fn()

    it('Checks if Login h1 exists', () => {  
        render((
            <Context.Provider value={[context, dispatch]}>
                <Login />
            </Context.Provider>
        ),Layout)
        const Loginh1 = screen.queryByText("Login")
        expect(Loginh1).not.toBeNull()
    })

    
    it('Checks if Remember me exists', () => {  
        render((
            <Context.Provider value={[context, dispatch]}>
                <Login />
            </Context.Provider>
        ),Layout)
        const RememberMe = screen.queryByText("Remember me")
        expect(RememberMe ).not.toBeNull()
    })

    
    it('Checks if Forgot password exists', () => {  
        render((
            <Context.Provider value={[context, dispatch]}>
                <Login />
            </Context.Provider>
        ),Layout)
        const ForgotPassword = screen.queryByText("Forgot password")
        expect(ForgotPassword).not.toBeNull()
    })

    it('Checks if register now exists', () => {  
        render((
            <Context.Provider value={[context, dispatch]}>
                <Login />
            </Context.Provider>
        ),Layout)
        const ForgotPassword = screen.queryByText("register now!")
        expect(ForgotPassword).not.toBeNull()
    })

    it('Checks if Log in button exists', () => {  
        render((
            <Context.Provider value={[context, dispatch]}>
                <Login />
            </Context.Provider>
        ),Layout)
        const ForgotPassword = screen.queryByText("Log in")
        expect(ForgotPassword).not.toBeNull()
    })

});