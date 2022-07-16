const passport = require("passport");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res, next) => {
    passport.authenticate('signin', async (err, user, info) => {
    	try {
        	if (err || !user) {
          	console.log(err)
          	const error = new Error('new Error')
          	return next(error)
        }
  
        req.login(user, { session: false }, async (err) => {
        	if (err) return next(err)
          	const body = { _id: user._id, email: user.email }
  
          	const token = jwt.sign({ user: body }, 'top_secret')
          	res.cookie("jwt", token)
			return res.json({ token })
        })
    	} catch(e) {
    		return next(e)
    	}
    })(req, res, next)
}

module.exports = loginUser;