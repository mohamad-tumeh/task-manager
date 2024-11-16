<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\UserRepository;

class AuthService
{
    protected $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function register(array $data)
    {
        return $this->userRepository->createUser($data);
    }

    public function login(array $credentials)
    {
        return $this->userRepository->attemptLogin($credentials);
    }

    public function profile()
    {
        return $this->userRepository->profile();
    }

    public function getUsers()
    {
        return $this->userRepository->getAll();
    }

    public function updateProfile($request)
    {
        return $this->userRepository->updateProfile($request);
    }

    public function logout()
    {
        return $this->userRepository->logout();
    }
}