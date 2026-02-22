let products = JSON.parse(localStorage.getItem("products")) || [
{name:"Earrings",price:199,image:"https://via.placeholder.com/300"},
{name:"Clay Plate",price:499,image:"https://via.placeholder.com/300"},
{name:"Fridge Magnet",price:149,image:"https://via.placeholder.com/300"}
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart(){
localStorage.setItem("cart",JSON.stringify(cart));
}

function loadProducts(){
let html="";
products.forEach((p,i)=>{
html+=`
<div class="product">
<img src="${p.image}">
<h3>${p.name}</h3>
<p>₹${p.price}</p>
<button onclick="addToCart(${i})">Add to Cart</button>
</div>`;
});
document.getElementById("productGrid").innerHTML=html;
}

function addToCart(i){
cart.push(products[i]);
saveCart();
loadCart();
}

function loadCart(){
let html="";
let total=0;
cart.forEach(p=>{
html+=`${p.name} ₹${p.price}<br>`;
total+=Number(p.price);
});
document.getElementById("cartItems").innerHTML=html;
document.getElementById("total").innerHTML="Total: ₹"+total;
document.getElementById("cartCount").innerHTML=cart.length;
}

function checkout(){
let msg="Hello, I want to order:%0A";
cart.forEach(p=>{
msg+=p.name+" ₹"+p.price+"%0A";
});
window.open("https://wa.me/918670322260?text="+msg);
}

loadProducts();
loadCart();
