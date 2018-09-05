<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SendController extends Controller {
    protected function getView()   {
        return view('pages/send');
    }
}
