<?php

namespace App\Providers;

use App\Observers\AdminPostObserver;
use Illuminate\Support\ServiceProvider;
use App\Models\Admin\Post;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Post::observe(AdminPostObserver::class);
    }
}
