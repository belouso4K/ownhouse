<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class IsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        /*
      Any user with a permission that is not an admin will
      receive a 403 un authorized action response.
    */
        if (Auth::user()->permission != 'admin' ) {
            abort(403, 'Несанкционированное действие.');
        }
        return $next($request);
    }
}
