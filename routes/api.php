<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*Route::get('/user', function(Request $request) {
    return $request->user();
});*/

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:api');

Route::get('consoles','ConsolesController@index');
Route::get('genres','GenresController@index');

Route::get('games', 'GamesController@index');
Route::post('storeGames', 'GamesController@store')->middleware('auth:api');
Route::get('paginateGames/{letter}', 'GamesController@paginate');
Route::get('searchGames/{search}', 'GamesController@search');
Route::get('showGame/{game}','GamesController@show');

Route::get('news', 'NewsController@index');
Route::get('paginateNews/{letter}', 'NewsController@paginate');
Route::get('searchNews/{search}', 'NewsController@search');
Route::post('storeNews', 'NewsController@store')->middleware('auth:api');
Route::get('showNews/{article}','NewsController@show');

Route::get('showWikis/{game}','WikisController@show');
Route::post('storeWikis', 'WikisController@store')->middleware('auth:api');