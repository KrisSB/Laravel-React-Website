<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" type="text/css">

    <!-- Styles -->
    {!! style_ts('css/app.css') !!}
</head>
<body>
    <div id="app">
        <nav>
            <ul class="navBar">
                <li><a href="/">Home</a></li>
                <li><a href="/VideoGames">Video Games</a></li>
                <li><a href="/Reviews">Reviews</a></li>
                <li><a href="/News">News</a></li>
                <li><a href="/Forum">Forum</a></li>
                <li class="navItem6"><div id="navSearchBar"></div></li>
                @guest
                <li><a href="{{ route('login') }}">{{ __('Login') }}</a></li>
                <li><a href="{{ route('register') }}">{{ __('Register') }}</a></li>
                    @else
                    <li>{{ Auth::user()->name }}</li>
                    <li>
                        <a href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                            {{ __('Logout') }}
                        </a>
                        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                            @csrf
                        </form>
                    </li>
                @endguest
            </ul>
        </nav>
        <main class="py-4" id="container">
            <noscript>This Website Requries Javascript</noscript>
            @yield('content')
        </main>
    </div>
    {!! js_ts('js/app.js') !!}
</body>
</html>
