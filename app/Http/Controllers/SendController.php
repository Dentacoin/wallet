<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SendController extends Controller {
    protected function getView(Request $request)   {
        //getting the cookie with $_COOKIE and not with $request->cookie(''), because laravel crypts and decrypts cookies and our cookie is set outside laravel and php (it's not crypted)
        $params = [];
        if(isset($_COOKIE['prev_used_addresses']) && !empty($_COOKIE['prev_used_addresses']))    {
            $params['addresses'] = json_decode($_COOKIE['prev_used_addresses']);
        }
        return view('pages/send', $params);
    }

    protected function getAmountToView($address)   {
        $params = ['url_address' => $address];
        if(isset($_COOKIE['prev_used_addresses']) && !empty($_COOKIE['prev_used_addresses']))    {
            $params['addresses'] = json_decode($_COOKIE['prev_used_addresses']);
        }
        return view('pages/amount-to', $params);
    }

    protected function getTransactionConfirmationHtml(Request $request) {
        $view = view('partials/transaction-confirmation-popup', ['dcn_val' => $request->input('dcn_val'), 'usd_val' => $request->input('usd_val'), 'sending_to_address' => $request->input('sending_to_address'), 'from' => $request->input('from'), 'fee' => $request->input('fee')]);
        $view = $view->render();
        return response()->json(['success' => $view]);
    }
}
