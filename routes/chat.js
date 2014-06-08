// var User = require('models/user').User;
// var User = require('models/message').User;
// var HttpError = require('error').HttpError;
// var AuthError = require('models/user').AuthError;
// var async = require('async');

exports.get = function(req, res) {
  res.render('chat');
}
// exports.post = function(req, res, next){
// 	var newRequest = new Object();
// 	newRequest.kod = document.getElementsByTagName('tbody').item(0).getElementsByTagName('tr').length || 0;
// 	newRequest.date = new Date();
// 	newRequest.request = description.val();
// 	newRequest.urgency = $("#urgency").text();
// 	newRequest.status = " ";
// 	newRequest.complite = " " ;
// }
// User.addNewRequest(newRequest, function(err, user) {
//     if (err) {
//       if (err instanceof AuthError) {
//         return next(new HttpError(403, err.message));
//       } else {
//         return next(err);
//       }
//     }

//     // req.session.user = user._id;
//     // res.send({});

//   });

// };