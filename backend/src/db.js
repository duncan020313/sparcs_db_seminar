/*
Item example:
{
  name: "과제하기",
  done: false
}
*/

const TodoModel = require("./models/todo")
function add(name, callback) {
  const newItem = new TodoModel({
    name
  });
  newItem.save((error, result) => {
    callback(result);
  })
}
function getAll(callback){
  TodoModel.find({}, (error, result)=>{
    if(error){
      console.log(error);
      callback([]);
    }
    else {
      callback(result);
    }
  })
}
function setDone(id, callback){
  TodoModel.findOne({_id: id}, (error, result)=>{
    if(result.done===true){
      TodoModel.updateOne({_id:id}, {done:false}, ()=>{
        callback();
      });
    }
    else{
      TodoModel.updateOne({_id:id}, {done:true}, ()=>{
        callback();
      });
    }
  })
}
function remove(id, callback){
  TodoModel.deleteOne({_id:id}, (error)=>{
    callback();
  });
}
module.exports = {
  getAll,
  add,
  remove,
  setDone
};
