@if(count($media) > 0)
    <table class="table table-without-reorder table-bordered table-striped text-left media-table">
        <thead>
            <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Alt</th>
                <th>Date</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
        @foreach($media as $single_media)
            <tr data-id="{{ $single_media->id }}">
                <td><img src="{{ $single_media->getLink() }}" class="small-image"/></td>
                <td>{{ $single_media->name }}</td>
                <td><input type="text" value="{{ $single_media->alt }}"/></td>
                <td>{{ $single_media->created_at }}</td>
                <td>
                    @if(!empty($popup))
                        <a href="javascript:void(0);" class="btn use-media">Use</a>
                    @endif
                    <a href="{{ route('delete-media', ['id' => $single_media->id]) }}" class="btn">Delete</a>
                </td>
            </tr>
        @endforeach
        </tbody>
        <tfoot>
            <tr>
                <td>
                    <a href="javascript:void(0);" class="btn save-image-alts">Save image alts</a>
                </td>
            </tr>
        </tfoot>
    </table>
@endif
