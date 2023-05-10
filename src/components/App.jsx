import { useState, useEffect } from "react";
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import Filter from "./Filter";

const CONTACTS_STORAGE_KEY = 'contacts-storage';

export function App() {

  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem(CONTACTS_STORAGE_KEY)) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
      localStorage.setItem(CONTACTS_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const controllingUniqueness = (name) => {
    return contacts.some(contact => contact.name === name)
  };
            
  const addContact = (name, number) => {
    if(controllingUniqueness(name)) {
      Notify.warning(`${name} is already in contacts`);
      return;
    };

    const newContact = {id: nanoid(), name, number};
      
    setContacts(s => [newContact, ...s]);    
  };


  const deleteContact = idItem => {
    setContacts(s => 
      s.filter(contact =>
        contact.id !== idItem)
    )
  };

  const getVisibileContacts = () => {

    const nameNormalized = filter.toLowerCase();

    return contacts.filter(contact => (
      contact.name.toLowerCase().includes(nameNormalized)
    ))

  };
 
  const filterContacts = e => {
    setFilter(e.currentTarget.value);
  };

    const visibleContacts = getVisibileContacts();
    return (
      <div>
        <h1>Phonebook</h1>
          <ContactForm 
          onAddContact={addContact}
          />
        <h2>Contacts</h2>
        <Filter 
        value={filter}
        onFilter={filterContacts}
        />
        <ContactList 
          contacts={visibleContacts}
          onDeleteContact={deleteContact}
          />
      </div>
   );
};
