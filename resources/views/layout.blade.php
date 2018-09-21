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
    <link rel="stylesheet" type="text/css" href="/dist/css/front-libs-style.css">
    <link rel="stylesheet" type="text/css" href="/assets/css/style.css">
    <script src="/assets/libs/popper/popper.min.js"></script>
    <script>
        var HOME_URL = '{{ route("home") }}';
    </script>
</head>
<body data-current="one" class="@if(!empty(Route::current())) {{Route::current()->getName()}} @else class-404 @endif">
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
                                <a class="nav-link nav-button buy-temporally @if(Route::current()->getName() == "buy")nav-active @endif" href="{{--{{route('buy')}}--}}">BUY</a>
                            </li>
                            <li class="col-4">
                                <a class="nav-link nav-button @if(Route::current()->getName() == "home")nav-active @endif" href="{{route('home')}}">WALLET</a>
                            </li>
                            <li class="col-4">
                                <a class="nav-link nav-button @if(Route::current()->getName() == "send" || Route::current()->getName() == "amount-to")nav-active @endif" href="{{route('send')}}">SEND</a>
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
                    <h5 class="text-left">Transaction History</h5>
                </div>
                <div class="col table-responsive mt-4 no-gutter-xxs">
                    <table class=" table table-transactions">
                        <tbody>
                            <tr>
                                <td class="align-middle icon">
                                    <figure>
                                        <a class="align-middle" href="#">
                                            <img src="{{URL::asset('assets/images/send-icon.svg') }}" alt="Send icon"/>
                                        </a>
                                    </figure>
                                </td>
                                <td class="align-middle">
                                    <ul class="align-middle">
                                        <li> 01/15/2018</li>
                                        <li> 12:06 Am</li>
                                    </ul>
                                </td>
                                <td class="align-middle">
                                    <ul class="align-middle">
                                        <li> <span> <strong>Send to:</strong> 0x7osadmnaops890312dnaso8123192j</span></li>
                                        <li><a href="#"><strong class="transaction-id">Transaction ID</strong></a></li>
                                    </ul>
                                </td>
                                <td class="align-middle">
                                    <ul class="align-middle">
                                        <li class="value-dcn send-to">-100DCN</li>
                                        <li> 2 USD</li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td class="align-middle icon">
                                    <figure>
                                        <a class="align-middle" href="#">
                                            <img src="{{URL::asset('assets/images/pay-icon.svg') }}" alt="Pay icon"/>
                                        </a>
                                    </figure>
                                </td>
                                <td class="align-middle">
                                    <ul class="align-middle">
                                        <li> 01/15/2018</li>
                                        <li> 12:06 Am</li>
                                    </ul>
                                </td>
                                <td class="align-middle">
                                    <ul class="align-middle">
                                        <li> <span> <strong>Payed to:</strong><a href="#"> Dentaprime City</a> (0x7osadmnaops890312dnaso8123192j)</span></li>
                                        <li><a href="#"><strong class="transaction-id">Transaction ID</strong></a></li>
                                    </ul>
                                </td>
                                <td class="align-middle">
                                    <ul class="align-middle">
                                        <li class="value-dcn payed-to">-100DCN</li>
                                        <li> 2 USD</li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td class="align-middle icon">
                                    <figure>
                                        <a class="align-middle" href="#">
                                            <img class="img-responsive" src="{{URL::asset('assets/images/receive-icon.svg') }}" alt="Receive icon"/>
                                        </a>
                                    </figure>
                                </td>
                                <td class="align-middle">
                                    <ul class="align-middle">
                                        <li> 01/15/2018</li>
                                        <li> 12:06 Am</li>
                                    </ul></td>
                                <td class="align-middle">
                                    <ul class="align-middle">
                                        <li> <span> <strong>Received from:</strong> 0x7osadmnaops890312dnaso8123192j</span></li>
                                        <li><a href="#"><strong class="transaction-id">Transaction ID</strong></a></li>
                                    </ul>
                                </td>
                                <td class="align-middle">
                                    <ul class="align-middle">
                                        <li class="value-dcn received-from">+100DCN</li>
                                        <li> 2 USD</li>
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="mt-2">
                    <div class="col text-center">
                        <a href="#" > <strong>Show more</strong></a> </div> <div class="col-lg-4">
                    </div>
                </div>
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
    <script src="/dist/js/front-libs-script.js"></script>
    <script src="/assets/js/basic.js"></script>
    @yield("script_block")
    {{--<script src="/dist/js/front-script.js"></script>--}}
    <script src="/assets/js/index.js"></script>
</body>
</html>