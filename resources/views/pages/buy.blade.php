@extends("layout")
@section("content")
    <div class="buy-container">
        <div class="container">
            <div class="row-flex fs-0">
                <div class="col-12 col-md-5 input-container">
                    <div class="title">Pay with:</div>
                    <div class="wrapper input-with-exchange left-side fs-0 flex">
                        <input type="text"/>
                        <button class="btn btn-light dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">USD</button>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="#">Euro</a>
                            <a class="dropdown-item" href="#">Bitcoin</a>
                        </div>
                    </div>
                </div>
                <div class="col-md-2 refresh-icon"><i class="fa fa-refresh" aria-hidden="true"></i></div>
                <div class="col-12 col-md-5 input-container">
                    <div class="title">You get:</div>
                    <div class="wrapper input-with-exchange right-side fs-0 flex">
                        <button class="btn btn-light dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">BTC</button>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="#">Euro</a>
                            <a class="dropdown-item" href="#">Bitcoin</a>
                        </div>
                        <input type="text"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row-flex">
                <div class="col-12">
                    <div class="horizontal-white-line-120 line"></div>
                    <div class="text-center choose-the-currency">Choose the currency that you want to pay with and receive, from the drop-down menu. Than input the amount that you want to be exchanged.</div>
                </div>
            </div>
        </div>
    </div>
@endsection
