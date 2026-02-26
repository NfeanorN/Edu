@echo off
chcp 65001 >nul
set "SRC=%USERPROFILE%\.cursor\projects\c-Users-Feanor-OneDrive-Edu\assets\c__Users_Feanor_AppData_Roaming_Cursor_User_workspaceStorage_a47402e43a81a7c5cc6fac2b99c9eced_images_image-45ed633d-e38f-415b-9828-b4355c19fb55.png"
set "ROOT=%~dp0"

if not exist "%SRC%" (
    echo File not found: %SRC%
    echo Paste your Thragg image as favicon.png into:
    echo   %ROOT%Economics\favicon.png
    echo   %ROOT%Avatar\favicon.png
    echo   %ROOT%English\favicon.png
    echo   %ROOT%EconomicsReact\public\favicon.png
    echo   %ROOT%AvatarSubtitlesReact\public\favicon.png
    pause
    exit /b 1
)

copy /Y "%SRC%" "%ROOT%Economics\favicon.png"
copy /Y "%SRC%" "%ROOT%Avatar\favicon.png"
copy /Y "%SRC%" "%ROOT%English\favicon.png"
copy /Y "%SRC%" "%ROOT%EconomicsReact\public\favicon.png"
copy /Y "%SRC%" "%ROOT%AvatarSubtitlesReact\public\favicon.png"
echo Done. Favicon copied to all 5 projects.
pause
