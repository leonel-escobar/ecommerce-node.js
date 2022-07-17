
function isAuth(req,res,next) {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect("/signin")
    }
}

function isAdmin(req,res,next) {
    const admin = req.user.isAdmin
    if (admin === true) {
        next()
    } else {
        res.json({msg: "Permitido solo para administradores"})
    }
}

module.exports = { isAuth, isAdmin }