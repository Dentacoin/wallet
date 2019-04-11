<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the 'web' middleware group. Now create something great!
|
*/


Route::group(['prefix' => '/', 'middleware' => 'frontEndMiddleware'], function () {
    Route::get('/', 'HomeController@getView')->name('home');

    Route::post('/get-qr-code-from-address', 'HomeController@generateQrImage')->name('get-qr-code-from-address');

    Route::post('/build-transaction-history', 'HomeController@buildTransactionHistory')->name('build-transaction-history');

    Route::get('/buy', 'BuyController@getView')->name('buy');

    Route::get('/test123', function() {
        var_dump(getenv('CROSS_WEBSITE_PASSWORD'));
        die();
    })->name('test123');

    Route::get('/faq', 'FaqController@getView')->name('faq');

    Route::post('/get-custom-auth-html', 'Controller@getCustomAuthHtml')->name('get-custom-auth-html');

    Route::post('/save-public-key', 'Controller@savePublicKey')->name('save-public-key');

    Route::get('/force-keystore-download/{file}', 'Controller@forceKeystoreDownload')->name('force-keystore-download');

    Route::post('/get-transaction-confirmation-popup', 'SendController@getTransactionConfirmationHtml')->name('get-transaction-confirmation-html');

    Route::group(['prefix' => '/send'], function () {
        Route::get('/', 'SendController@getView')->name('send');

        Route::get('/amount-to/{address}', 'SendController@getAmountToView')->name('amount-to');
    });

    Route::get('sitemap.xml', 'Controller@getSitemap')->name('sitemap');
});