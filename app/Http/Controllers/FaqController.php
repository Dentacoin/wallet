<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FaqController extends Controller
{
    protected function getView()   {
        return view('pages/faq');
    }
}
