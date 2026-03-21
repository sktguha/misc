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
        Sleep 1000
    }
    Loop 7
    {
        Send {PgUp}
        Sleep 1000
    }
    Send {Esc}
    Sleep 1000
    Send ^{Tab}
    Sleep 1000
}
return

; Ctrl+G
^g::
Loop %count%
{
    Send ^s
    Sleep 1000

    Random, rand, 1000, 9999
    FormatTime, ts,, yyyyMMdd_HHmmss

    text := "cafe_" . ts . "_" . rand
    Send %text%
    Sleep 1000

    Send {Enter}
    Sleep 1000

    Send {Esc}
    Sleep 1000

    Send ^{Tab}
    Sleep 1000
}
return
