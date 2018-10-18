@extends("layout")
@section("content")
    <div class="buy-container" data-dcn-for-one-usd="{{$dcn_for_one_usd}}">
        <div class="container">
            <div class="row-flex fs-0">
                <div class="col-12 col-md-5 input-container">
                    <div class="title">Pay with:</div>
                    <div class="subtitle">Transaction limit: 50 - 3000 USD</div>
                    <div class="wrapper input-with-label left-side fs-0 flex">
                        <input type="number" id="paying-with-amount" value="50"/>
                        <div class="label"><span>USD</span></div>
                        {{--<button class="btn btn-light dropdown-toggle label paying-with-currency-switch" data-paying-currency="usd" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">USD</button>
                        <div class="dropdown-menu currency-dropdown">
                            <a class="dropdown-item" href="#">USD</a>
                            <a class="dropdown-item" href="#">EURO</a>
                        </div>--}}
                    </div>
                </div>
                <div class="col-md-2 refresh-icon"><i class="fa fa-refresh" aria-hidden="true"></i></div>
                <div class="col-12 col-md-5 input-container dcn-amount">
                    <div class="title">You get:</div>
                    <div class="subtitle">The exchange rate may change in the process.</div>
                    <div class="wrapper input-with-label left-side fs-0 flex">
                        <input type="number" id="dcn-amount"/>
                        <div class="label"><span>DCN</span></div>
                    </div>
                </div>
            </div>
            <div class="row form-row address text-center">
                <div class="col-12 col-md-5 inline-block">
                    <input type="text" placeholder="Ethereum address" class="single-input address-field" maxlength="42"/>
                </div>
            </div>
            <div class="row form-row email text-center">
                <div class="col-12 col-md-5 inline-block">
                    <input type="text" placeholder="Email" class="single-input email-field"/>
                </div>
            </div>
            <div class="row form-row text-center">
                <div class="col-12 col-md-5 inline-block privacy-policy fs-0 text-left">
                    <div class="inline-block-top checkbox">
                        <input type="checkbox" class="privacy-policy-agree" id="privacy-policy-agree"/>
                    </div>
                    <label class="inline-block-top" for="privacy-policy-agree">By submitting the form, you agree to our <a href="https://dentacoin.com/privacy-policy" target="_blank">Privacy Policy</a> .</label>
                </div>
            </div>
            <div class="row form-row btn-container">
                <a href="javascript:void(0)" class="bluegreen-white-btn buy-dcn-btn">BUY</a>
            </div>
        </div>
        {{--<div class="container">
            <div class="row-flex">
                <div class="col-12">
                    <div class="horizontal-white-line-120 line"></div>
                    <div class="text-center choose-the-currency">
                        The easiest way to buy Dentacoin with Visa & Mastercard:
                        Just enter the amount and choose your preferred currency.
                        <div class="padding-top">Please note that the exchange rate may change in the process.</div></div>
                </div>
            </div>
        </div>--}}
        {{--<div class="iframe-wrapper">
            <iframe src="https://changelly.com/widget/v1?auth=email&from=USD&to=DCN&merchant_id=e329f113040f&address=&amount=1&ref_id=e329f113040f&color=136584" class="changelly" scrolling="no" width="500">Can't load widget</iframe>
            <script type="text/javascript">
                var changellyModal = document.getElementById('changellyModal');
                var changellyButton = document.getElementById('changellyButton');
                var changellyCloseButton = document.getElementsByClassName('changellyModal-close')[0];
                changellyCloseButton.onclick = function() {
                    changellyModal.style.display = 'none';
                };
                changellyButton.onclick = function widgetClick(e) {
                    e.preventDefault();
                    changellyModal.style.display = 'block';
                };
            </script>
        </div>--}}
    </div>
@endsection

@section("meta_block")
    <title>Buy Dentacoin (DCN) via Dentacoin Wallet App</title>
    <meta name="description" content="Dentacoin Wallet App allows users to easily and securely buy Dentacoin (DCN) with USD, Ether (ETH), Bitcoin (BTC) and 100+ other cryptocurrencies."/>
    <meta name="keywords" content="buy dentacoin, how to buy dentacoin, buy dentacoin with usd"/>
    <meta property="og:url" content="{{Request::url()}}"/>
    <meta property="og:title" content="Buy Dentacoin (DCN) via Dentacoin Wallet App"/>
    <meta property="og:description" content="Dentacoin Wallet App allows users to easily and securely buy Dentacoin (DCN) with USD, Ether (ETH), Bitcoin (BTC) and 100+ other cryptocurrencies."/>
@endsection