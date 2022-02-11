const updateContactsList = require("./updateContactsList");
const listContacts = require("./listContacts");

const removeContact = async (id) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === id);
  if (idx === -1) {
    return null;
  }
  const newContacts = contacts.filter((_, index) => index !== idx);
  await updateContactsList(newContacts);
  return contacts[idx];
};

module.exports = removeContact;
