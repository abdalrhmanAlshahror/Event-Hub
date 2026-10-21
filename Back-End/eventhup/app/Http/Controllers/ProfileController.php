<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class ProfileController extends Controller
{
    private function validationError($validator)
    {
        return response()->json([
            'status'  => false,
            'message' => $validator->errors(),
        ], 422);
    }

    // ====== Profile Info ======
    public function update(Request $request)
    {
        $user = $request->user();

        $validator = Validator::make($request->all(), [
            'name'          => ['required', 'string', 'max:255'],
            'email'         => ['required', 'email', 'max:255', Rule::unique('users', 'email')->ignore($user->id)],
            'bio'           => ['nullable', 'string', 'max:500'],
            'profile_photo' => ['nullable', 'file', 'mimes:jpg,jpeg,png,gif', 'max:2048'],
        ]);

        if ($validator->fails()) {
            return $this->validationError($validator);
        }

        if ($request->hasFile('profile_photo')) {
            $file = $request->file('profile_photo');
            $filename = time() . '_' . Str::uuid() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('profiles'), $filename);

            // امسح الصورة القديمة (إذا كانت محفوظة عندنا مش رابط خارجي)
            if ($user->profile_photo && !Str::startsWith($user->profile_photo, 'http')) {
                File::delete(public_path($user->profile_photo));
            }

            $user->profile_photo = 'profiles/' . $filename;
        }

        $user->name = $request->name;
        $user->email = $request->email;
        $user->bio = $request->bio;
        $user->save();

        return response()->json([
            'status' => true,
            'user'   => $user,
        ]);
    }

    // ====== Security & Password ======
    public function updatePassword(Request $request)
    {
        $user = $request->user();

        $validator = Validator::make($request->all(), [
            'current_password' => ['required', 'string'],
            'password'         => ['required', 'confirmed', Password::min(8)->mixedCase()->numbers()],
        ]);

        if ($validator->fails()) {
            return $this->validationError($validator);
        }

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json([
                'status'  => false,
                'message' => ['current_password' => ['Current password is incorrect']],
            ], 422);
        }

        if (Hash::check($request->password, $user->password)) {
            return response()->json([
                'status'  => false,
                'message' => ['password' => ['New password must be different from the current one']],
            ], 422);
        }

        $user->password = Hash::make($request->password);
        $user->save();

        return response()->json([
            'status'  => true,
            'message' => 'Password updated successfully',
        ]);
    }

    // ====== Notifications ======
    public function updateNotifications(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'notify_email'      => ['required', 'boolean'],
            'notify_reminders'  => ['required', 'boolean'],
            'notify_promotions' => ['required', 'boolean'],
            'notify_newsletter' => ['required', 'boolean'],
        ]);

        if ($validator->fails()) {
            return $this->validationError($validator);
        }

        $user = $request->user();
        $user->update($validator->validated());

        return response()->json([
            'status' => true,
            'user'   => $user->fresh(),
        ]);
    }

    // ====== Language & Region ======
    public function updatePreferences(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'language' => ['required', Rule::in(['en', 'ar'])],
            'timezone' => ['required', 'timezone'],
        ]);

        if ($validator->fails()) {
            return $this->validationError($validator);
        }

        $user = $request->user();
        $user->update($validator->validated());

        return response()->json([
            'status' => true,
            'user'   => $user->fresh(),
        ]);
    }
}