<?php

namespace App\Repositories\Interfaces;

use App\Models\User;

interface UserRepositoryInterface
{
    public function createUser(array $data);
    public function attemptLogin(array $credentials);
    public function profile();
    public function logout();
}
