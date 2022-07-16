const express = require("express");
const router = express.Router();

router.get("/userdata", (req, res) => {
    const user = {
        username: req.user.username,
        email: req.user.email,
        address: req.user.address,
        tel: req.user.tel,
        cartId: req.user.cartId,
        token: req.cookies.jwt
    }
    res.send(user)
})

module.exports = router;