
$(document).ready(function(){

	var av = new AccountValidator();
	var sc = new SignupController();

	$('#account-form').ajaxForm({
		beforeSubmit : function(formData, jqForm, options){
			return av.validateForm();
		},
		success	: function(responseText, status, xhr, $form){
			if (status == 'success') $('.modal-alert').modal('show');
		},
		error : function(e){
			if (e.responseText == 'email-taken'){
			    av.showInvalidEmail();
			}	else if (e.responseText == 'username-taken'){
			    av.showInvalidUserName();
			}
		}
	});
	$('#name-tf').focus();

	// setup the alert that displays when an account is successfully created //
	$('.modal-alert .modal-header h4').text('Регистрация завершена!');
	$('.modal-alert .modal-body p').html('Нажмите "Продолжить" для возврата на старницу входа.');

});
