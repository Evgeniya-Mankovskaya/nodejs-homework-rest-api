const listContacts = require("./listContacts");

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const result = allContacts.find((contact) => contact.id === contactId);
  if (!result) {
    return null;
  }
  return result;
};

module.exports = getContactById;
