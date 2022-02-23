const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const { User } = require("../../models");
const { sendEmail } = require("../../helpers");

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict("Email in use");
  }
  const verificationToken = nanoid();
  const avatarURL = gravatar.url(email);
  const newUser = new User({ name, email, avatarURL, verificationToken });
  newUser.setPassword(password);
  await newUser.save();

  const mail = {
    to: email,
    subject: "Please, verify your email",
    html: `<a target="_blanc" href="http://localhost:3000/api/users/verify/${verificationToken}">Verify email</a>`,
  };
  await sendEmail(mail);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        name,
        email,
        avatarURL,
        verificationToken,
      },
    },
  });
};

module.exports = signup;
