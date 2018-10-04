import _regeneratorRuntime from "babel-runtime/regenerator";

var onAccountSwitch = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        if (typeof global_state.account != 'undefined') {
                            if (global_state.account != web3.eth.defaultAccount) {
                                //doing this check because metamask fire the change event randomly, this way we detect real account switch
                                //global_state.account = web3.eth.defaultAccount;

                                //$('.values-and-qr-code .animation').addClass('rotate-animation');
                                //App.updateBalance(true);

                                //build transactions history from previous events on the blockchain
                                //App.buildTransactionsHistory();
                                window.location.reload();
                            }
                        } else {
                            if ($('.homepage-container').length > 0) {
                                $('.homepage-container .address span').html($('.homepage-container .address span').attr('data-log-metamask'));
                                $('.homepage-container .address .copy-address').hide();
                            }
                        }

                    case 1:
                    case "end":
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));

    return function onAccountSwitch() {
        return _ref3.apply(this, arguments);
    };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var basic = {
    options: {
        alert: null
    },
    init: function init(opt) {
        basic.addCsrfTokenToAllAjax();
        //basic.stopMaliciousInspect();
    },
    cookies: {
        set: function set(name, value) {
            if (name == undefined) {
                name = "cookieLaw";
            }
            if (value == undefined) {
                value = 1;
            }
            var d = new Date();
            d.setTime(d.getTime() + 10 * 24 * 60 * 60 * 1000);
            var expires = "expires=" + d.toUTCString();
            document.cookie = name + "=" + value + "; " + expires + ";path=/";
            if (name == "cookieLaw") {
                $(".cookies_popup").slideUp();
            }
        },
        erase: function erase(name) {
            document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        },
        get: function get(name) {

            if (name == undefined) {
                var name = "cookieLaw";
            }
            name = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
            }

            return "";
        }
    },
    fixPlaceholders: function fixPlaceholders() {
        $("input[data-placeholder]").each(function () {
            if ($(this).data("placeholders-fixed") == undefined) {
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
    clearPlaceholders: function clearPlaceholders(extra_filter) {
        if (extra_filter == undefined) {
            extra_filter = "";
        }
        $("input[data-placeholder]" + extra_filter).each(function () {
            if ($(this).val() == $(this).data("placeholder")) {
                $(this).val('');
            }
        });
    },
    setPlaceholders: function setPlaceholders() {
        $("input[data-placeholder]").each(function () {
            basic.setInputsPlaceholder($(this));
        });
    },
    setInputsPlaceholder: function setInputsPlaceholder(input) {
        if ($(input).val() == "") {
            $(input).val($(input).data("placeholder"));
        }
    },
    fixBodyModal: function fixBodyModal() {
        if ($(".modal-dialog").length > 0 && !$("body").hasClass('modal-open')) {
            $("body").addClass('modal-open');
        }
    },
    fixZIndexBackdrop: function fixZIndexBackdrop() {
        if (jQuery('.bootbox').length > 1) {
            var last_z = jQuery('.bootbox').eq(jQuery('.bootbox').length - 2).css("z-index");
            jQuery('.bootbox').last().css({ 'z-index': last_z + 2 }).next('.modal-backdrop').css({ 'z-index': last_z + 1 });
        }
    },
    showAlert: function showAlert(message, class_name, vertical_center) {
        basic.realShowDialog(message, "alert", class_name, null, null, vertical_center);
    },
    showConfirm: function showConfirm(message, class_name, params, vertical_center) {
        basic.realShowDialog(message, "confirm", class_name, params, null, vertical_center);
    },
    showDialog: function showDialog(message, class_name, type) {
        if (type === undefined) {
            type = null;
        }
        basic.realShowDialog(message, "dialog", class_name, null, type);
    },
    realShowDialog: function realShowDialog(message, dialog_type, class_name, params, type, vertical_center) {
        if (class_name === undefined) {
            class_name = "";
        }
        if (type === undefined) {
            type = null;
        }
        if (vertical_center === undefined) {
            vertical_center = null;
        }

        var atrs = {
            "message": message,
            "animate": false,
            "show": false,
            "className": class_name
        };

        if (dialog_type == "confirm" && params != undefined && params.buttons == undefined) {
            atrs.buttons = {
                confirm: {
                    label: 'Yes',
                    className: 'btn-success'
                },
                cancel: {
                    label: 'No',
                    className: 'btn-danger'
                }
            };
        }
        if (params != undefined) {
            for (var key in params) {
                atrs[key] = params[key];
            }
        }

        var dialog = eval("bootbox." + dialog_type)(atrs);
        dialog.on('hidden.bs.modal', function () {
            basic.fixBodyModal();
            if (type != null) {
                $('.single-application figure[data-slug="' + type + '"]').parent().focus();
            }
        });
        dialog.on('shown.bs.modal', function () {
            if (vertical_center != null) {
                basic.verticalAlignModal();
            }
            basic.fixZIndexBackdrop();
        });
        dialog.modal('show');
    },
    verticalAlignModal: function verticalAlignModal(message) {
        $("body .modal-dialog").each(function () {
            $(this).css("margin-top", Math.max(20, ($(window).height() - $(this).height()) / 2));
        });
    },
    closeDialog: function closeDialog() {
        bootbox.hideAll();
    },
    request: {
        initialize: false,
        result: null,
        submit: function submit(url, data, options, callback, curtain) {
            options = $.extend({
                type: 'POST',
                dataType: 'json',
                async: true
            }, options);
            if (basic.request.initialize && options.async == false) {
                console.log(['Please wait for parent request']);
            } else {
                basic.request.initialize = true;
                return $.ajax({
                    url: url,
                    data: data,
                    type: options.type,
                    dataType: options.dataType,
                    async: options.async,
                    beforeSend: function beforeSend() {
                        if (curtain !== null) {
                            basic.addCurtain();
                        }
                    },
                    success: function success(response) {
                        basic.request.result = response;
                        if (curtain !== null) {
                            basic.removeCurtain();
                        }
                        basic.request.initialize = false;
                        if (typeof callback === 'function') {
                            callback(response);
                        }
                    },
                    error: function error() {
                        basic.request.initialize = false;
                    }
                });
            }
        },
        validate: function validate(form, callback, data) {
            //if data is passed skip clearing all placeholders and removing messages. it's done inside the calling function
            if (data == undefined) {
                basic.clearPlaceholders();
                $(".input-error-message").remove();
                data = form.serialize();
            }
            return basic.request.submit(SITE_URL + "validate/", data, { async: false }, function (res) {
                if (typeof callback === 'function') {
                    callback();
                }
            }, null);
        },
        markValidationErrors: function markValidationErrors(validation_result, form) {
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
                    if (Object.keys(all_errors).length == 1 && $('[name="' + param_name + '"]').length == 0) {
                        basic.showAlert(all_errors[param_name]);
                        return false;
                    }

                    if (form == undefined) {
                        var input = $('[name="' + param_name + '"]');
                    } else {
                        var input = form.find('[name="' + param_name + '"]');
                    }
                    basic.request.removeValidationErrors(input);
                    if (input.closest('.input-error-message-holder')) {
                        input.closest('.input-error-message-holder').append('<div class="input-error-message">' + all_errors[param_name] + '</div>');
                    } else {
                        input.after('<div class="input-error-message">' + all_errors[param_name] + '</div>');
                    }
                    //basic.setInputsPlaceholder(input);
                }
            }
        },
        removeValidationErrors: function removeValidationErrors(input) {
            input.closest('.input-error-message-holder').find(".input-error-message").remove();
            input.parent().remove(".input-error-message");
        }
    },
    alert: function alert(message) {
        basic.options.alert(message);
    },
    addCurtain: function addCurtain() {
        $("body").prepend('<div class="curtain"></div>');
    },
    removeCurtain: function removeCurtain() {
        $("body .curtain").remove();
    },
    validateEmail: function validateEmail(email) {
        return (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
        );
    },
    isInViewport: function isInViewport(el) {
        var elementTop = $(el).offset().top;
        var elementBottom = elementTop + $(el).outerHeight();
        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();
        return elementBottom > viewportTop && elementTop < viewportBottom;
    },
    isMobile: function isMobile() {
        var isMobile = false; //initiate as false
        // device detection
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
            isMobile = true;
        }
        return isMobile;
    },
    addCsrfTokenToAllAjax: function addCsrfTokenToAllAjax() {
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
    },
    stopMaliciousInspect: function stopMaliciousInspect() {
        document.addEventListener('contextmenu', function (e) {
            e.preventDefault();
        });

        document.onkeydown = function (e) {
            if (event.keyCode == 123) {
                return false;
            }
            if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
                return false;
            }
            if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
                return false;
            }
            if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
                return false;
            }
            if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
                return false;
            }
        };
    }
};
basic.init();
$(document).ready(function () {
    if ($('body').hasClass('amount-to')) {
        pageAmountToLogic();
    }
    console.log("( ͡° ͜ʖ ͡°) I see you.");
});

$(window).on('beforeunload', function () {});

$(window).on("load", function () {});

$(window).on('resize', function () {});

$(window).on('scroll', function () {});

var meta_mask_installed = false;
var meta_mask_logged = false;
var blocks_for_month_n_half = 263000;
var is_chrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
var is_firefox = !(window.mozInnerScreenX == null);
var is_opera = navigator.userAgent.toLowerCase().indexOf("opr") == -1;
var called_transactions_first_time = false;
function mobileDownloadMetaMaskPopup() {
    var button_html = '<div class="btns-container"><a class="white-aqua-btn" href="https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/" target="_blank">Get from Firefox Addons</a></div>';
    var meta_mask_download_popup_html = '<div class="popup-body"> <div class="title">Are your ready to use Dentacoin Wallet?</div><div class="subtitle">You\'ll need a safe place to store all of your Dentacoin tokens.</div><div class="separator"></div><figure class="image"><img src="/assets/images/metamask.png" alt="Metamask"/> </figure><div class="additional-text">The perfect place is in a secure wallet like MetaMask. This will also act as your login to your wallet (no extra password needed).</div>' + button_html + '</div>';
    basic.showDialog(meta_mask_download_popup_html, 'download-metamask-desktop validation-popup');
}

function mobileLoginMetaMaskPopup() {
    basic.showDialog('<div class="popup-body"> <div class="title">Sign in to MetaMask</div><div class="subtitle">Open up your browser\'s MetaMask extention.</div><div class="separator"></div><figure class="gif"><img src="/assets/images/metamask-animation.gif" alt="Login MetaMask animation"/> </figure></div>', 'login-metamask-desktop validation-popup');
}

function desktopDownloadMetaMaskPopup() {
    var button_html = '';
    /*if(!is_opera)   {
        //link for download opera metamask extention
        button_html = '<div class="btns-container"><a class="white-aqua-btn" href="https://addons.opera.com/en/extensions/details/metamask/" target="_blank">Get from Opera Addons</a></div>';
    }else if(is_chrome)   {
        //link for download chrome metamask extention
        button_html = '<div class="btns-container"><a class="white-aqua-btn" href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn" target="_blank">Get from Chrome Web Store</a></div>';
    }else if(is_firefox)   {
        //link for download firefox metamask extention
        button_html = '<div class="btns-container"><a class="white-aqua-btn" href="https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/" target="_blank">Get from Firefox Addons</a></div>';
    }*/
    button_html = '<div class="btns-container"><a class="white-aqua-btn" href="https://metamask.io/" target="_blank">Get from MetaMask</a></div>';
    var meta_mask_download_popup_html = '<div class="popup-body"> <div class="title">Are your ready to use Dentacoin Wallet?</div><div class="subtitle">You\'ll need a safe place to store all of your Dentacoin tokens.</div><div class="separator"></div><figure class="image"><img src="/assets/images/metamask.png" alt="Metamask"/> </figure><div class="additional-text">The perfect place is in a secure wallet like MetaMask. This will also act as your login to your wallet (no extra password needed).</div>' + button_html + '</div>';
    basic.showDialog(meta_mask_download_popup_html, 'download-metamask-desktop validation-popup');
}

function desktopLoginMetaMaskPopup() {
    basic.showDialog('<div class="popup-body"> <div class="title">Sign in to MetaMask</div><div class="subtitle">Open up your browser\'s MetaMask extention.</div><div class="separator"></div><figure class="gif"><img src="/assets/images/metamask-animation.gif" alt="Login MetaMask animation"/> </figure></div>', 'login-metamask-desktop validation-popup');
}

function initChecker() {
    if (typeof web3 !== 'undefined' && web3.eth.defaultAccount === undefined) {
        setInterval(function () {
            initCheckIfMetaMaskIsLogged();
        }, 500);
    }

    if (typeof web3 !== 'undefined' && web3.currentProvider.isMetaMask === true) {
        meta_mask_installed = true;
        web3.currentProvider.publicConfigStore.on('update', onAccountSwitch);
        if (typeof web3.eth.defaultAccount != 'undefined') {
            meta_mask_logged = true;
        }
    }

    if (basic.isMobile()) {
        if (typeof web3 === 'undefined') {
            //MOBILE
            if (!is_firefox) {
                //popup for download mozilla browser OR trust wallet
                basic.showDialog('<div class="popup-body"> <div class="title">Download Firefox Mobile Browser or Trust Wallet</div><div class="subtitle">You can use Dentacoin Wallet on a Firefox Mobile Browser or Trust Wallet app.</div><div class="separator"></div><figure class="image"><img src="/assets/images/phone.svg" alt="Phone icon"/> </figure> <div class="btns-container"> <figure><a class="app-store" href="https://play.google.com/store/apps/details?id=org.mozilla.firefox" target="_blank"><img src="/assets/images/google-store-button.svg" alt=""/></a></figure><figure><a class="app-store" href="https://itunes.apple.com/us/app/firefox-web-browser/id989804926?mt=8" target="_blank"><img src="/assets/images/apple-store-button.svg" alt=""/></a></figure><figure><a class="white-aqua-btn" href="https://trustwalletapp.com/" target="_blank"><img src="/assets/images/trust-wallet-logo.png" alt=""/> Trust Wallet</a></figure></div></div>', 'download-mobile-browser validation-popup');
            } else {
                if (!meta_mask_installed) {
                    //popup for download metamask
                    mobileDownloadMetaMaskPopup();
                } else if (!meta_mask_logged) {
                    //popup for login in metamask
                    mobileLoginMetaMaskPopup();
                }
            }
        } else {
            if (!meta_mask_installed) {
                //popup for download metamask
                mobileDownloadMetaMaskPopup();
            } else if (!meta_mask_logged) {
                //popup for login in metamask
                mobileLoginMetaMaskPopup();
            }
        }
    } else {
        //DESKTOP
        if (!is_chrome && !is_firefox && is_opera) {
            //IF NOT CHROME OR MOZILLA OR OPERA
            basic.showDialog('<div class="popup-body"> <div class="title">Download Desktop Browser</div><div class="subtitle">You can use Dentacoin Wallet on a desktop browser like Chrome, Firefox Brave or Opera.</div><div class="separator"></div><figure class="image"><img src="/assets/images/computer.svg" alt="Computer icon"/> </figure> <div class="btns-container"> <figure class="inline-block"><a class="white-aqua-btn" href="https://www.google.com/chrome/" target="_blank"><img src="/assets/images/chrome.png" alt=""/> Chrome</a></figure> <figure class="inline-block"><a class="white-aqua-btn" href="https://www.mozilla.org/en-US/firefox/new/" target="_blank"><img src="/assets/images/firefox.png" alt=""/> Firefox</a></figure> <figure class="inline-block"><a class="white-aqua-btn" href="https://www.opera.com/" target="_blank"><img src="/assets/images/opera.png" alt=""/> Opera</a></figure> <figure class="inline-block"><a class="white-aqua-btn" href="https://brave.com/download/" target="_blank"><img src="/assets/images/brave.png" alt=""/> Brave</a></figure> </div></div>', 'download-desktop-browser validation-popup');
        } else {
            if (!meta_mask_installed) {
                //popup for download metamask
                desktopDownloadMetaMaskPopup();
            } else if (!meta_mask_logged) {
                //popup for login in metamask
                desktopLoginMetaMaskPopup();
            }
        }
    }
}

window.addEventListener('load', function () {});

var global_state = {};
var temporally_timestamp = 0;
var send_event = false;
global_state.curr_dcn_in_usd = parseFloat($('body').attr('data-current-dcn-in-usd'));
var App = {
    web3Provider: null,
    contracts: {},
    loading: false,
    init: function init() {
        initChecker();
        return App.initWeb3();
    },
    initWeb3: function initWeb3() {
        // initialize web3
        if (typeof web3 !== 'undefined') {
            //reuse the provider of the Web3 object injected by Metamask
            App.web3Provider = web3.currentProvider;
        } else {
            //create a new provider and plug it directly into our local node
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:9545');
        }
        web3 = new Web3(App.web3Provider);

        return App.initContract();
    },
    initContract: function initContract() {
        $.getJSON('/assets/jsons/DentacoinToken.json', function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(DCNArtifact) {
                return _regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                // get the contract artifact file and use it to instantiate a truffle contract abstraction
                                App.contracts.DentacoinToken = TruffleContract(DCNArtifact);
                                // set the provider for our contracts
                                App.contracts.DentacoinToken.setProvider(App.web3Provider);

                                global_state.account = web3.eth.defaultAccount;

                                //refresh the current dentacoin value
                                if ($('.homepage-container').length > 0) {
                                    App.updateBalance(true);
                                } else {
                                    App.updateBalance();
                                }

                                //save current block number into state
                                _context.next = 6;
                                return App.helper.getBlockNum();

                            case 6:

                                //set Transfer event watcher
                                App.events.logTransfer();

                                App.buildTransactionsHistory();

                                onAccountSwitch();

                            case 9:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            return function (_x) {
                return _ref.apply(this, arguments);
            };
        }());
    },
    updateBalance: function updateBalance(homepage) {
        App.contracts.DentacoinToken.deployed().then(function (instance) {
            return instance.balanceOf.call(global_state.account);
        }).then(function (result) {
            if (homepage === undefined) {
                homepage = null;
            }

            global_state.curr_address_balance = result.toNumber();
            if (homepage != null) {
                setTimeout(function () {
                    initHomepageUserData();
                    $('.values-and-qr-code .animation').removeClass('rotate-animation');
                    $('.homepage-container .dcn-value .value').html(result.toNumber());
                    $('.homepage-container .output .value').html((result.toNumber() * global_state.curr_dcn_in_usd).toFixed(2));
                    $('.homepage-container .values-and-qr-code').show();
                }, 300);
            }
        }).catch(function (err) {
            console.error(err);
        });
    },
    sendValue: function sendValue(send_addr, value) {
        App.contracts.DentacoinToken.deployed().then(function (instance) {
            var transfer = instance.transfer(send_addr, value, {
                from: global_state.account,
                gas: 65000
            }).then(function (result) {
                basic.showAlert('Your transaction is pending. Give it a minute and check for confirmation on <a href="https://etherscan.io/tx/' + result.tx + '">Etherscan</a>.', '', true);
            }).catch(function (err) {
                console.error(err);
            });

            basic.showAlert('Your transaction is about to get mined.', '', true);
            return transfer;
        });
    },
    getFromTransactionsEvents: function getFromTransactionsEvents(from_num, to) {
        if (to === undefined) {
            to = 'latest';
        }
        return new Promise(function (resolve, reject) {
            App.contracts.DentacoinToken.deployed().then(function (instance) {
                global_state.from_transactions = [];
                var event_obj = {
                    fromBlock: global_state.curr_block - from_num,
                    toBlock: to
                };
                if (global_state.curr_block - from_num < 0) {
                    event_obj.fromBlock = 0;
                }
                var from_transfer = instance.Transfer({ _from: global_state.account }, event_obj);
                from_transfer.get(function (error, logs) {
                    if (error !== null) {
                        reject(error);
                    }
                    global_state.from_transactions = logs;
                    resolve(global_state.from_transactions);
                });
            });
        });
    },
    getToTransactionsEvents: function getToTransactionsEvents(from_num, to) {
        if (to === undefined) {
            to = 'latest';
        }
        return new Promise(function (resolve, reject) {
            App.contracts.DentacoinToken.deployed().then(function (instance) {
                global_state.to_transactions = [];
                var event_obj = {
                    fromBlock: global_state.curr_block - from_num,
                    toBlock: to
                };
                if (global_state.curr_block - from_num < 0) {
                    event_obj.fromBlock = 0;
                }
                var to_transfer = instance.Transfer({ _to: global_state.account }, event_obj);
                to_transfer.get(function (error, logs) {
                    if (error !== null) {
                        reject(error);
                    }
                    global_state.to_transactions = logs;
                    resolve(global_state.to_transactions);
                });
            });
        });
    },
    buildTransactionsHistory: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(num) {
            var array, api_clinics, table_html, i, len, date_obj, json_clinic, other_address, class_name, label, dcn_amount, usd_amount, minutes, hours;
            return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            if (num === undefined) {
                                num = 1;
                                called_transactions_first_time = false;
                                $('.transaction-history table tbody.visible-tbody').html('<tr class="loader-animation"> <td class="text-center"> <figure class="inline-block rotate-animation"><a href=""><img src="/assets/images/exchange-icon.png\" alt="Exchange icon"/></a></figure> </td></tr>');
                                $('.transaction-history .show-more-holder').html('');
                            }

                            if (!(num > 1)) {
                                _context2.next = 8;
                                break;
                            }

                            _context2.next = 4;
                            return App.getFromTransactionsEvents(num * blocks_for_month_n_half, global_state.curr_block - blocks_for_month_n_half * (num - 1));

                        case 4:
                            _context2.next = 6;
                            return App.getToTransactionsEvents(num * blocks_for_month_n_half, global_state.curr_block - blocks_for_month_n_half * (num - 1));

                        case 6:
                            _context2.next = 12;
                            break;

                        case 8:
                            _context2.next = 10;
                            return App.getFromTransactionsEvents(num * blocks_for_month_n_half);

                        case 10:
                            _context2.next = 12;
                            return App.getToTransactionsEvents(num * blocks_for_month_n_half);

                        case 12:
                            array = global_state.from_transactions.concat(global_state.to_transactions);

                            if (!(array.length > 0)) {
                                _context2.next = 34;
                                break;
                            }

                            _context2.next = 16;
                            return $.getJSON('/assets/jsons/clinics.json');

                        case 16:
                            api_clinics = _context2.sent;
                            table_html = '';
                            //looping for adding timestamp property for each object in the array

                            i = 0, len = array.length;

                        case 19:
                            if (!(i < len)) {
                                _context2.next = 26;
                                break;
                            }

                            _context2.next = 22;
                            return App.helper.addBlockTimestampToTransaction(array[i]);

                        case 22:
                            array[i].timestamp = _context2.sent;

                        case 23:
                            i += 1;
                            _context2.next = 19;
                            break;

                        case 26:

                            //sorting the array of objects by timestamp property
                            sortByKey(array, 'timestamp');
                            //reversing to get desc order
                            array = array.reverse();

                            //if transactions in the history are more than 3 the rest are hidden so we add show more button and bind show event
                            $('.transaction-history .show-more-holder').html('');

                            //looping to build the transaction history section
                            for (i = 0, len = array.length; i < len; i += 1) {
                                //timestamp*1000 because blockchain return unix timestamp
                                date_obj = new Date(array[i].timestamp * 1000);
                                json_clinic = '';
                                other_address = '';
                                class_name = '';
                                label = '';
                                dcn_amount = '';
                                usd_amount = (array[i].args._value.toNumber() * global_state.curr_dcn_in_usd).toFixed(2);

                                if (array[i].args._to == global_state.account) {
                                    //IF THE CURRENT ACCOUNT IS RECEIVER
                                    other_address = array[i].args._from;
                                    label = 'Received from';
                                    class_name = 'received_from';
                                    dcn_amount = '+' + array[i].args._value.toString() + ' DCN';
                                    if (has(api_clinics.clinics, array[i].args._from)) {
                                        json_clinic = '<a href="javascript:void(0)" class="api-clinic">' + api_clinics.clinics[array[i].args._from].name + '</a>';
                                    }
                                } else if (array[i].args._from == global_state.account) {
                                    //IF THE CURRENT ACCOUNT IS SENDER
                                    other_address = array[i].args._to;
                                    if (has(api_clinics.clinics, array[i].args._to)) {
                                        json_clinic = '<a href="javascript:void(0)" class="api-clinic">' + api_clinics.clinics[array[i].args._to].name + '</a>';
                                        label = 'Payed to';
                                        class_name = 'payed_to';
                                    } else {
                                        label = 'Sent to';
                                        class_name = 'sent_to';
                                    }
                                    dcn_amount = '-' + array[i].args._value.toString() + ' DCN';
                                }

                                if (new Date(array[i].timestamp * 1000).getMinutes() < 10) {
                                    minutes = '0' + new Date(array[i].timestamp * 1000).getMinutes();
                                } else {
                                    minutes = new Date(array[i].timestamp * 1000).getMinutes();
                                }

                                if (new Date(array[i].timestamp * 1000).getHours() < 10) {
                                    hours = '0' + new Date(array[i].timestamp * 1000).getHours();
                                } else {
                                    hours = new Date(array[i].timestamp * 1000).getHours();
                                }

                                //first 3 are visible, rest are going to hidden tbody
                                table_html += '<tr class="' + class_name + ' single-transaction"><td class="align-middle icon"></td><td class="align-middle"><ul class="align-middle"><li>' + (date_obj.getUTCMonth() + 1) + '/' + date_obj.getUTCDate() + '/' + date_obj.getUTCFullYear() + '</li><li>' + hours + ':' + minutes + '</li></ul></td><td class="align-middle"><ul class="align-middle"><li><span><strong>' + label + ': </strong>' + json_clinic + ' (' + other_address + ')</span></li><li><a href="https://etherscan.io/tx/' + array[i].transactionHash + '" target="_blank"><strong class="transaction-id">Transaction ID</strong></a></li></ul></td><td class="align-middle"><ul class="align-middle"><li class="value-dcn">' + dcn_amount + '</li><li>' + usd_amount + ' USD</li></ul></td></tr>';
                            }
                            $('.transaction-history table tbody .loader-animation').hide();

                            if (!$('.transaction-history table').hasClass('full-width-responsive')) {
                                $('.transaction-history table').addClass('full-width-responsive');
                            }

                            if (!called_transactions_first_time) {
                                called_transactions_first_time = true;
                                $('.transaction-history table tbody.visible-tbody').html(table_html);
                            } else {
                                $('.transaction-history table tbody.visible-tbody').append(table_html);
                            }

                            //checking if current transactions are more then 3 and then display the show more button
                            if ($('.transaction-history table tbody tr').length > 3) {
                                $('.transaction-history .show-more-holder').html('<div class="col text-center"><a href="javascript:void(0)" ><strong>Show more</strong></a></div>');
                                $('.transaction-history .show-more-holder a').click(function () {
                                    $(this).closest('.show-more-holder').html('');
                                    $('.transaction-history table tbody tr').addClass('display_row');
                                });
                            }

                        case 34:
                            _context2.next = 36;
                            return App.helper.getLoopingTransactionFromBlockTimestamp(global_state.curr_block - num * blocks_for_month_n_half);

                        case 36:
                            _context2.t0 = _context2.sent;
                            _context2.t1 = new Date('2017.01.01').getTime() / 1000;

                            if (!(_context2.t0 > _context2.t1)) {
                                _context2.next = 42;
                                break;
                            }

                            App.buildTransactionsHistory(num += 1);
                            _context2.next = 43;
                            break;

                        case 42:
                            if ($('.transaction-history table tbody tr.single-transaction').length == 0) {
                                $('.transaction-history table tbody.visible-tbody').html('<tr><td class="text-center">No previous transactions found.</td></tr>');
                            }

                        case 43:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, this);
        }));

        function buildTransactionsHistory(_x2) {
            return _ref2.apply(this, arguments);
        }

        return buildTransactionsHistory;
    }(),
    events: {
        logTransfer: function logTransfer() {
            var transactions_hash_arr = [];
            App.contracts.DentacoinToken.deployed().then(function (instance) {
                instance.Transfer({}, { fromBlock: global_state.curr_block, toBlock: 'latest' }).watch(function (error, result) {
                    if (!error) {
                        if (!isInArray(result.transactionHash, transactions_hash_arr) && $('body').hasClass('amount-to')) {
                            transactions_hash_arr.push(result.transactionHash);
                            basic.closeDialog();
                            basic.showAlert('Your transaction was confirmed. Check here  <a href="https://etherscan.io/tx/' + result.transactionHash + '">Etherscan</a>', '', true);
                            $('.amount-to-container input#dcn').val('');
                            $('.amount-to-container input#usd').val('');
                        }
                    } else {
                        console.log(error);
                    }
                });
            });
        }
    },
    helper: {
        addBlockTimestampToTransaction: function addBlockTimestampToTransaction(transaction) {
            return new Promise(function (resolve, reject) {
                web3.eth.getBlock(transaction.blockNumber, function (error, result) {
                    if (error !== null) {
                        reject(error);
                    }
                    temporally_timestamp = result.timestamp;
                    resolve(temporally_timestamp);
                });
            });
        },
        getLoopingTransactionFromBlockTimestamp: function getLoopingTransactionFromBlockTimestamp(block_num) {
            return new Promise(function (resolve, reject) {
                web3.eth.getBlock(block_num, function (error, result) {
                    if (error !== null) {
                        reject(error);
                    }
                    resolve(result.timestamp);
                });
            });
        },
        getBlockNum: function getBlockNum() {
            return new Promise(function (resolve, reject) {
                web3.eth.getBlockNumber(function (error, result) {
                    if (!error) {
                        global_state.curr_block = result;
                        resolve(global_state.curr_block);
                    }
                });
            });
        }
    }
};
App.init();

function getQrCode() {
    if (global_state.account != undefined) {
        $.ajax({
            type: 'POST',
            url: HOME_URL + '/get-qr-code-from-address',
            data: {
                'address': global_state.account
            },
            dataType: 'json',
            success: function success(response) {
                if (response.success) {
                    $('.homepage-container .values-and-qr-code .qr-code img').attr('src', response.success);
                }
            }
        });
    }
}

//PAGES
if ($('body').hasClass('home')) {
    $('.homepage-container .copy-address').click(function () {
        var this_el = $(this);
        var str_to_copy = $('.homepage-container .address span');
        if (str_to_copy.data('valid-address')) {
            var $temp = $("<input>");
            $("body").append($temp);
            $temp.val(str_to_copy.html()).select();
            document.execCommand("copy");
            $temp.remove();

            this_el.tooltip('show');
            setTimeout(function () {
                this_el.tooltip('hide');
            }, 1000);
        }
    });

    $('.homepage-container .copy-address').tooltip({
        trigger: 'click'
    });
} else if ($('body').hasClass('send')) {
    //on input and if valid address add active class to 'next' button for UI
    $('.send-container .wallet-address input').on('input', function () {
        if (!meta_mask_installed || !meta_mask_logged) {
            $(this).val('');
            if (basic.isMobile()) {
                if (!meta_mask_installed) {
                    mobileDownloadMetaMaskPopup();
                } else if (!meta_mask_logged) {
                    mobileLoginMetaMaskPopup();
                }
            } else {
                if (!meta_mask_installed) {
                    desktopDownloadMetaMaskPopup();
                } else if (!meta_mask_logged) {
                    desktopLoginMetaMaskPopup();
                }
            }
        } else {
            if (innerAddressCheck($(this).val().trim())) {
                $('.send-container .next a').addClass('active');
            } else if ($('.send-container .next a').hasClass('active')) {
                $('.send-container .next a').removeClass('active');
            }
        }
    });

    $('.send-container .next a').click(function () {
        if (!meta_mask_installed || !meta_mask_logged) {
            if (basic.isMobile()) {
                if (!meta_mask_installed) {
                    mobileDownloadMetaMaskPopup();
                } else if (!meta_mask_logged) {
                    mobileLoginMetaMaskPopup();
                }
            } else {
                if (!meta_mask_installed) {
                    desktopDownloadMetaMaskPopup();
                } else if (!meta_mask_logged) {
                    desktopLoginMetaMaskPopup();
                }
            }
        } else {
            if (innerAddressCheck($('.send-container .wallet-address input').val().trim())) {
                window.location = HOME_URL + '/send/amount-to/' + $('.send-container .wallet-address input').val().trim();
            } else {
                basic.showAlert('Please enter valid address.', '', true);
            }
        }
    });
}

function pageAmountToLogic() {
    var curr_addr = window.location.href.split('/')[window.location.href.split('/').length - 1];
    //redirect to /send if the address it not valid or using the same address as the owner
    if (typeof web3.eth.defaultAccount == 'undefined' || typeof web3 == 'undefined' && web3.currentProvider.isMetaMask !== true || !web3.isAddress(curr_addr) || curr_addr == global_state.account) {
        window.location = HOME_URL + '/send';
    }

    //editing the address logic
    $('.amount-to-container .edit-address').click(function () {
        if (!meta_mask_installed || !meta_mask_logged) {
            if (basic.isMobile()) {
                if (!meta_mask_installed) {
                    mobileDownloadMetaMaskPopup();
                } else if (!meta_mask_logged) {
                    mobileLoginMetaMaskPopup();
                }
            } else {
                if (!meta_mask_installed) {
                    desktopDownloadMetaMaskPopup();
                } else if (!meta_mask_logged) {
                    desktopLoginMetaMaskPopup();
                }
            }
        } else {
            if ($(this).hasClass('ready-to-edit')) {
                var editing_address = $('.amount-to-container .value-to-edit').val().trim();
                if (innerAddressCheck(editing_address)) {
                    $(this).find('img').attr('src', $(this).find('img').attr('data-default-src'));
                    $('.amount-to-container .wallet-address span.address').html(editing_address);
                    $('.amount-to-container .value-to-edit').hide();
                    $('.amount-to-container .address-container span').show();
                    $('.amount-to-container .address-container').removeClass('editing');
                    $(this).removeClass('ready-to-edit');
                    window.history.pushState(null, null, HOME_URL + '/send/amount-to/' + editing_address);
                } else {
                    basic.showAlert('Please enter valid address.', '', true);
                }
            } else {
                $(this).addClass('ready-to-edit');
                $(this).find('img').attr('src', $(this).find('img').attr('data-check-src'));
                $(this).closest('.wallet-address').find('.address-container').addClass('editing');
                $('.amount-to-container .address-container span').hide();
                $('.amount-to-container .address-container .value-to-edit').show().select();
            }
        }
    });

    //on input in dcn input change usd input
    $('.amount-to-container input#dcn').on('input', function () {
        if (!meta_mask_installed || !meta_mask_logged) {
            $(this).val('');
            if (basic.isMobile()) {
                if (!meta_mask_installed) {
                    mobileDownloadMetaMaskPopup();
                } else if (!meta_mask_logged) {
                    mobileLoginMetaMaskPopup();
                }
            } else {
                if (!meta_mask_installed) {
                    desktopDownloadMetaMaskPopup();
                } else if (!meta_mask_logged) {
                    desktopLoginMetaMaskPopup();
                }
            }
        } else {
            $('.amount-to-container input#usd').val(($(this).val().trim() * global_state.curr_dcn_in_usd).toFixed(2));
        }
    });

    //on input in usd input change dcn input
    $('.amount-to-container input#usd').on('input', function () {
        if (!meta_mask_installed || !meta_mask_logged) {
            $(this).val('');
            if (basic.isMobile()) {
                if (!meta_mask_installed) {
                    mobileDownloadMetaMaskPopup();
                } else if (!meta_mask_logged) {
                    mobileLoginMetaMaskPopup();
                }
            } else {
                if (!meta_mask_installed) {
                    desktopDownloadMetaMaskPopup();
                } else if (!meta_mask_logged) {
                    desktopLoginMetaMaskPopup();
                }
            }
        } else {
            $('.amount-to-container input#dcn').val($(this).val().trim() / global_state.curr_dcn_in_usd);
        }
    });
}

function sendValue() {
    if (!meta_mask_installed || !meta_mask_logged) {
        if (basic.isMobile()) {
            if (!meta_mask_installed) {
                mobileDownloadMetaMaskPopup();
            } else if (!meta_mask_logged) {
                mobileLoginMetaMaskPopup();
            }
        } else {
            if (!meta_mask_installed) {
                desktopDownloadMetaMaskPopup();
            } else if (!meta_mask_logged) {
                desktopLoginMetaMaskPopup();
            }
        }
    } else {
        var dcn_val = $('.amount-to-container input#dcn').val().trim();
        var usd_val = $('.amount-to-container input#usd').val().trim();
        if (isNaN(dcn_val) || isNaN(usd_val) || dcn_val == '' || dcn_val == 0 || usd_val == '' || usd_val == 0) {
            //checking if not a number or empty values
            basic.showAlert('Please make sure all values are numbers.', '', true);
        } else if (dcn_val < 0 || usd_val < 0) {
            //checking if negative numbers
            basic.showAlert('Please make sure all values are more than 0.', '', true);
        } else if (dcn_val < 10) {
            //checking if dcn value is lesser than 10 (contract condition)
            basic.showAlert('Please make sure dcn value is more than 10. You cannot send less than 10 DCN.', '', true);
        } else if (dcn_val > global_state.curr_address_balance) {
            //checking if current balance is lower than the desired value to send
            basic.showAlert('The value you want to send is higher than your balance.', '', true);
        } else if ($('.amount-to-container .address-container').hasClass('editing')) {
            //checking if editing address is done
            basic.showAlert('Please make sure you are done with address editing.', '', true);
        } else if (!innerAddressCheck($('.amount-to-container .wallet-address span.address').html())) {
            //checking again if valid address
            basic.showAlert('Please make sure you are sending to valid address.', '', true);
        } else {
            var callback_obj = {};
            callback_obj.callback = function (result) {
                if (result) {
                    App.sendValue($('.amount-to-container .wallet-address span.address').html(), dcn_val);
                }
            };
            basic.showConfirm('Are you sure you want to continue?', '', callback_obj, true);
        }
    }
}

function innerAddressCheck(address) {
    return web3.isAddress(address) && address != global_state.account;
}

function initHomepageUserData() {
    if ($('.homepage-container').length > 0) {
        //change the address html and show the copy address button
        $('.homepage-container .address span').html(global_state.account);
        $('.homepage-container .address span').data('valid-address', true);
        $('.homepage-container .address .copy-address').show();

        //init new qr code
        getQrCode();
    }
}

function has(object, key) {
    return object ? hasOwnProperty.call(object, key) : false;
}

function sortByKey(array, key) {
    return array.sort(function (a, b) {
        var x = a[key];
        var y = b[key];

        if (typeof x == "string") {
            x = ("" + x).toLowerCase();
        }
        if (typeof y == "string") {
            y = ("" + y).toLowerCase();
        }

        return x < y ? -1 : x > y ? 1 : 0;
    });
}

function hidePopupOnBackdropClick() {
    $(document).on('click', '.bootbox', function () {
        var classname = event.target.className;
        classname = classname.replace(/ /g, '.');

        if (classname && !$('.' + classname).parents('.modal-dialog').length) {
            bootbox.hideAll();
        }
    });
}
hidePopupOnBackdropClick();

function initCheckIfMetaMaskIsLogged() {
    if (web3.eth.defaultAccount !== undefined) {
        window.location.reload();
    }
}

function isInArray(value, array) {
    return array.indexOf(value) > -1;
}