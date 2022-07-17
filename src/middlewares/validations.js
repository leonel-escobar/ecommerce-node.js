
const validationSignup = async (req, res, next) => {
    const { password, passwordRepeat, email, tel} = req.body
    
    switch (true) {
        case !validateTel(tel):
            return res.json({msg: "Campo de teléfono inválido"});
            break;
        case !validateEmail(email):
            return res.json({msg: "Campo de email inválido"});
            break;
        case password != passwordRepeat:
            return res.json({msg: "Las contraseñas no coinciden"})
        default:
            next()
            break;
    }
}

const validateTel = (tel) => {
    const telRegExp = /^[(]{0,1}[0-9]{2}[)]{0,1}[-\s\.]{0,1}[0-9]{4}[-\s\.]{0,1}[0-9]{4}$/;
    const result = telRegExp.test(tel);
    return result;
}

const validateEmail = (email) => {
    const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const result = emailRegExp.test(email);
    return result;
}

module.exports = validationSignup;