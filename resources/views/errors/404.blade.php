@extends("layout")

@section("content")
    <div class="container-404">
        <div class="container">
            <div class="row-flex">
                <figure class="col-12 col-sm-5 offset-sm-1">
                    <img src="{{URL::asset('assets/images/404.svg') }}" alt=""/>
                </figure>
                <div class="col-12 col-sm-5 text">
                    404
                </div>
            </div>
            <div class="row-flex no-found-text">
                <div class="col-12">
                    The page you are looking for can't be found.
                </div>
            </div>
        </div>
    </div>
@endsection