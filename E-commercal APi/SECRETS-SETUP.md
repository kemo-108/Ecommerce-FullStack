# Local secrets setup (one-time)

`appsettings.json` no longer contains real credentials — it's safe to commit
now. The actual values live in .NET **User Secrets**, which are stored
outside the project folder (so they never end up in a zip, a git repo, etc).

Run these once, from the project folder (same folder as the `.csproj`):

```bash
dotnet user-secrets set "ConnectionStrings:conString" "Server=db59408.public.databaseasp.net; Database=db59408; User Id=db59408; Password=Ke2#!8BfwP@9; Encrypt=True; TrustServerCertificate=True; MultipleActiveResultSets=True;"

dotnet user-secrets set "Jwt:Key" "77DEGPWMnsM17gsvRoYPnmH_DV5KLGr43STXzj3n2LPjzPyWOyZ8tFSeL6Tjzuh7"

dotnet user-secrets set "CloudinarySettings:CloudName" "csr4ffvf"
dotnet user-secrets set "CloudinarySettings:ApiKey" "111623295959456"
dotnet user-secrets set "CloudinarySettings:ApiSecret" "p3Jy8Eb3HkUpAdUvdMy4VPVO7yY"
```

That's it — `dotnet run` / F5 in Visual Studio will pick these up
automatically in Development. You only do this once per machine.

**If you'd rather use Visual Studio's UI:** right-click the project →
*Manage User Secrets* → it opens a `secrets.json` file → paste this in:

```json
{
  "ConnectionStrings": {
    "conString": "Server=db59408.public.databaseasp.net; Database=db59408; User Id=db59408; Password=Ke2#!8BfwP@9; Encrypt=True; TrustServerCertificate=True; MultipleActiveResultSets=True;"
  },
  "Jwt": {
    "Key": "77DEGPWMnsM17gsvRoYPnmH_DV5KLGr43STXzj3n2LPjzPyWOyZ8tFSeL6Tjzuh7"
  },
  "CloudinarySettings": {
    "CloudName": "csr4ffvf",
    "ApiKey": "111623295959456",
    "ApiSecret": "p3Jy8Eb3HkUpAdUvdMy4VPVO7yY"
  }
}
```

## In production

User Secrets are a **local development only** feature — they don't exist on
a real server. There, set the same values as **environment variables**
instead (ASP.NET Core reads them automatically, no code changes needed).
The `:` becomes `__` (double underscore):

```
ConnectionStrings__conString
Jwt__Key
CloudinarySettings__CloudName
CloudinarySettings__ApiKey
CloudinarySettings__ApiSecret
```

How you set these depends on your host (Azure App Service → Configuration →
Application settings; a VPS → your systemd unit or `.env` + a process
manager; Docker → `-e` flags or a `docker-compose` `environment:` block).

⚠️ **The values above (DB password, JWT key, Cloudinary secret) are the ones
that were previously sitting in plaintext in `appsettings.json`.** Since
that file has already been shared/zipped a few times in this conversation,
treat them as potentially exposed — consider rotating the DB password and
regenerating the Cloudinary API secret from the Cloudinary dashboard once
you're set up, and generate a fresh random `Jwt:Key` (any 32+ byte random
string) rather than reusing this one long-term.
