const { User } = require("../../models");
const createError = require("http-errors");

const updateSubscription = async (req, res) => {
  const { id } = req.params;
  const { subscription } = req.body;
  const result = await User.findByIdAndUpdate(
    id,
    { subscription },
    {
      new: true,
    }
  );
  if (!result) {
    throw createError(404, `User with id ${id} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result: {
        id,
        subscription,
      },
    },
  });
};

module.exports = updateSubscription;
