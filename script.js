let products = JSON.parse(localStorage.getItem("products")) || [
{name:"Sample Earrings",price:199,image:"https://via.placeholder.com/300",stock:10}
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
₹${p.price}<br>
Stock: ${p.stock}<br>
<button onclick="addToCart(${i})">Add to Cart</button>
</div>`;
});
document.getElementById("products").innerHTML=html;
}

function addToCart(i){
if(products[i].stock<=0){alert("Out of stock");return;}
cart.push(products[i]);
products[i].stock--;
localStorage.setItem("products",JSON.stringify(products));
saveCart();
loadProducts();
loadCart();
}

function loadCart(){
let html="";
let total=0;
cart.forEach(p=>{
html+=`${p.name} ₹${p.price}<br>`;
total+=Number(p.price);
});
document.getElementById("cart").innerHTML=html;
document.getElementById("total").innerHTML="Total: ₹"+total;
}

function whatsappCheckout(){
let msg="Order:%0A";
cart.forEach(p=>{msg+=p.name+" ₹"+p.price+"%0A";});
window.open("https://wa.me/918670322260?text="+msg);
}

function upiCheckout(){
let total=0;
cart.forEach(p=>{total+=Number(p.price);});
window.open("upi://pay?pa=8670322260@upi&pn=Palette%20and%20Pearls&am="+total);
}

loadProducts();
loadCart();
