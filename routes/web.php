<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('index');
});

Auth::routes();

Route::get('/Dashboard', 'DashboardController@index')->name('dashboard');

Route::get('/AddArticle', function () {
    return view('news.add');
});

Route::get('/VideoGames', function () {
    return view('games.index');
});

Route::get('/News', function () {
    return view('news.index');
});

Route::get('/News/{article}', function() {
    return view('news.show');
});

Route::get('/VideoGames/{game}', function () {
    return view('games.show');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
