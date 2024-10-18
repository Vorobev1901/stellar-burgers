declare namespace Cypress {
  interface Chainable<Subject = any> {
    clickButton(title: string): Chainable<any>;
    clickLink(label: string): Chainable<any>;
    register(name: string, email: string, password: string): Chainable<any>;
    login(email: string, password: string): Chainable<any>;
  }
}