import ContactFormView from '../views/contact-form';
import ContactListView from '../views/contact-list';

export default class AppController {
  constructor(el, store) {
    this.el = el;
    this.store = store;

    this.contactForm = new ContactFormView(this.el.querySelector('.sidebar'), this.store);
    this.contactList = new ContactListView(this.el.querySelector('.grid'), this.store);
  }

  created() {
    this.store.subscribe(() => {
      const contacts = this.store.getState().contacts;
      window.localStorage.contacts = JSON.stringify(contacts);
    });

    this.contactForm.mounted();
    this.contactList.mounted();


    const data = JSON.parse(window.localStorage.contacts || '[]');
    this.store.dispatch({ type: 'CONTACT@FIND_ALL', data });
  }
}
