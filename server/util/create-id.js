function createId(){
  let date = new Date();
  return `${date.getHours()}${date.getSeconds()}`;
};

console.log(createId());

module.exports = createId;