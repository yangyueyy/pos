'use strict';
let printReceipt = (inputs) => {
  let allItems = loadAllItems();
  let promotions = loadPromotions();
  let countItems = buildItems(inputs, allItems);
  let subCartItems = buildSubCartItems(countItems, promotions);
  let receiptItems = buildReceipt(subCartItems);
  let printText = printReceiptText(receiptItems);

  console.log(printText);
};

let buildItems = (inputs, allItems) => {
  let cartItems = [];
  for (let input of inputs) {
    let splittedInput = input.split('-');
    let barcode = splittedInput[0];
    let count = parseFloat(splittedInput[1] || 1);

    let cartItem = cartItems.find(cartItem => cartItem.item.barcode === barcode);
    if (cartItem) {
      cartItem.count += count ;
    }
    else {
      let item = allItems.find(item => item.barcode === barcode);
      cartItems.push({item, count});
    }
  }

  return cartItems;
};

let buildSubCartItems = (cartItems, promotions) => {
  return cartItems.map(cartItem => {
    let promotionType = getPromotionType(cartItem.item.barcode, promotions);
    let {saveSubTotal, subTotal} = discount(cartItem, promotionType);

    return {cartItem, saveSubTotal, subTotal};
  })
};

let getPromotionType = (barcode, promotions) => {
  let promotion = promotions.find(promotion => promotion.barcodes.includes(barcode));
  return promotion ? promotion.type : undefined;
};

let discount = (cartItem, promotionType) => {
  let freeCartItem = 0;
  if (promotionType === "BUY_TWO_GET_ONE_FREE") {
    freeCartItem = parseInt(cartItem.count / 3);
  }
  let saveSubTotal = freeCartItem * cartItem.item.price;
  let subTotal = cartItem.item.price * cartItem.count - saveSubTotal;

  return {saveSubTotal, subTotal};
};

let buildReceipt = (subCartItems) => {
  let save = 0, total = 0;

  for (let subCartItem of subCartItems) {
    save += subCartItem.saveSubTotal;
    total += subCartItem.subTotal;
  }

  return {subCartItems, save, total};
};

let printReceiptText = (receiptItems) => {
  let textString = buildTextString(receiptItems.subCartItems);

  return `***<没钱赚商店>收据***
${textString}
----------------------
总计：${formatMoney(receiptItems.total)}(元)
节省：${formatMoney(receiptItems.save)}(元)
**********************`;
};

let buildTextString = (subCartItems) => {
  return subCartItems.map(subCartItem => {
    let cartItem = subCartItem.cartItem;
    return `名称：${cartItem.item.name}，\
数量：${cartItem.count + cartItem.item.unit}，\
单价：${formatMoney(cartItem.item.price)}(元)，\
小计：${formatMoney(subCartItem.subTotal)}(元)`;
  }).join('\n');
};

let formatMoney = (money) => {
  return money.toFixed(2);
};
