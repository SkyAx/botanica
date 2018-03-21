
function LoginController(){
	// bind event listeners to button clicks //

	$('#login #forgot-password').on('click', function(e){
		e.preventDefault();
		$('#get-credentials').modal('show');
		$('#email-tf').focus();
		$('#get-credentials-form').clearForm();
	});

	$('#retrieve-password-submit').on('click', function(){
		$('#get-credentials-form').submit();
	});

	$('#retrieve-password-cancel').on('click', function(e){
		$('#get-credentials').modal('hide');
		$('#get-credentials-form').resetForm();
		$('#get-credentials .form-error').hide();
		$('#user-tf').focus();
		return false;
	});

	$('#login .rememember-me').checkbox();

	$('.modal-alert #ok').on('click', function() {
		$('.modal-alert').modal('hide');
	});
}
