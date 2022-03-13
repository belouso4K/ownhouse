<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Requests\AdminPostCreateRequest;
use App\Models\Admin\Post;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Services\PostService;

class PostController extends AdminController
{
    public function __construct()
    {
        parent::__construct();
    }

    public function index()
    {
        $posts = Post::withTrashed()->paginate(7);

        $posts->getCollection()->transform(function($post, $key) {

            return [
                'id' => $post->id,
                'slug' => $post->slug,
                'created_at' => Carbon::parse($post->created_at)->isoFormat('DD.MM.YYYY'),
                'title' => $post->title,
                'img' => $post->img,
                'status' => $post->status,
                'deleted_at' => $post->deleted_at,
            ];
        });

        if ($posts) {
            return response()->json($posts, 200);

        } else {
            return response()->json($posts, 500);
        }
    }

    public function create(AdminPostCreateRequest $request)
    {
        $post = PostService::addPost($request);

        if ($post) {
            return response()->json($post, 200);

        } else {
            return response()->json($post, 500);
        }

    }

    public function store(Request $request)
    {

    }

    public function show($slug)
    {
        $post = Post::where('slug', '=', $slug)->first();

        if ($post) {
            return response()->json($post, 200);

        } else {
            return response()->json($post, 404);
        }

    }

    public function edit($id)
    {

    }

    public function update(Request $request, $slug)
    {

        $post = PostService::updatePost($request, $slug);

        if ($post) {
            return response()->json($post, 200);

        } else {
            return response()->json($post, 500);
        }
    }

    public function destroy($id)
    {

        if (isset($id)) {

            $post = Post::where('id', '=', $id)->delete();
            if ($post) {
                return response()->json(null, 204);
            }
        }
    }

    public function restore($id)
    {

        if (isset($id)) {

            $post = Post::withTrashed()->where('id', '=', $id)->restore();
            if ($post) {
                return response()->json(null, 200);
            }
        }
    }




}
