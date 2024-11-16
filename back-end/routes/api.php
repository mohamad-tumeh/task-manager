<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\SharedTaskListsController;
use App\Http\Controllers\TaskListController;
use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('profile', [AuthController::class, 'profile']);
    Route::put('profile/update', [AuthController::class, 'updateProfile']);
    Route::get('/users', [AuthController::class, 'getUsers']);

    Route::prefix('tasklists')->group(function () {
        Route::get('/', [TaskListController::class, 'index']);
        Route::post('/', [TaskListController::class, 'store']);
        Route::get('/{id}', [TaskListController::class, 'show']);
        Route::put('/{id}', [TaskListController::class, 'update']); 
        Route::delete('/{id}', [TaskListController::class, 'destroy']);
    });

    // Task Management
    Route::prefix('tasks')->group(function () {
        Route::post('/', [TaskController::class, 'store']);
        Route::get('/{taskListId}', [TaskController::class, 'index']); 
        Route::get('/{id}', [TaskController::class, 'show']);
        Route::put('/{id}', [TaskController::class, 'update']);
        Route::delete('/{id}', [TaskController::class, 'destroy']);
        Route::put('/{id}/complete', [TaskController::class, 'markComplete']);
        Route::put('/{id}/incomplete', [TaskController::class, 'markIncomplete']);
    });

    // Sharing Functionality
    Route::prefix('sharing')->group(function () {
        Route::post('/tasklist/{taskListId}', [SharedTaskListsController::class, 'share']);
        Route::delete('/tasklist/{taskListId}/{userId}', [SharedTaskListsController::class, 'revoke']);
        Route::get('/shared', [SharedTaskListsController::class, 'getSharedTaskLists']); 
    });
});
