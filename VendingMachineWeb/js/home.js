$(document).ready(function(){

  showColors();
  loadItems();

  $('#dollar-button').click(function (event){

  	var dollar = 1; 
  	var moneyAlreadyIn = $('#priceEntered').val();
  	var updatedMoneyField = dollar + parseFloat(moneyAlreadyIn);

  	$('#priceEntered').val(updatedMoneyField.toFixed(2));

  });

   $('#quarter-button').click(function (event){

  	var quarter = .25; 
  	var moneyAlreadyIn = $('#priceEntered').val();
  	var updatedMoneyField = quarter + parseFloat(moneyAlreadyIn);

  	$('#priceEntered').val(updatedMoneyField.toFixed(2));

  });

   $('#dime-button').click(function (event){

  	var dime = .10; 
  	var moneyAlreadyIn = $('#priceEntered').val();
  	var updatedMoneyField = dime + parseFloat(moneyAlreadyIn);

  	$('#priceEntered').val(updatedMoneyField.toFixed(2));

  });

   $('#nickel-button').click(function (event){

  	var nickel = .05; 
  	var moneyAlreadyIn = $('#priceEntered').val();
  	var updatedMoneyField = nickel + parseFloat(moneyAlreadyIn);

  	$('#priceEntered').val(updatedMoneyField.toFixed(2));

  });

  $('#makePurchase').click(function(event){

  	clearChange();

  	var amount = $('#priceEntered').val();
  	var id = $('#itemName').val();

	$.ajax({
		type: 'GET',
		url: 'http://localhost:8080/money/' + amount + '/item/'+ id,
		success: function(data, status){
		clearItems();	
			$.each(data, function(index, monies){
				var message = $('#messageChange').val();
				message = message +index + ": " + monies + " ";

				$('#messageChange').val(message);

				$('#messages').val("THANK YOU!!");

			});
		loadItems();	

		var newAmount = 0;
		$('#priceEntered').val(newAmount.toFixed(2));
			
		},

		error: function(data, status, xhr) {

            $('#messages').val(data.responseJSON.message);
           
        }
  	})

});

  $('#change-button').click(function(event){

  	clearChange();

  	var currentCash = $('#priceEntered').val();

  	if (currentCash> 0){

  	var quarter = .25;
  	var dime = .1;
  	var nickel = .05
  	var dollar = 1;


  	var dollarsReturned = Math.floor(currentCash / dollar);
  	var afterReturned = currentCash % dollar;
  	var changeRemainAfterDollars = afterReturned.toFixed(2);

  	var quartersReturned = Math.floor(changeRemainAfterDollars / quarter);
  	var afterQuartersReturned = changeRemainAfterDollars % quarter; 
  	var changeRemainAfterQuarters = afterQuartersReturned.toFixed(2);

  	var dimesReturned = Math.floor(changeRemainAfterQuarters / dime);
  	var afterDimesReturned = changeRemainAfterQuarters % dime;
  	var changeRemainAfterDimes = afterDimesReturned.toFixed(2);

  	var nickelsReturned = Math.floor(changeRemainAfterDimes / nickel);
  	var afterNickelsReturned = changeRemainAfterDimes / nickel;

  	$('#messageChange').val("Dollars: " + dollarsReturned + " Quarters: " + quartersReturned + 
  		" Dimes: " + dimesReturned + " Nickels: " + nickelsReturned);

  	var newAmount = 0;
	  $('#priceEntered').val(newAmount.toFixed(2));
  	$('#messages').val("");
  	$('#itemName').val("");

  } else {
  		$('#messages').val("");
  		$('#itemName').val("");
    }
  });
});  


function loadItems(){

	$.ajax({
		type: 'GET',
		url: 'http://localhost:8080/items/',
		success: function(data, status){
			$.each(data, function(index, item){
				var name = item.name;
				var price = item.price;
				var priceFix = price.toFixed(2);
				var quantity = item.quantity;
				var id = item.id;

			 var box = '<div class="box" onclick="selectItemNumber('+ id +')">';
			
             box += '<p style= "text-align: left">' + id + '</p>';
             box += '<p>' + name + '</p>';
             box += '<p>' + "$" + priceFix + '</p>';
           	 box += '<p>' + "Quantity left: " + quantity + '</p>';
            
             box +='</div>';

			$("#whereItemsGo").append(box);
          

			});
		},

   		error: function() {
            $('#errorMessages')
                .append($('<li>')
                .attr({class: 'list-group-item list-group-item-danger'})
                .text('Error calling web service.  Please try again later.'));
        }

	});

}


function clearItems(){
	$("#whereItemsGo").empty();
}

function clearChange(){
	$("#messageChange").val("");
}

function selectItemNumber(id){
	$('#itemName').val(id); 
}

function showColors(){

$('.box').hover(function(){
    $(this).toggleClass('turqoise');
  });
}

