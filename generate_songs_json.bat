@echo off
chcp 65001 > nul
setlocal enabledelayedexpansion

set "songs_folder=songs"
set "json_file=songs.json"

if exist "%json_file%" del "%json_file%"

echo Automatic Mode? (a for yes, anything for no)
set /p change_names=

if /i "!change_names!"=="a" (
    echo Automatic mode enabled.
    echo ^[> "%json_file%"

    set "song_count=0"
    for %%f in ("%songs_folder%\*.mp3") do (
        set /a "song_count+=1"
    )

    set "current_song=1"
    for %%f in ("%songs_folder%\*.mp3") do (
        set "song_name=%%~nf"
        echo     ^{ >> "%json_file%"
        echo         "name": "!song_name!", >> "%json_file%"
        echo         "path": "/!songs_folder!/!song_name!.mp3" >> "%json_file%"
        if !current_song! lss !song_count! (
            echo     ^}, >> "%json_file%"
        ) else (
            echo     ^} >> "%json_file%"
        )
        set /a "current_song+=1"
    )

    echo ^] >> "%json_file%"

    echo json created successfully
    pause >nul
) else (
    echo Manual mode enabled.
    echo ^[> "%json_file%"

    set "song_count=0"
    for %%f in ("%songs_folder%\*.mp3") do (
        set /a "song_count+=1"
    )

    set "current_song=1"
    for %%f in ("%songs_folder%\*.mp3") do (
        set "song_name=%%~nf"
        echo Is this song name correct:!song_name! [!current_song!/!song_count!] (y/n^)
        set /p confirm=
        if /i "!confirm!"=="y" (
            echo     ^{ >> "%json_file%"
            echo         "name": "!song_name!", >> "%json_file%"
            echo         "path": "/!songs_folder!/!song_name!.mp3" >> "%json_file%"
            if !current_song! lss !song_count! (
                echo     ^}, >> "%json_file%"
            ) else (
                echo     ^} >> "%json_file%"
            )
        ) else if /i "!confirm!"=="n" (
            echo Please enter a new name for the song:
            set /p new_name=
            ren "%%f" "!new_name!.mp3"
            echo     ^{ >> "%json_file%"
            echo         "name": "!new_name!", >> "%json_file%"
            echo         "path": "/!songs_folder!/!new_name!.mp3" >> "%json_file%"
            if !current_song! lss !song_count! (
                echo     ^}, >> "%json_file%"
            ) else (
                echo     ^} >> "%json_file%"
            )
        )
        set /a "current_song+=1"
    )

    echo ^] >> "%json_file%"

    echo json created successfully
    pause >nul
)