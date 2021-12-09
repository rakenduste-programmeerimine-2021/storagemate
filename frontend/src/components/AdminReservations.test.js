import React from "react";
import { render, screen } from "@testing-library/react"
import AdminReservations from "./AdminReservations";
import { Context } from "../store";
import { Layout } from "antd";

window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
    };
};


describe (' Admin reservation page', () => {
    const context = {
        auth: {
            token: null,
            user: null
        }
    }
    const dispatch = jest.fn()

    it('Checks if Admin loading text exists ', () => {  
        render((
            <Context.Provider value={[context, dispatch]}>
                <AdminReservations />
            </Context.Provider>
        ),Layout)
        const AdminRes = screen.queryByText("Loading...")
        expect(AdminRes).not.toBeNull()
    })

    /*it('Checks if Admin reservations text exists ', () => {
        render((
            <Context.Provider value={[context, dispatch]}>
                <AdminReservations />
            </Context.Provider>
        ),Layout)
        const AdminRes = screen.queryByText("Reservations")
        expect(AdminRes).not.toBeNull()
    })*/

});