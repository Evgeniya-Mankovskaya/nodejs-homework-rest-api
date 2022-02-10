const listContacts = require("./listContacts");
const updateContactsList = require("./updateContactsList");

const updateContact = async (id, body) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === id);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { id, ...body };
  await updateContactsList(contacts);
  return contacts[idx];
};

module.exports = updateContact;
