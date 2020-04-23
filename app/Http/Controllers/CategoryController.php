<?php

namespace App\Http\Controllers;

use App\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{

    public function all()
    {
        $categories = Category::all();

        return response()->json([
            "categories" => $categories
        ], 200);
    }

    public function get($id)
    {
        $category = Category::whereId($id)->first();

        return response()->json([
            "category" => $category
        ], 200);
    }

    public function new(Request $request)
    {
        $category = Category::create($request->only(["cat_name"]));

        return response()->json([
            "category" => $category
        ], 200);
    }

    public function edit_category($id){
        $category = Category::whereId($id)->first();
        return response()->json([
            'category'=>$category
        ],200);
    }
    public function update_category(Request $request,$id){
        $category = Category::whereId($id)->first();
        $category->cat_name = $request->cat_name;
        $category->save();

        return response()->json([
            "category" => $category
        ], 200);
    }

    public function delete_category($id){
        $category = Category::whereId($id)->first();
        $category->delete();
    }


}
