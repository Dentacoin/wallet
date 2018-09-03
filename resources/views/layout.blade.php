<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <link rel="shortcut icon" href="{{URL::asset('assets/images/favicon.png') }}" type="image/x-icon" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
    @if(!empty($meta_data))
        <title>{{$meta_data->title}}</title>
        <meta name="description" content="{{$meta_data->description}}" />
        <meta name="keywords" content="{{$meta_data->keywords}}" />
        <meta property="og:url" content="{{Request::url()}}"/>
        <meta property="og:title" content="{{$meta_data->social_title}}"/>
        <meta property="og:description" content="{{$meta_data->social_description}}"/>
    @endif
    <meta property="og:image" content="{{URL::asset('assets/uploads/dentacoin-facebook-thumb.jpg') }}"/>
    <style>

    </style>
    <link rel="stylesheet" type="text/css" href="/dist/css/front-libs-style.css">
    <link rel="stylesheet" type="text/css" href="/assets/css/style.css">
    <script>
        var HOME_URL = '{{ route("home") }}';
    </script>
</head>
<body data-current="one" class="@if(!empty(Route::current())) {{Route::current()->getName()}} @else class-404 @endif">
    <header>

    </header>
    <main>@yield("content")</main>
    <footer>

    </footer>
    <script src="/assets/js/basic.js"></script>
    <script src="/dist/js/front-libs-script.js"></script>
    @yield("script_block")
    {{--<script src="/dist/js/front-script.js"></script>--}}
<script src="/assets/js/index.js"></script>
</body>
</html>