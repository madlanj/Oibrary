import multiguard from 'vue-router-multiguard';
import axios from 'axios'

import PustakawanLayout from "./layouts/Dashboard-Pustakawan.vue";
// import MemberLayout from "./layouts/Dashboard-Member.vue";
import AdminLayout from "./layouts/Dashboard-Admin.vue";

// For Auth
import Login from "./pages/auth/Login.vue"
import Register from "./pages/auth/Register.vue"
import ForgotPassword from "./pages/auth/ForgotPassword.vue"
import ResetPassword from "./pages/auth/ResetPassword.vue"
import ResendVerificationMail from "./pages/auth/ResendVerificationMail.vue"
import RedirectAfterVerify from "./pages/auth/RedirectAfterVerify.vue"
import LandingLayout from "./layouts/Landing.vue"
import LandingPage from "./pages/LandingPage.vue"
import UnverifiedEmail from "./pages/auth/UnverifiedEmail.vue"
import Halaman404 from "./pages/404.vue"

// Admin
import AdminHomePage from "./pages/admin/AdminHome.vue"
import AdminCreateUser from "./pages/admin/users/CreateUser.vue"
import AdminDaftarAnggota from "./pages/admin/users/DaftarAnggota.vue"
import AdminDaftarPustakawan from "./pages/admin/users/DaftarPustakawan.vue"
import AdminDaftarAdmin from "./pages/admin/users/DaftarAdmin.vue"
import AdminEditPassword from "./pages/admin/settings/EditPassword.vue"
import AdminEditIdentity from "./pages/admin/settings/EditIdentity.vue"

// Pustakawan
import PusatakawanHomePage from "./pages/pustakawan/PustakawanHome.vue"
import CreateBuku from "./pages/pustakawan/buku/BuatBuku.vue"
import DaftarBuku from "./pages/pustakawan/buku/DaftarBuku.vue"
import PinjamBuku from "./pages/pustakawan/peminjaman/PinjamBuku.vue"
import Sirkulasi from "./pages/pustakawan/peminjaman/Sirkulasi.vue"
import LogPeminjaman from "./pages/pustakawan/logData/Peminjaman.vue"
import LogPengembalian from "./pages/pustakawan/logData/Pengembalian.vue"
import CreateAnggota from "./pages/pustakawan/anggota/CreateAnggota.vue"
import DaftarAnggota from "./pages/pustakawan/anggota/DaftarAnggota.vue"
import PustakawanEditPassword from "./pages/pustakawan/settings/EditPassword.vue"
import PustakawanEditIdentity from "./pages/pustakawan/settings/EditIdentity.vue"

// // Member
// import MemberHomePage from "./pages/member/MemberHome.vue"

import Component from "./components/ExampleComponent.vue"

const token = localStorage.getItem('userToken')
if (token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer' + ' ' + token
}

const nama_sekolah = process.env.MIX_NAMA_SEKOLAH

/**
 *
 * For Authenticated
 * And Not Authenticated
 *
 * Guard
 */
const ifAuthenticated = (to, from, next) => {
    if (localStorage.getItem('userToken')) {
        next()
        return
    } else {
        next('/login')
    }
}

const ifNotAuthenticated = (to, from, next) => {

    if (localStorage.hasOwnProperty('userToken') === false) {
        next()
    } else {

            axios.get('api/auth/me', {
                headers: {
                  Authorization: 'Bearer ' + token,
                  withCredentials: true //the token is a variable which holds the token
                }
               })
                .then(function (response) {
                    // handle success
                    let userRole = response.data.role
                    if (userRole == "admin") {
                        next('/siAdmino')
                        return
                    } else {
                        next('/perpus')
                    }
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
    }
}


/**
 * Guard For
 * Admin Only
 * &
 * User Only
 */
const adminOnly = (to, from, next) => {
        axios.get('api/auth/me')
            .then(function (response) {
                // handle success
                let userRole = response.data.role
                if (userRole == "admin") {
                    next()
                    return
                } else {
                    next('/login')
                    return
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
}

const pustakawanOnly = (to, from, next) => {

        axios.get('api/auth/me')
            .then(function (response) {
                // handle success
                let userRole = response.data.role
                if (userRole == "pustakawan") {
                    next()
                    return
                } else {
                    next('/login')
                    return
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
}

// const memberOnly = (to, from, next) => {

//     axios.get('api/auth/me')
//         .then(function (response) {
//             // handle success
//             let userRole = response.data.role
//             if (userRole == "member") {
//                 next()
//                 return
//             } else {
//                 next('/login')
//                 return
//             }
//         })
//         .catch(function (error) {
//             // handle error
//             console.log(error);
//         })
// }

/**
 * Guard For
 * Verified User Email
 */
const verifiedEmail = (to, from, next) => {

    axios.get('api/auth/me')
        .then(function (response) {
            // handle success
            let isVerified = response.data.user.email_verified_at
            if (isVerified) {
                next()
                return
            } else {
                next('/UnverifiedEmail')
                return
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
}

/**
* Guard For
* Un Verified User Email
*/
const unVerifiedEmail = (to, from, next) => {

axios.get('api/auth/me')
    .then(function (response) {
        // handle success
        let isVerified = response.data.user.email_verified_at
        if (isVerified == null) {
            next('/UnverifiedEmail')
            return
        } else {
            next()
            return
        }
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
}

const pageTitle = (to, from, next) => {
    document.title = to.meta.title
    next()
}


export const routes = [
    {
        path: "",
        component: LandingLayout,
        beforeEnter: multiguard([ifNotAuthenticated]),
        children: [
            {
                path: "",
                meta: {
                    title: 'Welcome To' + 'Perpus ' + nama_sekolah,
                },
                component: LandingPage,
            }
        ]
    },
    // {
    //     path: "/home",
    //     component: MemberLayout,
    //     children: [
    //         {
    //             path: "",
    //             component: MemberHomePage,
    //             beforeEnter: multiguard([ifAuthenticated, memberOnly, verifiedEmail]),
    //         }
    //     ]
    // },
    {
        path: "/perpus",
        component: PustakawanLayout,
        children: [
            {
                path: "",
                component: PusatakawanHomePage,
                meta: {
                    title: 'Home - ' + 'Perpus ' + nama_sekolah,
                },
                beforeEnter: multiguard([ifAuthenticated, pustakawanOnly, verifiedEmail, pageTitle]),
            },
            {
                path: "buku/create",
                component: CreateBuku,
                meta: {
                    title: 'Tambah Buku - ' + 'Perpus ' + nama_sekolah,
                },
                beforeEnter: multiguard([ifAuthenticated, pustakawanOnly, verifiedEmail, pageTitle]),
            },
            {
                path: "buku/list",
                component: DaftarBuku,
                meta: {
                    title: 'Daftar Buku - ' + 'Perpus ' + nama_sekolah,
                },
                beforeEnter: multiguard([ifAuthenticated, pustakawanOnly, verifiedEmail, pageTitle]),
            },
            {
                path: "pinjam-buku",
                component: PinjamBuku,
                meta: {
                    title: 'Pinjam Buku - ' + 'Perpus ' + nama_sekolah,
                },
                beforeEnter: multiguard([ifAuthenticated, pustakawanOnly, verifiedEmail, pageTitle]),
            },
            {
                path: "sirkulasi",
                component: Sirkulasi,
                meta: {
                    title: 'Sirkulasi - ' + 'Perpus ' + nama_sekolah,
                },
                beforeEnter: multiguard([ifAuthenticated, pustakawanOnly, verifiedEmail, pageTitle]),
            },
            {
                path: "log-data/peminjaman",
                component: LogPeminjaman,
                meta: {
                    title: 'Log Data Peminjaman - ' + 'Perpus ' + nama_sekolah,
                },
                beforeEnter: multiguard([ifAuthenticated, pustakawanOnly, verifiedEmail, pageTitle]),
            },
            {
                path: "log-data/pengembalian",
                component: LogPengembalian,
                meta: {
                    title: 'Log Data Pengembalian - ' + 'Perpus ' + nama_sekolah,
                },
                beforeEnter: multiguard([ifAuthenticated, pustakawanOnly, verifiedEmail, pageTitle]),
            },
            {
                path: "anggota/create",
                component: CreateAnggota,
                meta: {
                    title: 'Tambah Anggota - ' + 'Perpus ' + nama_sekolah,
                },
                beforeEnter: multiguard([ifAuthenticated, pustakawanOnly, verifiedEmail, pageTitle]),
            },
            {
                path: "anggota/list",
                component: DaftarAnggota,
                meta: {
                    title: 'Daftar Anggota - ' + 'Perpus ' + nama_sekolah,
                },
                beforeEnter: multiguard([ifAuthenticated, pustakawanOnly, verifiedEmail, pageTitle]),
            },
            {
                path: "profile/settings/password",
                component: PustakawanEditPassword,
                meta: {
                    title: 'Ganti Password - ' + 'Perpus ' + nama_sekolah,
                },
                beforeEnter: multiguard([ifAuthenticated, pustakawanOnly, verifiedEmail, pageTitle]),
            },
            {
                path: "profile/settings/identity",
                component: PustakawanEditIdentity,
                meta: {
                    title: 'Ubah Identitas - ' + 'Perpus ' + nama_sekolah,
                },
                beforeEnter: multiguard([ifAuthenticated, pustakawanOnly, verifiedEmail, pageTitle]),
            },
        ]
    },
    {
        path: "/siAdmino",
        component: AdminLayout,
        children: [
            {
                path: "",
                component: AdminHomePage,
                meta: {
                    title: 'Admin Home - ' + 'Perpus ' + nama_sekolah,
                },
                beforeEnter: multiguard([ifAuthenticated, adminOnly, verifiedEmail, pageTitle]),
            },
            {
                path: "users/create",
                component: AdminCreateUser,
                meta: {
                    title: 'Create User - ' + 'Perpus ' + nama_sekolah,
                },
                beforeEnter: multiguard([ifAuthenticated, adminOnly, verifiedEmail, pageTitle]),
            },
            {
                path: "users/anggota/list",
                component: AdminDaftarAnggota,
                meta: {
                    title: 'Daftar Anggota - ' + 'Perpus ' + nama_sekolah,
                },
                beforeEnter: multiguard([ifAuthenticated, adminOnly, verifiedEmail, pageTitle]),
            },
            {
                path: "users/pustakawan/list",
                component: AdminDaftarPustakawan,
                meta: {
                    title: 'Daftar Pustakawan - ' + 'Perpus ' + nama_sekolah,
                },
                beforeEnter: multiguard([ifAuthenticated, adminOnly, verifiedEmail, pageTitle]),
            },
            {
                path: "users/admin/list",
                component: AdminDaftarAdmin,
                meta: {
                    title: 'Daftar Admin - ' + 'Perpus ' + nama_sekolah,
                },
                beforeEnter: multiguard([ifAuthenticated, adminOnly, verifiedEmail, pageTitle]),
            },
            {
                path: "profile/settings/password",
                component: AdminEditPassword,
                meta: {
                    title: 'Ganti Password - ' + 'Perpus ' + nama_sekolah,
                },
                beforeEnter: multiguard([ifAuthenticated, adminOnly, verifiedEmail, pageTitle]),
            },
            {
                path: "profile/settings/identity",
                component: AdminEditIdentity,
                meta: {
                    title: 'Ubah Identitas - ' + 'Perpus ' + nama_sekolah,
                },
                beforeEnter: multiguard([ifAuthenticated, adminOnly, verifiedEmail, pageTitle]),
            },
        ]
    },

    /**
     * For Authentication Purposes
     */
    {
        path: "/login",
        component: Login,
        meta: {
            title: 'Login - ' + 'Perpus ' + nama_sekolah,
        },
        beforeEnter: multiguard([ifNotAuthenticated, pageTitle]),
    },
    // {
    //     path: "/register",
    //     component: Register,
    //     meta: {
    //         title: 'Register - ' + nama_sekolah,
    //     },
    //     beforeEnter: multiguard([ifNotAuthenticated]),
    // },
    // {
    //     path: "/forgot-password",
    //     component: ForgotPassword,
    //     meta: {
    //         title: 'Forgot Password - ' + 'Perpus ' + nama_sekolah,
    //     },
    //     beforeEnter: multiguard([ifNotAuthenticated, pageTitle]),
    // },
    // {
    //     path: "/reset-password",
    //     component: ResetPassword,
    //     meta: {
    //         title: 'Reset Password - ' + 'Perpus ' + nama_sekolah,
    //     },
    //     beforeEnter: multiguard([ifNotAuthenticated, pageTitle]),
    // },
    // {
    //     path: "/resend-verification-mail",
    //     component: ResendVerificationMail,
    //     meta: {
    //         title: 'Resend Verification Mail - ' + 'Perpus ' + nama_sekolah,
    //     },
    //     beforeEnter: multiguard([ifNotAuthenticated, pageTitle]),
    // },
    {
        path: "/verification-success",
        component: RedirectAfterVerify,
        meta: {
            title: 'Verification Success - ' + 'Perpus ' + nama_sekolah,
        },
        beforeEnter: multiguard([pageTitle]),
    },
    {
        path: "/UnverifiedEmail",
        component: UnverifiedEmail,
        meta: {
            title: 'Unverified Email Address - ' + 'Perpus ' + nama_sekolah,
        },
        beforeEnter: multiguard([pageTitle]),
    },
    {
        path: "*",
        component: Halaman404,
        meta: {
            title: '404 Not Found - ' + 'Perpus ' + nama_sekolah,
        },
        beforeEnter: multiguard([pageTitle]),
    }
];


