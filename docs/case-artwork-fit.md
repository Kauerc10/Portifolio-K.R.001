# Case artwork fit verification — 2026-11-17

The home stage fit introduced in `248ec85` was scoped to the carousel. Case pages still sized decorative device frames from independent percentages of width and height. Their prepared images then used contain/cover, causing empty screen bands or a mismatch between frame and screenshot. VioDigital's SVG could also impose an oversized minimum grid track.

Changes:
- VECOM laptop/phone frames follow the prepared captures (1440×1000 and 390×844), including the handoff animation. Image content fills the frame's content box without stretching.
- Case hero artwork has an explicit composition ratio and a maximum width, independent of the text column. Applies to VioDigital, VECOM, DocFácil, Atlas and CKF.
- VioDigital paper uses a bounded grid row and contained decorative QR, including its story animation.
- DocFácil paper spacing and decorative typography scale with its own artwork container.

Browser checks (local Chrome/IAB): five case routes at 390×844, 768×1024, 1024×768 and 1440×900; no horizontal document overflow. VioDigital QR remained within its grid area in hero/story. Additional wide check at 1920×1080. Visually inspected VECOM hero and handoff, DocFácil and Atlas mobile compositions. VECOM handoff device image dimensions match their original ratios within pixel rounding. Home stage also retains contained QR and no horizontal overflow. Browser viewport override restored after testing.

No changes to project copy, captures, animation progress calculations or destinations. These are layout corrections; no tests asserting artistic coordinates were introduced.
