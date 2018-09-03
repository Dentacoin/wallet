var basic = {
    options: {
        alert: null
    },
    init: function(opt) {
        basic.options = $.extend({
            alert: function(message){
                basic.showAlert(message);
            }
        }, opt);
    },
    cookies: {
        set: function(name, value) {
            if(name == undefined){
                name = "cookieLaw";
            }
            if(value == undefined){
                value = 1;
            }
            var d = new Date();
            d.setTime(d.getTime() + (10*24*60*60*1000));
            var expires = "expires="+d.toUTCString();
            document.cookie = name + "=" + value + "; " + expires + ";path=/";
            if(name == "cookieLaw"){
                $(".cookies_popup").slideUp();
            }
        },
        erase: function(name) {
            document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        },
        get: function(name) {

            if(name == undefined){
                var name = "cookieLaw";
            }
            name = name + "=";
            var ca = document.cookie.split(';');
            for(var i=0; i<ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1);
                if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
            }

            return "";
        }
    },
    fixPlaceholders: function() {
        $("input[data-placeholder]").each(function(){
            if($(this).data("placeholders-fixed") == undefined){
                $(this).data("placeholders-fixed", true);

                basic.setInputsPlaceholder($(this));

                $focus_function = "if($(this).val()=='" + $(this).data("placeholder") + "'){ $(this).val(''); }";
                if ($(this).attr("onkeydown") != undefined) {
                    $focus_function = $(this).attr("onkeydown") + "; " + $focus_function;
                }
                $(this).attr("onkeydown", $focus_function);

                $blur_function = "if($(this).val()==''){ $(this).val('" + $(this).data("placeholder") + "'); }";
                if ($(this).attr("onblur") != undefined) {
                    $blur_function = $(this).attr("onblur") + "; " + $blur_function;
                }
                $(this).attr("onblur", $blur_function);
            }
        });
    },
    clearPlaceholders: function(extra_filter) {
        if(extra_filter == undefined){
            extra_filter = "";
        }
        $("input[data-placeholder]" + extra_filter).each(function(){
            if($(this).val() == $(this).data("placeholder")){
                $(this).val('');
            }
        })
    },
    setPlaceholders: function(){
        $("input[data-placeholder]").each(function(){
            basic.setInputsPlaceholder($(this));
        });
    },
    setInputsPlaceholder: function(input){
        if($(input).val()==""){
            $(input).val($(input).data("placeholder"));
        }
    },
    fixBodyModal: function() {
        if($(".modal-dialog").length>0 && !$("body").hasClass('modal-open')){
            $("body").addClass('modal-open');
        }
    },
    fixZIndexBackdrop: function() {
        if(jQuery('.bootbox').length > 1) {
            var last_z = jQuery('.bootbox').eq(jQuery('.bootbox').length - 2).css("z-index");
            jQuery('.bootbox').last().css({'z-index': last_z+2}).next('.modal-backdrop').css({'z-index': last_z+1});
        }
    },
    showAlert: function(message, class_name) {
        basic.realShowDialog(message, "alert", class_name);
    },
    showConfirm: function(message, class_name, params) {
        basic.realShowDialog(message, "confirm", class_name, params);
    },
    showDialog: function(message, class_name, type) {
        if(type === undefined){
            type = null;
        }
        basic.realShowDialog(message, "dialog", class_name, null, type);
    },
    realShowDialog: function(message, dialog_type, class_name, params, type) {
        if(class_name === undefined){
            class_name = "";
        }
        if(type === undefined){
            type = null;
        }

        var atrs = {
            "message": message,
            "animate": false,
            "show": false,
            "className": class_name
        };

        if(dialog_type == "confirm" && params!=undefined && params.buttons == undefined){
            atrs.buttons = {
                confirm: {
                    label: 'Ð”Ð°',
                    className: 'btn-success'
                },
                cancel: {
                    label: 'ÐÐµ',
                    className: 'btn-danger'
                }
            }
        }
        if(params != undefined){
            for (var key in params) {
                atrs[key] = params[key];
            }
        }

        var dialog = eval("bootbox." + dialog_type)(atrs);
        dialog.on('hidden.bs.modal', function(){
            basic.fixBodyModal();
            if(type != null)    {
                $('.single-application figure[data-slug="'+type+'"]').parent().focus();
            }
        });
        dialog.on('shown.bs.modal', function(){
            basic.fixZIndexBackdrop();
        });
        dialog.modal('show');
    },
    closeDialog: function (){
        bootbox.hideAll();
    },
    request: {
        initialize: false,
        result: null,
        submit: function (url, data, options, callback, curtain) {
            options = $.extend({
                type: 'POST',
                dataType: 'json',
                async: true
            }, options);
            if (basic.request.initialize && options.async == false) {
                console.log(['Please wait for parent request']);
            }
            else {
                basic.request.initialize = true;
                return $.ajax({
                    url: url,
                    data: data,
                    type: options.type,
                    dataType: options.dataType,
                    async: options.async,
                    beforeSend: function() {
                        if (curtain !== null) {
                            basic.addCurtain();
                        }
                    },
                    success: function (response) {
                        basic.request.result = response;
                        if (curtain !== null) {
                            basic.removeCurtain();
                        }
                        basic.request.initialize = false;
                        if (typeof callback === 'function') {
                            callback(response);
                        }
                    },
                    error: function(){
                        basic.request.initialize = false;
                    }
                });
            }
        },
        validate: function(form, callback, data){
            //if data is passed skip clearing all placeholders and removing messages. it's done inside the calling function
            if(data == undefined) {
                basic.clearPlaceholders();
                $(".input-error-message").remove();
                data = form.serialize();
            }
            return basic.request.submit(SITE_URL+"validate/", data, {async: false}, function(res){
                if (typeof callback === 'function') {
                    callback();
                }
            },  null);
        },
        markValidationErrors: function(validation_result, form){
            basic.setPlaceholders();
            if (typeof validation_result.all_errors == "undefined") {
                if (typeof validation_result.message != "undefined") {
                    basic.showAlert(validation_result.message);
                    return true;
                }
            } else {
                var all_errors = JSON.parse(validation_result.all_errors);
                for (var param_name in all_errors) {
                    //if there is error, but no name for it, pop it in alert
                    if(Object.keys(all_errors).length == 1 && $('[name="'+param_name+'"]').length == 0) {
                        basic.showAlert(all_errors[param_name]);
                        return false;
                    }

                    if(form == undefined){
                        var input = $('[name="'+param_name+'"]');
                    }else{
                        var input = form.find('[name="'+param_name+'"]');
                    }
                    basic.request.removeValidationErrors(input);
                    if (input.closest('.input-error-message-holder')) {
                        input.closest('.input-error-message-holder').append('<div class="input-error-message">'+all_errors[param_name]+'</div>');
                    } else {
                        input.after('<div class="input-error-message">'+all_errors[param_name]+'</div>');
                    }
                    //basic.setInputsPlaceholder(input);
                }
            }
        },
        removeValidationErrors: function(input){
            input.closest('.input-error-message-holder').find(".input-error-message").remove();
            input.parent().remove(".input-error-message");
        }
    },
    alert: function(message) {
        basic.options.alert(message);
    },
    addCurtain: function(){
        $("body").prepend('<div class="curtain"></div>');
    },
    removeCurtain: function(){
        $("body .curtain").remove();
    },
    validateEmail: function(email)   {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    },
    isInViewport: function(el) {
        var elementTop = $(el).offset().top;
        var elementBottom = elementTop + $(el).outerHeight();
        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();
        return elementBottom > viewportTop && elementTop < viewportBottom;
    }
};