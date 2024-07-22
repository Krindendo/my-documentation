Write-Host "PowerShell start working"

Get-ChildItem -Path . -Filter "node_modules" -Recurse | Remove-Item -Force -Recurse
Get-ChildItem -Path . -Filter ".content-collections" -Recurse | Remove-Item -Force -Recurse
Get-ChildItem -Path . -Filter ".next" -Recurse | Remove-Item -Force -Recurse