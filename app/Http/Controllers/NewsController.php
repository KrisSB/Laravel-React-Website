<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\News;

class NewsController extends Controller
{
    public function index() {
        return News::select('id', 'title','firstletter','url')->orderBy('title','asc')->get();
    }
    public function show($news_url) {
        $news = News::where('url', '=', $news_url)->first();
        if($news) {
            return $news;
        } else {
            return 'false';
        }
    }
    public function paginate($letter) {
        if($letter == 'All') {
            return News::select('id', 'title','firstletter','url')->orderBy('title', 'asc')->orderBy('title', 'asc')->get();
        } else {
            return News::select('id', 'title','firstletter','url')->where('firstletter', '=', $letter)->orderBy('title', 'asc')->get();
        }
    }
    public function search($ref) {
        return News::where('title', 'LIKE', '%' . $ref . '%')->orderBy('title', 'asc')->get();
    }
    public function store(Request $request) {
        $data = json_decode($request->getcontent(),true);
        $title = htmlspecialchars($data[0]);
        $description = htmlspecialchars($data[1]);
        if(is_numeric($title[0])) {
            $firstletter = '0-9';
        } else {
            $firstletter = $title[0];
        }
        $user_id = 0;
        if($data[2] !== null) {
            $user_id = $data[2];
        } else {
            $user_id = 0;
        }
        $article = new News;
        $article->firstletter = $firstletter;
        $article->url = str_replace(' ', '_', $title);
        $article->title = $title;
        $article->description = $description;
        $article->user_id = $user_id;
        $article->IP_address = $this->getClientIP();
        $article->body = '';
        $article->save();
        return News::all(); 
    }
}
