<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Console;

class ConsolesController extends Controller
{
    public function index() {
        return Console::all();
    }
}
