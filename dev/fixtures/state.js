const tree = require('./tree');

function traverse(branch, obj) {
  branch.forEach((inst) => {
    obj[inst.uid] = inst; // eslint-disable-line no-param-reassign
    if (Array.isArray(inst.children)) {
      traverse(inst.children, obj);
    }
  });
  return obj;
}

const byId = traverse(tree, {});

module.exports = {
  tree,
  byId,
};
