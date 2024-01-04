"use strict";

const productsBlock = document.querySelector(".products_block");
let heroBlock1 = document.querySelector(".hero_block1");
const baseUrl = "http://localhost:3000/products";

heroBlock1.addEventListener("click", () => {});

const render = (data) => {
  productsBlock.innerHTML = data
    ?.map(
      (item) =>
        `<a href="http://127.0.0.1:5500/pages/card.html?id=${item.id}" class="product w-[210px] p-5 border rounded-lg shadow transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  duration-300">
          <img class="w-full" src=${item.img} alt="boy2">
          <div class="product_price flex justify-around items-center">
            <p class="text-[#FF4343]">${item.price} ₽</p>
            <p class="text-[10px] line-through text-slate-400">${item.priceTo} ₽</p>
          </div>
          <div class="otziv hidden">
            <span>4.9</span><i class="fa-solid fa-star"></i>
            <p>14 отзывов</p>
          </div>
          <div class="product_title">
            <h4 class="hidden">Marple</h4>
          </div>
          <p class="text-xs mt-3">${item.title}</p>
          <div class="product_button hidden">
            <button class="bg-gradient-to-r from-purple-500 to-pink-500 px-[2rem] py-[0.5rem] text-xl rounded-md hover:bg-yellow-600 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110  duration-300 inline-block">В корзину</button>
          </div>
        </a>`
    )
    .join("");
};

const getData = async () => {
  try {
    const res = await fetch(baseUrl);
    const data = await res.json();
    render(data);
  } catch (error) {
    console.log(error);
  }
};

getData();

// const memoryData = async (e) => {
//   e.preventDefault();
//   try {
//     let obj = {};
//     for (let i of inputs) {
//       obj[i.name] = i.value;
//       i.value = "";
//     }
//     let ress = await fetch(baseUrl, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(obj),
//     });
//     const ben = await ress.json();
//   } catch (error) {
//     alert(error);
//   } finally {
//     getData();
//   }
// };

// const backSpace = async (id) => {
//   try {
//     const res = await fetch(`${baseUrl}/${id}`, {
//       method: "DELETE",
//     });
//     const data = await res.json();
//     getData();
//   } catch (error) {
//     console.log(error);
//   }
// };

// form.addEventListener("submit", memoryData);
