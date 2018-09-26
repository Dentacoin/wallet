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


Route::group(['prefix' => '/'/*, 'middleware' => 'frontEndMiddleware'*/], function () {
    Route::get('/', 'HomeController@getView')->name('home');

    Route::post('/get-qr-code-from-address', 'HomeController@generateQrImage')->name('get-qr-code-from-address');

    Route::post('/build-transaction-history', 'HomeController@buildTransactionHistory')->name('build-transaction-history');

    //Route::get('/buy', 'BuyController@getView')->name('buy');

    Route::group(['prefix' => '/send'], function () {
        Route::get('/', 'SendController@getView')->name('send');

        Route::get('/amount-to/{address}', 'SendController@getAmountToView')->name('amount-to');
    });
});