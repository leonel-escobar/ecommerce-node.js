const UsersDaoMongoDB = require("../daos/users/usersDaoMongoDB")
const users = new UsersDaoMongoDB()

function isAuth(req,res,next) {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect("/signin")
    }
}

async function isAdmin(req,res,next) {
    const userId = await req.user._id
    const user = await users.getById(userId)
    const admin = await user.isAdmin
    if (admin === true) {
        next()
    } else {
        res.json({msg: "Permitido solo para administradores"})
    }
}

module.exports = { isAuth, isAdmin }