<?php

namespace App\Http\Controllers;

use App\Application;
use App\Publications;
use App\UserExpressions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HomeController extends Controller
{
    protected function getView()   {
        return view('pages/homepage');
    }
}

