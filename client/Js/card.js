let params = new URLSearchParams(document.location.search);
let id = params.get("id");
const baseUrl = "http://localhost:3000/products";

let mainBox = document.querySelector(".main-box");
const item_count = document.querySelector(".item-count");
let product = null;

let products = JSON.parse(localStorage.getItem("products"));
let oldProducts = products ? products : [];

const renderCard = (data) => {
  mainBox.innerHTML = `<div class="main_box1 w-1/2">
        <img class="w-full" src=${data.img} alt="">
        </div>
        <div class="main_box2 w-1/2 ml-20">
        <h2 class="text-3xl font-medium mb-8">Футболка с дизайнерским принтом Graphic Hypnotize</h2>
        <div class="flex justify-between">
        <img class="w-28" src="/images/stars.png" alt="">
        <p>14 отзывов</p>
        <div class="flex gap-3">
        <img class="w-4" src="/images/Group.svg" alt="">
        <p>В избранном</p>
        </div>
        <p>В наличии: 155</p>
        </div>
        <div class="product_price flex items-center mt-8 mb-4">
        <p class="text-[#FF4343] text-3xl">${data.price} ₽</p>
        <p class="text-[22px] line-through text-slate-400">${data.priceTo} ₽</p>
        </div>
        <p class="text-xs italic font-light mb-9">1799 ₽ при покупке от 10 шт *</p>
        <span class="font-semibold">Цвет:</span><span>градиент</span>
        <div class="flex gap-5 mt-5 mb-5">
            <img class="w-14" src="/images/boy1.png" alt="">
            <img class="w-14" src="/images/boy14.png" alt="">
            <img class="w-14" src="/images/t-shirt91.png" alt="">
            </div>
            <span class="font-semibold">Размер:</span><span class>S</span> <br>
            <div class="flex gap-3 mt-4">
            <span class="border cursor-pointer p-2 active:bg-amber-300">S</span><span class="border cursor-pointer p-2 active:bg-amber-300">M</span><span class="border cursor-pointer p-2 active:bg-amber-300">L</span><span class="border cursor-pointer p-2 active:bg-amber-300">XL</span><span class="border cursor-pointer p-2 active:bg-amber-300">XXL</span>
            </div>
            <div class="flex items-center mt-5">
            <button id="decrement" class="py-1 border bg-slate-400">🔽</button>
            <p id="count">${data?.userCount || "0"}</p>
            <button id="increment" class="py-1 border bg-slate-400">🔼</button><strong class="ml-5 p-1 w-24" id="totalPrice">${
              data?.userPrice || "0"
            } $</strong>
            <button class="ml-8 bg-gradient-to-r from-purple-500 to-pink-500 px-[2rem] py-[0.5rem] text-xl rounded-md hover:bg-yellow-600 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">Купить сейчас</button>
            <button class="ml-8 border-y-indigo-800 bg-gradient-to-r  from-purple-100 to-pink-100 px-[2rem] py-[0.5rem] text-xl rounded-md transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">Добавить в корзину</button>
            </div>
            <span class="font-semibold">Ваш регион:</span><span>Москва</span><br>
            <span class="font-semibold">Расчётное время доставки:</span><span>17 февраля</span><br>
            <span class="font-semibold">О товаре:</span><span>купили более 100 раз</span>
            <div class="flex gap-6">
            <p class="inline-block px-7 py-1 border">Характеристики</p>
            <p class="inline-block px-7 py-1 border">Описание</p>
            </div>
            
            </div>`;
  localStorage.setItem("products", JSON.stringify(oldProducts));
  item_count.textContent = oldProducts.reduce((a, b) => b.userCount + a, 0);
};

const renderProductDetail = async () => {
  try {
    const res = await fetch(`${baseUrl}/${id}`);
    product = await res.json();
    let el = oldProducts.find((item) => item.id === product.id);
    renderCard(el ? el : product);
  } catch (error) {}
};
renderProductDetail();

mainBox.addEventListener("click", async (e) => {
  let id = e.target.id;
  let el = oldProducts.find((item) => item.id === product.id);
  console.log(el);
  if (id === "increment") {
    if (!el) {
      let newProduct = {
        ...product,
        userPrice: product.price,
        userCount: 1,
      };
      oldProducts.push(newProduct);
      renderCard(newProduct);
    } else {
      el.userCount += 1;
      el.userPrice = el.userCount * el.price;
    }
  }
  if (id === "decrement") {
    if (el.userCount > 0) {
      el.userCount -= 1;
      el.userPrice = el.userCount * el.price;
    }
  }

  if (el) {
   renderCard(el);
  }
});


