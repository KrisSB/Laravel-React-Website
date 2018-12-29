<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Wiki;

class WikisController extends Controller
{
    //
    public function index() {
        return Wiki::where('game_id', '=', $data[0])->get();
    }
    public function show($id) {
        return Wiki::where('title', '=', $id)->get();
    }
    public function store(Request $request) {
        $data = json_decode($request->getcontent(),true);
        if($data[3] == null) {
            $user = 0;
        } else {
            $user = $data[3];
        }
        $game_id = $data[2];
        $title = $data[0];
        $body = $data[1];
        $wiki = new Wiki;
        $wiki->game_id = $game_id;
        $wiki->user_id = $user;
        $wiki->title = $title;
        $wiki->body = $body;
        $wiki->IP_address = $this->getClientIP();
        $wiki->save();
        return Wiki::where('game_id', '=', $game_id)->get();
    }
}
