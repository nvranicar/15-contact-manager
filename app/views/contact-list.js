import { removeContact } from '../actions';

class ItemView {
  constructor(data, store) {
    this.data = data;
    this.store = store;

    this.el = document.createElement('li');
    this.el.classList.add('grid__item');
    this.el.innerHTML = `
    <div class="contact">
      <h2 class="contact__name">
      <span class="contact__last-name"></span>
      <span class="contact__first-name"></span>
    </h2>
      <p class="contact__address"></p>
      <p class="contact__location">
        <span class="contact__city"></span>
        <span class="contact__state"></span>
      </p>
      <button class="delete">Delete</button>
    </div>`;
  }

  mounted() {
    const store = this.store;
    const data = this.data;
    // debugger;
    document.addEventListener('DOMContentLoaded', function () {
      this.el = document.querySelector('.delete');
      this.el.addEventListener('click', () => {
        // debugger;
        store.dispatch(removeContact(data.id));
      });
    });
  }

  render() {
    this.el.querySelector('.contact__first-name').innerText = this.data.firstName;
    this.el.querySelector('.contact__last-name').innerText = `${this.data.lastName}, `;
    this.el.querySelector('.contact__address').innerText = this.data.address;
    this.el.querySelector('.contact__city').innerText = `${this.data.city}, `;
    this.el.querySelector('.contact__state').innerText = this.data.state;
  }
}

export default class ContactListView {
  constructor(el, store) {
    this.el = el;
    this.store = store;
  }

  mounted() {
    this.store.subscribe(() => {
      this.render();
    });
  }

  render() {
    this.el.innerHTML = '';
    const contacts = this.store.getState().contacts;

    contacts.forEach((current) => {
      const view = new ItemView(current, this.store);
      view.render();
      view.mounted();

      this.el.appendChild(view.el);
    });
  }
}
