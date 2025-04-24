<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\DashbordController;
use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('SignIn');
});

Route::get('/login', function () {
    return Inertia::render('SignIn');
})->name('login');

Route::middleware(['auth'])->group(function () {
Route::resource('tasks', TaskController::class);
Route::delete('/tasks/{task}', [TaskController::class, 'destroy'])->name('tasks.destroy');
Route::get('/dashbord', [DashbordController::class, 'index'])->name('dashbord');
Route::get('/users',[Controller::class, 'index'] );
Route::post('/logout',[AuthController::class, 'logout'] )->name('logout');
});

Route::get('/signup', function () {
    return Inertia::render('SignUp');
})->name('signup');

Route::fallback(function () {
    return Inertia::render('Error');
});
Route::post('/login',[AuthController::class, 'login'] );

Route::post('/register',[AuthController::class, 'register'] );

