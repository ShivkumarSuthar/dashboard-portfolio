const Counter = require('../model/Counter');

function autoIncrementId(schema, modelName) {
  schema.pre('save', async function (next) {
    if (this.isNew && !this.id) {
      try {
        const counter = await Counter.findByIdAndUpdate(
          { _id: `${modelName}Id` },
          { $inc: { seq: 1 } },
          { new: true, upsert: true }
        );
        this.id = counter.seq;
      } catch (err) {
        return next(err);
      }
    }
    next();
  });
}

module.exports = autoIncrementId;
