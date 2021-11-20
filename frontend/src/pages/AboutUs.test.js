import { render, screen } from "@testing-library/react"
import AboutUs from "./AboutUs";



it('checks if AboutUs exists', () =>{
    const div = document.createElement('div');
    render(<AboutUs/>, div);
    const AboutUsText = screen.getByText(/AboutUs/i);


    expect(AboutUsText).toBeInTheDocument();


});