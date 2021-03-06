import React from "react";
import { render, screen } from "@testing-library/react"
import AboutUs from "./AboutUs";
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

    it('Checks if about us storagemate header exists ', () => {  
        render((
            <Context.Provider value={[context, dispatch]}>
                <AboutUs />
            </Context.Provider>
        ),Layout)
        const AboutUsStorage = screen.queryByText("About Storagemate")
        expect(AboutUsStorage).not.toBeNull()
    })

    it('Checks if about us description exists ', () => {  
        render((
            <Context.Provider value={[context, dispatch]}>
                <AboutUs />
            </Context.Provider>
        ),Layout)
        const AboutUsDescription = screen.queryByText("An award-winning company that has a great outlook!")
        expect(AboutUsDescription ).not.toBeNull()
    })

});