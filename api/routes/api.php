<?php

use App\Http\Controllers\API\UsersController;
use App\Http\Controllers\API\EmailVerificationController;
use App\Http\Controllers\API\PostController as PostController;
use App\Http\Controllers\API\Admin\PostController as AdminPostController;


Route::group(['prefix' => 'v1'], function(){

    Route::get('/user', [UsersController::class, 'show']);

    /**
     * Email Routes
     */
    Route::post('email/verify/{id}',[EmailVerificationController::class, 'verify'])->name('verificationapi.verify');
    Route::post('email/resend', [EmailVerificationController::class, 'resend']);

    /**
     * Post Routes
     */
    Route::get('/posts', [PostController::class, 'index']);
    Route::get('/posts/{post}',[PostController::class, 'show']);

    Route::group(['prefix' => 'admin'], function () {
        /**
         * Admin Post Routes
         */
        Route::post('/post/create', [AdminPostController::class, 'create']);
        Route::put('/post/update/{slug}', [AdminPostController::class, 'update']);
        Route::get('/post/{slug}', [AdminPostController::class, 'show']);
        Route::get('/posts', [AdminPostController::class, 'index']);
        Route::delete('/post/delete/{id}', [AdminPostController::class, 'destroy']);
        Route::put('/post/restore/{id}', [AdminPostController::class, 'restore']);
    });


//    Route::post('/companies','API\PostController@store');
//    Route::put('/companies/{company}','API\PostController@update');
//    Route::delete('/companies/{company}','API\PostController@destroy');
});
