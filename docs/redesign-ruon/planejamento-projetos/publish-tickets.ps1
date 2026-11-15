$ErrorActionPreference = 'Stop'
$repo = 'Kauerc10/Portifolio-K.R.001'
$base = $PSScriptRoot
$proposal = Get-Content (Join-Path $base 'ticket-proposal.json') -Raw | ConvertFrom-Json
$mapFile = Join-Path $base 'ticket-numbers.json'
$map = @{}
if (Test-Path -LiteralPath $mapFile) {
  $saved = Get-Content $mapFile -Raw | ConvertFrom-Json
  foreach ($prop in $saved.PSObject.Properties) { $map[$prop.Name] = $prop.Value }
}
New-Item -ItemType Directory -Force -Path (Join-Path $base 'ticket-published') | Out-Null
foreach ($ticket in $proposal.tickets) {
  $edges = @($ticket.blockers | ForEach-Object { if (!$map.ContainsKey($_)) { throw "Missing blocker $_" }; "- #$($map[$_].number)" })
  $body = "## Parent`n`n#75`n`n## What to build`n`n$($ticket.deliver)`n`n## Acceptance criteria`n`n"
  $body += (($ticket.accept | ForEach-Object { "- [ ] $_" }) -join "`n")
  $body += "`n- [ ] Entregar a fatia para teste/revisão de Kauê e aguardar seu retorno antes de avançar. Sem deploy automático.`n`n## Blocked by`n`n"
  $body += $(if ($edges.Count) { $edges -join "`n" } else { 'None (can start immediately).' })
  $body += "`n"
  $bodyFile = Join-Path $base "ticket-published/$($ticket.id).md"
  $body | Set-Content -LiteralPath $bodyFile -Encoding utf8
  if (!$map.ContainsKey($ticket.id)) {
    $url = & gh issue create --repo $repo --title "$($ticket.id) — $($ticket.title)" --body-file $bodyFile --label ready-for-agent
    if ($LASTEXITCODE) { throw "Issue creation failed: $($ticket.id)" }
    $number = [int](($url | Select-Object -Last 1) -split '/')[-1]
    $raw = & gh api "repos/$repo/issues/$number"
    if ($LASTEXITCODE) { throw "Issue lookup failed: $number" }
    $issue = $raw | ConvertFrom-Json
    $map[$ticket.id] = [ordered]@{number=$number;id=$issue.id;url=$issue.html_url}
    $map | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath $mapFile -Encoding utf8
    Write-Output "$($ticket.id): $($issue.html_url)"
  }
  foreach ($blocker in $ticket.blockers) {
    $current = $map[$ticket.id]
    $existing = & gh api "repos/$repo/issues/$($current.number)/dependencies/blocked_by" --jq '.[].id'
    if ($LASTEXITCODE) { throw 'Dependency read failed' }
    if (@($existing) -notcontains [string]$map[$blocker].id) {
      & gh api --method POST "repos/$repo/issues/$($current.number)/dependencies/blocked_by" -F "issue_id=$($map[$blocker].id)" --silent
      if ($LASTEXITCODE) { throw 'Dependency creation failed' }
    }
  }
}
