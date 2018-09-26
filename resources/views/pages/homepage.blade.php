@extends("layout")
@section("content")
    <div class="homepage-container">
        <div class="your-dcn-wallet">
            <div class="container">
                <div class="row-flex">
                    <div class="col-12 text-center">
                        <div class="subtitle">Your Dentacoin address:</div>
                        <div class="address">
                            <figure class="inline-block"><a href="javascript:void(0)" class="copy-address" data-toggle="tooltip" title="Copied."><img src="{{URL::asset('assets/images/copy.svg') }}" class="Copy address to clipboard icon"/></a></figure>
                            <span data-log-metamask="Please log in with MetaMask."></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row-flex center-content values-and-qr-code">
                <div class="col-8 col-sm-8 offset-0 col-md-7 col-lg-6 col-xl-6 offset-md-1 offset-lg-2 offset-xl-1 transfer-value">
                    <div class="fs-0 current-value">
                        <figure class="inline-block"><a href=""><img src="{{URL::asset('assets/images/exchange-icon.png') }}" alt="Exchange icon"/></a></figure>
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
                <figure class="col-4 col-sm-4 col-md-3 qr-code">
                    <a href="javascript:void(0)">
                        <img src="" alt="qr code"/>
                    </a>
                </figure>
            </div>
        </div>
    </div>
@endsection
