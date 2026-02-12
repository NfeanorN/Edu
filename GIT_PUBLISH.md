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
