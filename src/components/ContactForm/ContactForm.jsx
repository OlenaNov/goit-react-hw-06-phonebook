import { useState } from "react";

import { Form, Input, Label, SubmitContact } from "./ContactForm.styled";

function ContactForm({ onAddContact }) {

        const [name, setName] = useState('');
        const [number, setNumber] = useState('');

        const changeInput = e => {
                const nameInput = e.currentTarget.name;
                const value = e.currentTarget.value;

                switch(nameInput) {
                        case 'name':
                        setName(value);
                        break;

                        case 'number':
                        setNumber(value);
                        break;

                        default: 
                        return;
                };
        }; 


        const handleSubmit = e => {
                e.preventDefault();

                onAddContact(name, number);
                setName('');
                setNumber('');
        };

                return (
                        <Form onSubmit={handleSubmit}>
                        <Label> Name
                        <Input type="text"
                                name="name"
                                value={name}
                                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                                required 
                                onChange={changeInput}
                                />
                        </Label>
                        <Label> Number
                        <Input
                                type="tel"
                                name="number"
                                value={number}
                                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                                required
                                onChange={changeInput}
                                />
                        </Label>
                        <SubmitContact type="submit">Add contact</SubmitContact>
                        </Form>
                )
    };

    export default ContactForm;