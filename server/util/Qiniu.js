'use strict';
const qiniu = require('qiniu');

class Qiniu {
	async uploadAction() {
		var accessKey = 'fAZ0042JlwZ-9BM0rt84R23KlPQzCXoaXpl27EDD';
		var secretKey = 'ZUBOqcHcKS5fOJikxPzIKumvW7Hgn9Qgy4lUuk62';
		var bucket = 'myblog';
		var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
		var options = {
			scope: bucket,
		};
		var putPolicy = new qiniu.rs.PutPolicy(options);
		var uploadToken = putPolicy.uploadToken(mac);
		// think.log(uploadToken);
		//    给前端返回一个uploadToken
		return uploadToken;
	}
}

module.exports = Qiniu;