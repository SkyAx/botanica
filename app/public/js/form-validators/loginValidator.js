function LoginValidator(){
// bind a simple alert window to this controller to display any errors //
	this.loginErrors = $('.modal-alert');

	this.showLoginError = function(error){
		$('.modal-alert .modal-header h4').text(error.errorHeader);
		$('.modal-alert .modal-body').html(error.errorMessage);
		this.loginErrors.modal('show');
	}
}

LoginValidator.prototype.validateForm = function(){
	if ($('#user-tf').val() == ''){
		this.showLoginError({
			errorHeader : 'Ошибка!',
			errorMessage : 'Пожалуйста, введите имя пользователя.'
		});
		return false;
	} else if ($('#pass-tf').val() == ''){
		this.showLoginError({
			errorHeader : 'Ошибка!',
			errorMessage : 'Пожалуйста, введите пароль.'
		});
		return false;
	} else if ($('#id-tf').val() == ''){
		this.showLoginError({
			errorHeader : 'Ошибка!',
			errorMessage : 'Пожалуйста, введите ID устройства.'
		});
	}else{
		return true;
	}
}
