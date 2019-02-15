<?php

namespace App\Http\Controllers;

use App\PageMetaData;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Jenssegers\Agent\Agent;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Route;
use bb\Sha3\Sha3;
use Illuminate\Http\Request;


class Controller extends BaseController {
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function __construct() {
        if(!empty(Route::getCurrentRoute())) {
            View::share('mobile', $this->isMobile());
            View::share('meta_data', $this->getMetaData());
            View::share('dcn_in_usd', $this->getCurrentDcnUsdRate());
            View::share('eth_in_usd', $this->getCurrentEthUsdRate());
            View::share('gas_estimation', $this->getGasEstimationFromEthgasstation());
            View::share('privacy_policy_cookie', $this->checkIfPrivacyPolicyCookie());
        }
    }

    protected function getCurrentDcnUsdRate()  {
        //API connection
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_URL => "https://api.coingecko.com/api/v3/coins/dentacoin",
            CURLOPT_SSL_VERIFYPEER => 0
        ));
        curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
        $resp = json_decode(curl_exec($curl));
        curl_close($curl);
        if(!empty($resp))   {
            if(!empty($resp->market_data->current_price->usd))  {
                return $resp->market_data->current_price->usd;
            }else {
                return 0;
            }
        }
    }

    protected function getCurrentEthUsdRate()  {
        //API connection
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_URL => "https://api.coingecko.com/api/v3/coins/ethereum",
            CURLOPT_SSL_VERIFYPEER => 0
        ));
        curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
        $resp = json_decode(curl_exec($curl));
        curl_close($curl);
        if(!empty($resp))   {
            if(!empty($resp->market_data->current_price->usd))  {
                return $resp->market_data->current_price->usd;
            }else {
                return 0;
            }
        }
    }

    protected function checkIfPrivacyPolicyCookie()    {
        $bool = empty($_COOKIE['privacy_policy']);
        if($bool) {
            return true;
        }else {
            return false;
        }
    }

    protected function getMetaData()    {
        //  return PageMetaData::where(array('slug' => Route::getCurrentRoute()->getName()))->get()->first();
    }

    protected function isMobile()   {
        return (new Agent())->isMobile();
    }

    protected function getSitemap() {
        $sitemap = App::make("sitemap");

        $sitemap->add(URL::to('/'), '2018-09-25T20:10:00+02:00', '1.0', 'weekly');
        //$sitemap->add(URL::to('publications'), '2012-08-25T20:10:00+02:00', '0.6', 'weekly');
        $sitemap->add(URL::to('buy'), '2018-09-25T20:10:00+02:00', '0.8', 'weekly');
        $sitemap->add(URL::to('send'), '2018-09-25T20:10:00+02:00', '1.0', 'weekly');
        $sitemap->add(URL::to('faq'), '2018-09-25T20:10:00+02:00', '1.0', 'weekly');

        return $sitemap->render('xml');
    }

    public function minifyHtml($response)   {
        $buffer = $response->getContent();
        if(strpos($buffer,'<pre>') !== false) {
            $replace = array(
                '/<!--[^\[](.*?)[^\]]-->/s' => '',
                '/<\?php/'                  => '<?php ',
                '/\r/'                      => '',
                '/>\n</'                    => '><',
                '/>\s+\n</'                 => '><',
                '/>\n\s+</'                 => '><',
            );
        }else {
            $replace = array(
                '/<!--[^\[](.*?)[^\]]-->/s' => '',
                '/<\?php/'                  => '<?php ',
                '/\n([\S])/'                => '$1',
                '/\r/'                      => '',
                '/\n/'                      => '',
                '/\t/'                      => '',
                '/ +/'                      => ' ',
            );
        }
        $buffer = preg_replace(array_keys($replace), array_values($replace), $buffer);
        $response->setContent($buffer);
        ini_set('zlib.output_compression', 'On'); // If you like to enable GZip, too!
        return $response;
    }

    public function getCookie($cookie){
        return request()->cookie($cookie);
    }

    protected function getCustomAuthHtml()  {
        $view = view('partials/login-popup');
        $view = $view->render();
        return response()->json(['success' => $view]);
    }

    protected function forceKeystoreDownload($file)  {
        header("Content-Type: application/save");
        header("Content-Disposition: attachment; filename=Dentacoin secret key - " . json_decode($file)->address);
        echo $file;
        exit;
    }

    protected function getGasEstimationFromEthgasstation()  {
        //API connection
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_URL => 'https://ethgasstation.info/json/ethgasAPI.json',
            CURLOPT_SSL_VERIFYPEER => 0
        ));
        curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
        $resp = json_decode(curl_exec($curl));
        curl_close($curl);
        if(!empty($resp))   {
            return $resp->safeLow;
        }
    }

    protected function savePublicKey(Request $request) {
        var_dump('asd');
        die();
        $inserted_key = DB::connection('mysql2')->select(DB::raw("SELECT * from public_keys WHERE address = '".$request->input('address')."'"));
        var_dump($inserted_key);
        die();
        if(empty($inserted_key)) {
            DB::connection('mysql2')->table('public_keys')->insert(['address' => $request->input('address'), 'public_key' => $request->input('public_key')]);
        }
        return response()->json(['success' => true]);
    }
}
