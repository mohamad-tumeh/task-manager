<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\UpdateProfileRequest;
use App\Services\AuthService;

class AuthController extends Controller
{
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function register(RegisterRequest $request)
    {
        $data = $request->validated();
        $user = $this->authService->register($data);
        return response()->json([
            'message' => 'User created successfully.',
            'user' => $user
        ]);
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        $user = $this->authService->login($credentials);

        if (!$user) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $token = $user->createToken('App Token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'token' => $token,
            'user' => $user
        ]);
    }

    public function profile()
    {
        $user = $this->authService->profile();
        return response()->json(['user' => $user]);
    }

    public function getUsers()
    {
        $users = $this->authService->getUsers();
        return response()->json($users);
    }


    public function updateProfile(UpdateProfileRequest $request)
    {
        $request = $request->validated();
        $user = $this->authService->updateProfile($request);
        return response()->json(['user' => $user]);
    }


    public function logout()
    {
        $this->authService->logout();
        return response()->json(['message' => 'Successfully logged out']);
    }
}
