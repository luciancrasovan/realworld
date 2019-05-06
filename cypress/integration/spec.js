import { getMaxListeners } from "cluster";

describe('Main page', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	it('has the correct <h1>', () => {
		cy.contains('h1', 'conduit')
	});

	it('contains the navbar with the home and sign in and sign up links', () => {
		cy.contains('nav.navbar > div.container > a', 'conduit');
		cy.contains('nav.navbar > div.container > ul.navbar-nav > li.nav-item:nth-of-type(1) > a', 'Home');
		cy.contains('nav.navbar > div.container > ul.navbar-nav > li.nav-item:nth-of-type(2) > a', 'Sign in');
		cy.contains('nav.navbar > div.container > ul.navbar-nav > li.nav-item:nth-of-type(3) > a', 'Sign up');
	});

	it('should load the login page if signin link is clicked', () => {
		cy.get('nav.navbar > div.container > ul.navbar-nav > li.nav-item:nth-of-type(2) > a').click();
		cy.location('pathname', {timeout: 10000})
			.should('include', '/login');
	
		cy.contains('h1', 'Sign In');
		cy.contains('a[href="/register"]', 'Need an account?');
		cy.contains('button', 'Sign in');
	});
});

describe.only('Login page', () => {
	beforeEach(() => {
		cy.visit('/login');
	});

	it('has the correct <h1>', () => {
		cy.contains('h1', 'Sign In')
	});

	it('should load the user page if Sign in button is clicked', () => {
		cy.server()
		cy.route('POST', '/auth/login', { email: 'lucian.webflow@gmail.com', password: 'Lucica11'}).as('authUser');

		cy.get('input[type=email]').type('lucian.webflow@gmail.com');
		cy.get('input[type=password]').type('Lucica11');
		cy.get('form').submit();

		cy.wait('@authUser').its('requestBody')
			.should('have.property', 'username', 'Lucian Crasovan')
			.should('have.property', 'id', 54651)
	});
});