<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <link
    rel="shortcut icon"
    href="/icon_white.png"
    type="image/x-icon"
  />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{  env('APP_NAME') }} </title>
    @viteReactRefresh
    @vite('resources/js/app.jsx')
    @inertiaHead
  </head>
  <body>
    @inertia

  </body>
</html>