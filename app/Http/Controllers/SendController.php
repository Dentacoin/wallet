<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SendController extends Controller {
    protected function getView()   {
        return view('pages/send');
    }

    protected function getAmountToView($address)   {
        return view('pages/amount-to', ['address' => $address]);
    }
}
