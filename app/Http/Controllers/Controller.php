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


class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function __construct() {
        View::share('mobile', $this->isMobile());
        View::share('meta_data', $this->getMetaData());
    }

    protected function getMetaData()    {
        //  return PageMetaData::where(array('slug' => Route::getCurrentRoute()->getName()))->get()->first();
    }

    protected function isMobile()   {
        return (new Agent())->isMobile();
    }

    protected function getSitemap() {
        $sitemap = App::make('sitemap');
        // set cache (key (string), duration in minutes (Carbon|Datetime|int), turn on/off (boolean))
        // by default cache is disabled
        //$sitemap->setCache('laravel.sitemap', 3600);

        // check if there is cached sitemap and build new only if is not
        //if(!$sitemap->isCached())  {
        // add item to the sitemap (url, date, priority, freq)

        /*$sitemap->add(URL::to('/'), '2012-08-25T20:10:00+02:00', '1.0', 'daily');
        $sitemap->add(URL::to('publications'), '2012-08-25T20:10:00+02:00', '0.6', 'weekly');
        $sitemap->add(URL::to('privacy-policy'), '2012-08-25T20:10:00+02:00', '0.4', 'monthly');
        $sitemap->add(URL::to('changelly'), '2012-08-25T20:10:00+02:00', '1.0', 'monthly');
        $sitemap->add(URL::to('partner-network'), '2012-08-25T20:10:00+02:00', '8.0', 'daily');*/

        //getting all pagination pages for testimonials
        /*for($i = 1, $length = (new UserExpressionsController())->getPagesCount(); $i <= $length; $i+=1) {
            $sitemap->add(URL::to('testimonials/page/'.$i), '2012-08-25T20:10:00+02:00', '8.0', 'daily');
        }*/

        // get all posts from db
        //$posts = DB::table('posts')->orderBy('created_at', 'desc')->get();
        //
        //// add every post to the sitemap
        //foreach ($posts as $post)
        //{
        //   $sitemap->add($post->slug, $post->modified, $post->priority, $post->freq);
        //}
        //}
        // show your sitemap (options: 'xml' (default), 'html', 'txt', 'ror-rss', 'ror-rdf')
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
}
