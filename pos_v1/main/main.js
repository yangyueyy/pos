'use strict';
function printReceipt(inputs){
  let items=buildItems(inputs);

  return items;
}

function buildItems(inputs){
  let cartItems=[];
  const exinputs=changeInputs(inputs);
  const allItems=loadAllItems();
  let i;

  for(i=0;i<exinputs.length;i++){
    allItems.forEach(function(item){
      if(exinputs[i]===item.barcode){
        let cartItem=isexit(cartItems,exinputs[i]);

        if(cartItem){
          cartItem.count++;
        }
          else{
          cartItems.push({item:item,count:1});
          }
        }
    });
  }

  return cartItems;
}

function isexit(cartItems,barcode){
  let flag;

  cartItems.forEach(function (cartItem){
    if(cartItem.item.barcode===barcode){
      flag=cartItem;
    }
  });

  return flag;
}

function changeInputs(inputs){
  let i;
  let exinputs=[];

  for(i=0;i<inputs.length;i++){
    if(inputs[i].match('-')){
      let num=inputs[i].substring(11);
      while(num>0){
        exinputs.push(inputs[i].substring(0,10));
        num--;
      }
    }
    else{
      exinputs.push(inputs[i]);
    }
  }

  return exinputs;
}
