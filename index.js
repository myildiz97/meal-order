import { menuArray } from "/data.js"

const container = document.getElementById("container")
const price = document.getElementById("price")
const orderSection = document.getElementById("order-section")
const form = document.getElementById("form")

const getItems = () => {
    for (let item of menuArray) {
        container.innerHTML += `
            <div class="items">
                <div class="emoji">
                    <img src=${item.emoji} alt=${item.name} />
                </div>
                <div class="desc">
                    <h3>${item.name}</h3>
                    <span>${item.ingredients.join(", ")}</span>
                    <h4>\$${item.price}</h4>
                </div>
                <div><button class="order-btn" data-plus=${item.id}>
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
                </button></div>
            </div>
            <hr />
        `
    }
}

getItems()

const render = (item) => {
    document.getElementById("initial").style.display = "none"
    const orderList = document.getElementById("order-list")
    
    if (document.getElementById(item.name)) {
        document.getElementById(item.name).innerHTML = (parseInt(document.getElementById(item.name).innerHTML) + item.price).toString()
    } else {
        orderList.innerHTML += `
            <div class="orders" id=${item.name}-${item.id}>
                <h3>${item.name}</h3>
                <button class="remove" data-remove=${item.name}-${item.id}>remove</button>
                <span "sign">\$</span>
                <h4 id=${item.name}>${item.price}</h4>
            </div>
        `
    }
}

const handleTakeOrder = (e) => {
    if (e.target.dataset.plus) {
        orderSection.style.display = "flex"
        
        const id = e.target.dataset.plus
        const item = menuArray[id]
        
        render(item)
        
        price.innerHTML = (parseInt(price.innerHTML) + item.price).toString()
        
    } else if (e.target.dataset.remove) {
        const id = (e.target.dataset.remove).substring(0, e.target.dataset.remove.indexOf("-"))
        const itemTotalPrice = document.getElementById(id)
        price.innerHTML = (parseInt(price.innerHTML) - parseInt(itemTotalPrice.innerHTML)).toString()
        document.getElementById(e.target.dataset.remove).remove()
        if (price.innerHTML === "0") {
            orderSection.style.display = "none"
            document.getElementById("initial").style.display = "flex"
        }
    }
}

document.addEventListener("click", handleTakeOrder)

document.getElementById("comp-btn").addEventListener("click", () => {
    document.getElementById("payment").style.display = "flex"
})

document.getElementById("cancel").addEventListener("click", () => {
    document.getElementById("payment").style.display = "none"
})

const handleSubmit = (e) => {
    e.preventDefault()
    const name = form.elements.name.value
    
    orderSection.style.display = "none"
    
    document.getElementById("initial").innerHTML = `
        <div id="thanks">
            <p>Thanks, ${name}! Your order is on its way!</p>
        </div>
    `
    document.getElementById("order-list").innerHTML = ""
    price.innerHTML = "0"

    document.getElementById("initial").style.display = "flex"
    document.getElementById("payment").style.display = "none"
    
    form.reset()
}

form.addEventListener("submit", handleSubmit)