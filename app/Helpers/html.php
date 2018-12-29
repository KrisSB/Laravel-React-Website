<?php

function style_ts($path) {

    try {
        $ts = '?v=' . File::lastModified(public_path($path));
    } catch(Exception $e) {
        $ts = '';
    }
    
    return '<link rel="stylesheet" href="' . URL::to('/') . '/' . $path . $ts . '">';

}

function js_ts($path) {

    try {
        $ts = '?v=' . File::lastModified(public_path($path));
    } catch(Exception $e) {
        $ts = '';
    }
    
    return '<script src="' . URL::to('/') . '/' . $path . $ts .  '"></script>';

}