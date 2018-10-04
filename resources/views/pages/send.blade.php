@extends("layout")
@section("content")
    <div class="send-container">
        <div class="container">
            <div class="row-flex fs-0">
                <div class="col-12 col-sm-10 offset-sm-1 wallet-address input-with-button left-side">
                    <input type="text" placeholder="Input wallet address or Clinic's name" maxlength="42"/>
                    <div class="inline-block btn-container next"><a href="javascript:void(0);" class="gray-btn">NEXT</a></div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row-flex">
                <div class="col-12">
                    <div class="horizontal-white-line-120 line"></div>
                    <div class="text-center fill-the-address">Fill the address or the name of the clinic that you want to Send DCN, in the field above.</div>
                </div>
            </div>
        </div>
    </div>
@endsection

@section("meta_block")
    <title>Send Dentacoin (DCN) via Dentacoin Wallet App</title>
    <meta name="description" content="Dentacoin Wallet App enables sending DCN tokens to any valid Ethereum address. Fast, secure and easier than ever!"/>
    <meta name="keywords" content="send dentacoin, store dentacoin, dentacoin wallet, pay with dentacoin"/>
    <meta property="og:url" content="{{Request::url()}}"/>
    <meta property="og:title" content="Send Dentacoin (DCN) via Dentacoin Wallet App"/>
    <meta property="og:description" content="Dentacoin Wallet App enables sending DCN tokens to any valid Ethereum address. Fast, secure and easier than ever!"/>
@endsection