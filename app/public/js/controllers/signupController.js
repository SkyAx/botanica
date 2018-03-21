
function SignupController(){
	// redirect to homepage when cancel button is clicked //
	$('#account-form-btn1').on('click', function(){
		window.location.href = '/';
	});

	// redirect to homepage on new account creation, add short delay so user can read alert window //
	$('.modal-alert #ok').on('click', function(){
		setTimeout(function(){
			window.location.href = '/';
		}, 300);
	});

	$('.modal-form-errors #ok').on('click', function(){
		$('.modal-form-errors').modal('hide');
	});
}
