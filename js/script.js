
function renderCart() {
    var totalAmount = 0;
    var totalQty = 0;
    cartitem = '<table cellpadding=0 cellspacing=0>';
    cartitem += "<thead><tr><th style=\"width:80%;\">Item</th> <th>Qty</th> <th>price</th><th>Amount</th><th>&nbsp;</th></tr></thead>";
    for (var i = 0; i < cart.length; i++) {
        totalAmount += cart[i].amount;    
        totalQty += cart[i].quantity;

        cartitem += "<tr>";
        cartitem += "<td>"+cart[i].product_name+"</td>";
        cartitem += "<td>"+cart[i].quantity+"</td>";
        cartitem += "<td>"+cart[i].product_price+"</td>";
        cartitem += "<th>"+cart[i].amount+"</th>";
        //cartitem += "<td><button class=\"remove-cart\">CLASS</button></td>";

         cartitem += '<td><button class="remove-cart btn-danger" type="button" onclick = "removeCartItem('+cart[i].product_id+')" data-id="'+cart[i].product_id+'" ><i class="glyphicon glyphicon-trash"></i></button></td>';
         cartitem += "</tr>";
    }
    cartitem += '<tr class="tb-footer"><th>Total</th> <th>'+totalQty+'</th><th></th> <th>'+totalAmount+'</th> <th></th></tr>';
    cartitem += "</table>";
    $("#cartListHolder").html(cartitem);
}

function addToCart(product_id){
    var index = getIndexOf(product_list,product_id,'product_id');
    product_list[index].amount = parseInt(product_list[index].product_price);
    product_list[index].quantity = 1;
    // console.log(product_list);
    cart.push(product_list[index]);
    renderCart();
}


//get index of array of objects
function getIndexOf(arr, val, prop) {
    var l = arr.length,k;
    for (k = 0; k < l; k = k + 1) {
        if (arr[k][prop] === val) {
            return k;
        }
    }
    return false;
} 


//add to cart event listner
$(function() {

    $('.add-cart').on('click',function(){
        addToCart($(this).attr('data-id'));
    });
});



//submitting cart listner
$(function() {
    $('.submit-cart').on('click',function(){
        submitCart($(this).attr('data-id'));    
    });
});

//function to submit data to api
function submitCart(){

    //Create new connection
    var submitcartapi = new XMLHttpRequest();
    submitcartapi.open('POST','./API/submit_cart.php',true);
    submitcartapi.setRequestHeader('Content-type','application/x-www-form-urlencoded');

    // On result of API call
    submitcartapi.onload = function(){
        alert("Cart Items Sent as POST data, check response in log");
        console.log("Submitted JSON:"+JSON.stringify(this.responseText));
    }

    //Set post values
    values = JSON.stringify(cart);
    //Call the API
    submitcartapi.send(values);
    alert("Thank you!!");
    
}



//remove from cart event listner
$(function() {

    // console.log("remove ready");
    $('.remove-cart').on('click',function(){
       // console.log("removed from cart");
        removeCartItem($(this).attr('data-id'));    
    });
});

//Function to remove items from cart
function removeCartItem(product_id){
   
    var index = getIndexOf(cart,product_id,'product_id');
    for(var i=0;i<cart.length;i++){
        var jsonCartArray = JSON.stringify(cart[i]);
        var splitJSON = JSON.parse(jsonCartArray); 
        if(splitJSON.product_id==product_id){
            index = i;
        }
    }
    console.log("index to remove"+index)
    cart.splice(index,1);//XMLDocumentx 
    renderCart();
}