import axios from 'axios'
import Noty from 'noty'

let addTocart= document.querySelectorAll('.add-to-cart')
let cartCounter = document.querySelector('#cartCounter')

function updateCart(food){
    axios.post('/update-cart',food).then(res => {
        console.log(res)
        cartCounter.innerText = res.data.totalQty

         new Noty({
             type: 'success',
             timeout: 1000,
             text : 'Item added to cart.',
             progressBar: false,
             layout: 'bottomRight'     
            }).show()

    }).catch(err => {
        new Noty({
            type: 'error',
            timeout: 1000,
            text : 'Somthing went wrong!',
            progressBar: false,
            layout: 'bottomRight'     
           }).show()
    })
}
addTocart.forEach((btn) => {
    btn.addEventListener('click', (e)=>{
        let item = JSON.parse(btn.dataset.food)
        updateCart(item)
    })
})