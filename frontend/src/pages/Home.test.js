import { render, screen } from "@testing-library/react"
import Home from "./Home";



it('checks if welcome exists', () =>{
    const div = document.createElement('div');
    render(<Home/>, div);
    const welcomeText = screen.getByText(/welcome/i);


    expect(welcomeText).toBeInTheDocument();


});