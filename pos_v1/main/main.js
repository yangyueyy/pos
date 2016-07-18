'use strict';
let buildItems=(inputs,allItems)=>{
  const cartItems=[];

  for(let input of inputs){
    const splittedInput=input.split('-');
    const barcode=splittedInput[0];
    const count = parseFloat(splittedInput[1] || 1);

    const cartItem=cartItems.find(cartItem => cartItem.item.barcode === barcode);

    if(cartItem){
      cartItem.count++;
    }
    else{
      const item = allItems.find(item => item.barcode === barcode);

      cartItems.push({item: item,count: count});
    }
  }

  return cartItems;
}
