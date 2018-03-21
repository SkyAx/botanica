
function EmailValidator(){
	// bind this to _local for anonymous functions //
	var _local = this;

	// modal window to allow users to request credentials by email //
	_local.retrievePassword = $('#get-credentials');
	_local.retrievePasswordAlert = $('#get-credentials .form-error');
	_local.retrievePasswordAlertHeader = $('#get-credentials .form-error .error-header');
	_local.retrievePasswordAlertMessage = $('#get-credentials .form-error .error-message');
}

EmailValidator.prototype.validateEmail = function(e){
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(e);
}

EmailValidator.prototype.showEmailAlert = function(error){
	this.retrievePasswordAlert.attr('class', 'form-error ui error message');
	this.retrievePasswordAlertHeader.html(error.errorHeader);
	this.retrievePasswordAlertMessage.html(error.errorMessage);
	this.retrievePasswordAlert.fadeIn(300);
}

EmailValidator.prototype.hideEmailAlert = function(){
	this.retrievePasswordAlert.hide();
}

EmailValidator.prototype.showEmailSuccess = function(success){
	this.retrievePasswordAlert.attr('class', 'form-error ui success message');
	this.retrievePasswordAlertHeader.html(success.successHeader);
	this.retrievePasswordAlertMessage.html(success.successMessage);
	this.retrievePasswordAlert.fadeIn(300);
}
