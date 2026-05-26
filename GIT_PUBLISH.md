# Публикация репозитория Edu как Private

Выполните команды **в терминале** (PowerShell или cmd), перейдя в папку проекта.

## 1. Откройте терминал в папке Edu

Например в Cursor: **Terminal → New Terminal** (рабочая папка уже будет Edu).

## 2. Инициализация Git и первый коммит

```powershell
git init
git add .
git commit -m "Initial commit: Edu materials"
```

## 3. Создайте приватный репозиторий на GitHub

1. Зайдите на [github.com](https://github.com) и войдите в аккаунт.
2. Нажмите **"+"** → **"New repository"**.
3. **Repository name:** например `Edu`.
4. Выберите **Private**.
5. **Не** ставьте галочки "Add a README" / "Add .gitignore" — репозиторий должен быть пустым.
6. Нажмите **"Create repository"**.

## 4. Подключите удалённый репозиторий и отправьте код

На странице нового репозитория GitHub скопируйте URL (например `https://github.com/ВАШ_ЛОГИН/Edu.git`), затем выполните:

```powershell
git remote add origin https://github.com/ВАШ_ЛОГИН/Edu.git
git branch -M main
git push -u origin main
```

Подставьте вместо `ВАШ_ЛОГИН` свой логин GitHub. Если попросит авторизацию — войдите через браузер или токен.

---

После этого проект будет в вашем GitHub как **приватный** репозиторий.

## GitHub Pages (автодеплой)

При каждом push в ветку `main` workflow `.github/workflows/deploy-pages.yml` собирает сайт и публикует его на GitHub Pages.

### Один раз в настройках репозитория

1. GitHub → репозиторий **Edu** → **Settings** → **Pages**
2. **Build and deployment** → **Source**: выберите **GitHub Actions**
3. Если репозиторий **private**, нужен GitHub Pro (или сделайте репозиторий public для бесплатного Pages)

### URL сайта

```
https://NfeanorN.github.io/Edu/
```

### Локальная проверка сборки

```bash
cd EconomicsReact && npm ci && npm run build -- --base=/Edu/EconomicsReact/
cd ../AvatarSubtitlesReact && npm ci && npm run build -- --base=/Edu/AvatarSubtitlesReact/
cd .. && REPO_NAME=Edu node scripts/build-site.mjs
```

Папка `site/` — готовый артефакт для Pages (в git не коммитится).
