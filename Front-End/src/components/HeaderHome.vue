<style>
.container-flur {
    width: 90%;
    max-width: 1400px;
    margin: auto;

}

.header-home {
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 600;
    font-size: 16px;
}

.header-button {
    display: flex;
}

.button-login {
    background-color: #8300e9;
    padding: 10px 15px !important;
    border-radius: 25px;
    text-transform: uppercase;
    color: #fff !important;
    text-align: center;
}
.button-login a {
    color: #fff !important;
}

.button-login:hover {
    opacity: .7;
    -webkit-transition: all .4s ease-in-out;
    transition: all .4s ease-in-out;
}
.lg-li {
    display: flex;
    gap: 24px;
    align-items: center;
}
.lg-li li a {
    color: rgba(0, 0, 0, .6);
    text-decoration: none;
    display: block;
    position: relative;
    -webkit-transition: opacity .4s ease-in-out, background-color .4s ease-in-out;
    transition: opacity .4s ease-in-out, background-color .4s ease-in-out;
}

.lg-li li a:hover {
    opacity: .7;
    -webkit-transition: all .4s ease-in-out;
    transition: all .4s ease-in-out;
}

/* #main-header {
    position: fixed;
    top: 0
} */
</style>

<template>
    <header id="main-header">
        <div class="container-flur">
            <div class="header-home">
                <div class="">
                    <a class="btn btn-ghost text-xl">Aikmvn</a>
                </div>
                <div class="header-button">
                    <ul class="hidden lg:flex lg-li">
                        <li href="/" class="text-xl">
                            <a href="/">
                                Giới thiệu
                            </a>
                        </li>
                        <li href="/" class="text-xl">
                            <a href="/">
                                Tính năng
                            </a>
                        </li>
                        <li href="/" class="text-xl">
                            <a href="/">
                                Hướng dẫn                                
                            </a>
                        </li>
                        <li class="button-login">
                            <a href="/">
                                ĐĂNG NHẬP
                            </a>
                        </li>
                    </ul>
                    <div class="dropdown">
                        <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul tabindex="0"
                            class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li><a>Item 1</a></li>
                            <li>
                                <a>Parent</a>
                                <ul class="p-2">
                                    <li><a>Submenu 1</a></li>
                                    <li><a>Submenu 2</a></li>
                                </ul>
                            </li>
                            <li><a>Item 3</a></li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    </header>
</template>
