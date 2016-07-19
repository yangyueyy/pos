'use strict';
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

let buildSubCartItems = (cartItems,promotions) => {
  return cartItems.map(cartItem =>{
    let promotionType = getPromotionType(cartItem.item.barcode,promotions);
    let {saveSubTotal,subTotal} = discount(cartItem,promotionType);

    return {cartItem,saveSubTotal,subTotal};
  })
};

let getPromotionType = (barcode,promotions) => {
  let promotion =  promotions.find(promotion => promotion.barcodes.includes(barcode));
  return promotion ? promotion.type : '';
};

let discount=(cartItem,promotionType) => {
  let freeItemCount = 0;
  if(promotionType === 'BUY_TWO_GET_ONE_FREE'){
    freeItemCount = parseInt(cartItem.count / 3);
  }
  let saveSubTotal = freeItemCount * cartItem.item.price;
  let subTotal = cartItem.item.price * cartItem.count-saveSubTotal;

  return {saveSubTotal,subTotal};
};

