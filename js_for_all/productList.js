

document.addEventListener("DOMContentLoaded", async () => {

    async function fetchProducts() {
        const response = await axios.get("https://fakestoreapi.com/products");
        console.log(response.data);
        return response.data;
    }



    async function fetchProductsByCategory(category) {
        const response = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
        console.log(response.data);
        return response.data;
    }





    async function fetchCategories() {

        // this function is marked async so this will also return a promise
        const response = await fetch("https://fakestoreapi.com/products/categories");
        console.log(response);
        //console.log(response.json());
        const data = await response.json();
        console.log(data);
        return data;
    }


    const downloadedProduct = await fetchProducts(); // this API call for both filtered one and without filtered.

    //fetchProducts();
    async function populateProducts(flag, customProducts) {
        let products = customProducts;
        const queryParamsObject = getQueryParams();


        if (flag == false) {
            if (queryParamsObject['category']) {
                products = await fetchProductsByCategory(queryParamsObject['category']);

            } else {
                products = await fetchProducts();  // making API call for whole without filter
            }
        }
        const productList = document.getElementById("productList");

        products.forEach(product => {
            const productItem = document.createElement("a");
            productItem.target = "_blank";
            productItem.classList.add("product-item", "text-decoration-none", "d-inline-block");
            productItem.href = `ProductDetails.html?id=${product.id}`;


            const productImage = document.createElement("div");
            const productName = document.createElement("div");
            const productPrice = document.createElement("div");

            productImage.classList.add("product-img");
            productName.classList.add("product-name", "text-center");
            productPrice.classList.add("product-price", "text-center");

            productName.textContent = product.title.substr(0, 12) + "...";
            productPrice.textContent = `&#8377 ${product.price}`;

            const imageInsideProductImage = document.createElement("img");
            imageInsideProductImage.src = product.image;


            //append divs

            productImage.appendChild(imageInsideProductImage);
            productItem.appendChild(productImage);
            productItem.appendChild(productName);
            productItem.appendChild(productPrice);



            productList.appendChild(productItem);

        })
    }

    async function populateCategories() {
        const categories = await fetchCategories();
        const categoryList = document.getElementById("categoryList");
        categories.forEach(category => {
            const categoryLink = document.createElement("a");
            categoryLink.classList.add("d-flex", "text-decoration-none");
            categoryLink.textContent = category;
            categoryLink.href = `productList.html?category=${category}`;
            categoryList.appendChild(categoryLink);

        })

        



    }

    async function downloadContentAndPopulate (){  // so that category download and product download happend parallely.
        Promise.all([populateProducts(false), populateCategories()])
        .then (() =>{
        removeLoader();
        })
    }


    downloadContentAndPopulate();
   

    const filterSearch = document.getElementById("search");
    filterSearch.addEventListener("click", async () => {
        const productList = document.getElementById("productList");
        const minPrice = Number(document.getElementById("minPrice").value);
        const maxPrice = Number(document.getElementById("maxPrice").value);
        const products = downloadedProduct;   // making API call for fitered ones

        filteredProducts = products.filter(product => product.price >= minPrice && product.price <= maxPrice);
        productList.innerHTML = "";
        populateProducts(true, filteredProducts);
        console.log(filteredProducts);

    });

    const resetFilter = document.getElementById("clear");
    resetFilter.addEventListener("click", () => {
        window.location.reload();
    });


})