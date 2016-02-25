import NavState from 'state/nav';

//
// Navigation
//
describe('state/nav.js', () => {
    it('Should be openable, closeable, and toggleable.', () => {
        NavState.close();  expect(NavState.state.isExpanded).toBe(false);
        NavState.open();   expect(NavState.state.isExpanded).toBe(true);
        NavState.toggle(); expect(NavState.state.isExpanded).toBe(false);
        NavState.toggle(); expect(NavState.state.isExpanded).toBe(true);
    });
});
