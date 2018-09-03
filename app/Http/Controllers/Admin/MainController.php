<?php

namespace App\Http\Controllers\Admin;

use App\AdminUser;
use Illuminate\Contracts\Session\Session;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class MainController extends Controller
{
    public function getView()   {
        return view('admin/pages/dashboard');
    }

    public function getAdminAccess()    {
        if($this->checkLogin()) {
            return $this->getView();
        }else {
            return view('admin/pages/login');
        }
    }

    public function checkLogin()   {
        if(!empty(session('logged_admin')) && session('logged_admin') == true)    {
            //LOGGED
            return true;
        }else {
            //NOT LOGGED
            return false;
        }
    }

    public function logout(Request $request)    {
        if($request->session()->has('logged_admin'))    {
            $request->session()->forget('logged_admin');
        }
        return redirect()->route('admin-access');
    }

    public function authenticateAdmin(Request $request) {
        $this->validate($request, [
            'username' => 'required',
            'password' => 'required'
        ]);

        if(!empty(AdminUser::where(array('username' => $request->input('username'), 'password' => hash_pbkdf2('sha256', $request->input('password'), '', 10000, 32)))->get()->first()))   {
            session(['logged_admin' => true]);
            return redirect()->route('admin-access');
        }else {
            return redirect()->route('admin-access')->with(['error' => 'Wrong account!']);
        }
    }
}
