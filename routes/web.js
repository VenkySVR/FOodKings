const homeController = require('../app/http/controllers/homeController')()
const cartController = require('../app/http/controllers/customers/cartController')()
const menuController = require('../app/http/controllers/menuController')()
const authController = require('../app/http/controllers/authController')()

function initroutes(app){
    app.get('/',homeController.index)
    app.get('/menu',menuController.index)
    app.get('/login',authController.login)
    app.get('/signup',authController.signup)

    app.get('/cart', cartController.index)
    app.post('/update-cart',cartController.update)
}

module.exports = initroutes