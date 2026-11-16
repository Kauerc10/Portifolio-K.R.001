# Stage composition fit verification — 2026-11-16

The showcase now fits one 600 × 530 material coordinate system into the available scene width and height. Animation transforms stay on child layers; directional travel compensates for the canvas scale. VioDigital uses constrained grid tracks and a QR sized within its paper. VECOM device frames follow each prepared capture's intrinsic ratio. DocFácil paper content has vertical padding that leaves the success state inside the sheet. CKF retains a safe inset without clipping its content.

## Browser regression

`node scripts/qa/stage-fit.cjs` targets the integrated home at port 3070. It measures actual nested rendered elements rather than assuming source illustration coordinates. The rest matrix passed all 90 combinations: five projects, DPR 1 and 2, and viewports 1920×900, 1440×900, 1280×720, 1024×768, 390×844, 1536×720, 1280×600, 960×600 and 853×480. The latter effective viewport dimensions exercise 125% / 150% zoom layouts; browser chrome zoom was not changed.

The regression initially failed for DocFácil's success chip (at 1920, paper bottom 679.85, chip bottom 685.49). Adjusting paper padding resolved the failure across the entire matrix. Other checks include QR within paper, every DocFácil paper child within the sheet, material bounds within the real stage and capture/frame aspect consistency.

`STAGE_MOTION=1` pauses actual entrance animations at their midpoint. The bounded checks covered all five projects at desktop and mobile, DPR 1 and 2. The final test also replays VioDigital after the first cycle and resizes the existing browser viewport before measuring, exercising ResizeObserver updates. `STAGE_QUICK=1` limits the matrix to 1920×900 and 390×844.

TypeScript (`tsc --noEmit --incremental false`) and the two stage identity tests passed. A production build was not run in this worktree because of the reported disk constraint. No publication was performed.

Representative integrated screenshots: [VioDigital](1920-viodigital.png), [VECOM](1920-vecom.png). These capture the real stage, including the nested paper and frame contents.
