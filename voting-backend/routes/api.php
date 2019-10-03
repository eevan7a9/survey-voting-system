<?php

use App\Answer;
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
    // our route for saving multiple answers
    Route::post('answer/multiple', function (Request $request) {
        // we validate arrays of objects
        $request->validate([
            'answers' => 'present|array',
            'answers.*.title' => 'required|string',
            'answers.*.question_id' => 'required|integer',
        ]);
        // we save them individualy
        foreach ($request->answers as $answer) {
            $new_answer = new Answer();
            $new_answer->title = $answer['title'];
            $new_answer->question_id = $answer['question_id'];
            $new_answer->save();
        }

        return response()->json($request->answers);
    });
});

Route::post('/login', 'AuthController@login');
Route::post('/register', 'AuthController@register');
// Resource Controller for Questions
Route::resource('question', 'QuestionController');
// Resource Controller for Ansers
Route::resource('answer', 'AnswerController');
