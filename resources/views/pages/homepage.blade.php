@extends("layout")
@section("content")
    <div class="homepage-container">
        <div class="your-dcn-wallet">
            <div class="container">
                <div class="row-flex">
                    <div class="col-12 text-center">
                        <div class="subtitle">Your Dentacoin address:</div>
                        <div class="address">
                            <figure class="inline-block" itemscope="" itemtype="http://schema.org/ImageObject"><a href="javascript:void(0)" class="copy-address" data-toggle="tooltip" title="Copied."><img src="{{URL::asset('assets/images/copy.svg') }}" alt="Copy address to clipboard icon" itemprop="contentUrl"/></a></figure>
                            <span data-log-metamask="You are not logged in."></span>
                            <input class="important-message" type="hidden" value="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container values-and-qr-code">
            <div class="row-flex center-content">
                <div class="col-8 col-sm-8 offset-0 col-md-7 col-lg-6 col-xl-6 offset-md-1 offset-lg-2 offset-xl-1 transfer-value">
                    <div class="fs-0 current-value">
                        <figure class="inline-block rotate-animation animation" itemscope="" itemtype="http://schema.org/ImageObject"><a href=""><img src="{{URL::asset('assets/images/exchange-icon.png') }}" alt="Exchange icon" itemprop="contentUrl"/></a></figure>
                        <div class="dcn-value inline-block"><div class="mobile-symbol">DCN</div><span class="value">0</span><span class="desktop-symbol"> DCN</span></div>
                    </div>
                    <div class="transferred-value">
                        <div class="output">= <span class="mobile-symbol">USD</span><span class="value">0</span><span class="desktop-symbol"> USD</span>
                            {{--<button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                            <div class="dropdown-menu">
                                <a class="dropdown-item" href="#">Euro</a>
                                <a class="dropdown-item" href="#">Bitcoin</a>
                            </div>--}}
                        </div>
                    </div>
                </div>
                <figure class="col-4 col-sm-4 col-md-3 qr-code" itemscope="" itemtype="http://schema.org/ImageObject">
                    <a href="javascript:void(0)">
                        <img src="{{URL::asset('assets/images/dentacoin-rocks.jpg') }}" alt="qr code" itemprop="contentUrl"/>
                    </a>
                </figure>
            </div>
        </div>
    </div>
@endsection

@section("meta_block")
    <title>Dentacoin Wallet App: Buy, Store & Manage Your DCN Tokens</title>
    <meta name="description" content="Dentacoin Wallet allows users to easily and securely store, send, receive DCN tokens, as well as to buy DCN with credit card and other cryptocurrencies."/>
    <meta name="keywords" content="buy dentacoin, store dentacoin, dentacoin wallet, pay with dentacoin"/>
    <meta property="og:url" content="{{Request::url()}}"/>
    <meta property="og:title" content="Dentacoin Wallet App: Buy, Store & Manage Your DCN Tokens"/>
    <meta property="og:description" content="Dentacoin Wallet allows users to easily and securely store, send, receive DCN tokens, as well as to buy DCN with credit card and other cryptocurrencies."/>
@endsection