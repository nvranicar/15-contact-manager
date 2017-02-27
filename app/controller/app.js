import ContactFormView from '../views/contact-form';
import ContactListView from '../views/contact-list';

export default class AppController {
  constructor(el, store) {
    this.el = el;
    this.store = store;

    this.contactForm = new ContactFormView(el.querySelector('.contact-form'), store);
    this.contactList = new ContactListView(el.querySelector('.grid'), store);
  }

  created() {
    this.store.subscribe(() => {
      const contacts = this.store.getState().contacts;
      window.localStorage.contacts = JSON.stringify(contacts);
    });

    this.contactForm.mounted();
    this.contactList.mounted();

    const dataString = window.localStorage.contacts || '{ contacts: [] }';
    this.store.dispatch({ type: 'CONTACT@FIND_ALL', data: JSON.parse(dataString) });
  }
}
