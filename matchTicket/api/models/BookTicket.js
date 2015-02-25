/**
* BookTicket.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	name:{
  		type: "string",
  		required: true,
  	},
  	card:{
  		type: "string",
  		required: true,
  	},
  	match:{
  		type: "string",
  		required: true,
  	},
  	cost:{
  		type: "string",
  		required: true,
  	},
  	id:{
  		type: "string",
  		required: true,
  	}
  }
};

