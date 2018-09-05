@extends("layout")
@section("content")
    <div class="send-container">
        <div class="container">
            <div class="row-flex fs-0">
                <div class="col-12 col-sm-10 offset-sm-1 wallet-address">
                    <input type="text" placeholder="Input wallet address or Clinic's name"/>
                    <figure class="inline-block"><a href=""><img src="{{URL::asset('assets/images/copy.svg') }}" class="Copy address to clipboard icon"/></a></figure>
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
