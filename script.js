
let USERNAME="palette&pearls";
let PASSWORD="p&p123";
let UPI="8670322260@upi";
let PHONE="918670322260";

let products = JSON.parse(localStorage.getItem("products")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let editingIndex = -1;

function saveData() {
localStorage.setItem("products", JSON.stringify(products));
localStorage.setItem("cart", JSON.stringify(cart));
}

function showPage(page){
document.querySelectorAll("section").forEach(s=>s.style.display="none");
document.getElementById(page).style.display="block";
loadProducts();
loadCart();
loadAdminProducts();
}

function loadProducts(){
let html="";
products.forEach((p,i)=>{
html+=`
<div class="product">
<img src="${p.image}" width="100%">
<h3>${p.name}</h3>
${p.category}<br>
₹${p.price}<br>
${p.desc}<br>
Stock: ${p.stock}<br>
<button onclick="addToCart(${i})">Add to Cart</button>
</div>`;
});
document.getElementById("products").innerHTML=html;
}

function filterCategory(cat){
if(cat=="All"){loadProducts();return;}
let html="";
products.forEach((p,i)=>{
if(p.category==cat){
html+=`
<div class="product">
<img src="${p.image}" width="100%">
<h3>${p.name}</h3>
${p.category}<br>
₹${p.price}<br>
${p.desc}<br>
Stock: ${p.stock}<br>
<button onclick="addToCart(${i})">Add to Cart</button>
</div>`;
}
});
document.getElementById("products").innerHTML=html;
}

function addToCart(i){
if(products[i].stock<=0){alert("Out of stock");return;}
cart.push(products[i]);
products[i].stock--;
saveData();
loadProducts();
loadCart();
}

function loadCart(){
let html="";
let total=0;
cart.forEach(p=>{html+=p.name+" ₹"+p.price+"<br>"; total+=Number(p.price);});
document.getElementById("cartItems").innerHTML=html;
document.getElementById("cartTotal").innerHTML="Total ₹"+total;
document.getElementById("cartCount").innerHTML=cart.length;
}

function whatsappCheckout(){
let msg="Order:%0A";
cart.forEach(p=>msg+=p.name+" ₹"+p.price+"%0A");
window.open("https://wa.me/"+PHONE+"?text="+msg);
}

function upiCheckout(){
let total=0;
cart.forEach(p=>total+=Number(p.price));
window.open("upi://pay?pa="+UPI+"&pn=Palette%20and%20Pearls&am="+total);
}

function adminLogin(){
if(document.getElementById("adminUser").value==USERNAME &&
document.getElementById("adminPass").value==PASSWORD){
showPage("adminPanel");
}else{alert("Wrong login");}
}

function saveProduct(){
let p={
name:pName.value,
price:pPrice.value,
category:pCategory.value,
desc:pDesc.value,
image:pImage.value,
stock:pStock.value
};
if(editingIndex==-1) products.push(p);
else products[editingIndex]=p;
editingIndex=-1;
saveData();
loadAdminProducts();
loadProducts();
}

function loadAdminProducts(){
let html="";
products.forEach((p,i)=>{
html+=`
<div>
${p.name} | ₹${p.price} | ${p.stock}
<button onclick="editProduct(${i})">Edit</button>
<button onclick="deleteProduct(${i})">Delete</button>
</div>`;
});
document.getElementById("adminProducts").innerHTML=html;
}

function editProduct(i){
editingIndex=i;
let p=products[i];
pName.value=p.name;
pPrice.value=p.price;
pCategory.value=p.category;
pDesc.value=p.desc;
pImage.value=p.image;
pStock.value=p.stock;
}

function deleteProduct(i){
if(confirm("Delete product?")){
products.splice(i,1);
saveData();
loadAdminProducts();
loadProducts();
}
}

showPage("home");
