const Menu = require('../../models/menu')
function menuController(){
    return {
        async index(req,res){
            const foods= await Menu.find()
            // console.log(foods)
            return res.render("menu", { foods: foods})
        }
    }
}


module.exports = menuController