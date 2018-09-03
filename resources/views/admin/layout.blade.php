<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <!-- Meta, title, CSS, favicons, etc. -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">

    <title>Admin</title>
    <link rel="stylesheet" href="/dist/css/admin-libs-style.css">

    <link href="/assets/css/admin.css" rel="stylesheet">
    <script type="text/javascript">
        var SITE_URL = "{{ route('admin-access') }}";
    </script>
</head>
<body class="hold-transition skin-blue sidebar-mini">
<!-- Site wrapper -->
<div class="wrapper">
    <header class="main-header">
        <figure class="logo">
            <a href="{{route('home')}}" target="_blank">
                <img src="{{URL::asset('assets/images/logo.svg') }}" alt="Dentacoin logo"/>
            </a>
        </figure>
        <!-- Header Navbar: style can be found in header.less -->
        <nav class="navbar navbar-static-top">
            <!-- Sidebar toggle button-->
            <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
                <span class="sr-only">Toggle navigation</span>
            </a>
            <div class="navbar-custom-menu">
                <ul class="nav navbar-nav">
                    <!-- User Account: style can be found in dropdown.less -->
                    <li class="dropdown user user-menu">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                            <span>Admin</span>
                        </a>
                        <ul class="dropdown-menu" role="menu">
                            <!-- Menu Footer-->
                            <li class="user-footer">
                                <div class="pull-right">
                                    <a href="{{ route('logout') }}" class="btn btn-default btn-flat logout">Logout</a>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
    <!-- =============================================== -->
    <!-- Left side column. contains the sidebar -->
    <aside class="main-sidebar">
        <!-- sidebar: style can be found in sidebar.less -->
        <section class="sidebar">
            <!-- sidebar menu: : style can be found in sidebar.less -->
            <ul class="sidebar-menu">
                <li @if(!empty(Route::current()->getName()) && Route::current()->getName() == 'media') class="active" @endif >
                    <a href="{{ route('media') }}"><i class="fa fa-picture-o"></i> Media</a>
                </li>
                <li class="treeview menu-open">
                    <a href="#">
                        <i class="fa fa-users" aria-hidden="true"></i> <span>Testimonials</span>
                        <span class="pull-right">
                          <i class="fa fa-angle-left pull-right"></i>
                        </span>
                    </a>
                    <ul class="treeview-menu">
                        <li><a href="index.html"><i class="fa fa-list-ol" aria-hidden="true"></i></i> All testimonials</a></li>
                        <li class="active"><a href="index2.html"><i class="fa fa-plus" aria-hidden="true"></i> Add testimonial</a></li>
                    </ul>
                </li>
            </ul>
        </section>
        <!-- /.sidebar -->
    </aside>
    <!-- =============================================== -->
    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
        @include('admin.partials.error')
        @include('admin.partials.success')
        <section>@yield("content")</section>
    </div>
</div>
<script>
    var CKEDITOR_BASEPATH = '/assets/libs/ckeditor-full/';
</script>
<script src="/dist/js/admin-libs-script.js"></script>
<script src="/assets/js/basic.js"></script>
<script src="/assets/js/admin/index.js"></script>

</body>
</html>