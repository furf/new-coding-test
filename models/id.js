const ids = {};

function id(instance) {
  const model = instance.constructor.name;
  if (!(model in ids)) {
    ids[model] = 0;
  }
  ids[model] += 1;
  return ids[model];
}

module.exports = id;
