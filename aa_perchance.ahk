#SingleInstance Force

count := 20

; Ctrl+X
^x::
Loop %count%
{
    Send ^{Tab}
    Sleep 1000
    Send ^l
    Sleep 1000
    Send ^c
    Sleep 1000
    Click
    Sleep 1000
    Send ^a
    Sleep 1000
    Send {Backspace}
    Sleep 1000
    Send ^v
    Sleep 1000
}
return

; Ctrl+I
^i::
Loop %count%
{
    Send {Home}
    Sleep 1000
    Click
    Sleep 1000
    Send ^{Tab}
    Sleep 1000
}
return

; Ctrl+M
^m::
Loop %count%
{
    Loop 7
    {
        Send {PgDn}
        Sleep 200
    }

    Loop 7
    {
        Send {PgUp}
        Sleep 200
    }

    Send ^{Tab}
    Sleep 1000
}
return
