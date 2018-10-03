<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <link rel="shortcut icon" href="{{URL::asset('assets/images/favicon.png') }}" type="image/x-icon"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5"/>
    <meta name="csrf-token" content="{{ csrf_token() }}"/>
    @if(!empty($meta_data))
        <title>{{$meta_data->title}}</title>
        <meta name="description" content="{{$meta_data->description}}"/>
        <meta name="keywords" content="{{$meta_data->keywords}}"/>
        <meta property="og:url" content="{{Request::url()}}"/>
        <meta property="og:title" content="{{$meta_data->social_title}}"/>
        <meta property="og:description" content="{{$meta_data->social_description}}"/>
    @endif
    <meta property="og:image" content="{{URL::asset('assets/uploads/dentacoin-facebook-thumb.jpg') }}"/>
    <style>

    </style>
    <link rel="stylesheet" type="text/css" href="/dist/css/front-libs-style.css?v=1.0.1">
    <link rel="stylesheet" type="text/css" href="/assets/css/style.css?v=1.0.1">
    <script src="/assets/libs/popper/popper.min.js?v=1.0.1"></script>
    <script>
        var HOME_URL = '{{ route("home") }}';
    </script>
</head>
<body data-current="one" class="@if(!empty(Route::current())) {{Route::current()->getName()}} @else class-404 @endif" @if(isset($dcn_in_usd)) data-current-dcn-in-usd="{{$dcn_in_usd}}" @endif>
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
                        <ul>
                            <li class="col-4">
                                <a class="nav-link nav-button @if(!empty(Route::current()) && Route::current()->getName() == "buy")nav-active @endif" href="{{route('buy')}}">BUY</a>
                            </li>
                            <li class="col-4">
                                <a class="nav-link nav-button @if(!empty(Route::current()) && Route::current()->getName() == "home")nav-active @endif" href="{{route('home')}}">WALLET</a>
                            </li>
                            <li class="col-4">
                                <a class="nav-link nav-button @if((!empty(Route::current()) && Route::current()->getName() == "send") || (!empty(Route::current()) && Route::current()->getName() == "amount-to"))nav-active @endif" href="{{route('send')}}">SEND</a>
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

                        </tbody>
                    </table>
                </div>
                <div class="mt-2 show-more-holder"></div>
            </div> <!--End Transaction History-->
        </section>
    </main>
    <footer class="text-center container">
        <div class="row">
            <div class="col-12">
                <div>© Dentacoin Foundation. All rights reserved.</div>
                <div>
                    <a href="https://dentacoin.com/assets/docs/dentacoin-foundation.pdf" target="_Blank">The Netherlands Chamber of Commerce Business Register extract</a>
                </div>
                <div>Wim Duisenbergplantsoen 31 6221 SE Maastricht The Netherlands</div>
            </div>
        </div>
    </footer>
    <script src="/dist/js/front-libs-script.js?v=1.0.1"></script>
    <script src="/assets/js/basic.js?v=1.0.1"></script>
    @yield("script_block")
    {{--<script src="/dist/js/front-script.js"></script>--}}
    <script src="/assets/js/index.js?v=1.0.1"></script>
</body>
</html>