import { createContact } from '../actions';

export default class ContactFormView {
  constructor(el, store) {
    this.el = el;
    this.store = store;
  }

  mounted() {
    this.el.addEventListener('submit', (ev) => {
      ev.preventDefault();

      const firstName = this.el.querySelector('.contact-form__first-name').value;
      const lastName = this.el.querySelector('.contact-form__last-name').value;
      const address = this.el.querySelector('.contact-form__street').value;
      const city = this.el.querySelector('.contact-form__city').value;
      const state = this.el.querySelector('.contact-form__state').value;

      this.store.dispatch(createContact({ firstName, lastName, address, city, state }));
    });
  }
}
