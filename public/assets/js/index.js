// ========== DANIEL ==========
// Setup
//import { Connect } from './node_modules/uport-connect/dist/uport-connect.js';
/*var uportconnect = window.uportconnect;
const appName = 'Dentacoin Wallet';
const connect = new uportconnect.Connect(appName, {network: 'rinkeby'});
const web3 = connect.getWeb3();

// Setup the simple Status contract - allows you to set and read a status string
const abi = [{"constant":false,"inputs":[{"name":"status","type":"string"}],"name":"updateStatus","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"addr","type":"address"}],"name":"getStatus","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"}];

const StatusContract = web3.eth.contract(abi);
const statusInstance = StatusContract.at('0x70A804cCE17149deB6030039798701a38667ca3B');

// uPort connect
const uportConnect = function () {

    web3.eth.getCoinbase((error, address) => {
        if (error) { throw error }
        globalState.ethAddress = address;

        // This one is for display purposes - MNID encoding includes network
        globalState.uportId = window.uportconnect.MNID.encode({network: '0x4', address: address});

        statusInstance.getStatus.call(globalState.ethAddress, (err, st) => {
            globalState.currentStatus = st
            web3.eth.getBalance(globalState.ethAddress, (err, bal) => {
                globalState.ethBalance = web3.fromWei(bal);
                render();
            })
        })
    })
}

// Send ether
const sendEther = () => {
    const value = parseFloat(globalState.sendToVal) * 1.0e18
    web3.eth.sendTransaction(
        {
            to: globalState.sendToAddr,
            value: value
        },
        (error, txHash) => {
            if (error) { throw error }
            globalState.txHashSentEth = txHash
            render()
        }
    )
}

// Set Status

const setStatus = () => {
    const newStatusMessage = globalState.statusInput
    statusInstance.updateStatus(newStatusMessage,
        (error, txHash) => {
            if (error) { throw error }
            globalState.txHashSetStatus = txHash
            render()
        })

};*/
// ========== /DANIEL ==========


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

window.addEventListener('load', function() {
    var is_chrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    var meta_mask = typeof web3 !== 'undefined' && web3.currentProvider.isMetaMask === true;
    console.log('chrome', is_chrome);
    console.log('meta_mask', meta_mask);
    console.log('is_mobile', basic.isMobile());
    //return previous transactions for adress
    //http://api.etherscan.io/api?module=account&action=txlist&address=0x0673fae9d1d64d12d92d31b87a3d0c08425719b5&sort=asc
});

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
        return App.initContract();
    },

    initContract: function() {
        $.getJSON('/assets/contracts/DCN.json', function(DCNArtifact) {
            // get the contract artifact file and use it to instantiate a truffle contract abstraction
            App.contracts.DCN = TruffleContract(DCNArtifact);
            // set the provider for our contracts
            App.contracts.DCN.setProvider(App.web3Provider);
        });
    },
    events: {

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
    $.ajax({
        type: 'POST',
        url: HOME_URL + '/get-qr-code-from-address',
        data: {
            'address' : web3.eth.defaultAccount
        },
        dataType: 'json',
        success: function (response) {
            if(response.success)    {
                $('.homepage-container .values-and-qr-code .qr-code img').attr('src', response.success);
                $('.homepage-container .values-and-qr-code .qr-code').show();
            }
        }
    });
}

//PAGES
if($('body').hasClass('home'))  {
    onAccountSwitch();
    web3.currentProvider.publicConfigStore.on('update', onAccountSwitch);

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
    if(!web3.isAddress(curr_addr) || curr_addr == web3.eth.defaultAccount)   {
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
                $('.amount-to-container .address span').show();
                $(this).removeClass('ready-to-edit');
                window.history.pushState(null, null, HOME_URL+'/send/amount-to/'+editing_address);
            }else {
                basic.showAlert('Please enter valid address.');
            }
        }else {
            $(this).addClass('ready-to-edit');
            $(this).find('img').attr('src', $(this).find('img').attr('data-check-src'));
            $(this).closest('.wallet-address').find('.address').addClass('editing');
            $('.amount-to-container .address span').hide();
            $('.amount-to-container .address .value-to-edit').show().select();
        }
    });

    //on input in dcn input change usd input
    var curr_dcn_in_usd = parseFloat($('.amount-to-container').attr('data-current-dcn-in-usd'));
    $('.amount-to-container input#dcn').on('input', function()  {
        $('.amount-to-container input#usd').val($(this).val().trim() * curr_dcn_in_usd);
    });

    //on input in usd input change dcn input
    $('.amount-to-container input#usd').on('input', function()  {
        $('.amount-to-container input#dcn').val($(this).val().trim() / curr_dcn_in_usd);
    });

    function sendValue()    {
        var dcn_val = $('.amount-to-container input#dcn').val().trim();
        var usd_val = $('.amount-to-container input#usd').val().trim();
        if(isNaN(dcn_val) || isNaN(usd_val) || dcn_val == '' || dcn_val == 0 || usd_val == '' || usd_val == 0)  {
            basic.showAlert('Please make sure all values are numbers.');
        }else if(dcn_val < 0 || usd_val < 0)  {
            basic.showAlert('Please make sure all values are more than 0.');
        }else if(dcn_val < 10)  {
            basic.showAlert('Please make sure dcn value is more than 10. You cannot send less than 10 DCN.');
        }else {
            var callback_obj = {};
            callback_obj.callback = function(result) {
                if(result)  {
                    console.log('continue to contract call');
                }
            };
            basic.showConfirm('Are you sure you want to continue?', '', callback_obj);
        }
    }
}

function innerAddressCheck(address)    {
    return web3.isAddress(address) && address != web3.eth.defaultAccount;
}

function onAccountSwitch() {
    if(typeof(web3.eth.defaultAccount) != 'undefined')   {
        $('.homepage-container .address span').html(web3.eth.defaultAccount);
        $('.homepage-container .address span').data('valid-address', true);
        $('.homepage-container .address .copy-address').show();
        getQrCode();
    }else {
        $('.homepage-container .address span').html($('.homepage-container .address span').attr('data-log-metamask'));
        $('.homepage-container .address .copy-address').hide();
    }
}

