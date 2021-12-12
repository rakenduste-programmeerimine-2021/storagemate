import Reservation from './Reservation'

it('checks if Reservation renders', () => {
    const component = <Reservation shouldRender />
    expect(component).toBeDefined()
})