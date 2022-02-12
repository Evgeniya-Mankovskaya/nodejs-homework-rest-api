const { Schema, model } = require("mongoose");
const Joi = require("joi");
const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timeStamps: true }
);
const joiSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string()
    .trim()
    .regex(/^[0-9]{7,15}$/)
    .required(),
  favorite: Joi.bool(),
});

const favoriteJoiSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const Contact = model("contact", contactSchema);

module.exports = { Contact, joiSchema, favoriteJoiSchema };
