<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use Illuminate\Http\Request;

class CategoriesController extends Controller
{
    public function index() {
        $categories = Categories::select(['id', 'name'])
            ->groupBy('name')
            ->get();

        return response()->json([
            'name' => $categories
        ]);
    }
}