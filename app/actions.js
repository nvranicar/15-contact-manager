export function createContact(contacts) {
  return {
    type: 'CONTACT@CREATE',
    data: {
      ...contacts,
      id: new Date(),
    },
  };
}

export function removeContact(id) {
  return {
    type: 'CONTACT@DELETE',
    id
  };
}

export function findContacts() {
  return {
    type: 'CONTACT@FIND_ALL',
    data: []
  };
}
