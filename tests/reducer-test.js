import reducer from '../app/reducer';

module('reducer', () => {
  test('default state', (assert) => {
    assert.deepEqual(reducer(null, {}), { contacts: [] }, 'default state');
  });

  test('load all contacts', (assert) => {
    const oldState = [];
    const actionOne = { type: 'CONTACT@FIND_ALL', data: [{ name: 'Nathan' }, { name: 'Caleb' }] };
    const actionTwo = { type: 'CONTACT@FIND_ALL', data: [{ name: 'Ryan' }, { name: 'Tablada' }] };

    assert.deepEqual(reducer(oldState, actionOne), { contacts: [...actionOne.data] });
    assert.deepEqual(reducer(oldState, actionTwo), { contacts: [...actionTwo.data] });
  });

  test('load all contacts overwriting previous', (assert) => {
    const oldState = [{ firstName: 'Angelina', lastName: 'Jolie' }];
    const actionOne = { type: 'CONTACT@FIND_ALL', data: [{ firstName: 'Nathan', lastName: 'Vranicar' }] };
    const actionTwo = { type: 'CONTACT@FIND_ALL', data: [{ firstName: 'Ryan', lastName: 'Tablada' }] };

    assert.deepEqual(reducer(oldState, actionOne), { contacts: [...actionOne.data] });
    assert.deepEqual(reducer(oldState, actionTwo), { contacts: [...actionTwo.data] });
  });

  test('create a new contact', (assert) => {
    const oldState1 = { contacts: [] };
    const actionOne = { type: 'CONTACT@CREATE', data: [{ firstName: 'Nathan', lastName: 'Vranicar' }] };
    const oldState2 = { contacts: [{ firstName: 'Angelina', lastName: 'Jolie' }] };
    const actionTwo = { type: 'CONTACT@CREATE', data: [{ firstName: 'Ryan', lastName: 'Tablada' }] };

    assert.deepEqual(reducer(oldState1, actionOne), { contacts: [...oldState1.contacts, ...actionOne.data] });
    assert.deepEqual(reducer(oldState2, actionTwo), { contacts: [...oldState2.contacts, ...actionTwo.data] });
  });

  test('remove a contact', (assert) => {
    const oldState1 = { contacts: [{ firstName: 'Nathan', lastName: 'Vranicar', id: 1 }] };
    const oldState2 = { contacts: [{ firstName: 'Nathan', lastName: 'Vranicar', id: 1 }, { firstName: 'Ryan', lastName: 'Tablada', id: 2 }] };
    const oldState3 = { contacts: [{ firstName: 'Nathan', lastName: 'Vranicar', id: 1 }] };
    const actionOne = { type: 'CONTACT@DELETE', id: 1 };
    const actionTwo = { type: 'CONTACT@DELETE', id: 2 };
    const action3 = { type: 'CONTACT@DELETE', id: 2 };

    assert.deepEqual(reducer(oldState1, actionOne), { contacts: [] });
    assert.deepEqual(reducer(oldState2, actionTwo), { contacts: [{ firstName: 'Nathan', lastName: 'Vranicar', id: 1 }] });
    assert.deepEqual(reducer(oldState3, action3), { contacts: [{ firstName: 'Nathan', lastName: 'Vranicar', id: 1 }] });
  });
});
