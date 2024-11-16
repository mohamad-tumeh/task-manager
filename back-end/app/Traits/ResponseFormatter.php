<?php

namespace App\Traits;

trait ResponseFormatter
{
    public function successResponse($data = null, $message = 'Success', $code = 200)
    {
        return response()->json([
            'status' => 'success',
            'message' => $message,
            'data' => $data,
        ], $code);
    }

    public function errorResponse($message = 'Error', $errors = [], $code = 400)
    {
        return response()->json([
            'status' => 'error',
            'message' => $message,
            'errors' => $errors,
        ], $code);
    }

    public function validationErrorResponse($errors, $message = 'Validation failed', $code = 422)
    {
        return response()->json([
            'status' => 'fail',
            'message' => $message,
            'errors' => $errors,
        ], $code);
    }
}
