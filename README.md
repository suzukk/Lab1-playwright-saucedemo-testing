B232270011 С.Тэргэл Лаборатор 1

================ Алхам 1(Орчин бэлдэх) ==================

-Node.js татах
[heloise@arch my-first-test]$ node --version
v26.8.1

-Playwright татах
[heloise@arch my-first-test]$ npx playwright --version
npm notice run my-first-test@1.0.0 npx
npm notice run 'playwright' --version
Version 1.63.0

Тулгарсан асуудал гэвэл миний ашиглаж байсан үйлдлийн систем нь Arch Linux байсан ба  dual boot хийх нь тохиромжгүй байсан. Playwright-ийг суулгах явцад `apt-get: command not found` гэсэн алдаа гарсан. Учир нь `apt-get` нь Debian/Ubuntu Linux үйлдлийн системд ашиглагддаг package manager харин Arch Linux-д `pacman` ашигладаг.
Иймээс хамгийн хялбар арга гэж үзэн Playwright-д шаардлагатай боловч дутуу байсан ICU болон бусад library-үүдийг manual байдлаар татаж, суулгасан. Үүний дараа Playwright-ийг Arch Linux орчинд амжилттай тохируулж, хэвийн ажиллуулсан.

================ Алхам 2(Test script) ==================

