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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'auth'], function ($router) {

    Route::post('login','AuthController@login');
    Route::post('register','AuthController@register');
    Route::post('logout','AuthController@logout');
    Route::post('refresh','AuthController@refresh');
    Route::post('me', 'AuthController@me');

});

Route::group(['middleware' => 'jwt.auth'], function ($router) {

    //Customer
    Route::get('customers', 'CustomersController@all');
    Route::get('customers/{id}', 'CustomersController@get');
    Route::post('customers/new', 'CustomersController@new');


     //Category
     Route::get('/categories', 'CategoryController@all');
     Route::get('/categories/{id}', 'CategoryController@get');
     Route::post('/categories/new', 'CategoryController@new');
     Route::get('/editcategory/{id}','CategoryController@edit_category');
     Route::post('/update-category/{id}','CategoryController@update_category');
     Route::get('category/{id}','CategoryController@delete_category');

     //Task

     Route::get('/taskList','TaskController@index');
     Route::get('/tasList','TasController@index');

     Route::post('/taskList','TaskController@store');
     Route::get('/tasks/edit/{id}','TaskController@edit');
     Route::patch('/taskList/update/{id}','TaskController@update');
     Route::delete('/tasks/{id}','TaskController@destroy');


     //Post
     Route::get('/postList','PostController@index');
     Route::post('/savepost','PostController@save_post');
     Route::get('/delete/{id}','PostController@delete_post');
     Route::get('/post/{id}','PostController@edit_post');
     Route::post('/update/{id}','PostController@update_post');


     //client


});


