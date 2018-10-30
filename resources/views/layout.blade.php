<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <link rel="shortcut icon" href="{{URL::asset('assets/images/favicon.png') }}" type="image/x-icon"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5"/>
    <meta name="csrf-token" content="{{ csrf_token() }}"/>
    @yield("meta_block")
    <meta property="og:image" content="{{URL::asset('assets/images/dentacoin-facebook-thumb.jpg') }}"/>
    <style>

    </style>
    <link rel="stylesheet" type="text/css" href="/dist/css/front-libs-style.css?v=1.0.14">
    <link rel="stylesheet" type="text/css" href="/assets/css/style.css?v=1.0.14">
    <script src="/assets/libs/popper/popper.min.js?v=1.0.2"></script>
    <script>
        var HOME_URL = '{{ route("home") }}';
    </script>
</head>
<body class="@if(!empty(Route::current())) {{Route::current()->getName()}} @else class-404 @endif" @if(isset($dcn_in_usd)) data-current-dcn-in-usd="{{$dcn_in_usd}}" @endif>
    @if(!empty($privacy_policy_cookie))
        <div class="privacy-policy-cookie">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="text inline-block">This site uses cookies. Read more about the use of personal data in our <a href="https://dentacoin.com/privacy-policy" class="link" target="_blank">Privacy Policy</a>.</div>
                        <div class="button inline-block"><a href="javascript:void(0);" class="white-aqua-btn accept">Accept</a></div>
                    </div>
                </div>
            </div>
        </div>
    @endif
    <header>
        <div class="container">
            <div class="row">
                <div class="top-navigation">
                    <div class="col-lg-12 col-md-12 col-sm-12 item">
                        <figure itemscope="" itemtype="http://schema.org/Organization" class="logo">
                            <a itemprop="url" href="{{ route('home') }}" @if(!empty(Route::current())) @if(Route::current()->getName() == "home") tabindex="=-1" @endif @endif><img src="{{URL::asset('assets/images/logo.svg') }}" itemprop="logo" alt="Dentacoin logo"/></a>
                        </figure>
                    </div>
                </div>
            </div>
        </div>
        <div class="background-white">
            <div class="container">
                <div class="row fs-0">
                    <nav>
                        <ul itemtype="http://schema.org/SiteNavigationElement">
                            <li class="col-4">
                                <a class="nav-link nav-button @if(!empty(Route::current()) && Route::current()->getName() == "buy")nav-active @endif" href="{{route('buy')}}" itemprop="url"><span itemprop="name">BUY</span></a>
                            </li>
                            <li class="col-4">
                                <a class="nav-link nav-button @if(!empty(Route::current()) && Route::current()->getName() == "home")nav-active @endif" href="{{route('home')}}" itemprop="url"><span itemprop="name">WALLET</span></a>
                            </li>
                            <li class="col-4">
                                <a class="nav-link nav-button @if((!empty(Route::current()) && Route::current()->getName() == "send") || (!empty(Route::current()) && Route::current()->getName() == "amount-to"))nav-active @endif" href="{{route('send')}}" itemprop="url"><span itemprop="name">SEND</span></a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </header>
    <main>
        @yield("content")
        <section class="container transaction-history">
            <!--Transaction History-->
            <div class="row text-left mt-5">
                <div class="col">
                    <h5 class="text-center">Transaction History</h5>
                </div>
                <div class="col mt-4 no-gutter-xxs table-parent">
                    <table class="">
                        <tbody class="visible-tbody">
                            <tr class="loader-animation"> <td class="text-center" colspan="5"> <figure class="inline-block rotate-animation"><a href=""><img src="/assets/images/exchange-icon.png" alt="Exchange icon"/></a></figure> </td></tr>
                        </tbody>
                    </table>
                </div>
                <div class="mt-2 show-more-holder"></div>
            </div> <!--End Transaction History-->
        </section>
    </main>
    <footer>
        <div class="container">
            <div class="row">
                <ul class="col-12 no-gutter-xs" itemtype="http://schema.org/SiteNavigationElement">
                    <li class="inline-block-top">
                        <a href="https://dentacare.dentacoin.com/" target="_blank" itemprop="url">
                            <figure><img src="{{URL::asset('assets/images/dentacare.svg') }}"/></figure>
                            <span itemprop="name">Dentacare</span>
                        </a>
                    </li>
                    <li class="inline-block-top">
                        <a href="https://dentavox.dentacoin.com/" target="_blank" itemprop="url">
                            <figure><img src="{{URL::asset('assets/images/dentavox.svg') }}"/></figure>
                            <span itemprop="name">DentaVox</span>
                        </a>
                    </li>
                    @if($mobile)
                        <li class="inline-block-top go-next">
                            <a href="javascript:void(0)" data-position="right">
                                <i class="fa fa-arrow-right" aria-hidden="true"></i>
                            </a>
                        </li>
                    @endif
                    <li class="inline-block-top hide-on-mobile-device">
                        <a href="https://reviews.dentacoin.com/" target="_blank" itemprop="url">
                            <figure><img src="{{URL::asset('assets/images/trusted-reviews.svg') }}"/></figure>
                            <span itemprop="name">Trusted Reviews</span>
                        </a>
                    </li>
                    <li class="inline-block-top hide-on-mobile-device">
                        <a href="https://dentacoin.com/privacy-policy" target="_blank" itemprop="url">
                            <figure><img src="{{URL::asset('assets/images/privacy-policy.svg') }}"/></figure>
                            <span itemprop="name">Privacy policy</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="row copyright">
                <div class="col-12 text-center">
                    © 2018 Dentacoin Foundation. All rights reserved.
                    <div><a href="https://dentacoin.com/assets/uploads/dentacoin-foundation.pdf" target="_blank">Verify Dentacoin Foundation</a></div>
                </div>
            </div>
        </div>
    </footer>
    <script src="/dist/js/front-libs-script.js?v=1.0.37"></script>
    <script src="/assets/js/basic.js?v=1.0.20"></script>
    @yield("script_block")
    {{--<script src="/dist/js/front-script.js"></script>--}}
    <script src="/assets/js/index-compiled.js?v=1.2.25"></script>
</body>
</html>