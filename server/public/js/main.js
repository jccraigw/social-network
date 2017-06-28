//when the submit button is clicked
$('#join').on('click', function(){

	//grab the values in the input field
	//right now only grabing what is relevant to user model...might modify later
	var name = $('#name').val();
	var email = $('#email').val();
	var password = $('#password').val();
	var title = $('#title').val();
	var location = $('#location').val();
	var image = $('#img').val();
	var venue_1 = $('#venue_1').val();
	var venue_2 = $('#venue_2').val();
	var venue_3 = $('#venue_3').val();
	var bool_blank = false;
	var array_blank = [];

	//build object with the corresponding keys
	var newUser = {name: name,
					email: email,
					password: password,
					title: title,
					location: location,
					image: image,
					venues: [ venue_1, venue_2, venue_3],
					friends: array_blank,
					logged: bool_blank,
					going: bool_blank};

	//take the object and post it to the user collection
	$.ajax({

		method: "POST",
		url: "http://localhost:3000/join",
		data: newUser,
		success: function(response){

			//find out how to redirect
			window.location.href = "http://localhost:3000/";
		}


	});


});

  $('#status').on('click', function(){

  		var status = false;
  		if ($('#status').is(":checked"))
			{
  				console.log("on")
  				status = true;
		}else{

			console.log('off');
			status = false;
		}

		console.log(status)

		$.ajax({
			
		method: "PATCH",
		url: window.location.pathname,
		data: status,
		success: function(response){

			//find out how to redirect
			//window.location.reload();
		}


	});

  })
