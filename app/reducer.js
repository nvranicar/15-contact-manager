export default function reducer(state, action) {
  switch (action.type) {
    case 'CONTACT@FIND_ALL':
      return { contacts: action.data };
    case 'CONTACT@CREATE':
      return { contacts: [...state.contacts, action.data] };
    default:
      return state || { contacts: [] };
  }
}
