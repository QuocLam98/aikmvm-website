<template>
    <div class="pb-10 pt-10 min-h-[calc(100vh-5rem)]">
        <div class="lg:px-10">
            <div class="drawer lg:drawer-open chat-container relative overflow-y-hidden shadow"><input type="checkbox"
                    class="drawer-toggle">
                <div class="drawer-content">
                    <div
                        class="flex justify-between w-full bg-white px-2 pt-0.5 pb-1.5 shadow-md border-l border-b border-base-300 z-10">
                        <div class="mt-2 grid grid-flow-col-dense place-content-center gap-2">
                            <div class="tooltip tooltip-right cursor-pointer" data-tip="Ấn để tắt tự trả lời"><label
                                    class="swap swap-rotate"><input type="checkbox" class="hidden"><svg
                                        xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                        aria-hidden="true" role="img" class="icon swap-on w-6 h-6 text-success"
                                        width="1em" height="1em" viewBox="0 0 24 24">
                                        <g fill="none" stroke="currentColor" stroke-linecap="round"
                                            stroke-linejoin="round" stroke-width="2">
                                            <path d="M11.217 19.384A3.501 3.501 0 0 0 18 18.167V13l-6-3.35"></path>
                                            <path d="M5.214 15.014A3.501 3.501 0 0 0 9.66 20.28L14 17.746V10.8"></path>
                                            <path
                                                d="M6 7.63c-1.391-.236-2.787.395-3.534 1.689a3.474 3.474 0 0 0 1.271 4.745L8 16.578l6-3.348">
                                            </path>
                                            <path d="M12.783 4.616A3.501 3.501 0 0 0 6 5.833V10.9l6 3.45"></path>
                                            <path d="M18.786 8.986A3.501 3.501 0 0 0 14.34 3.72L10 6.254V13.2"></path>
                                            <path
                                                d="M18 16.302c1.391.236 2.787-.395 3.534-1.689a3.474 3.474 0 0 0-1.271-4.745l-4.308-2.514L10 10.774">
                                            </path>
                                        </g>
                                    </svg><svg xmlns="http://www.w3.org/2000/svg"
                                        xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img"
                                        class="icon swap-off w-6 h-6 text-error" width="1em" height="1em"
                                        viewBox="0 0 24 24">
                                        <path fill="currentColor"
                                            d="m19.775 22.575l-7.65-7.625l1.95-.9l6.875 6.875q-.25.5-.725.788t-1.05.287H4q-.825 0-1.412-.587T2 20V4.825L1.375 4.2q-.3-.3-.3-.713t.3-.712t.713-.3t.712.3l18.4 18.4q.3.3.3.7t-.3.7t-.712.3t-.713-.3M22 4v12.7q0 .35-.175.575t-.45.35t-.55.088t-.525-.288l-4.7-4.7l-2.3-6.1q-.125-.275-.375-.45T12.375 6h-.75q-.3 0-.55.175t-.375.45l-.325.875l-3.8-3.8q-.25-.25-.288-.525t.088-.55t.35-.45T7.3 2H20q.825 0 1.413.588T22 4M9.6 14.95h2.525l-1.85-1.85L8.8 11.625l-1.9 5.05q-.2.475.1.9t.8.425q.325 0 .563-.175t.362-.475zm2.35-6.7h.1l.5 1.425l-.825-.825zm2.125 5.8l1.2 3.325q.1.275.35.45t.55.175q.4 0 .663-.262t.312-.613z">
                                        </path>
                                    </svg></label></div><span class="font-semibold">Bot giáo dục</span>
                        </div><span class="p-6"></span><button class="btn btn-ghost lg:hidden"><svg
                                xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                aria-hidden="true" role="img" class="icon w-5 h-5" width="1em" height="1em"
                                viewBox="0 0 15 15">
                                <path fill="currentColor" fill-rule="evenodd"
                                    d="M1.5 3a.5.5 0 0 0 0 1h12a.5.5 0 0 0 0-1zM1 7.5a.5.5 0 0 1 .5-.5h12a.5.5 0 0 1 0 1h-12a.5.5 0 0 1-.5-.5m0 4a.5.5 0 0 1 .5-.5h12a.5.5 0 0 1 0 1h-12a.5.5 0 0 1-.5-.5"
                                    clip-rule="evenodd"></path>
                            </svg></button>
                    </div>
                    <div class="bg-zinc-50 border-l border-base-300 w-full shadow-inner overflow-y-scroll relative py-2" style="height: calc(10px - 7.6rem + 80vh);">

                    </div>
                    <div class="bg-white py-2 px-3 border-l flex border-t border-base-300"><input
                            placeholder="Viết gì đó ..." type="text"
                            class="w-full border-none focus-within:ring-0 px-0 focus-visible:outline-none"
                            maxlength="1000"><svg xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img"
                            class="icon w-10 h-10 ml-2 text-primary cursor-pointer transition-all active:scale-75"
                            width="1em" height="1em" viewBox="0 0 48 48">
                            <path fill="currentColor"
                                d="M41.42 7.309s3.885-1.515 3.56 2.164c-.107 1.515-1.078 6.818-1.834 12.553l-2.59 16.99s-.216 2.489-2.159 2.922c-1.942.432-4.856-1.515-5.396-1.948c-.432-.325-8.094-5.195-10.792-7.575c-.756-.65-1.62-1.948.108-3.463L33.649 18.13c1.295-1.3 2.59-4.33-2.806-.65l-15.11 10.28s-1.727 1.083-4.964.109l-7.016-2.165s-2.59-1.623 1.835-3.246c10.793-5.086 24.068-10.28 35.831-15.15">
                            </path>
                        </svg></div>
                </div>
                <div class="drawer-side scrollbar-none"><label class="drawer-overlay"></label>
                    <div id="nMYDQlaP6BQ_0" class="bg-base-100 min-h-full">
                        <div class="px-5 py-3 bg-gray-100 flex justify-between sticky top-0 z-10 shadow">
                            <h2 class="font-semibold text-base my-auto">Danh sách AI</h2>
                            <div class="dropdown dropdown-end">
                                <div tabindex="0" role="button" class="btn btn-sm btn-ghost"><svg
                                        xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                        aria-hidden="true" role="img" class="icon text-lg" width="1em" height="1em"
                                        viewBox="0 0 24 24">
                                        <path fill="currentColor"
                                            d="M14 12v7.88c.04.3-.06.62-.29.83a.996.996 0 0 1-1.41 0l-2.01-2.01a.99.99 0 0 1-.29-.83V12h-.03L4.21 4.62a1 1 0 0 1 .17-1.4c.19-.14.4-.22.62-.22h14c.22 0 .43.08.62.22a1 1 0 0 1 .17 1.4L14.03 12z">
                                        </path>
                                    </svg></div>
                                <ul tabindex="0"
                                    class="dropdown-content menu bg-base-100 rounded-box z-[1] w-32 p-2 shadow">
                                    <li><a>All</a></li>
                                    <li><a>Website</a></li>
                                    <li><a>Facebook</a></li>
                                </ul>
                            </div>
                        </div>
                        <ul class="menu p-4 w-72 pb-[25vh] text-base-content">
                            <li class="w-full"><a class="w-full menu-active"><!----> TDC Irving Simonis IV</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.drawer-side h2,
svg {
    color: black;
}
.chat-container {
    max-height: 80vh;
}
</style>