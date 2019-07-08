const router = require('../../util/router-util');
const Qiniu = require('../../util/Qiniu');
const OK_CODE = 0;
let qiniu = new Qiniu();

router.get('/getUpToken', (req, res) => {
	qiniu.uploadAction().then((data) => {
		res.json({
			code: OK_CODE,
			msg: 'ok',
			uptoken: data,
		})
	}).catch((error) => {
		console.log(error)
	});
});

module.exports = router;