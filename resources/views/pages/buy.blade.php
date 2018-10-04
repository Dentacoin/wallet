@extends("layout")
@section("content")
    <div class="buy-container">
        {{--<div class="container">
            <div class="row-flex fs-0">
                <div class="col-12 col-md-5 input-container">
                    <div class="title">Pay with:</div>
                    <div class="wrapper input-with-exchange left-side fs-0 flex">
                        <input type="text"/>
                        <button class="btn btn-light dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">USD</button>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="#">Euro</a>
                            <a class="dropdown-item" href="#">Bitcoin</a>
                        </div>
                    </div>
                </div>
                <div class="col-md-2 refresh-icon"><i class="fa fa-refresh" aria-hidden="true"></i></div>
                <div class="col-12 col-md-5 input-container">
                    <div class="title">You get:</div>
                    <div class="wrapper input-with-exchange right-side fs-0 flex">
                        <button class="btn btn-light dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">BTC</button>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="#">Euro</a>
                            <a class="dropdown-item" href="#">Bitcoin</a>
                        </div>
                        <input type="text"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row-flex">
                <div class="col-12">
                    <div class="horizontal-white-line-120 line"></div>
                    <div class="text-center choose-the-currency">Choose the currency that you want to pay with and receive, from the drop-down menu. Than input the amount that you want to be exchanged.</div>
                </div>
            </div>
        </div>--}}
        <div class="iframe-wrapper">
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
        </div>
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