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

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::group(['middleware' => ['auth:api']], function () {
    Route::get('/logout', 'AuthController@logout');
    Route::get('/user', 'AuthController@user');
    // Resource Controller fpr Vote
    Route::resource('vote', 'VoteController');
});

Route::post('/login', 'AuthController@login');
Route::post('/register', 'AuthController@register');
// Resource Controller for Questions
Route::resource('question', 'QuestionController');
// Resource Controller for Ansers
Route::resource('answer', 'AnswerController');
