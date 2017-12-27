var cart = [];
product_list = [];

function get_products(){

    //Create new connection
    var productlist = new XMLHttpRequest();
    productlist.open('GET','./API/get_products.php',true);
    productlist.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    // On result of API call
    productlist.onload = function(){
        var result = (this.responseText != 502)?JSON.parse(this.responseText):[];
        setproducts(result);
  }

  productlist.send();

}




function setproducts(products){
    var content = '';

    if(products && products.length) {//hard refresh krte he
      product_list = products;
      for (var i = 0; i < products.length; i++){
        content +=
     '<div class="col-sm-6 col-md-4">'+   
        '<div class="thumbnail" style="width:1;">'+
          '<img src="'+products[i].product_image_path+'" alt="" class="card-img-top">'+
          '<div class="caption">'+
            '<h4 class="text-center">'+products[i].product_name+'</h4>'+
            '<h3 class="text-center">₹'+products[i].product_price+'</h3>'+
            '<button class="btn btn-primary btn-block add-cart" type="button" name="button" data-id="'+products[i].product_id+'">Add to Cart</button>'+
          '</div>'+
        '</div>'+
      '</div>'; 
      }
    } else {
      //error
      console.log("no data");
    }    
  // Set the elements in the productListHolder
  productListHolder.innerHTML += content;
}
