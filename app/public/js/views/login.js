$(document).ready(function(){

	var lv = new LoginValidator();
	var lc = new LoginController();
	var ev = new EmailValidator();

	//Главная форма входа//

	$('#form-login').ajaxForm({
		beforeSubmit : function(formData, jqForm, options){
			if (lv.validateForm() == false){
				return false;
			}else{
			// Добавление функции "Запомнить меня" через cookie //
				formData.push({
					name : 'remember-me',
					value : $('#login .rememember-me').hasClass('checked')
				});
				return true;
			}
		},
		success	: function(responseText, status, xhr, $form){
			if (status == 'success') window.location.href = '/home';
		},
		error : function(e){
			lv.showLoginError('Ошибка авторизации', 'Пожалуйста, проверьте логин или пароль');
		}
	});
	$('#user-tf').focus();

	// Форма восстановления пароля //

	$('#get-credentials-form').ajaxForm({
		url: '/lost-password',
		beforeSubmit : function(formData, jqForm, options){
			if (ev.validateEmail($('#email-tf').val())){
				ev.hideEmailAlert();
				return true;
			}	else{
				ev.showEmailAlert({
					errorHeader : "Ошибка!",
					errorMessage: "Пожалуйста, введите корректный email."
				});
				return false;
			}
		},
		success	: function(responseText, status, xhr, $form){
			$('#retrieve-password-submit').hide();
			ev.showEmailSuccess({
				successHeader : "Получилось!",
				successMessage : "На ваш email было отправлено письмо для восстановления."
			});
		},
		error : function(e){
			if (e.responseText == 'email-not-found'){
				ev.showEmailAlert({
					errorHeader : "Ошибка!",
					errorMessage : "Email не найден. Вы уверены что вводите правильный адрес?"
				});
			}	else{
				ev.showEmailAlert({
					errorHeader : "Ошибка!",
					errorMessage : "Повторите попытку позже."
				});
			}
		}
	});
});
