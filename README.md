# Stone-Haven County Asylum User Checker

**https://shca-user-checker.com/**

The **Stone-Haven County Asylum User Checker** is a browser-based administrative tool designed to streamline background checks and user lookups for SHCA MR+, Moderation, and other authorized staff.  
It aggregates information from **public Roblox APIs** and **public SHCA department databases**, presenting everything in a single fast and easy-to-read interface.

This project is **source-available** but **not open-source**.  
Please read the license before using or sharing this code.

---

## Features

- **Username or UserID Lookup**  
  Enter a Roblox username or UserID to fetch relevant public data instantly.

- **Roblox Profile Summary**  
  Displays:
  - Username  
  - UserID  
  - Avatar headshot  
  - Previous usernames  
  - Connections  
  - Communities  
  - Account creation date  
  - Badges *(coming soon)*

- **SHCA Staff Teams Integration**  
  Automatically checks:
  - Whether the user is a member of the **SHCA Staff Teams Community**
  - All associated departments
  - Ranks within each department

- **Department Database Searching** *(coming soon)*  
  Once Sheets API access is finalized, the tool will search all **public SHCA Department Databases** for matching UserIDs and display results.

- **Streamlined Interface**  
  Designed to replace the in-game profile command with a faster, more detailed, and more efficient alternative.

---

![showcase image](https://github.com/mm6683/SHCA-User-Checker/blob/main/public/images/image.png "showcase image")

---

## Current Development Status

- **Open Alpha**  
The SHCA User Checker is currently live and hosted as a website.
Functionality may change frequently, and some features are still experimental or flagged as “coming soon.”

- **Beta Plans**  
  The beta release will introduce:
  - Badge lookup  
  - Department database searching  (partly done)
  - Additional profile metadata  

---

## Deployment notes

- Default deployments expect a classic Workers secret named `SHEETS_API_KEY` (set with `wrangler secret put SHEETS_API_KEY`).
- To use Cloudflare Secrets Store (per <https://developers.cloudflare.com/secrets-store/integrations/workers/>):
  1. Create or identify the Secrets Store in the correct account and add the secret `SHEETS_API_KEY-SHCA_USER_CHECKER`.
  2. Capture the **store ID** from the Secrets Store page and set `CF_SECRETS_STORE_ID` to that value in your deploy environment.
  3. Deploy with `--env production` so `wrangler.toml` binds the store secret (`binding = "SHEETS_API_KEY"`, `secret_name = "SHEETS_API_KEY-SHCA_USER_CHECKER"`).
  4. Ensure the deploy token has Secrets Store read permission.

---

## Contributing

Contributions, suggestions, and improvements are welcome **via Issues**.

---

## Contact

For permissions, inquiries, or official collaboration, contact:

**mm6683 / subsmicrofoongames**  
Discord: *mm6683*  https://discord.com/users/(534430434709209120)
Roblox: https://www.roblox.com/users/701515298/profile

---
