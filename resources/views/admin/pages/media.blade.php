@extends("admin.layout")

@section("content")
    <section class="content media-container">
        <h1>Adding media</h1>
        <form method="post" enctype="multipart/form-data" class="text-center" action="{{ route('upload-media') }}">
            <input type="hidden" name="_token" value="{{ csrf_token() }}">
            <div class="single-row">
                <div class="subtitle"><label>Select images:</label></div>
                <input type="file" name="images[]" multiple/>
            </div>
            <div class="btn-container">
                <button class="btn">Add</button>
            </div>
        </form>
        @include('admin.partials.media-tile', ['media' => $media])
    </section>
@endsection
