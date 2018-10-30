@extends("layout")
@section("content")
    <div class="send-container">
        <div class="container">
            <div class="row-flex fs-0">
                <div class="col-12 col-sm-10 offset-sm-1 wallet-address input-with-button left-side">
                    @if(!empty($addresses))
                        <select class="combobox combobox-input">
                            <option></option>
                            @foreach($addresses as $address)
                                <option value="{{$address}}">{{$address}}</option>
                            @endforeach
                        </select>
                    @else
                        <input type="text" class="combobox-input input" placeholder="Enter receiving address/clinic or scan QR code" maxlength="42"/>
                    @endif
                    <div class="inline-block btn-container"><a href="javascript:void(0);" class="scan-qr-code">Scan</a></div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row-flex">
                <div class="col-12">
                    <div class="btn-container next"><a href="javascript:void(0);" class="bluegreen-white-btn">NEXT</a></div>
                    <div class="text-center fill-the-address">Enter the Receiver's Dentacoin wallet address. If you want to pay for your treatment to a Dentacoin Partner Dentist or Clinic, just type their name in the field above (Feature not supported yet).</div>
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