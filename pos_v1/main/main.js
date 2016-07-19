'use strict';
let printReceipt = (inputs) => {
  let cartItems = buildItems(inputs, allItems);
  let subCartItems = buildSubCartItems(cartItems, promotions);

  return subCartItems;
};
let buildItems = (inputs, allItems) => {
  let cartItems = [];
  for (let input of inputs) {
    let splittedInput = input.split('-');
    let barcode = splittedInput[0];
    let count = parseFloat(splittedInput[1] || 1);

    let cartItem = cartItems.find(cartItem => cartItem.item.barcode === barcode);
    if (cartItem) {
      cartItem.count++;
    }
    else {
      let item = allItems.find(item => item.barcode === barcode);
      cartItems.push({item: item, count: count});
    }
  }
  
  return cartItems;
};

let buildSubCartItems = (cartItems, promotions) => {
  let subCartItems = [];
  let existPromotion;
  for (let cartItem of cartItems) {
    let barcode = cartItem.item.barcode;
    let saveSubTotal;
    let subTotal;
    for (let i = 0; i < promotions[0].barcodes.length; i++) {
      if (promotions[0].barcodes[i] === barcode) {
        existPromotion = true;
      }
    }
    if (existPromotion) {
      saveSubTotal = parseInt(cartItem.count / 3) * cartItem.item.price;
      subTotal = cartItem.count * cartItem.item.price - saveSubTotal;
    }
    else {
      saveSubTotal = 0.00;
      subTotal = cartItem.count * cartItem.item.price;
    }
    subCartItems.push({cartItem: cartItem, subTotal: parseFloat(subTotal), saveSubTotal: parseFloat(saveSubTotal)});
  }

  return subCartItems;
};
