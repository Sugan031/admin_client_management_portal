<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Interest;

class InterestController extends Controller
{
    public function index()
    {
        return Interest::all();
    }
}
