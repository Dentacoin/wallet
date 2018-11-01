@extends("layout")
@section("content")
    <div class="send-container">
        <div class="container">
            <div class="row-flex fs-0">
                <div class="col-12 col-sm-10 offset-sm-1  col-lg-8 offset-lg-2 wallet-address input-with-button left-side">
                    @if(!empty($addresses))
                        <select class="combobox combobox-input" data-inserted-from-upload="false">
                            <option></option>
                            @foreach($addresses as $address)
                                <option value="{{$address}}">{{$address}}</option>
                            @endforeach
                        </select>
                    @else
                        <input type="text" class="combobox-input input" data-inserted-from-upload="false" placeholder="Enter receiving address/clinic or scan QR code" maxlength="42"/>
                    @endif
                    <figure class="inline-block btn-container" itemscope="" itemtype="http://schema.org/ImageObject">
                        <a href="javascript:void(0);" class="scan-qr-code">
                            <img src="{{URL::asset('assets/images/scan-qr-code.svg') }}" alt="Scan QR code button" itemprop="contentUrl"/>
                        </a>
                    </figure>
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
    <div class="scan-qr-code-popup">
        <div class="wrapper">
            <div class="custom-modal">
                <button type="button" class="custom-close-button">×</button>
                <div id="app">
                    <qr-code class="qr-code-container"></qr-code>
                    <qr-code-upload class="qr-code-upload-container"></qr-code-upload>
                </div>
            </div>
        </div>
    </div>{{--
    <div class="scan-qr-code-popup">
        <div class="wrapper">
            <div class="custom-modal">
                <button type="button" class="custom-close-button">×</button>
                <div id="mainbody">
                    <table class="tsel" border="0" width="100%">
                        <tr>
                            <td valign="top" align="center" width="50%">
                                <table class="tsel" border="0">
                                    <tr>
                                        <td><img class="selector" id="qrimg" onclick="setimg()" align="right"/></td></tr>
                                    <tr>
                                        <td colspan="2" align="center">
                                            <div id="outdiv"></div>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr style="display: none;">
                            <td colspan="3" align="center">
                                <div id="result"></div>
                            </td>
                        </tr>
                    </table>
                </div>
                <canvas id="qr-canvas" width="800" height="600"></canvas>
            </div>
        </div>
    </div>--}}
@endsection

@section("meta_block")
    <title>Send Dentacoin (DCN) via Dentacoin Wallet App</title>
    <meta name="description" content="Dentacoin Wallet App enables sending DCN tokens to any valid Ethereum address. Fast, secure and easier than ever!"/>
    <meta name="keywords" content="send dentacoin, store dentacoin, dentacoin wallet, pay with dentacoin"/>
    <meta property="og:url" content="{{Request::url()}}"/>
    <meta property="og:title" content="Send Dentacoin (DCN) via Dentacoin Wallet App"/>
    <meta property="og:description" content="Dentacoin Wallet App enables sending DCN tokens to any valid Ethereum address. Fast, secure and easier than ever!"/>
@endsection