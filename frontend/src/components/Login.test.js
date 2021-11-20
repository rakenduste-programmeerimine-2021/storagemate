import { render, screen } from "@testing-library/react"
import Login from "./Login";



it('checks if login heading text exists', () =>{
    render(<Login/>);
    const h1Text = screen.queryByText(/h1/i);
    const loginText = screen.getByText(/Login/i)


    expect(h1Text).not.toBeNull();
    expect(loginText).not.toBeNull();


});
