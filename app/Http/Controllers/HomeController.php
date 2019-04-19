<?php

namespace App\Http\Controllers;

use Endroid\QrCode\QrCode;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HomeController extends Controller     {
    protected function getView()   {
        return view('pages/homepage');
    }

    protected function generateQrImage(Request $request)    {
        $qr = new QrCode();
        $qr->setText(trim($request->input('address')));
        $qr->setSize(220);
        return response()->json(['success' => $qr->getDataUri()]);
    }

    protected function test() {
        var_dump(getenv('APP_KEY'));
        var_dump(session('logged_user'));

        $session_arr = [
            'type' => 'Dentacoin-test'
        ];

        if(empty(session('logged_user'))) {
            session(['logged_user' => $session_arr]);
            die('session created');
        }

        if(!empty(session('logged_user'))) {
            return view('session');
        } else {
            return view('no-session');
        }

    }
}

