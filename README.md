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

Тест скрипт ажиллуулж үзсэн ба xpath-ыг судалсан.Saucedemo дээр F12 дарж xpath-аа харахад үнэхээр ойлгомжгүй бас урт харагдаж байсан.
page.locator('/html/body/div/div/div[2]/div[1]/div/div/form/div[1]/input') -> xpath 
Анх сурж байгаа болон багаар ажиллах бол толгой эргэхээр харагдаж байсан ба 90-ээд онд гарж ирсэн ба Selenium дээр бас хэрэглэгддэг болж таарсан.
Playwright нь xpath-ыг дэмждэг боловч шаардлагатай үед л хэрэглэхийг санал болгодог.Албан ёсны хуудсандаа дурдахдаа:
XPath and CSS selectors can be tied to the DOM structure or implementation. These selectors can break when the DOM structure changes. 
Long CSS or XPath chains below are an example of a bad practice that leads to unstable tests:

Буюу Document Object Model бүтэц засагдаж шинэчлэгдэх xpath үед алдаа заадаг ба урт xpath нь тогтворгүй тестийг бий болгох хандлагатай хэмээн бичсэн ба үүнийг дэлгэрүүлж
уншихад xpath нь dom-оос хэт хамааралтай буюу developer кодоо шинэчлэх үед алдаа заах боломжтай ба modern locator-ууд нь энэ асуудлыг шийдэж чадсан хэдий кодийг зассан ч
олох элементээсээ бусад бүтцийг нээх харах шаардлагагүй.

Жишээ нь:
<div>
  <form>
    <input placeholder="Username">
  </form>
</div>

page.locator('//div/form/input') -> xpath

<div>
  <section> -> нэмсэн
    <form>
      <input placeholder="Username">
    </form>
  </section>
</div>
Энэ үед xpath нь dom бүтцээ алдаж элементээ олохоо больж алдаа заана.

trace үйлдлийг зааврын дагуу /doc хавтсанд үүсгэв. 
