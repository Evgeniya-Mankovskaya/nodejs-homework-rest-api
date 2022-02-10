const { v4 } = require("uuid");
const updateContactsList = require("./updateContactsList");
const listContacts = require("./listContacts");

const addContact = async (data) => {
  const contacts = await listContacts();
  const newContact = { id: v4(), ...data };
  contacts.push(newContact);
  await updateContactsList(contacts);
  return newContact;
};

module.exports = addContact;
