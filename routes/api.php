<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {

    Route::post('login', 'Api\Auth\AuthController@login');
    // Route::post('register', 'Api\Auth\AuthController@register');
    Route::get('email/verify/{id}', 'Api\Auth\VerificationApiController@verify')->name('verificationapi.verify');
    Route::post('email/resend', 'Api\Auth\VerificationApiController@resendVerificationmail')->name('verificationapi.resend');
    Route::post('password/forgot', 'Api\Auth\ForgotPasswordController@sendResetLinkEmail')->name('api.forgot-password');
    Route::post('password/reset', 'Api\Auth\ResetPasswordController@reset')->name('api.reset-password');

    Route::post('logout', 'Api\Auth\AuthController@logoutCurrentUser')->middleware('jwt.verify');
    Route::post('refresh', 'Api\Auth\AuthController@refresh');

    Route::get('me', 'Api\Auth\AuthController@me')->middleware('jwt.verify');
    
});

/**
 * Universal Role
 */
// Profile Settings
Route::post('/universal/profile/password/edit', 'Api\ProfileSettingsController@changePassword');
Route::post('/universal/profile/identity/edit', 'Api\ProfileSettingsController@editIdentity');

/**
 * Admin Section
 */
// Users
Route::post('/siAdmino/users/create', 'Api\Admin\UsersController@createUser');
// Members
Route::get('/siAdmino/users/member/list', 'Api\Admin\MemberController@getDaftarMember');
Route::post('/siAdmino/users/member/edit/{id}', 'Api\Admin\MemberController@editMember');
Route::post('/siAdmino/users/member/delete/{id}', 'Api\Admin\MemberController@deleteMember');
Route::post('/siAdmino/users/member/search', 'Api\Admin\MemberController@searchMember');

// Pustakawan
Route::get('/siAdmino/users/pustakawan/list', 'Api\Admin\PustakawanController@getDaftarPustakawan');
Route::post('/siAdmino/users/pustakawan/edit/{id}', 'Api\Admin\PustakawanController@editPustakawan');
Route::post('/siAdmino/users/pustakawan/delete/{id}', 'Api\Admin\PustakawanController@deletePustakawan');
Route::post('/siAdmino/users/pustakawan/search', 'Api\Admin\PustakawanController@searchPustakawan');

// Admin
Route::get('/siAdmino/users/admin/list', 'Api\Admin\AdminController@getDaftarAdmin');
Route::post('/siAdmino/users/admin/edit/{id}', 'Api\Admin\AdminController@editAdmin');
Route::post('/siAdmino/users/admin/delete/{id}', 'Api\Admin\AdminController@deleteAdmin');
Route::post('/siAdmino/users/admin/search', 'Api\Admin\AdminController@searchAdmin');


/**
 * Pustakawan Section
 */
// Buku
Route::post('/perpus/buku/create', 'Api\Pustakawan\BukuController@createBuku');
Route::get('/perpus/buku/list', 'Api\Pustakawan\BukuController@getDaftarBuku');
Route::post('/perpus/buku/edit/{id}', 'Api\Pustakawan\BukuController@editBuku');
Route::post('/perpus/buku/delete/{id}', 'Api\Pustakawan\BukuController@deleteBuku');
// Member
Route::get('/perpus/users/member/list', 'Api\Pustakawan\MemberController@getDaftarMember');
Route::post('/perpus/users/member/edit/{id}', 'Api\Pustakawan\MemberController@editMember');
Route::post('/perpus/users/member/delete/{id}', 'Api\Pustakawan\MemberController@deleteMember');
Route::post('/perpus/users/member/create', 'Api\Pustakawan\MemberController@createMember');
Route::post('/perpus/users/member/search', 'Api\Pustakawan\MemberController@searchMember');
// Peminjaman
Route::post('/perpus/pinjam-buku', 'Api\Pustakawan\PeminjamanController@createPeminjamanBuku');
Route::get('/perpus/sikulasi/list', 'Api\Pustakawan\PeminjamanController@getDaftarSirkulasi');
Route::post('/perpus/perpanjang-buku/{id}', 'Api\Pustakawan\PeminjamanController@perpanjangBuku');
Route::post('/perpus/kembalikan-buku/{id}', 'Api\Pustakawan\PeminjamanController@kembalikanBuku');
Route::get('/perpus/log-data/peminjaman', 'Api\Pustakawan\PeminjamanController@getDaftarPeminjaman');
Route::get('/perpus/log-data/peminjaman/export', 'Api\Pustakawan\PeminjamanController@exportLogPeminjaman');
Route::get('/perpus/log-data/pengembalian', 'Api\Pustakawan\PeminjamanController@getDaftarPengembalian');
Route::get('/perpus/log-data/pengembalian/export', 'Api\Pustakawan\PeminjamanController@exportLogPengembalian');