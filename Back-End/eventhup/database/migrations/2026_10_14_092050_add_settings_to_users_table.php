<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->boolean('notify_email')->default(true);
            $table->boolean('notify_reminders')->default(true);
            $table->boolean('notify_promotions')->default(false);
            $table->boolean('notify_newsletter')->default(true);
            $table->string('language', 5)->default('en');
            $table->string('timezone', 64)->default('Asia/Dubai');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'notify_email',
                'notify_reminders',
                'notify_promotions',
                'notify_newsletter',
                'language',
                'timezone',
            ]);
        });
    }
};