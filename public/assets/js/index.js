var {getWeb3, getContractInstance} = require('./helper');

basic.init();

initComboxes();

checkIfCookie();

$(document).ready(function() {
    App.init();
    if($('body').hasClass('amount-to')) {
        pageAmountToLogic();
    }
    console.log("( ͡° ͜ʖ ͡°) I see you.");
});

$(window).on('beforeunload', function() {

});

$(window).on("load", function()   {

});

$(window).on('resize', function(){

});

$(window).on('scroll', function()  {

});

window.addEventListener('load', function() {

});

var meta_mask_installed = false;
var meta_mask_logged = false;
var blocks_for_month_n_half = 263000;
var is_chrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
var is_firefox = !(window.mozInnerScreenX == null);
var is_opera = navigator.userAgent.toLowerCase().indexOf("opr") == -1;
function mobileDownloadMetaMaskPopup()  {
    var button_html = '<div class="btns-container"><a class="white-aqua-btn" href="https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/" target="_blank">Get from Firefox Addons</a></div>';
    var meta_mask_download_popup_html = '<div class="popup-body"> <div class="title">Just a simple step away...</div><div class="subtitle">Dentacoin Wallet is still in beta and requires external support.</div><div class="separator"></div><figure class="image"><img src="/assets/images/metamask.png" alt="Metamask"/> </figure><div class="additional-text">Install MetaMask to easily and securely sign in to your Dentacoin wallet and manage your tokens! No extra password needed.</div>'+button_html+'</div>';
    basic.showDialog(meta_mask_download_popup_html, 'download-metamask-desktop validation-popup');
}

function desktopDownloadMetaMaskPopup() {
    var button_html = '';
    button_html = '<div class="btns-container"><a class="white-aqua-btn" href="https://metamask.io/" target="_blank">Get from MetaMask</a></div>';
    var meta_mask_download_popup_html = '<div class="popup-body"> <div class="title">Are your ready to use Dentacoin Wallet?</div><div class="subtitle">You\'ll need a safe place to store all of your Dentacoin tokens.</div><div class="separator"></div><figure class="image"><img src="/assets/images/metamask.png" alt="Metamask"/> </figure><div class="additional-text">The perfect place is in a secure wallet like MetaMask. This will also act as your login to your wallet (no extra password needed).</div>'+button_html+'</div>';
    basic.showDialog(meta_mask_download_popup_html, 'download-metamask-desktop validation-popup');
}

function loginMetaMaskPopup()    {
    basic.showDialog('<div class="popup-body"> <div class="title">Sign in to MetaMask</div><div class="subtitle">Open up your browser\'s MetaMask extention.</div><div class="separator"></div><figure class="gif"><img src="/assets/images/metamask-animation.gif" alt="Login MetaMask animation"/> </figure></div>', 'login-metamask-desktop validation-popup');
}

function initChecker()  {
    //checking if metamask
    if(typeof(web3) !== 'undefined' && web3.currentProvider.isMetaMask === true) {
        meta_mask_installed = true;
        web3.currentProvider.publicConfigStore.on('update', onAccountSwitch);
        if(typeof(web3.eth.defaultAccount) != 'undefined')  {
            meta_mask_logged = true;
        }else {
            //if metamask is installed, but user not logged show login popup
            loginMetaMaskPopup();
        }
    }else if(localStorage.getItem('current-account') == null && typeof(web3) === 'undefined') {
        //show custom authentication popup
        $.ajax({
            type: 'POST',
            url: HOME_URL + '/get-custom-auth-html',
            dataType: 'json',
            success: function (response) {
                if(response.success)    {
                    basic.showDialog(response.success, 'custom-auth-popup', null, true);

                    styleInputTypeFile();

                    $('.custom-auth-popup .navigation-link > a').click(function()  {
                        $('.custom-auth-popup .navigation-link a').removeClass('active');
                        $(this).addClass('active');
                        $('.custom-auth-popup .popup-body').addClass('custom-hide');
                        $('.custom-auth-popup .popup-body.'+$(this).attr('data-slug')).removeClass('custom-hide');
                    });

                    $('.custom-auth-popup .popup-left .btn-container a').click(function()   {
                        if($('.custom-auth-popup .keystore-file-pass').val().trim() == '')  {
                            basic.showAlert('Please enter password for your keystore file.', '', true);
                        }else if($('.custom-auth-popup .keystore-file-pass').val().trim().length < 8 || $('.custom-auth-popup .keystore-file-pass').val().trim().length > 30)  {
                            basic.showAlert('The password must be with minimum length of 8 characters and maximum 30.', '', true);
                        }else if($('.custom-auth-popup .keystore-file-pass').val().trim() != $('.custom-auth-popup .second-pass').val().trim())  {
                            basic.showAlert('Please make sure you entered same password in both fields.', '', true);
                        }else {
                            $.ajax({
                                type: 'POST',
                                url: HOME_URL + '/app-create',
                                data: {
                                    password: $('.custom-auth-popup .keystore-file-pass').val().trim()
                                },
                                dataType: 'json',
                                success: function (response) {
                                    if(response.success)    {
                                        var keystore_downloaded = false;
                                        $('.custom-auth-popup .popup-left').attr('data-step', 'second');
                                        $('.custom-auth-popup .popup-left[data-step="second"] .popup-body').html('<label class="custom-label">Download your Keystore file and keep it safe!<br>The only way to access your wallet and manage your Dentacoin tokens is by uploading this file.</label><div class="download-btn btn-container"><a href="javascript:void(0)" class="white-blue-btn"><i class="fa fa-download" aria-hidden="true"></i> Download Keystore File</a></div><div class="second-reminder"><span class="red">*Do not lose it!</span> It cannot be recovered if you lost it.<br><span class="red">*Do not share it!</span> Your funds will be stolen if you use this file on malicious/phishing site.<br><span class="red">*Make a backup!</span> Secure it like the millions of dollars it may one day be worth.</div><div class="continue-btn btn-container"><a href="javascript:void(0)" class="disabled white-blue-btn">I understand. CONTINUE</a></div>');
                                        $('.custom-auth-popup .popup-left[data-step="second"] .popup-body .download-btn > a').click(function()  {
                                            window.open = HOME_URL + '/force-keystore-download/' + JSON.stringify(response.success.keystore);
                                            //download(response.success.keystore.address, JSON.stringify(response.success.keystore));
                                            $('.custom-auth-popup .popup-left[data-step="second"] .popup-body .continue-btn > a').removeClass('disabled');
                                            keystore_downloaded = true;
                                        });

                                        $('.custom-auth-popup .popup-left[data-step="second"] .popup-body .continue-btn > a').click(function()  {
                                            if(keystore_downloaded) {
                                                localStorage.setItem('current-account', JSON.stringify({
                                                    address: '0x' + response.success.keystore.address,
                                                    keystore: response.success.keystore
                                                }));
                                                window.location.reload();
                                            }else {
                                                basic.showAlert('Please save the Keystore file and keep it safe!', '', true);
                                            }
                                        })
                                    }
                                }
                            });
                        }
                    });
                }
            }
        });
    }
    /*if(typeof(web3) !== 'undefined' && web3.eth.defaultAccount === undefined)   {
        setInterval(function()  {
            initCheckIfUserLoggingMetaMask();
        }, 500);
    }

    if(typeof(web3) !== 'undefined' && web3.currentProvider.isMetaMask === true) {
        meta_mask_installed = true;
        web3.currentProvider.publicConfigStore.on('update', onAccountSwitch);
        if(typeof(web3.eth.defaultAccount) != 'undefined')  {
            meta_mask_logged = true;
        }
    }

    if(basic.isMobile())    {
        if(typeof(web3) === 'undefined')   {
            //MOBILE
            if(!is_firefox)    {
                //popup for download mozilla browser OR trust wallet
                basic.showDialog('<div class="popup-body"> <div class="title">Download Firefox Mobile Browser or Trust Wallet</div><div class="subtitle">You can use Dentacoin Wallet on a Firefox Mobile Browser or Trust Wallet app.</div><div class="separator"></div><figure class="image"><img src="/assets/images/phone.svg" alt="Phone icon"/> </figure> <div class="btns-container"> <figure><a class="app-store" href="https://play.google.com/store/apps/details?id=org.mozilla.firefox" target="_blank"><img src="/assets/images/google-store-button.svg" alt=""/></a></figure><figure><a class="app-store" href="https://itunes.apple.com/us/app/firefox-web-browser/id989804926?mt=8" target="_blank"><img src="/assets/images/apple-store-button.svg" alt=""/></a></figure><figure><a class="white-aqua-btn" href="https://trustwalletapp.com/" target="_blank"><img src="/assets/images/trust-wallet-logo.png" alt=""/> Trust Wallet</a></figure></div></div>', 'download-mobile-browser validation-popup');
            }else {
                if(!meta_mask_installed)    {
                    //popup for download metamask
                    mobileDownloadMetaMaskPopup();
                }else if(!meta_mask_logged) {
                    //popup for login in metamask
                    loginMetaMaskPopup();
                }
            }
        }else {
            if(is_firefox && !meta_mask_logged) {
                //popup for login in metamask
                loginMetaMaskPopup();
            }
        }
    }else {
        //DESKTOP
        if(!is_chrome && !is_firefox && is_opera) {
            //IF NOT CHROME OR MOZILLA OR OPERA
            basic.showDialog('<div class="popup-body"> <div class="title">Download Desktop Browser</div><div class="subtitle">You can use Dentacoin Wallet on a desktop browser like Chrome, Firefox Brave or Opera.</div><div class="separator"></div><figure class="image"><img src="/assets/images/computer.svg" alt="Computer icon"/> </figure> <div class="btns-container"> <figure class="inline-block"><a class="white-aqua-btn" href="https://www.google.com/chrome/" target="_blank"><img src="/assets/images/chrome.png" alt=""/> Chrome</a></figure> <figure class="inline-block"><a class="white-aqua-btn" href="https://www.mozilla.org/en-US/firefox/new/" target="_blank"><img src="/assets/images/firefox.png" alt=""/> Firefox</a></figure> <figure class="inline-block"><a class="white-aqua-btn" href="https://www.opera.com/" target="_blank"><img src="/assets/images/opera.png" alt=""/> Opera</a></figure> <figure class="inline-block"><a class="white-aqua-btn" href="https://brave.com/download/" target="_blank"><img src="/assets/images/brave.png" alt=""/> Brave</a></figure> </div></div>', 'download-desktop-browser validation-popup');
        }else {
            if(!meta_mask_installed)    {
                //popup for download metamask
                desktopDownloadMetaMaskPopup();
            }else if(!meta_mask_logged) {
                //popup for login in metamask
                loginMetaMaskPopup();
            }
        }
    }*/
}

var global_state = {};
var temporally_timestamp = 0;
global_state.curr_dcn_in_usd = parseFloat($('body').attr('data-current-dcn-in-usd'));
var getInstance;
var myContract;
var App = {
    contract_address: "0x08d32b0da63e2C3bcF8019c9c5d849d7a9d791e6",
    web3Provider: null,
    web3_0_2: null,
    web3_1_0: null,
    clinics_holder: null,
    contracts: {},
    loading: false,
    init: function() {
        //doing checks before overwrite web3 0.2 with web3 1.0 (some methods are not available in web3 1.0)
        if(!$('body').hasClass('buy'))    {
            initChecker();
        }
        return App.initWeb3();
    },
    initWeb3: async function()    {
        if(localStorage.getItem('current-account') != null && typeof(web3) === 'undefined')    {
            //CUSTOM
            global_state.account = JSON.parse(localStorage.getItem('current-account')).address;
            App.web3_1_0 = getWeb3(new Web3.providers.HttpProvider('https://mainnet.infura.io/c6ab28412b494716bc5315550c0d4071'));
        }else if(typeof(web3) !== 'undefined') {
            //METAMASK
            App.web3_0_2 = web3;
            global_state.account = App.web3_0_2.eth.defaultAccount;
            //overwrite web3 0.2 with web 1.0
            web3 = getWeb3(App.web3_0_2.currentProvider);
            App.web3_1_0 = web3;
        }else {
            //NO CUSTOM, NO METAMASK. Doing this final third check so we can use web3_1_0 functions and utils even if there is no metamask or custom imported/created account
            App.web3_1_0 = getWeb3();
        }

        if(typeof(global_state.account) != 'undefined') {
            //auto fill user address on buy page
            if($('body').hasClass('buy'))   {
                $('.buy-container .address-field').val(global_state.account);
            }
            return App.initContract();
        }else {
            $('.transaction-history table tbody.visible-tbody').html('<tr><td class="text-center">Please login with your address.</td></tr>');
        }
    },
    initContract: function() {
        $.getJSON('/assets/jsons/DentacoinToken.json', async function(DCNArtifact) {
            // get the contract artifact file and use it to instantiate a truffle contract abstraction
            getInstance = getContractInstance(App.web3_1_0);
            myContract = getInstance(DCNArtifact, App.contract_address);

            //refresh the current dentacoin value
            if($('.homepage-container').length > 0) {
                App.updateBalance(true);
            }else {
                App.updateBalance();
            }

            //getting current eth balance for current public address
            if(App.web3_0_2 != null) {
                global_state.curr_addr_eth_balance = App.web3_0_2.fromWei(await App.getAddressETHBalance(global_state.account));
            }else if(App.web3_1_0 != null) {
                global_state.curr_addr_eth_balance = App.web3_1_0.utils.fromWei(await App.getAddressETHBalance(global_state.account));
            }

            //save current block number into state
            await App.helper.getBlockNum();

            App.clinics_holder = await $.getJSON('/assets/jsons/clinics.json');

            //get transactions history in footer
            App.buildTransactionsHistory();

            onAccountSwitch();
        });
    },
    updateBalance: function(homepage)  {
        return myContract.methods.balanceOf(global_state.account).call({ from: global_state.account }, function(error, result)   {
            if(!error)  {
                if(homepage === undefined){
                    homepage = null;
                }
                global_state.curr_addr_dcn_balance = result;
                if(homepage != null)    {
                    setTimeout(function()   {
                        initHomepageUserData();
                        $('.values-and-qr-code .animation').removeClass('rotate-animation');
                        $('.homepage-container .dcn-value .value').html(result);
                        $('.homepage-container .output .value').html((parseInt(result) * global_state.curr_dcn_in_usd).toFixed(2));
                        $('.homepage-container .values-and-qr-code').show();
                    }, 300);
                }
            }else {
                console.error(error);
            }
        });
    },
    sendValue: function(send_addr, value)  {
        return myContract.methods.transfer(send_addr, value).send({
            from: global_state.account,
            gas: 65000
        }).on('transactionHash', function(hash){
            displayMessageOnTransactionSend(hash);
        })/*.then(function (result){
            basic.closeDialog();
            basic.showAlert('Your transaction is now pending. Give it a minute and check for confirmation on <a href="https://etherscan.io/tx/'+result.transactionHash+'" target="_blank" class="etherscan-link">Etherscan</a>.', '', true);
        })*/.catch(function(err) {
            console.error(err);
        });
    },
    getFromTransactionsEvents: function(from_num, to, no_sub)    {
        if(to === undefined) {
            to = 'latest';
        }
        if(no_sub === undefined) {
            no_sub = false;
        }
        return new Promise(function(resolve, reject) {
            global_state.from_transactions = [];
            var event_obj = {
                filter: {_from: global_state.account},
                fromBlock: global_state.curr_block - from_num,
                toBlock: to
            };

            if(no_sub)  {
                event_obj.fromBlock = from_num;
            }else {
                event_obj.fromBlock = global_state.curr_block - from_num;
                if(global_state.curr_block - from_num < 0)    {
                    event_obj.fromBlock = 0;
                }
            }
            myContract.getPastEvents('Transfer', event_obj, function(error, event){
                resolve(event);
            });
        });
    },
    getToTransactionsEvents: function(from_num, to, no_sub)    {
        if(to === undefined) {
            to = 'latest';
        }
        if(no_sub === undefined) {
            no_sub = false;
        }
        return new Promise(function(resolve, reject) {
            global_state.from_transactions = [];
            var event_obj = {
                filter: {_to: global_state.account},
                toBlock: to
            };

            if(no_sub)  {
                event_obj.fromBlock = from_num;
            }else {
                event_obj.fromBlock = global_state.curr_block - from_num;
                if (global_state.curr_block - from_num < 0) {
                    event_obj.fromBlock = 0;
                }
            }
            myContract.getPastEvents('Transfer', event_obj, function (error, event) {
                resolve(event);
            });
        });
    },
    getAddressETHBalance: function(address)    {
        return new Promise(function(resolve, reject) {
            resolve(App.web3_1_0.eth.getBalance(address));
        });
    },
    buildTransactionsHistory: async function(num)    {
        var stop_query_more_obj = false;
        if(num === undefined) {
            num = 1;
        }

        if(localStorage.getItem('latest-covered-block') != null && localStorage.getItem('transactions-address') == global_state.account) {
            stop_query_more_obj = true;
            var local_history_obj = JSON.parse(localStorage.getItem('transactions-history'));
            var local_history_html = '';
            var symbol = '';

            Object.keys(local_history_obj).sort().reverse().forEach(function(key) {
                var timestamp_javascript = key*1000;
                var date_obj = new Date(timestamp_javascript);

                if(new Date(timestamp_javascript).getMinutes() < 10) {
                    var minutes = '0'+new Date(timestamp_javascript).getMinutes();
                }else {
                    var minutes = new Date(timestamp_javascript).getMinutes();
                }

                if(new Date(timestamp_javascript).getHours() < 10) {
                    var hours = '0'+new Date(timestamp_javascript).getHours();
                }else {
                    var hours = new Date(timestamp_javascript).getHours();
                }
                var usd_amount = (parseInt(local_history_obj[key].dcn_amount) * global_state.curr_dcn_in_usd).toFixed(2);
                var json_clinic = '';

                if(has(App.clinics_holder.clinics, local_history_obj[key].address)) {
                    json_clinic = '<a href="javascript:void(0)" class="api-clinic">'+App.clinics_holder.clinics[array[i].returnValues._from].name+'</a>';
                }

                if(local_history_obj[key].type == 'received_from')  {
                    symbol = '+';
                }else {
                    symbol = '-';
                }

                // check if the property/key is defined in the object itself, not in parent
                local_history_html+='<tr class="'+local_history_obj[key].type+' single-transaction" data-block-number="'+local_history_obj[key].block_num+'"><td class="align-middle icon"></td><td class="align-middle"><ul class="align-middle"><li>'+(date_obj.getMonth() + 1) + '/' + date_obj.getDate() + '/' + date_obj.getFullYear() +'</li><li>'+hours+':'+minutes+'</li></ul></td><td class="align-middle"><ul class="align-middle"><li><span><strong>'+local_history_obj[key].label+': </strong>'+json_clinic+' '+local_history_obj[key].address+'</span></li><li><a href="https://etherscan.io/tx/'+local_history_obj[key].tx_id+'" target="_blank"><strong class="transaction-id">Transaction ID</strong></a></li></ul></td><td class="align-middle"><ul class="align-middle"><li class="value-dcn">'+symbol+local_history_obj[key].dcn_amount+' DCN</li><li>'+usd_amount+' USD</li></ul></td></tr>';
            });
            $('.transaction-history table tbody.visible-tbody').append(local_history_html);

            initShowMoreBtn();

            // fromBlock parseInt(localStorage.getItem('latest-covered-block')) + 1 because we don't want to query again the latest transaction
            var from_events = await App.getFromTransactionsEvents(parseInt(localStorage.getItem('latest-covered-block')) + 1, undefined, true);
            var to_events = await App.getToTransactionsEvents(parseInt(localStorage.getItem('latest-covered-block')) + 1, undefined, true);

            if(from_events.length == 0 && to_events.length == 0)  {
                hideLoader();
            }
        }else {
            if(num > 1) {
                //range from and to going down based on blocks_for_month_n_half
                var from_events = await App.getFromTransactionsEvents(num * blocks_for_month_n_half, global_state.curr_block - (blocks_for_month_n_half * (num - 1)));
                var to_events = await App.getToTransactionsEvents(num * blocks_for_month_n_half, global_state.curr_block - (blocks_for_month_n_half * (num - 1)));
            }else {
                //first call of the recursive function: checking for events from blocks_for_month_n_half block to latest block
                var from_events = await App.getFromTransactionsEvents(num * blocks_for_month_n_half);
                var to_events = await App.getToTransactionsEvents(num * blocks_for_month_n_half);
            }
        }

        //summing from and to events into arr
        var array = from_events.concat(to_events);
        if(array.length > 0) {
            //getting the clinics from the api cached json
            var table_html = '';
            //looping for adding timestamp property for each object in the array
            for(var i = 0, len = array.length; i < len; i+=1) {
                array[i].timestamp = await App.helper.addBlockTimestampToTransaction(array[i]);
            }

            //sorting the array of objects by timestamp property
            sortByKey(array, 'timestamp');
            //reversing to get desc order
            array = array.reverse();

            //if transactions in the history are more than 3 the rest are hidden so we add show more button and bind show event
            $('.transaction-history .show-more-holder').html('');

            //looping to build the transaction history section
            for(var i = 0, len = array.length; i < len; i+=1) {
                //timestamp*1000 because blockchain return unix timestamp
                var json_clinic = '';
                var other_address = '';
                var class_name = '';
                var label = '';
                var dcn_amount_symbol;
                var usd_amount = (parseInt(array[i].returnValues._value) * global_state.curr_dcn_in_usd).toFixed(2);
                if(array[i].returnValues._to.toLowerCase() == global_state.account.toLowerCase())    {
                    //IF THE CURRENT ACCOUNT IS RECEIVER
                    other_address = array[i].returnValues._from;
                    label = 'Received from';
                    class_name = 'received_from';
                    dcn_amount_symbol = '+';
                    if(has(App.clinics_holder.clinics, array[i].returnValues._from)) {
                        json_clinic = '<a href="javascript:void(0)" class="api-clinic">'+App.clinics_holder.clinics[array[i].returnValues._from].name+'</a>';
                    }
                }else if(array[i].returnValues._from.toLowerCase() == global_state.account.toLowerCase()) {
                    //IF THE CURRENT ACCOUNT IS SENDER
                    other_address = array[i].returnValues._to;
                    if(has(App.clinics_holder.clinics, array[i].returnValues._to)) {
                        json_clinic = '<a href="javascript:void(0)" class="api-clinic">'+App.clinics_holder.clinics[array[i].returnValues._to].name+'</a>';
                        label = 'Payed to';
                        class_name = 'payed_to';
                    }else {
                        label = 'Sent to';
                        class_name = 'sent_to';
                    }
                    dcn_amount_symbol = '-';
                }

                var dcn_amount = dcn_amount_symbol+array[i].returnValues._value+' DCN';
                var timestamp_javascript = array[i].timestamp*1000;
                var date_obj = new Date(timestamp_javascript);
                var minutes;
                var hours;

                if(new Date(timestamp_javascript).getMinutes() < 10) {
                    minutes = '0'+new Date(timestamp_javascript).getMinutes();
                }else {
                    minutes = new Date(timestamp_javascript).getMinutes();
                }

                if(new Date(timestamp_javascript).getHours() < 10) {
                    hours = '0'+new Date(timestamp_javascript).getHours();
                }else {
                    hours = new Date(timestamp_javascript).getHours();
                }


                //first 3 are visible, rest are going to hidden tbody
                table_html+='<tr class="'+class_name+' single-transaction" data-timestamp="'+array[i].timestamp+'" data-class="'+class_name+'" data-tx-id="'+array[i].transactionHash+'" data-dcn-amount="'+array[i].returnValues._value+'" data-block-number="'+array[i].blockNumber+'" data-label="'+label+'" data-address="'+other_address+'"><td class="align-middle icon"></td><td class="align-middle"><ul class="align-middle"><li>'+(date_obj.getMonth() + 1) + '/' + date_obj.getDate() + '/' + date_obj.getFullYear() +'</li><li>'+hours+':'+minutes+'</li></ul></td><td class="align-middle"><ul class="align-middle"><li><span><strong>'+label+': </strong>'+json_clinic+' '+other_address+'</span></li><li><a href="https://etherscan.io/tx/'+array[i].transactionHash+'" target="_blank"><strong class="transaction-id">Transaction ID</strong></a></li></ul></td><td class="align-middle"><ul class="align-middle"><li class="value-dcn">'+dcn_amount+'</li><li>'+usd_amount+' USD</li></ul></td></tr>';
            }

            if(!$('.transaction-history table').hasClass('full-width-responsive'))   {
                $('.transaction-history table').addClass('full-width-responsive');
            }

            if(stop_query_more_obj) {
                hideLoader();
                $('.transaction-history table tbody.visible-tbody').prepend(table_html);
            }else {
                $('.transaction-history table tbody.visible-tbody').append(table_html);
            }

            initShowMoreBtn();
        }

        function hideLoader()   {
            $('.transaction-history table tbody .loader-animation').remove();
        }

        function initShowMoreBtn() {
            //checking if current transactions are more then 3 and then display the show more button
            if($('.transaction-history table tbody tr').length > 3) {
                $('.transaction-history .show-more-holder').html('<div class="col text-center"><a href="javascript:void(0)" ><strong>Show more</strong></a></div>');
                $('.transaction-history .show-more-holder a').click(function()  {
                    $(this).closest('.show-more-holder').html('');
                    $('.transaction-history table tbody tr').addClass('display_row');
                });
            }
        }

        //if from block timestamp is lower than DCN release timestamp stop the loop for calling more events
        if(await App.helper.getLoopingTransactionFromBlockTimestamp(global_state.curr_block - (num * blocks_for_month_n_half)) > new Date('2017.01.01').getTime() / 1000 && !stop_query_more_obj)   {
            App.buildTransactionsHistory(num+=1);
        }else {
            hideLoader();

            //IMPORTING TRANSACTIONS TO LOCAL STORAGE
            if($('.transaction-history .visible-tbody tr.single-transaction').length > 0)  {
                if(localStorage.getItem('transactions-history') != null && localStorage.getItem('transactions-address') == global_state.account) {
                    //IF WE HAVE ALREADY SAVED TRANSACTION HISTORY IN LOCAL STORAGE
                    var local_storage_obj = JSON.parse(localStorage.getItem('transactions-history'));
                    for(var i = 0, len = $('.transaction-history .visible-tbody tr[data-timestamp]').length; i < len; i+=1) {
                        var single_transaction = $('.transaction-history .visible-tbody tr.single-transaction[data-timestamp]').eq(i);
                        if(!has(local_storage_obj, single_transaction.attr('data-timestamp')))    {
                            local_storage_obj[single_transaction.attr('data-timestamp')] = {
                                type: single_transaction.attr('data-class'),
                                tx_id: single_transaction.attr('data-tx-id'),
                                dcn_amount: single_transaction.attr('data-dcn-amount'),
                                label: single_transaction.attr('data-label'),
                                address: single_transaction.attr('data-address'),
                                block_num: single_transaction.attr('data-block-number')
                            };
                        }
                    }
                    //updating the saved transaction history object in the local storage
                    localStorage.setItem('latest-covered-block', $('.transaction-history .visible-tbody tr.single-transaction').eq(0).attr('data-block-number'));
                    localStorage.setItem('transactions-history', JSON.stringify(local_storage_obj));
                }else {
                    var local_storage_obj = {};
                    for(var i = 0, len = $('.transaction-history .visible-tbody tr.single-transaction').length; i < len; i+=1) {
                        var single_transaction = $('.transaction-history .visible-tbody tr.single-transaction').eq(i);
                        local_storage_obj[single_transaction.attr('data-timestamp')] = {
                            type: single_transaction.attr('data-class'),
                            tx_id: single_transaction.attr('data-tx-id'),
                            dcn_amount: single_transaction.attr('data-dcn-amount'),
                            label: single_transaction.attr('data-label'),
                            address: single_transaction.attr('data-address'),
                            block_num: single_transaction.attr('data-block-number')
                        };
                    }
                    localStorage.setItem('latest-covered-block', $('.transaction-history .visible-tbody tr.single-transaction').eq(0).attr('data-block-number'));
                    localStorage.setItem('transactions-history', JSON.stringify(local_storage_obj));
                    localStorage.setItem('transactions-address', global_state.account);
                }
            }

            if($('.transaction-history table tbody tr.single-transaction').length == 0) {
                $('.transaction-history table tbody.visible-tbody').html('<tr><td class="text-center">No previous transactions found.</td></tr>');
            }
        }
    },
    events: {
        logTransfer: function() {
            var transactions_hash_arr = [];
            var transfer_event_obj = {
                filter: {_from: global_state.account},
                fromBlock: global_state.curr_block,
                toBlock: 'latest'
            };
            myContract.events.Transfer(transfer_event_obj, function(error, result){
                if(!error) {
                    if(!isInArray(result.transactionHash, transactions_hash_arr) && $('body').hasClass('amount-to')) {
                        transactions_hash_arr.push(result.transactionHash);
                        basic.closeDialog();
                        basic.showAlert('Your transaction was confirmed. Check here  <a href="https://etherscan.io/tx/'+result.transactionHash+'" class="etherscan-link">Etherscan</a>', '', true);
                    }
                }else {
                    console.log(error);
                }
            }).on('data', function(event){
                console.log(event, 'data'); // same results as the optional callback above
            })
            .on('changed', function(event){
                // remove event from local database
                console.log(event, 'changed'); // same results as the optional callback above
            })
            .on('error', console.error);
        }
    },
    helper: {
        addBlockTimestampToTransaction: function(transaction)    {
            return new Promise(function(resolve, reject) {
                App.web3_1_0.eth.getBlock(transaction.blockNumber, function(error, result) {
                    if (error !== null) {
                        reject(error);
                    }
                    temporally_timestamp = result.timestamp;
                    resolve(temporally_timestamp);
                });
            });
        },
        getLoopingTransactionFromBlockTimestamp: function(block_num)    {
            return new Promise(function(resolve, reject) {
                App.web3_1_0.eth.getBlock(block_num, function(error, result) {
                    if (error !== null) {
                        reject(error);
                    }
                    resolve(result.timestamp);
                });
            });
        },
        getBlockNum: function()  {
            return new Promise(function(resolve, reject) {
                App.web3_1_0.eth.getBlockNumber(function(error, result) {
                    if(!error){
                        global_state.curr_block = result;
                        resolve(global_state.curr_block);
                    }
                });
            });
        },
        getAccounts: function()  {
            return new Promise(function(resolve, reject) {
                App.web3_1_0.eth.getAccounts(function(error, result) {
                    if(!error){
                        resolve(result);
                    }
                });
            });
        },
        estimateGas: function(address, function_abi)  {
            return new Promise(function(resolve, reject) {
                App.web3_1_0.eth.estimateGas({
                    to: address,
                    data: function_abi
                }, function(error, result) {
                    if(!error){
                        resolve(result);
                    }
                });
            });
        },
        getGasPrice: function() {
            return new Promise(function(resolve, reject) {
                App.web3_1_0.eth.getGasPrice(function(error, result) {
                    if(!error){
                        resolve(result);
                    }
                });
            });
        }
    }
};

function getQrCode()    {
    if(global_state.account != undefined)   {
        $.ajax({
            type: 'POST',
            url: HOME_URL + '/get-qr-code-from-address',
            data: {
                'address' : global_state.account
            },
            dataType: 'json',
            success: function (response) {
                if(response.success)    {
                    $('.homepage-container .values-and-qr-code .qr-code img').attr('src', response.success);
                }
            }
        });
    }
}

//PAGES
if($('body').hasClass('home'))  {
    //init copy button event
    var clipboard = new ClipboardJS('.copy-btn');
    clipboard.on('success', function(e) {
        $('.homepage-container .copy-address').tooltip('show');
        setTimeout(function()   {
            $('.homepage-container .copy-address').tooltip('hide');
        }, 1000);
    });

    //custom copy
    /*$('.homepage-container .copy-address').click(function()   {
        var this_el = $(this);

        $('.homepage-container .address .address-value').select();
        if(!navigator.userAgent.match(/ipad|ipod|iphone/i)) {
            document.execCommand("copy");
        }

        this_el.tooltip('show');
        setTimeout(function()   {
            this_el.tooltip('hide');
        }, 1000);
    });*/

    $('.homepage-container .copy-address').tooltip({
        trigger: 'click'
    });
}else if($('body').hasClass('buy'))  {
    var dcn_for_one_usd = parseFloat($('.buy-container').attr('data-dcn-for-one-usd'));
    var dcn_starting_amount = dcn_for_one_usd * parseFloat($('.buy-container #paying-with-amount').val().trim());
    $('.buy-container #dcn-amount').val(dcn_for_one_usd * parseFloat($('.buy-container #paying-with-amount').val().trim()));

    $('.buy-container #paying-with-amount').on('input', function() {
        if($(this).val().trim() < 50)   {
            $(this).addClass('error-field');
        }else {
            $(this).removeClass('error-field');
        }

        if(parseFloat($(this).val().trim()) < 0)    {
            $('.buy-container #paying-with-amount').val(50);
        }else if(parseFloat($(this).val().trim()) > 3000)    {
            $('.buy-container #paying-with-amount').val(3000);
        }

        $('.buy-container #dcn-amount').val(dcn_for_one_usd * parseFloat($(this).val().trim()));
    });

    $('.buy-container #dcn-amount').on('input', function() {
        if(parseFloat($(this).val().trim()) / dcn_for_one_usd > 3000)   {
            $(this).val(dcn_for_one_usd * 3000);
        }
        $('.buy-container #paying-with-amount').val(parseFloat($(this).val().trim()) / dcn_for_one_usd);
    });

    $('.buy-dcn-btn').click(function()  {
        if(parseFloat($('.buy-container #paying-with-amount').val().trim()) < 50)  {
            basic.showAlert('The minimum transaction limit is 50 USD.', '', true);
        }else if(parseFloat($('.buy-container #paying-with-amount').val().trim()) > 3000)  {
            basic.showAlert('The maximum transaction limit is 3000 USD.', '', true);
        }else if(parseFloat($('.buy-container #dcn-amount').val().trim()) < dcn_for_one_usd * 50)  {
            basic.showAlert('The minimum transaction limit is 50 USD in DCN.', '', true);
        }else if(parseFloat($('.buy-container #dcn-amount').val().trim()) > dcn_for_one_usd * 3000)  {
            basic.showAlert('The maximum transaction limit is 3000 USD in DCN.', '', true);
        }else if(!innerAddressCheck($('.buy-container .address-field').val().trim())) {
            basic.showAlert('Please enter a valid wallet address. It should start with "0x" and be followed by 40 characters (numbers and letters).', '', true);
        }else if(!basic.validateEmail($('.buy-container .email-field').val().trim()))  {
            basic.showAlert('Please enter a valid email.', '', true);
        }else if(!$('#privacy-policy-agree').is(':checked')) {
            basic.showAlert('Please agree with our Privacy Policy.', '', true);
        }else {
            window.location = 'https://indacoin.com/gw/payment_form?partner=dentacoin&cur_from=USD&cur_to=DCN&amount='+$('.buy-container #paying-with-amount').val().trim()+'&address='+$('.buy-container .address-field').val().trim()+'&user_id='+$('.buy-container .email-field').val().trim();
        }
    });

}else if($('body').hasClass('send')) {
    $('select.combobox.combobox-input').on('change', function()    {
        if(innerAddressCheck($(this).val()))    {
            $('.send-container .next a').addClass('active');
        }else {
            $('.send-container .next a').removeClass('active');
        }
    });

    //on input and if valid address add active class to 'next' button for UI
    $('.send-container .wallet-address input.combobox-input').on('input', function()   {
        if(innerAddressCheck($(this).val().trim()))   {
            $('.send-container .next a').addClass('active');
        }else if($('.send-container .next a').hasClass('active')){
            $('.send-container .next a').removeClass('active');
        }
    });

    $('.send-container .next a').click(function()  {
        if(innerAddressCheck($('.send-container .wallet-address input.combobox-input').val().trim())) {
            window.location = HOME_URL + '/send/amount-to/' + $('.send-container .wallet-address .combobox-input').val().trim();
        }else {
            basic.showAlert('Please enter a valid wallet address. It should start with "0x" and be followed by 40 characters (numbers and letters).', '', true);
        }
    });

    $('.send-container .scan-qr-code').click(function() {
        $('.scan-qr-code-popup').addClass('visible-popup');
        $('body').addClass('overflow-hidden');

        var app = new Vue({
            el: '#app'
        });
    });
}

function pageAmountToLogic()    {
    var curr_addr = window.location.href.split('/')[window.location.href.split('/').length-1];
    //redirect to /send if the address it not valid or using the same address as the owner1
    if(typeof(global_state.account) == 'undefined' || (typeof(App.web3_1_0) == 'undefined') || !innerAddressCheck(curr_addr))   {
        window.location = HOME_URL + '/send';
    }

    //editing the address logic
    $('.amount-to-container .edit-address').click(function()    {
        if ($(this).hasClass('ready-to-edit')) {
            var editing_address = $('.amount-to-container input.value-to-edit').val().trim();
            if (innerAddressCheck(editing_address)) {
                $(this).find('img').attr('src', $(this).find('img').attr('data-default-src'));
                $('.amount-to-container .wallet-address span.address').html(editing_address);
                $('.amount-to-container input.value-to-edit').hide();
                $('.amount-to-container .address-container span').show();
                $('.amount-to-container .address-container').removeClass('editing');
                $(this).removeClass('ready-to-edit');
                window.history.pushState(null, null, HOME_URL + '/send/amount-to/' + editing_address);
            } else {
                basic.showAlert('Please enter a valid wallet address. It should start with "0x" and be followed by 40 characters (numbers and letters).', '', true);
            }
        } else {
            $(this).addClass('ready-to-edit');
            $(this).find('img').attr('src', $(this).find('img').attr('data-check-src'));
            $(this).closest('.wallet-address').find('.address-container').addClass('editing');
            $('.amount-to-container .address-container span').hide();
            $('.amount-to-container .address-container input.value-to-edit').show().select();
        }
    });

    //on input in dcn input change usd input
    $('.amount-to-container input#dcn').on('input', function()  {
        var to_fixed_num = 2;
        if(($(this).val().trim() * global_state.curr_dcn_in_usd) < 0.01) {
            to_fixed_num = 4;
        }
        $('.amount-to-container input#usd').val(($(this).val().trim() * global_state.curr_dcn_in_usd).toFixed(to_fixed_num));
    });

    //sending transactions with metamask
    function metaMaskSubmit(dcn_val, usd_val, sending_to_address)   {
        var callback_obj = {};
        callback_obj.callback = function (result) {
            if (result) {
                //setup cookie with all used address for sending so we can display then dropdown at address inserting into field
                if(basic.cookies.get('prev_used_addresses') == ''){
                    basic.cookies.set('prev_used_addresses', JSON.stringify([sending_to_address]));
                }else {
                    var addresses = JSON.parse(basic.cookies.get('prev_used_addresses'));
                    if(!isInArray(sending_to_address, addresses))    {
                        addresses.push(sending_to_address);
                        addresses = JSON.stringify(addresses);
                        basic.cookies.set('prev_used_addresses', addresses);
                    }
                }
                App.sendValue(sending_to_address, dcn_val);
            }
        };
        basic.showConfirm('Are you sure you want to continue?', '', callback_obj, true);
    }

    //on input in usd input change dcn input
    $('.amount-to-container input#usd').on('input', function()  {
        $('.amount-to-container input#dcn').val($(this).val().trim() / global_state.curr_dcn_in_usd);
    });

    $('.amount-to-container .send-value-btn').click(async function()  {
        var dcn_val = $('.amount-to-container input#dcn').val().trim();
        var usd_val = $('.amount-to-container input#usd').val().trim();
        var sending_to_address = $('.amount-to-container .wallet-address span.address').html();

        if (isNaN(dcn_val) || isNaN(usd_val) || dcn_val == '' || dcn_val == 0 || usd_val == '' || usd_val == 0) {
            //checking if not a number or empty values
            basic.showAlert('Please make sure all values are numbers.', '', true);
            return false;
        } else if (dcn_val < 0 || usd_val < 0) {
            //checking if negative numbers
            basic.showAlert('Please make sure all values are more than 0.', '', true);
            return false;
        } else if (dcn_val < 10) {
            //checking if dcn value is lesser than 10 (contract condition)
            basic.showAlert('Please make sure dcn value is more than 10. You cannot send less than 10 DCN.', '', true);
            return false;
        } else if (0.005 > parseFloat(global_state.curr_addr_eth_balance)) {
            //checking if current balance is lower than the desired value to send
            basic.showAlert('For sending DCN you need at least 0.005 ETH. Please refill.', '', true);
            return false;
        } else if (dcn_val > parseInt(global_state.curr_addr_dcn_balance)) {
            //checking if current balance is lower than the desired value to send
            basic.showAlert('The value you want to send is higher than your balance.', '', true);
            return false;
        } else if ($('.amount-to-container .address-container').hasClass('editing')) {
            //checking if editing address is done
            basic.showAlert('Please make sure you are done with address editing.', '', true);
            return false;
        } else if (!innerAddressCheck(sending_to_address)) {
            //checking again if valid address
            basic.showAlert('Please enter a valid wallet address. It should start with "0x" and be followed by 40 characters (numbers and letters).', '', true);
            return false;
        }

        if(meta_mask_installed)    {
            metaMaskSubmit(dcn_val, usd_val, sending_to_address);
        } else {
            var function_abi = myContract.methods.transfer(sending_to_address, dcn_val).encodeABI();

            //calculating the fee from the gas price and the estimated gas price
            const on_page_load_gwei = parseInt($('.amount-to-container').attr('data-on-page-load-gas-estimation'), 10);
            //adding 10% of the outcome just in case transactions don't take so long
            const on_page_load_gas_price = on_page_load_gwei * 100000000 + ((on_page_load_gwei * 100000000) * 10/100);

            //var eth_fee = App.web3_1_0.utils.fromWei((await App.helper.getGasPrice() * await App.helper.estimateGas(sending_to_address, function_abi)).toString(), 'ether');
            //using ethgasstation gas price and not await App.helper.getGasPrice(), because its more accurate
            var eth_fee = App.web3_1_0.utils.fromWei((on_page_load_gas_price * await App.helper.estimateGas(sending_to_address, function_abi)).toString(), 'ether');
            //Send confirmation popup
            $.ajax({
                type: 'POST',
                url: HOME_URL + '/get-transaction-confirmation-popup',
                data: {
                    dcn_val: dcn_val,
                    usd_val: usd_val,
                    sending_to_address: sending_to_address,
                    from: global_state.account,
                    fee: parseFloat(eth_fee).toFixed(8)
                },
                dataType: 'json',
                success: function (response) {
                    basic.showDialog(response.success, 'transaction-confirmation-popup', true);

                    const on_popup_call_gwei = parseInt($('.transaction-confirmation-popup input[type="hidden"]#gas-estimation').val(), 10);
                    //adding 10% of the outcome just in case transactions don't take so long
                    const on_popup_call_gas_price = on_popup_call_gwei * 100000000 + ((on_popup_call_gwei * 100000000) * 10/100);

                    $('.transaction-confirmation-popup .confirm-transaction').click(function()  {
                        if($('.transaction-confirmation-popup #user-keystore-password').val().trim() == '') {
                            basic.showAlert('Please enter your password.', '', true);
                            return false;
                        }else {
                            //API call for decrypt localstorage json
                            $.ajax({
                                type: 'POST',
                                url: HOME_URL + '/decrypt-pk',
                                data: {
                                    password: $('.transaction-confirmation-popup #user-keystore-password').val().trim(),
                                    keystore: JSON.stringify(JSON.parse(localStorage.getItem('current-account')).keystore)
                                },
                                dataType: 'json',
                                success: function (response) {
                                    if(response.success)    {
                                        App.web3_1_0.eth.getTransactionCount(global_state.account, function (err, nonce) {
                                            const EthereumTx = require('ethereumjs-tx');
                                            const tx = new EthereumTx({
                                                gasLimit: App.web3_1_0.utils.toHex(65000),
                                                gasPrice: App.web3_1_0.utils.toHex(on_popup_call_gas_price),
                                                to: App.contract_address,
                                                data: function_abi,
                                                from: global_state.account,
                                                nonce: App.web3_1_0.utils.toHex(nonce),
                                                chainId: 1
                                            });

                                            //signing the transaction
                                            tx.sign(new Buffer(response.success, 'hex'));
                                            //sending the transaction
                                            App.web3_1_0.eth.sendSignedTransaction('0x' + tx.serialize().toString('hex'), function (err, transactionHash) {
                                                basic.closeDialog();
                                                displayMessageOnTransactionSend(transactionHash);
                                            });
                                        });
                                    }else if(response.error)    {
                                        basic.showAlert(response.error, '', true);
                                    }
                                }
                            });
                        }
                    });
                }
            });
        }
    });
}

function innerAddressCheck(address)    {
    if(App.web3_0_2 != null) {
        return App.web3_0_2.isAddress(address);
    }else if(App.web3_1_0 != null) {
        return App.web3_1_0.utils.isAddress(address);
    }
}

async function onAccountSwitch() {
    if(typeof(global_state.account) != 'undefined' && App.web3_0_2 != null) {
        if(global_state.account != App.web3_0_2.eth.defaultAccount) {
            //doing this check because metamask fire the change event randomly, this way we detect real account switch
            //global_state.account = web3.eth.defaultAccount;

            //$('.values-and-qr-code .animation').addClass('rotate-animation');
            //App.updateBalance(true);

            //build transactions history from previous events on the blockchain
            //App.buildTransactionsHistory();

            window.location.reload();
        }
    }else if(meta_mask_installed) {
        if($('.homepage-container').length > 0) {
            $('.homepage-container .address .address-value').val($('.homepage-container .address .address-value').attr('data-log-metamask'));
            $('.homepage-container .address .copy-address').hide();
        }
    }
}

function initHomepageUserData() {
    if($('.homepage-container').length > 0) {
        //change the address html and show the copy address button
        $('.homepage-container .address .address-value').val(global_state.account);
        $('.homepage-container .address input[type="hidden"]').val(global_state.account);
        $('.homepage-container .address .address-value').data('valid-address', true);
        $('.homepage-container .address .copy-address').show();

        //init new qr code
        getQrCode();
    }
}

function has(object, key) {
    return object ? hasOwnProperty.call(object, key) : false;
}

function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key];
        var y = b[key];

        if (typeof x == "string") {
            x = (""+x).toLowerCase();
        }
        if (typeof y == "string") {
            y = (""+y).toLowerCase();
        }
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

function hidePopupOnBackdropClick() {
    $(document).on('click', '.bootbox', function(){
        var classname = event.target.className;
        classname = classname.replace(/ /g, '.');

        if(classname && !$('.' + classname).parents('.modal-dialog').length) {
            bootbox.hideAll();
        }
    });
}
//hidePopupOnBackdropClick();

async function initCheckIfUserLoggingMetaMask()  {
    var accounts = await App.helper.getAccounts();
    if(accounts.length > 0)   {
        window.location.reload();
    }
}

function isInArray(value, array) {
    return array.indexOf(value) > -1;
}

function initComboxes() {
    if($('select.combobox').length > 0) {
        $('select.combobox').each(function(){
            $(this).combobox();
            var this_select_input = $(this).prev().find('.combobox-input');
            $(this).prev().find('.dropdown-toggle').click();
            var drop_down_menu = this_select_input.closest('.combobox-container').find('.dropdown-menu');
            drop_down_menu.hide();
            this_select_input.on('focus', function() { drop_down_menu.show()});
        });
    }
}

function checkIfCookie()    {
    if($('.privacy-policy-cookie').length > 0)  {
        $('.privacy-policy-cookie .accept').click(function()    {
            basic.cookies.set('privacy_policy', 1);
            $('.privacy-policy-cookie').hide();
        });
    }
}

function initMobileFooterEvent()    {
    if(basic.isMobile())    {
        $('.go-next > a').click(function()  {
            if($(this).attr('data-position') == 'right')    {
                $('footer ul li').hide();
                $('footer ul li.hide-on-mobile-device').css('display', 'inline-block');
                $(this).parent().css('display', 'inline-block');
                $(this).attr('data-position', 'left');
                $(this).find('i').removeClass('fa-arrow-right').addClass('fa-arrow-left');
            }else if($(this).attr('data-position') == 'left')    {
                $('footer ul li').css('display', 'inline-block');
                $('footer ul li.hide-on-mobile-device').hide();
                $(this).parent().css('display', 'inline-block');
                $(this).attr('data-position', 'right');
                $(this).find('i').removeClass('fa-arrow-left').addClass('fa-arrow-right');
            }
        });
    }
}
initMobileFooterEvent();

//donwloading string as file
function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename + '.txt');

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

//styling input type file
function styleInputTypeFile()    {
    jQuery(".upload-file").each(function(key, form){
        var inputs = document.querySelectorAll('.inputfile');
        Array.prototype.forEach.call( inputs, function( input ) {
            var label = input.nextElementSibling;
            input.addEventListener('change', function(e) {
                var myFile = this.files[0];
                var reader = new FileReader();

                reader.addEventListener('load', function (e) {
                    if(isJsonString(e.target.result) && has(JSON.parse(e.target.result), 'address'))    {
                        var keystore_string = e.target.result;
                        var address = JSON.parse(keystore_string).address;
                        //init upload button animation
                        initCustomInputFileAnimation(label);

                        setTimeout(function()   {
                            //show continue button next step button
                            $('.custom-auth-popup .popup-right .popup-body .camping-for-action').html('<div class="enter-pass-label"><label>Please enter your password for the secret key file.</label></div><div><input type="password" class="import-keystore-password"/></div><div class="continue-btn btn-container"><a href="javascript:void(0)" class="disabled white-blue-btn">CONTINUE</a></div>');

                            //calling IMPORT METHOD
                            $('.custom-auth-popup .popup-right .popup-body .continue-btn > a').click(function()   {
                                var keystore_password = $('.custom-auth-popup .popup-right .popup-body .import-keystore-password').val().trim();
                                if(keystore_password == '')  {
                                    basic.showAlert('Please enter password for your keystore file.', '', true);
                                }else if(keystore_password.length < 8 || keystore_password.length > 30)  {
                                    basic.showAlert('The password must be with minimum length of 8 characters and maximum 30.', '', true);
                                }else {
                                    $.ajax({
                                        type: 'POST',
                                        url: HOME_URL + '/app-import',
                                        data: {
                                            password: keystore_password,
                                            keystore: keystore_string,
                                            address: address
                                        },
                                        dataType: 'json',
                                        success: function (response) {
                                            if(response.success)    {
                                                localStorage.setItem('current-account', JSON.stringify({
                                                    address: '0x' + address,
                                                    keystore: response.success
                                                }));
                                                window.location.reload();
                                            }else if(response.error)    {
                                                basic.showAlert(response.error, '', true);
                                            }
                                        }
                                    });
                                }
                            });
                        }, 1000);
                    }else {
                        $('.custom-auth-popup .popup-right .popup-body #upload-keystore').val('');
                        basic.showAlert('Please upload valid keystore file.', '', true);
                        $('.custom-auth-popup .popup-right .popup-body .camping-for-action').html('');
                    }
                });

                reader.readAsBinaryString(myFile);
            });
            // Firefox bug fix
            input.addEventListener('focus', function(){ input.classList.add('has-focus'); });
            input.addEventListener('blur', function(){ input.classList.remove('has-focus'); });
        });
    });
}

function initCustomInputFileAnimation(this_btn) {
    var btn = $(this_btn);
    var loadSVG = btn.children("a").children(".load");
    var loadBar = btn.children("div").children("span");
    var checkSVG = btn.children("a").children(".check");
    btn.children("a").children("span").fadeOut(200, function() {
        btn.children("a").animate({
            width: 56
        }, 100, function() {
            loadSVG.fadeIn(300);
            btn.animate({
                width: 250
            }, 200, function() {
                btn.children("div").fadeIn(200, function() {
                    loadBar.animate({
                        width: "100%"
                    }, 500, function() {
                        loadSVG.fadeOut(200, function() {
                            checkSVG.fadeIn(200, function() {
                                setTimeout(function() {
                                    btn.children("div").fadeOut(200, function() {
                                        loadBar.width(0);
                                        checkSVG.fadeOut(200, function() {
                                            btn.children("a").animate({
                                                width: 150
                                            });
                                            btn.animate({
                                                width: 150
                                            }, 300, function() {
                                                btn.children("a").children("span").fadeIn(200);
                                            });
                                        });
                                    });
                                }, 500);
                            });
                        });
                    });
                });
            });
        });
    });
}

//checking if string is valid json
function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function displayMessageOnTransactionSend(tx_hash)  {
    $('.amount-to-container input#dcn').val('');
    $('.amount-to-container input#usd').val('');
    basic.showAlert('Your Dentacoin tokens are on their way to the Receiver\'s wallet. Check transaction status <a href="https://etherscan.io/tx/'+tx_hash+'" target="_blank" class="etherscan-link">Etherscan</a>.', '', true);
}

//clear current account data from the localstorage
function commonData()   {
    if(localStorage.getItem('current-account') != null)   {
        $('.forget-me-button').show();
        $('.forget-me-button a').click(function()   {
            var delete_account_obj = {};
            delete_account_obj.callback = function (result) {
                if (result) {
                    localStorage.clear();
                    window.location.reload();
                }
            };
            basic.showConfirm('Are you sure you want to forget this account?', '', delete_account_obj, true);
        });
    }
}
commonData();