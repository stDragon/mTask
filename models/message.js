var async = require('async');
var util = require('util');

var mongoose = require('lib/mongoose'),
  Message = mongoose.Message;

var message = new Message({
  kod: {
    type: String,
    unique: true,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  text: {
    type: String,
    required: true
  },
  urgency: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: "Новая"
  },
  complited:  {
    type: Date,
    default: " "
  }
});

message.statics.addnewRequest = function(newRequest, callback) {
  var Message = this;

  async.waterfall([
    function(callback) {
      Message.findOne({username: username}, callback);
    },
    function(user, callback) {
      if (user) {
        if (user.checkPassword(password)) {
          callback(null, user);
        } else {
          callback(new AuthError("Пароль неверен"));
        }
      } else {
        var user = new Message({username: username, password: password});
        user.save(function(err) {
          if (err) return callback(err);
          callback(null, user);
        });
      }
    }
  ], callback);
};


// message.statics.addnewRequest = function(newRequest, callback) {
//   var Message = this;

//   async.waterfall([
//     function(callback) {
//       Message.findOne({username: username}, callback);
//     },
//     function(user, callback) {
//       if (user) {
//         if (user.checkPassword(password)) {
//           callback(null, user);
//         } else {
//           callback(new AuthError("Пароль неверен"));
//         }
//       } else {
//         var user = new Message({username: username, password: password});
//         user.save(function(err) {
//           if (err) return callback(err);
//           callback(null, user);
//         });
//       }
//     }
//   ], callback);
// };

exports.Message = mongoose.model('Message', message);


function addNewRequestError(message) {
  Error.apply(this, arguments);
  Error.captureStackTrace(this, addNewRequestError);

  this.message = message;
}

util.inherits(addNewRequestError, Error);

addNewRequestError.prototype.name = 'ошибка сообщения';

exports.addNewRequestError = addNewRequestError;


