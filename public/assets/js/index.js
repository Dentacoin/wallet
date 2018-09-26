basic.init();

$(document).ready(function() {
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

web3.currentProvider.publicConfigStore.on('update', onAccountSwitch);

window.addEventListener('load', function() {
    var is_chrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    var meta_mask = typeof web3 !== 'undefined' && web3.currentProvider.isMetaMask === true;
    console.log('chrome', is_chrome);
    console.log('meta_mask', meta_mask);
    console.log('is_mobile', basic.isMobile());
    //return previous transactions for adress
    //http://api.etherscan.io/api?module=account&action=txlist&address=0x0673fae9d1d64d12d92d31b87a3d0c08425719b5&sort=asc
});

var global_state = {};
var temporally_timestamp = 0;
var send_event = false;
global_state.curr_dcn_in_usd = parseFloat($('body').attr('data-current-dcn-in-usd'));
var App = {
    web3Provider: null,
    contracts: {},
    loading: false,
    init: function() {
        return App.initWeb3();
    },
    initWeb3: function() {
        // initialize web3
        if(typeof web3 !== 'undefined') {
            //reuse the provider of the Web3 object injected by Metamask
            App.web3Provider = web3.currentProvider;
        } else {
            //create a new provider and plug it directly into our local node
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:9545');
        }
        web3 = new Web3(App.web3Provider);
        global_state.account = web3.eth.defaultAccount;

        return App.initContract();
    },
    initContract: function() {
        $.getJSON('/assets/jsons/DentacoinToken.json', async function(DCNArtifact) {
            // get the contract artifact file and use it to instantiate a truffle contract abstraction
            App.contracts.DentacoinToken = TruffleContract(DCNArtifact);
            // set the provider for our contracts
            App.contracts.DentacoinToken.setProvider(App.web3Provider);

            //save current block number into state
            App.helper.getBlockNum();

            //set Transfer event watcher
            App.events.logTransfer();

            //build transactions history from previous events on the blockchain
            await App.getFromTransactionsEvents();
            await App.getToTransactionsEvents();
            App.buildTransactionsHistory(global_state.from_transactions.concat(global_state.to_transactions));

            onAccountSwitch();
        });
    },
    updateBalance: function()  {
        App.contracts.DentacoinToken.deployed().then(function(instance) {
            return instance.balanceOf.call(global_state.account);
        }).then(function(result) {
            global_state.curr_address_balance = result.toNumber();
            $('.homepage-container .dcn-value .value').html(result.toNumber());
            $('.homepage-container .output .value').html((result.toNumber() * global_state.curr_dcn_in_usd).toFixed(4));
        }).catch(function(err) {
            console.error(err);
        });
    },
    sendValue: function(send_addr, value)  {
        App.contracts.DentacoinToken.deployed().then(function(instance) {
            return instance.transfer(send_addr, value, {
                from: global_state.account,
                gas: 200000
            });
        }).then(function(result) {
            send_event = true;
        }).catch(function(err) {
            console.error(err);
        });
    },
    getFromTransactionsEvents: function()    {
        return new Promise(function(resolve, reject) {
            App.contracts.DentacoinToken.deployed().then(function(instance) {
                global_state.from_transactions = [];

                var from_transfer = instance.Transfer({_from: global_state.account}, {
                    fromBlock: 0,
                    toBlock: 'latest'
                });
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
    getToTransactionsEvents: function()    {
        return new Promise(function(resolve, reject) {
            App.contracts.DentacoinToken.deployed().then(function(instance) {
                global_state.to_transactions = [];

                var to_transfer = instance.Transfer({_to: global_state.account}, {
                    fromBlock: 0,
                    toBlock: 'latest'
                });
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
    buildTransactionsHistory: async function(array)    {
        if(array.length > 0)    {
            //getting the clinics from the api cached json
            var api_clinics = await $.getJSON('/assets/jsons/clinics.json');
            var table_html = '';
            var hidden_table_html = '';
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
            $('.transaction-history table tbody.hidden-tbody').hide();
            if(array.length > 3)    {
                $('.transaction-history .show-more-holder').html('<div class="col text-center"><a href="javascript:void(0)" ><strong>Show more</strong></a></div>');
                $('.transaction-history .show-more-holder a').click(function()  {
                    $(this).closest('.show-more-holder').html('');
                    $('.transaction-history table tbody.hidden-tbody').show();
                });
            }

            //looping to build the transaction history section
            for(var i = 0, len = array.length; i < len; i+=1)   {
                //timestamp*1000 because blockchain return unix timestamp
                var date_obj = new Date(array[i].timestamp*1000);
                var json_clinic = '';
                var other_address = '';
                var class_name = '';
                var label = '';
                var dcn_amount = '';
                var usd_amount = (array[i].args._value.toNumber() * global_state.curr_dcn_in_usd).toFixed(4);
                if(array[i].args._to == global_state.account)    {
                    //IF THE CURRENT ACCOUNT IS RECEIVER
                    other_address = array[i].args._from;
                    label = 'Received from';
                    class_name = 'received_from';
                    dcn_amount = '+'+array[i].args._value.toString()+' DCN';
                    if(has(api_clinics.clinics, array[i].args._from)) {
                        json_clinic = '<a href="javascript:void(0)" class="api-clinic">'+api_clinics.clinics[array[i].args._from].name+'</a>';
                    }
                }else if(array[i].args._from == global_state.account) {
                    //IF THE CURRENT ACCOUNT IS SENDER
                    other_address = array[i].args._to;
                    if(has(api_clinics.clinics, array[i].args._to)) {
                        json_clinic = '<a href="javascript:void(0)" class="api-clinic">'+api_clinics.clinics[array[i].args._to].name+'</a>';
                        label = 'Payed to';
                        class_name = 'payed_to';
                    }else {
                        label = 'Sent to';
                        class_name = 'sent_to';
                    }
                    dcn_amount = '-'+array[i].args._value.toString()+' DCN';
                }

                //first 3 are visible, rest are going to hidden tbody
                if(i < 3)   {
                    table_html+='<tr class="'+class_name+'"><td class="align-middle icon"></td><td class="align-middle"><ul class="align-middle"><li>'+(date_obj.getUTCMonth() + 1) + '/' + date_obj.getUTCDate() + '/' + date_obj.getUTCFullYear()+'</li><li>'+new Date(array[i].timestamp*1000).getHours()+':'+new Date(array[i].timestamp*1000).getMinutes()+'</li></ul></td><td class="align-middle"><ul class="align-middle"><li><span><strong>'+label+': </strong>'+json_clinic+' ('+other_address+')</span></li><li><a href="https://etherscan.io/tx/'+array[i].transactionHash+'" target="_blank"><strong class="transaction-id">Transaction ID</strong></a></li></ul></td><td class="align-middle"><ul class="align-middle"><li class="value-dcn">'+dcn_amount+'</li><li>'+usd_amount+' USD</li></ul></td></tr>';
                }else {
                    hidden_table_html+='<tr class="'+class_name+'"><td class="align-middle icon"></td><td class="align-middle"><ul class="align-middle"><li>'+(date_obj.getUTCMonth() + 1) + '/' + date_obj.getUTCDate() + '/' + date_obj.getUTCFullYear()+'</li><li>'+new Date(array[i].timestamp*1000).getHours()+':'+new Date(array[i].timestamp*1000).getMinutes()+'</li></ul></td><td class="align-middle"><ul class="align-middle"><li><span><strong>'+label+': </strong>'+json_clinic+' ('+other_address+')</span></li><li><a href="https://etherscan.io/tx/'+array[i].transactionHash+'" target="_blank"><strong class="transaction-id">Transaction ID</strong></a></li></ul></td><td class="align-middle"><ul class="align-middle"><li class="value-dcn">'+dcn_amount+'</li><li>'+usd_amount+' USD</li></ul></td></tr>';
                }
            }
            $('.transaction-history table tbody.visible-tbody').html(table_html);
            $('.transaction-history table tbody.hidden-tbody').html(hidden_table_html);
        }else {
            //display no previous transaction history
            $('.transaction-history table tbody.visible-tbody').html('<tr><td class="text-center">No previous transactions found.</td></tr>');
            $('.transaction-history table tbody.hidden-tbody').html('');
        }
        return false;
    },
    events: {
        logTransfer: function() {
            App.contracts.DentacoinToken.deployed().then(function(instance) {
                instance.Transfer().watch(function(error, result){
                    if(!error) {
                        if(send_event && $('body').hasClass('amount-to'))   {
                            basic.showAlert('Your transaction was confirmed.');
                            $('.amount-to-container input#dcn').val('');
                            $('.amount-to-container input#usd').val('');
                        }
                    }else {
                        console.log(error);
                    }
                });
            });
        }
    },
    helper: {
        addBlockTimestampToTransaction: function(transaction)    {
            return new Promise(function(resolve, reject) {
                web3.eth.getBlock(transaction.blockNumber, function(error, result) {
                    if (error !== null) {
                        reject(error);
                    }
                    temporally_timestamp = result.timestamp;
                    resolve(temporally_timestamp);
                });
            });
        },
        getBlockNum: function()  {
            web3.eth.getBlockNumber(function(error, result) {
                if(!error){
                    global_state.curr_block = result;
                }
            });
        }
    }
};
App.init();

function commonDataForAllPages()    {
    $('nav .buy-temporally').click(function(e) {
        e.preventDefault();
        basic.showAlert('<div class="text-center">Coming soon!</div>');
    });
}
commonDataForAllPages();

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
                    $('.homepage-container .values-and-qr-code .qr-code').addClass('inline-block-important');
                }
            }
        });
    }
}

//PAGES
if($('body').hasClass('home'))  {
    $('.homepage-container .copy-address').click(function()   {
        var this_el = $(this);
        var str_to_copy = $('.homepage-container .address span');
        if(str_to_copy.data('valid-address'))   {
            var $temp = $("<input>");
            $("body").append($temp);
            $temp.val(str_to_copy.html()).select();
            document.execCommand("copy");
            $temp.remove();

            this_el.tooltip('show');
            setTimeout(function()   {
                this_el.tooltip('hide');
            }, 1000);
        }
    });

    $('.homepage-container .copy-address').tooltip({
        trigger: 'click'
    });
}else if($('body').hasClass('send')) {
    //on input and if valid address add active class to 'next' button for UI
    $('.send-container .wallet-address input').on('input', function()   {
        if(innerAddressCheck($(this).val().trim()))   {
            $('.send-container .next a').addClass('active');
        }else if($('.send-container .next a').hasClass('active')){
            $('.send-container .next a').removeClass('active');
        }
    });

    $('.send-container .next a').click(function()  {
        if(innerAddressCheck($('.send-container .wallet-address input').val().trim())) {
            window.location = HOME_URL + '/send/amount-to/' + $('.send-container .wallet-address input').val().trim();
        }else {
            basic.showAlert('Please enter valid address.');
        }
    });
}else if($('body').hasClass('amount-to')) {
    var curr_addr = window.location.href.split('/')[window.location.href.split('/').length-1];
    //redirect to /send if the address it not valid or using the same address as the owner
    if(!web3.isAddress(curr_addr) || curr_addr == global_state.account)   {
        window.location = HOME_URL + '/send';
    }

    //editing the address logic
    $('.amount-to-container .edit-address').click(function()    {
        if($(this).hasClass('ready-to-edit'))   {
            var editing_address = $('.amount-to-container .value-to-edit').val().trim();
            if(innerAddressCheck(editing_address))   {
                $(this).find('img').attr('src', $(this).find('img').attr('data-default-src'));
                $('.amount-to-container .wallet-address span.address').html(editing_address);
                $('.amount-to-container .value-to-edit').hide();
                $('.amount-to-container .address-container span').show();
                $('.amount-to-container .address-container').removeClass('editing');
                $(this).removeClass('ready-to-edit');
                window.history.pushState(null, null, HOME_URL+'/send/amount-to/'+editing_address);
            }else {
                basic.showAlert('Please enter valid address.');
            }
        }else {
            $(this).addClass('ready-to-edit');
            $(this).find('img').attr('src', $(this).find('img').attr('data-check-src'));
            $(this).closest('.wallet-address').find('.address-container').addClass('editing');
            $('.amount-to-container .address-container span').hide();
            $('.amount-to-container .address-container .value-to-edit').show().select();
        }
    });

    //on input in dcn input change usd input
    $('.amount-to-container input#dcn').on('input', function()  {
        $('.amount-to-container input#usd').val(($(this).val().trim() * global_state.curr_dcn_in_usd).toFixed(4));
    });

    //on input in usd input change dcn input
    $('.amount-to-container input#usd').on('input', function()  {
        $('.amount-to-container input#dcn').val($(this).val().trim() / global_state.curr_dcn_in_usd);
    });

    function sendValue()    {
        var dcn_val = $('.amount-to-container input#dcn').val().trim();
        var usd_val = $('.amount-to-container input#usd').val().trim();
        if(isNaN(dcn_val) || isNaN(usd_val) || dcn_val == '' || dcn_val == 0 || usd_val == '' || usd_val == 0)  {
            //checking if not a number or empty values
            basic.showAlert('Please make sure all values are numbers.');
        }else if(dcn_val < 0 || usd_val < 0)  {
            //checking if negative numbers
            basic.showAlert('Please make sure all values are more than 0.');
        }else if(dcn_val < 10)  {
            //checking if dcn value is lesser than 10 (contract condition)
            basic.showAlert('Please make sure dcn value is more than 10. You cannot send less than 10 DCN.');
        }else if(dcn_val > global_state.curr_address_balance)  {
            //checking if current balance is lower than the desired value to send
            basic.showAlert('The value you want to send is higher than your balance.');
        }else if($('.amount-to-container .address-container').hasClass('editing'))  {
            //checking if editing address is done
            basic.showAlert('Please make sure you are done with address editing.');
        }else if(!innerAddressCheck($('.amount-to-container .wallet-address span.address').html()))  {
            //checking again if valid address
            basic.showAlert('Please make sure you are sending to valid address.');
        }else {
            var callback_obj = {};
            callback_obj.callback = function(result) {
                if(result)  {
                    App.sendValue($('.amount-to-container .wallet-address span.address').html(), dcn_val);
                }
            };
            basic.showConfirm('Are you sure you want to continue?', '', callback_obj);
        }
    }
}

function innerAddressCheck(address)    {
    return web3.isAddress(address) && address != global_state.account;
}

async function onAccountSwitch() {
    if(typeof(global_state.account) != 'undefined')   {
        global_state.account = web3.eth.defaultAccount;
        initHomepageUserData();

        //build transactions history from previous events on the blockchain
        await App.getFromTransactionsEvents();
        await App.getToTransactionsEvents();
        App.buildTransactionsHistory(global_state.from_transactions.concat(global_state.to_transactions));
    }else {
        if($('.homepage-container').length > 0) {
            $('.homepage-container .address span').html($('.homepage-container .address span').attr('data-log-metamask'));
            $('.homepage-container .address .copy-address').hide();
        }
    }
}

function initHomepageUserData() {
    if($('.homepage-container').length > 0) {
        //change the address html and show the copy address button
        $('.homepage-container .address span').html(global_state.account);
        $('.homepage-container .address span').data('valid-address', true);
        $('.homepage-container .address .copy-address').show();

        //init new qr code
        getQrCode();

        //refresh the current dentacoin value
        App.updateBalance();
    }
}

function has(object, key) {
    return object ? hasOwnProperty.call(object, key) : false;
}

function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key];
        var y = b[key];

        if (typeof x == "string")
        {
            x = (""+x).toLowerCase();
        }
        if (typeof y == "string")
        {
            y = (""+y).toLowerCase();
        }

        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}