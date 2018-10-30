<div class="title">Send confirmation</div>
<div class="pictogram-and-dcn-usd-price">
    <figure itemscope="" itemtype="http://schema.org/ImageObject">
        <img src="{{URL::asset('assets/images/sent-icon.svg') }}" alt="Sent icon" itemprop="contentUrl"/>
    </figure>
    <div class="dcn-amount">- {{$dcn_val}} DCN</div>
    <div class="usd-amount">= ${{$usd_val}}</div>
</div>
<div class="confirm-row to">
    <div class="label inline-block">To:</div>
    <div class="value inline-block">{{$sending_to_address}}</div>
</div>
<div class="confirm-row from">
    <div class="label inline-block">From:</div>
    <div class="value inline-block">{{$from}}</div>
</div>
<div class="confirm-row free">
    <div class="label inline-block">Ether fee:</div>
    <div class="value inline-block">{{$fee}}</div>
</div>
<div class="password text-center">
    <input type="password" placeholder="Enter your password" id="user-keystore-password"/>
</div>
<div class="btn-container">
    <a href="javascript:void(0)" class="white-blue-btn confirm-transaction">Confirm</a>
    <input type="hidden" id="gas-estimation" value="{{$gas_estimation}}"/>
</div>