<div align="center">

<img src="src/assets/banner.svg" alt="Raujin Calc" width="100%" />

<br />

[![Demo](https://img.shields.io/badge/Демо-Открыть_проект-C4A35A?style=for-the-badge&labelColor=080808&logo=googlechrome&logoColor=C4A35A)](https://grigorjanarsen.github.io/raujin-calc/)
[![License](https://img.shields.io/badge/Лицензия-MIT-C4A35A?style=for-the-badge&labelColor=080808)](#лицензия)
[![React](https://img.shields.io/badge/React-18-C4A35A?style=for-the-badge&labelColor=080808&logo=react&logoColor=C4A35A)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-C4A35A?style=for-the-badge&labelColor=080808&logo=vite&logoColor=C4A35A)](https://vitejs.dev)

**Интерактивный инструмент для расчёта потенциала роста бизнеса от дизайн-услуг**

</div>

<br />

<div align="center">

[О проекте](#о-проекте) · [Как это работает](#как-это-работает) · [Формула](#формула-расчёта) · [Фирменный стиль](#фирменный-стиль) · [Установка](#установка-и-запуск) · [Технологии](#технологии) · [Структура](#структура-проекта) · [Автор](#автор)

</div>

<br />

## О проекте

Профессиональный калькулятор, разработанный в рамках производственной практики в дизайн-студии. Позволяет оценить экономический эффект от внедрения дизайн-услуг с учётом ниши бизнеса, канала трафика и объёма аудитории.

<br />

## Как это работает

<table>
<tr><td align="center" width="60"><b>01</b></td><td>Выберите <b>нишу</b> — от E-commerce до HoReCa (12 вариантов)</td></tr>
<tr><td align="center"><b>02</b></td><td>Выберите <b>услугу</b> — брендинг, веб-дизайн, UI/UX и другие (9 услуг)</td></tr>
<tr><td align="center"><b>03</b></td><td>Укажите <b>источник трафика</b> — Instagram, Telegram, контекстная реклама, SEO и т.д.</td></tr>
<tr><td align="center"><b>04</b></td><td>Введите <b>объём аудитории</b> — от 100 до 10 000 000 человек</td></tr>
<tr><td align="center"><b>05</b></td><td>Получите <b>результат</b>: потенциал роста в %, ориентировочную прибыль, срок окупаемости услуги и детальное объяснение расчёта</td></tr>
</table>

<br />

## Формула расчёта

```
Рост (%)        = база ниши + модификатор услуги + бонус от аудитории
Прибыль (₽)     = аудитория × конверсия × средний чек × (рост / 100)
Окупаемость (мес.) = стоимость услуги / (прибыль / 12)
```

<br />

## Фирменный стиль

<table>
<tr>
<td valign="top" width="50%">

**Цвета**

![#080808](https://img.shields.io/badge/Фон-%23080808-080808?style=for-the-badge&labelColor=1a1a1a)
![#C4A35A](https://img.shields.io/badge/Акцент-%23C4A35A-C4A35A?style=for-the-badge&labelColor=1a1a1a)

</td>
<td valign="top" width="50%">

**Шрифты**

| Роль | Шрифт |
|---|---|
| Заголовки | `Cormorant Garamond` |
| Текст | `Spectral` |
| Цифры | `JetBrains Mono` |

</td>
</tr>
</table>

Фон с текстурой шума и фирменный угловой мотив под **13°** — как на баннере выше.

<br />

## Установка и запуск

```bash
git clone https://github.com/GrigorjanArsen/raujin-calc.git
cd raujin-calc
npm install
npm run dev      # локальная разработка
npm run build    # сборка проекта
```

<br />

## Технологии

![React](https://img.shields.io/badge/React_18-C4A35A?style=for-the-badge&labelColor=080808&logo=react&logoColor=C4A35A)
![Vite](https://img.shields.io/badge/Vite-C4A35A?style=for-the-badge&labelColor=080808&logo=vite&logoColor=C4A35A)
![CSS3](https://img.shields.io/badge/CSS3-C4A35A?style=for-the-badge&labelColor=080808&logo=css3&logoColor=C4A35A)
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-C4A35A?style=for-the-badge&labelColor=080808&logo=githubpages&logoColor=C4A35A)

<br />

## Структура проекта

```
src/
├── components/
│   ├── Calculator.jsx
│   ├── CustomSelect.jsx
│   └── Footer.jsx
├── data/
│   └── calculatorData.js
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

<br />

## Демо

<div align="center">

[![Открыть демо](https://img.shields.io/badge/grigorjanarsen.github.io/raujin--calc-C4A35A?style=for-the-badge&labelColor=080808&logo=googlechrome&logoColor=C4A35A)](https://grigorjanarsen.github.io/raujin-calc/)

</div>

<br />

## Автор

**Арсен Григорян**
Студент 3 курса, Тюменский индустриальный университет
Дизайнер-разработчик

<br />

## Лицензия

Проект распространяется под лицензией **MIT**.

<br />

> **Дисклеймер:** расчёт ориентировочный, основан на средних показателях по нише, не является гарантией дохода.

<div align="center">
<br />

<sub>◆ RAUJIN CALC ◆</sub>

</div>