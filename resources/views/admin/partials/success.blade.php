@if(!empty($success))
    <div class="alerts-wrapper">
        @foreach($success as $single_success)
            <div class="alert alert-success">{{ $single_success }}</div>
        @endforeach
    </div>
@endif
@if (session('success'))
    <div class="alerts-wrapper">
        <div class="alert alert-success">
            {{ session('success') }}
        </div>
    </div>
@endif
