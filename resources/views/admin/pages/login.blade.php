<!DOCTYPE html>
<html>
<head>
    <title>Admin login access</title>
    <link rel="stylesheet" href="/dist/css/admin-libs-style.css">
    <link href="/assets/css/admin.css" rel="stylesheet">
</head>
<body>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-4 col-sm-offset-4">
                <div class="form-wrapper">
                    @include('admin.partials.error')
                    {!! Form::open(['route' => 'authenticate-admin']) !!}
                        <div class="form-row">
                            {{Form::text('username', '', ['placeholder' => 'Username'])}}
                        </div>
                        <div class="form-row">
                            {{Form::password('password', ['placeholder' => 'Password'])}}
                        </div>
                        <div class="form-row submit text-center">
                            {{Form::submit('Submit')}}
                        </div>
                    {!! Form::close() !!}
                </div>
            </div>
        </div>
    </div>
    <script src="/dist/js/admin-libs-script.js"></script>
</body>
</html>

