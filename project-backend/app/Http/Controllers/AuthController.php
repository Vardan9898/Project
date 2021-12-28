<?php

namespace App\Http\Controllers;


use App\Http\Resources\UserResource;
use App\Models\File;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;


class AuthController extends Controller
{
//    /**
//     * Create a new AuthController instance.
//     *
//     * @return void
//     */
//    public function __construct()
//    {
//        $this->middleware('auth:api', ['except' => ['login', 'register']]);
//    }

    /**
     * Get a JWT token via given credentials.
     *
     * @param  \Illuminate\Http\Request  $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password', 'email_verified_status');
        if ($token = auth()->attempt($credentials)) {
            return $this->respondWithToken($token);
        }
        return response()->json(['error' => 'Unauthorized'], 401);
    }

    public function register(Request $request)
    {
        $ver_token = Str::random(128);
        $user = [
            "name" => $request->get('name'),
            "email" => $request->get('email'),
            "age" => $request->get('age'),
            "address" => $request->get('address'),
            "password" => Hash::make($request->get('password')),
            "image" => $request->get('image'),
            "verification_token" => $ver_token
        ];

        $newUser = User::query()->create($user);
        if ($newUser) {
            $this->emailVerification($newUser, $ver_token);

//            $data = $request;
//            $photos = File::create($data);
//
//            $imagePath = $data['image']->store('profile_images');
//
//            $photos->img_path = $imagePath;
//            $photos->save();

            return response()->json(['message' => 'Please check Your email']);
        }
        return response()->json(['message' => 'Something is wrong']);
    }
    /**
     * @param User $user
     * @param $token
     */
    public function emailVerification(User $user, $token)
    {
        Mail::send('mail.verify', ['user' => $user, 'token' => $token], function ($m) use ($user) {
            $m->to($user->email, $user->name)->subject('Please Verify your Email');
        });
    }
    public function verify(){
            $email_status = [
                'email_verified_status' => 'active'
            ];
            $ver_token = [
                'verification_token' => null
            ];
            User::query()->update($email_status);
            User::query()->update($ver_token);
    }

    /**
     * Get the authenticated User
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json([ auth()->user()]);
    }
    public function all_users()
    {
        return response()->json([ auth()->user()->all()]);
    }

    /**
     * Log the user out (Invalidate the token)
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        $this->guard()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }



    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken($this->guard()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => $this->guard()->factory()->getTTL() * 60
        ]);
    }

    /**
     * Get the guard to be used during authentication.
     *
     * @return \Illuminate\Contracts\Auth\Guard
     */
    public function guard()
    {
        return Auth::guard();
    }
}
