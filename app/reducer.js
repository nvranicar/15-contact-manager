export default function reducer(state, action) {
  switch (action.type) {
    case 'CONTACT@FIND_ALL':
      return { contacts: action.data };
    case 'CONTACT@CREATE':
      return { contacts: [...state.contacts, ...action.data] };
    case 'CONTACT@DELETE':
      return { contacts: state.contacts.filter(contact => contact.id !== action.id) };
    default:
      return state || { contacts: [] };
  }
}
