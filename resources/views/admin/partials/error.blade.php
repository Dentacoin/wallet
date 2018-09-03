@if(count($errors) > 0)
    <div class="alerts-wrapper">
        @foreach($errors->all() as $error)
            <div class="alert alert-danger">{{ $error }}</div>
        @endforeach
    </div>
@endif
@if (session('error'))
    <div class="alerts-wrapper">
        <div class="alert alert-danger">
            {{ session('error') }}
        </div>
    </div>
@endif