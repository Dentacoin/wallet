<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BuyController extends Controller  {
    protected function getView()   {
        return view('pages/buy');
    }
}
