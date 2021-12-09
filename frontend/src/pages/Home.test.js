import React from "react";
import { render, screen } from "@testing-library/react"
import Home from "./Home";
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

    it('Checks if home go now buttons exists', () => {  
        render((
            <Context.Provider value={[context, dispatch]}>
                <Home />
            </Context.Provider>
        ),Layout)
        const GoNowExist = screen.queryAllByText("Go now")
        expect(GoNowExist).not.toBeNull()
    })

    it('Checks if home title exists', () => {  
        render((
            <Context.Provider value={[context, dispatch]}>
                <Home />
            </Context.Provider>
        ),Layout)
        const HomeTitle = screen.queryAllByText("title")
        expect(HomeTitle ).not.toBeNull()
    })

    it('Checks if home description exists', () => {  
        render((
            <Context.Provider value={[context, dispatch]}>
                <Home />
            </Context.Provider>
        ),Layout)
        const HomeDescriptione = screen.queryAllByText("description")
        expect(HomeDescriptione ).not.toBeNull()
    })

    it('Checks if home image exists', () => {  
        render((
            <Context.Provider value={[context, dispatch]}>
                <Home />
            </Context.Provider>
        ),Layout)
        const HomeImage = screen.queryAllByText("image")
        expect(HomeImage  ).not.toBeNull()
    })

    it('Checks if home See our short promo video text exists', () => {  
        render((
            <Context.Provider value={[context, dispatch]}>
                <Home />
            </Context.Provider>
        ),Layout)
        const HomeImage = screen.queryByText("See our short promo video")
        expect(HomeImage  ).not.toBeNull()
    })

});