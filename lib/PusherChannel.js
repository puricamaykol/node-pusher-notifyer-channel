'use strict'
/**
 * 
 */
var Pusher = require('pusher');

class PusherChannel {
	/**
	 * [constructor description]
	 * @param  {[type]} settings [description]
	 * @return {[type]}          [description]
	 */
	constructor(settings, message){
		this.message = message
		this.settings = {}
		this.settings.appId = settings.appId
		this.settings.key = settings.key
		this.settings.secret = settings.secret
		this.settings.encrypted = settings.encrypted
		this.settings.channelName = settings.channelName
		this.settings.event = settings.event 

		this.pusher = new Pusher({
		  appId: this.settings.appId,
		  key: this.settings.key,
		  secret: this.settings.secret,
		  encrypted: this.settings.encrypted
		})
	}
	/**
	 * [send description]
	 * @param  {[type]}   message  [description]
	 * @param  {Function} callback [description]
	 * @return {[type]}            [description]
	 */
	send(callback){
		this.pusher.trigger((this.settings.channelName == null) ? 'pusher-channel' : this.settings.channelName, this.settings.event, {
		  "message": this.message,
		}, function(err, res){
			 callback(err, {notifyerChannel: "PusherChannel", response: res.res.toJSON().body})
		});
	}
}

module.exports = PusherChannel