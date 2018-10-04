@extends("layout")
@section("content")
    <div class="amount-to-container">
        <div class="container">
            <div class="row-flex fs-0">
                <div class="col-12 col-md-10 offset-sm-1 col-lg-8 offset-lg-2 wallet-address">
                    <div class="inline-block address-container">
                        <span class="label">Send to:</span>
                        <span class="address">{{$address}}</span>
                        <input type="text" value="{{$address}}" class="value-to-edit module-field" maxlength="42"/>
                    </div>
                    <figure class="inline-block btn-container" itemscope="" itemtype="http://schema.org/ImageObject">
                        <a href="javascript:void(0)" class="edit-address"><img src="{{URL::asset('assets/images/edit.png') }}" data-check-src="{{URL::asset('assets/images/check.png') }}" data-default-src="{{URL::asset('assets/images/edit.png') }}" alt="" itemprop="contentUrl"/></a>
                    </figure>
                </div>
            </div>
            <div class="row-flex fs-0 exchange-inputs">
                <div class="col-12 col-md-5 input-container">
                    <div class="title">Pay with:</div>
                    <div class="wrapper input-with-label left-side fs-0 flex">
                        <input type="number" id="dcn"/>
                        <div class="label"><span>DCN</span></div>
                    </div>
                </div>
                <figure class="col-md-2 equal-icon" itemscope="" itemtype="http://schema.org/ImageObject">
                    <img src="{{URL::asset('assets/images/equal.png') }}" alt="Equal icon" itemprop="contentUrl"/>
                </figure>
                <div class="col-12 col-md-5 input-container">
                    <div class="title">You get:</div>
                    <div class="wrapper input-with-label right-side fs-0 flex">
                        <input type="number" id="usd"/>
                        <div class="label"><span>USD</span></div>
                    </div>
                </div>
                <div class="col-12 helper-label text-center">
                    Input the amount that you want to send to the wallet address above.
                </div>
                <div class="col-12 btn-container text-center">
                    <a href="javascript:sendValue()" class="bluegreen-white-btn">Send</a>
                </div>
            </div>
        </div>
    </div>
@endsection


@section("meta_block")
    <title>Send Dentacoin (DCN) and/or Pay to Your Dentist</title>
    <meta name="description" content="Dentacoin Wallet App allows users to send DCN tokens to other wallets. It also makes it easier than ever for patients to pay to their dentist in DCN."/>
    <meta name="keywords" content="send dentacoin, store dentacoin, pay with dentacoin, dentacoin wallet"/>
    <meta property="og:url" content="{{Request::url()}}"/>
    <meta property="og:title" content="Send Dentacoin (DCN) and/or Pay to Your Dentist"/>
    <meta property="og:description" content="Dentacoin Wallet App allows users to send DCN tokens to other wallets. It also makes it easier than ever for patients to pay to their dentist in DCN."/>
@endsection