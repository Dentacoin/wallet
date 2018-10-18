<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BuyController extends Controller  {
    protected function getView()   {
        return view('pages/buy', ['dcn_for_one_usd' => $this->getIndaCoinDCNPriceInUSD()]);
    }

    protected function getIndaCoinDCNPriceInUSD()    {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_URL => 'https://indacoin.com/api/GetCoinConvertAmount/USD/DCN/100/dentacoin',
            CURLOPT_SSL_VERIFYPEER => 0
        ));
        curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
        $resp = json_decode(curl_exec($curl));
        curl_close($curl);
        // / 100 because we need the dcns for 1USD, we cannot make API request for 1USD
        return $resp / 100;
    }

    /*protected function getIndaCoinDCNPriceInEURO()    {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_URL => 'https://indacoin.com/api/GetCoinConvertAmount/EURO/DCN/100/dentacoin',
            CURLOPT_SSL_VERIFYPEER => 0
        ));
        curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
        $resp = json_decode(curl_exec($curl));
        curl_close($curl);
        // / 100 because we need the dcns for 1USD, we cannot make API request for 1USD
        return $resp / 100;
    }*/
}
