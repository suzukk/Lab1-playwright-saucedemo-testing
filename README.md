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
```html
<div>
  <form>
    <input placeholder="Username">
  </form>
</div>
```
page.locator('//div/form/input') -> xpath

```html
<div>
  <section> -> нэмсэн
    <form>
      <input placeholder="Username">
    </form>
  </section>
</div>
```
Энэ үед xpath нь dom бүтцээ алдаж элементээ олохоо больж алдаа заана.

=================== Алхам 3 Assertions ==================================

1. Амжилттай нэвтрэх тест
Энэ тестээр хэрэглэгчийн нэр болон нууц үг ашиглан SauceDemo системд амжилттай нэвтэрч байгаа эсэхийг шалгасан.
Нэвтэрсний дараа Products гэсэн текст дэлгэц дээр харагдаж байгаа эсэх болон хэрэглэгч `inventory.html` хуудас руу шилжсэн эсэхийг шалгасан.

Assertions:

- toBeVisible() —> Products элемент хэрэглэгчид харагдаж байгаа эсэхийг шалгана.
- toHaveURL() —> амжилттай нэвтэрсний дараа URL нь inventory.html агуулж байгаа эсэхийг шалгана.

2. Амжилтгүй нэвтрэх тест

Энэ тестээр буруу нууц үг оруулсан үед систем хэрэглэгчийг нэвтрүүлэхгүй, алдааны мэдээлэл
харуулах эсэхийг шалгасан. Нэвтрэх оролдлогын дараа SauceDemo-ийн "Epic sadface: Username and password do not match any user in this service"
гэсэн алдааны мессеж гарч байгаа эсэхийг шалгасан.

Assertion:

- toBeVisible() —> нууц үг буруу үед гарч ирэх алдааны мессеж хэрэглэгчид харагдаж байгаа эсэхийг шалгана.

3. Барааг сагсанд нэмэх тест
Энэ тестээр хэрэглэгч амжилттай нэвтэрсний дараа бүтээгдэхүүнийг shopping cart-д нэмэх боломжтой
эсэхийг шалгасан. Эхлээд Products хуудас харагдаж байгаа эсэхийг шалгаад, эхний бүтээгдэхүүнийг 
сагсанд нэмсний дараа Your Cart хуудас руу орж, Sauce Labs Backpack бүтээгдэхүүн сагсанд нэмэгдсэн эсэхийг шалгасан.

Assertions:

- toBeVisible() —> Products хуудасны элемент харагдаж байгаа эсэхийг шалгана.
- toBeVisible() —> Your Cart текст харагдаж байгаа эсэхийг шалгана.
- toBeVisible() —> Sauce Labs Backpack бүтээгдэхүүн сагсанд харагдаж байгаа эсэхийг шалгана.

============= Алхам 4,5,6 =====================================
Failed Trace-ийн тайлбар

Failed Trace-ийг Playwright-ийн алдаа гарсан үеийн ажиллагааг шалгах зорилгоор үүсгэсэн. 
Үүнийг шалгахын тулд амжилттай нэвтрэх тестийн assertion-ийг түр хугацаанд буруу assertion-аар сольсон.

Анхны assertion:

```typescript
await expect(page.getByText('Products')).toBeVisible();
```

Тестийг зориудаар алдаатай болгохын тулд:

```typescript
await expect(page.getByText('THIS IS A WRONG ASSERTION')).toBeVisible();
```

Тест ажиллах үед хэрэглэгч амжилттай нэвтэрсэн боловч **"THIS IS A WRONG ASSERTION"** гэсэн элемент
веб хуудсанд байхгүй байсан. Тиймээс `toBeVisible()` assertion амжилтгүй болж, Playwright дараах 
алдааг үүсгэсэн:

```text
Error: expect(locator).toBeVisible() failed

Locator: getByText('THIS IS A WRONG ASSERTION')
Expected: visible
Error: element(s) not found
```

Playwright-ийн Trace Viewer ашигласнаар тестийн явцад ямар үйлдлүүд хийгдсэн, аль locator ашигласан,
assertion яг хаана амжилтгүй болсон зэргийг шалгах боломжтой байсан нь хялбар байсан. Failed
trace-ийг `docs/trace-failed.zip` файлд хадгалсан.

Дараа нь тестийн assertion-ийг буцааж сэргээсэн:

```typescript
await expect(page.getByText('Products')).toBeVisible();
```

Ингэснээр тест дахин амжилттай ажиллаж, `trace-successful.zip` файлд амжилттай тестийн trace-ийг
хадгалсан.

