document.addEventListener("DOMContentLoaded", async () => {

 async function populateProduct(){
    const queryParams = getQueryParams();
    if(queryParams['id']){
        const productId = queryParams['id'];
        const product = await fetchProductById(productId);

         
        
        removeLoader();
        console.log(product);
    


    const productName = document.getElementById('product-name');
    
    const productPrice = document.getElementById('product-price');
    const productDesc = document.getElementById('product-description-data');
    const productImage = document.getElementById('product-img');



    productName.textContent = product.title;
  
    productPrice.textContent = product.price;
    productDesc.textContent = product.description;
    
    productImage.src = product.image;
    
 }
 }
 populateProduct();




})