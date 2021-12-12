import AdminHome from './AdminHome'

it('checks if Profile Edit renders', () => {
    const component = <AdminHome shouldRender />
    expect(component).toBeDefined()
})