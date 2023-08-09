const buttons = document.querySelectorAll("[data-carousel-button]")

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const offset = button.dataset.carouselButton === "next" ? 1 : -1
    const slides = button
      .closest("[data-carousel]")
      .querySelector("[data-slides]")

    const activeSlide = slides.querySelector("[data-active]")
    let newIndex = [...slides.children].indexOf(activeSlide) + offset
    if (newIndex < 0) newIndex = slides.children.length - 1
    if (newIndex >= slides.children.length) newIndex = 0

    slides.children[newIndex].dataset.active = true
    delete activeSlide.dataset.active
  })
})
// API URL'si

const apiUrl = 'https://opt-interview-projects.onrender.com/smart-recommender';

// const prevBtn = document.getElementById("prev-btn");
// const nextBtn = document.getElementById("next-btn");

// let productData = []
// let itemsPerPage = 4;
// let currentPage = 1;

// const pages = [];
// for(let i=0;i<=Math.ceil(productData.length / itemsPerPage); i++) {
//   pages.push(i)
// }
// const indexOfLastPage = currentPage * itemsPerPage;
// const indexOfFirstPage = indexOfLastPage - itemsPerPage;
// const currentItems = productData.slice(indexOfFirstPage, indexOfLastPage);

// fetch(apiUrl)
//   .then(response => response.json())
//   .then(data => {
//     const top4Products = data.slice(0, 4);

//     const productsContainer = document.getElementById('products-container');

//     $("#next-btn").on("click", function () {
//       myFunction()
//     });

//     $("#prev-btn").on("click", function () {
//       myFunction()
//     });

//     top4Products.map(product => {


//       const productCard = document.createElement('div');
//       productCard.className = 'product-card';

//       const imgElement = document.createElement('img');
//       imgElement.src = product.img;
//       imgElement.alt = product.name;
//       imgElement.url = product.url;


//       imgElement.addEventListener("click", function () {
//         document.location.href = imgElement.url;
//       });

//       const nameElement = document.createElement('p');
//       nameElement.textContent = product.name;
//       nameElement.style.whiteSpace = "wrap";
//       nameElement.style.overflow = "hidden";
//       nameElement.style.textOverflow = "ellipsis";
//       nameElement.style.width = "250px";
//       nameElement.addEventListener("click", function () {
//         document.location.href = imgElement.url;
//       });

//       const priceElement = document.createElement('p');
//       priceElement.textContent = `${product.price} TL`;
//       priceElement.addEventListener("click", function () {
//         document.location.href = imgElement.url;
//       });

//       productCard.appendChild(imgElement);
//       productCard.appendChild(nameElement);
//       productCard.appendChild(priceElement);

//       productsContainer.appendChild(productCard);
//     });
//   })
//   .catch(error => {
//     console.error('An error occurred:', error);
//   });

// function myFunction() {
//   alert("Button clicked!");
// }

// async function productTable() {
//   const data = await fetch(apiUrl);
//   const res = await data.json();
//   productData = res.products;
// }

let productData = []
let itemsPerPage = 4;
let currentPage = 1; 

async function dataTable() {
  await productTable();
  console.log(productData);

  const pages=[]
  for (let i = 0; i < Math.ceil(productData.length/itemsPerPage); i++) {
    pages.push(i);
  }
  const indexOfLastPage = currentPage * itemsPerPage;
  const indexOfFirstPage = indexOfLastPage - itemsPerPage;
  const currentItems = productData.slice(indexOfFirstPage, indexOfLastPage);

  document.getElementById("products-container").innerHTML = currentItems.map(products => 
    `
    <div class="productBox">
    <img src=${products.img} alt=""/>
    <h4>${products.name}</h4>
    <p>${products.price}</p>
    </div>
    `
    ).join("");
}
dataTable();

const prevBtn = () => {
  if((currentPage - 1) * itemsPerPage) {
    currentPage--;
    dataTable();
  }
}
const nextBtn = () => {
  if((currentPage *itemsPerPage) / productData.length) {
    currentPage++;
    dataTable();
  }
}

document.getElementById("prev-btn").addEventListener("click", prevBtn,false)
document.getElementById("next-btn").addEventListener("click", nextBtn,false)

async function productTable() {
  const data = await fetch(apiUrl);
  const res = await data.json();
  productData = res;
  // console.log(productData)
}

productTable();