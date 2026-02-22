var products = JSON.parse(localStorage.getItem("products")) || [
{ name:"Earrings", price:199 },
{ name:"Clay Plate", price:499 }
];

var cart = [];

function loadProducts()
{
var html="";

products.forEach((p,i)=>
{
html+=`
<div class="product">
${p.name}<br>
₹${p.price}<br>
<button onclick="addToCart(${i})">Add to Cart</button>
</div>
`;
});

document.getElementById("products").innerHTML=html;
}

function addToCart(i)
{
cart.push(products[i]);
loadCart();
}

function loadCart()
{
var html="";

cart.forEach(p=>
{
html+=`${p.name} ₹${p.price}<br>`;
});

document.getElementById("cart").innerHTML=html;
}

function checkout()
{
var msg="Order details:%0A";

cart.forEach(p=>
{
msg+=p.name+" ₹"+p.price+"%0A";
});

window.open("https://wa.me/918670322260?text="+msg);
}

loadProducts();