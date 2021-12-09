import React from "react";
import { render, screen } from "@testing-library/react"
import Register from "./Register";
import { Context } from "../store";
import { Layout } from "antd";

window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
    };
};


describe (' Register page', () => {
    const context = {
        auth: {
            token: null,
            user: null
        }
    }
    const dispatch = jest.fn()

    it('Checks if register page has register button and header exists ', () => {  
        render((
            <Context.Provider value={[context, dispatch]}>
                <Register/>
            </Context.Provider>
        ),Layout)
        const RegisterCheck = screen.queryAllByText("Register")
        expect(RegisterCheck).not.toBeNull()
    })

    it('Checks if register page has last name ', () => {  
        render((
            <Context.Provider value={[context, dispatch]}>
                <Register/>
            </Context.Provider>
        ),Layout)
        const RegisterFormsLastName = screen.queryAllByText("Last Name")
        expect(RegisterFormsLastName).not.toBeNull()
    })

    
    it('Checks if register page has firstname ', () => {  
        render((
            <Context.Provider value={[context, dispatch]}>
                <Register/>
            </Context.Provider>
        ),Layout)
        const RegisterFormsFirstName = screen.queryAllByText("First Name")
        expect(RegisterFormsFirstName).not.toBeNull()
    })

    
    it('Checks if register page has Email ', () => {  
        render((
            <Context.Provider value={[context, dispatch]}>
                <Register/>
            </Context.Provider>
        ),Layout)
        const RegisterFormsEmail = screen.queryAllByText("Email")
        expect(RegisterFormsEmail).not.toBeNull()
    })

    
    it('Checks if register page has Phone Number ', () => {  
        render((
            <Context.Provider value={[context, dispatch]}>
                <Register/>
            </Context.Provider>
        ),Layout)
        const RegisterFormsPhoneNumber = screen.queryAllByText("Phone Number")
        expect(RegisterFormsPhoneNumber).not.toBeNull()
    })

    
    it('Checks if register page has Password ', () => {  
        render((
            <Context.Provider value={[context, dispatch]}>
                <Register/>
            </Context.Provider>
        ),Layout)
        const RegisterFormsPassword = screen.queryAllByText("Password")
        expect(RegisterFormsPassword).not.toBeNull()
    })

    
    it('Checks if register page has Confirm Passwords ', () => {  
        render((
            <Context.Provider value={[context, dispatch]}>
                <Register/>
            </Context.Provider>
        ),Layout)
        const RegisterFormsConfirmPassword = screen.queryAllByText("Confirm Password")
        expect(RegisterFormsConfirmPassword).not.toBeNull()
    })

});