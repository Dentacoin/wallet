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
}

