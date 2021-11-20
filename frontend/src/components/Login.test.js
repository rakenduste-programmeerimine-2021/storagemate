import { render, screen } from "@testing-library/react"
import Login from "./Login";



it('checks if login heading text exists', () =>{
    const div = document.createElement('div');
    render(<Login/>, div);
    const loginText = screen.getByText(/Login/i)



    expect(loginText).toBeInTheDocument();


});