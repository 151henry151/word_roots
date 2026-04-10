# Alphabetical inversion pair analysis (272)

For each adjacent pair in a browse-letter bucket, **book order** had row **A** before **B**, but `roots_sort_key(A) > roots_sort_key(B)`. We **exclude A** (higher key) from the web UI as configured.

**Important:** about **79** pairs share the **same first stem** (e.g. `acr, =…` vs `acr, -…`). Those are usually **ASCII collation false positives**, not OCR errors — Borror’s ordering of combining forms does not match raw string sort. Removing those rows **deletes valid dictionary lines**. Consider narrowing the exclusion list to pairs where first stems **differ**, or normalizing sort keys for punctuation (`=`, `-`, `*`).

---

## 1. Letter A — `ascii_vs_book_combining_forms`

- **Dropped:** `acr, =a, -e` (G) — At the apex
- **Kept neighbor:** `acr, -i` (L) — Sharp
- **rawSegment:** `acr, =a, -e (G). At the apex`
- **Note:** **Not OCR:** same lemma (`acr…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 2. Letter A — `column_read_order`

- **Dropped:** `aero` (G) — Topmost, the tip
- **Kept neighbor:** `acromi, -o, =urn` (G) — The point of the shoulder blade
- **rawSegment:** `aero (G). Topmost, the tip`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 3. Letter A — `ascii_vs_book_combining_forms`

- **Dropped:** `acu, =s` (L) — A needle
- **Kept neighbor:** `acu, -st` (G) — Hear; heard
- **rawSegment:** `acu, =s (L). A needle`
- **Note:** **Not OCR:** same lemma (`acu…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 4. Letter A — `column_read_order`

- **Dropped:** `aene` (L) — Bronze; bronze-colored
- **Kept neighbor:** `aelur, -o, =us` (G) — A cat; tail-wagging
- **rawSegment:** `aegr, -o (L). Sick, diseased aegypt, aene aem, =a, aelur, (L).`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 5. Letter A — `column_read_order`

- **Dropped:** `aelur, -o, =us` (G) — A cat; tail-wagging
- **Kept neighbor:** `aell, =a, -o` (G) — A storm, whirlwind
- **rawSegment:** `aegr, -o (L). Sick, diseased aegypt, aene aem, =a, aelur, (L).`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 6. Letter A — `ascii_vs_book_combining_forms`

- **Dropped:** `agm, =a, -ato, -et` (G) — A fragment; a fracture
- **Kept neighbor:** `agm, *en, -in` (L) — A stream
- **rawSegment:** `agm, =a, -ato, -et (G). A fragment; a fracture`
- **Note:** **Not OCR:** same lemma (`agm…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 7. Letter A — `jammed_gloss`

- **Dropped:** `agreu, -s, -t` (G) — A hunter agrost, agri,
- **Kept neighbor:** `Afield Afield` (G) — Wild, country A fierce hunter; a person
- **rawSegment:** `agreu, -s, -t (G). A hunter agrost, agri, living (L). (L).`
- **Note:** **living (L)** and similar fragments are column junk glued into a gloss line.

## 8. Letter A — `column_read_order`

- **Dropped:** `ale, =es, -i` (L) — An elk
- **Kept neighbor:** `=alca` (Ice) — An auk
- **rawSegment:** `ale, =es, -i (L). An elk`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 9. Letter A — `ascii_vs_book_combining_forms`

- **Dropped:** `alg, =a, -o` (L) — Seaweed
- **Kept neighbor:** `alg, -e` (L) — Cold, coldness
- **rawSegment:** `alg, =a, -o (L). Seaweed`
- **Note:** **Not OCR:** same lemma (`alg…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 10. Letter A — `column_read_order`

- **Dropped:** `all` (L) — Other, another; a wing
- **Kept neighbor:** `alia` (G) — An assembly
- **rawSegment:** `all (L). Other, another; a wing`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 11. Letter A — `column_read_order`

- **Dropped:** `allé` (Ice) — The dovekie
- **Kept neighbor:** `allelo` (G) — One another; parallel
- **rawSegment:** `allé (Ice). The dovekie`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 12. Letter A — `column_read_order`

- **Dropped:** `allelo` (G) — One another; parallel
- **Kept neighbor:** `alii, =urn` (L) — Garlic, onion
- **rawSegment:** `allelo (G). One another; parallel`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 13. Letter A — `column_read_order`

- **Dropped:** `alluv, -i` (L) — Wash against, over- flow; a pool
- **Kept neighbor:** `aim` (L) — Nourishing, refreshing
- **rawSegment:** `alluv, -i (L). Wash against, over- flow; a pool`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 14. Letter A — `column_read_order`

- **Dropped:** `althae` (G) — Heal, cure
- **Kept neighbor:** `aid` (L) — Higfr, tall
- **rawSegment:** `althae (G). Heal, cure`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 15. Letter A — `column_read_order`

- **Dropped:** `amie` (L) — Friendly, kind
- **Kept neighbor:** `amict` (L) — Wrapped up ammonia
- **rawSegment:** `amie (L). Friendly, kind`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 16. Letter A — `ascii_vs_book_combining_forms`

- **Dropped:** `ap, =ex, -ic` (L) — The tip, extremity
- **Kept neighbor:** `ap, -o` (G) — From, off, away
- **rawSegment:** `ap, =ex, -ic (L). The tip, extremity`
- **Note:** **Not OCR:** same lemma (`ap…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 17. Letter A — `column_read_order`

- **Dropped:** `arane, =a, -i` (L) — A spider; a spider web
- **Kept neighbor:** `aphron, -o` (G) — Silly, foolish
- **rawSegment:** `arane, =a, -i (L). A spider; a spider web`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 18. Letter A — `column_read_order`

- **Dropped:** `=apium` (L) — Celery, parsley
- **Kept neighbor:** `api, -o` (G) — Simple, single
- **rawSegment:** `=apium (L). Celery, parsley`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 19. Letter A — `column_read_order`

- **Dropped:** `apparat` (L) — Prepared; a preparation append,
- **Kept neighbor:** `age -ic` (L) — Hang to; an append-
- **rawSegment:** `apparat (L). Prepared; a preparation append,`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 20. Letter A — `ascii_vs_book_combining_forms`

- **Dropped:** `ard, -i, -is` (G) — A point, arrow- head, sting
- **Kept neighbor:** `ard, -e, -o` (G) — Water, irrigate
- **rawSegment:** `ard, -i, -is (G). A point, arrow- head, sting`
- **Note:** **Not OCR:** same lemma (`ard…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 21. Letter A — `ascii_vs_book_combining_forms`

- **Dropped:** `arithm, -o` (G) — A number
- **Kept neighbor:** `arithm, -et, -o` (G) — Easily num- bered, few
- **rawSegment:** `arithm, -o (G). A number`
- **Note:** **Not OCR:** same lemma (`arithm…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 22. Letter A — `ascii_vs_book_combining_forms`

- **Dropped:** `aul, =a, -i` (G) — A courtyard, hall
- **Kept neighbor:** `aul, -o, =us` (G) — A pipe; a wind instrument
- **rawSegment:** `aul, =a, -i (G). A courtyard, hall`
- **Note:** **Not OCR:** same lemma (`aul…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 23. Letter A — `ascii_vs_book_combining_forms`

- **Dropped:** `aur, =a, -o` (L) — Air
- **Kept neighbor:** `aur, -ar, -at, -e, -i` (L) — Gold, golden
- **rawSegment:** `aur, =a, -o (L). Air`
- **Note:** **Not OCR:** same lemma (`aur…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 24. Letter A — `column_read_order`

- **Dropped:** `azyg, -o` (G) — Unpaired, unmarried 6
- **Kept neighbor:** `a round` (G) — A spit, pointed pillar;
- **rawSegment:** `azyg, -o (G). Unpaired, unmarried 6`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 25. Letter B — `ascii_vs_book_combining_forms`

- **Dropped:** `bar, -o, =us` (G) — Pressure; a burden
- **Kept neighbor:** `bar, -o, -y` (G) — Heavy
- **rawSegment:** `bar, -o, =us (G). Pressure; a burden`
- **Note:** **Not OCR:** same lemma (`bar…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 26. Letter B — `column_read_order`

- **Dropped:** `barbat` (L) — Bearded
- **Kept neighbor:** `barbar, -o` (G) — Foreign
- **rawSegment:** `barbat (L). Bearded`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 27. Letter B — `column_read_order`

- **Dropped:** `basil, -e, -ic` (G) — Royal
- **Kept neighbor:** `basi, baso` (L) — A base, founda- tion; a step
- **rawSegment:** `basil, -e, -ic (G). Royal`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 28. Letter B — `ascii_vs_book_combining_forms`

- **Dropped:** `bat, =es` (G) — One that walks or haunts
- **Kept neighbor:** `bat, -o, =us` (G) — A bramble; passable
- **rawSegment:** `bat, =es (G). One that walks or haunts`
- **Note:** **Not OCR:** same lemma (`bat…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 29. Letter B — `column_read_order`

- **Dropped:** `bâti, =s` (G) — The ray fish
- **Kept neighbor:** `bato; =batus` (G) — A bramble; passable
- **rawSegment:** `bâti, =s (G). The ray fish`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 30. Letter B — `column_read_order`

- **Dropped:** `belli, -d, =s` (L) — A daisy
- **Kept neighbor:** `bellerophon` (GMy) — A hero
- **rawSegment:** `belli, -d, =s (L). A daisy`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 31. Letter B — `ascii_vs_book_combining_forms`

- **Dropped:** `bo, =a, -i` (L) — A water serpent
- **Kept neighbor:** `bo, -ar, -o, =s, -v` (L) — An ox, cow
- **rawSegment:** `bo, =a, -i (L). A water serpent`
- **Note:** **Not OCR:** same lemma (`bo…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 32. Letter B — `ascii_vs_book_combining_forms`

- **Dropped:** `bol, =a, -o, =us` (G) — A throw, stroke
- **Kept neighbor:** `bol, -ac, =ax, -o, =us` (G) — A clod, lump
- **rawSegment:** `bol, =a, -o, =us (G). A throw, stroke`
- **Note:** **Not OCR:** same lemma (`bol…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 33. Letter B — `ascii_vs_book_combining_forms`

- **Dropped:** `brom, =a, -ato` (G) — Food
- **Kept neighbor:** `brom, -o, =us` (G) — Oats; a stench
- **rawSegment:** `brom, =a, -ato (G). Food`
- **Note:** **Not OCR:** same lemma (`brom…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 34. Letter C — `column_read_order`

- **Dropped:** `caco, =a` (G) — Excrement each
- **Kept neighbor:** `cachr,` (G) — barley-i, Bad
- **rawSegment:** `caco, =a (G). Excrement each cachr, (G). barley-i, Bad`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 35. Letter C — `column_read_order`

- **Dropped:** `cale, -i` (L) — The heel; lime, limestone
- **Kept neighbor:** `calcan, -e` (L) — The heel
- **rawSegment:** `cale, -i (L). The heel; lime, limestone`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 36. Letter C — `ascii_vs_book_combining_forms`

- **Dropped:** `call, =a,` (L) — month; a month
- **Kept neighbor:** `call, -c, =x` (L) — A cup
- **rawSegment:** `calen (L). Warming, heating calend call, =a, (L). month; a month`
- **Note:** **Not OCR:** same lemma (`call…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 37. Letter C — `column_read_order`

- **Dropped:** `call, -c, =x` (L) — A cup
- **Kept neighbor:** `calid` (L) — Warm, hot
- **rawSegment:** `call, -c, =x (L). A cup`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 38. Letter C — `ascii_vs_book_combining_forms`

- **Dropped:** `camp, =a, =e, -o` (G) — A bending; a caterpillar
- **Kept neighbor:** `camp, -o, -s, -to` (G) — Bending, flexible
- **rawSegment:** `camp, =a, =e, -o (G). A bending; a caterpillar`
- **Note:** **Not OCR:** same lemma (`camp…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 39. Letter C — `column_read_order`

- **Dropped:** `cane, =er, -r, -ro` (L) — A crab; an ulcer; cancer
- **Kept neighbor:** `cancell, -i` (L) — Latticework
- **rawSegment:** `cane, =er, -r, -ro (L). A crab; an ulcer; cancer`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 40. Letter C — `ascii_vs_book_combining_forms`

- **Dropped:** `caps, =a` (G) — A box, chest
- **Kept neighbor:** `caps` (G) — Eat quickly
- **rawSegment:** `caps, =a (G). A box, chest`
- **Note:** **Not OCR:** same lemma (`caps…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 41. Letter C — `column_read_order`

- **Dropped:** `career, -a` (L) — A prison
- **Kept neighbor:** `carchar, -o` (G) — Jagged
- **rawSegment:** `career, -a (L). A prison`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 42. Letter C — `ascii_vs_book_combining_forms`

- **Dropped:** `cari, =es, -o` (L) — Rottenness
- **Kept neighbor:** `cari, -d, =s` (L) — A shrimp
- **rawSegment:** `cari, =es, -o (L). Rottenness`
- **Note:** **Not OCR:** same lemma (`cari…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 43. Letter C — `column_read_order`

- **Dropped:** `catari` (LL) — Of a cat
- **Kept neighbor:** `cataract` (G) — Falling down
- **rawSegment:** `catari (LL). Of a cat`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 44. Letter C — `column_read_order`

- **Dropped:** `caum, -m, -s, -st, -t` (G) — Burn, burn-
- **Kept neighbor:** `caud, =a` (L) — The tail
- **rawSegment:** `eau, -m, -s, -st, -t (G). Burn, burn-`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 45. Letter C — `column_read_order`

- **Dropped:** `celé` (G) — A rupture, hernia; a tumor
- **Kept neighbor:** `celebr` (L) — Famous
- **rawSegment:** `celé (G). A rupture, hernia; a tumor`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 46. Letter C — `column_read_order`

- **Dropped:** `cere, -o, =us` (G) — The tail
- **Kept neighbor:** `cerchne` (G) — A kind of hawk
- **rawSegment:** `cere, -o, =us (G). The tail`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 47. Letter C — `ascii_vs_book_combining_forms`

- **Dropped:** `chari, =s, -t` (G) — Favor, grace
- **Kept neighbor:** `chari, -to` (G) — Graceful, favorable
- **rawSegment:** `chari, =s, -t (G). Favor, grace`
- **Note:** **Not OCR:** same lemma (`chari…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 48. Letter C — `ascii_vs_book_combining_forms`

- **Dropped:** `chol, =a, -e, -o` (G) — Bile; anger
- **Kept neighbor:** `chol, -o` (G) — Lame, maimed
- **rawSegment:** `chol, =a, -e, -o (G). Bile; anger`
- **Note:** **Not OCR:** same lemma (`chol…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 49. Letter C — `ascii_vs_book_combining_forms`

- **Dropped:** `clin, =a, -i, -o` (G) — A bed
- **Kept neighbor:** `clin, -o` (G) — Bend, slope
- **rawSegment:** `clin, =a, -i, -o (G). A bed`
- **Note:** **Not OCR:** same lemma (`clin…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 50. Letter C — `column_read_order`

- **Dropped:** `•colinus` (Mex) — The bobwhite
- **Kept neighbor:** `coli, -o, =us` (G) — A woodpecker
- **rawSegment:** `•colinus (Mex). The bobwhite`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 51. Letter C — `column_read_order`

- **Dropped:** `coniat, -o` (G) — Plastered, white- washed
- **Kept neighbor:** `con jug` (L) — Joined together
- **rawSegment:** `coniat, -o (G). Plastered, white- washed`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 52. Letter C — `ascii_vs_book_combining_forms`

- **Dropped:** `cren, =a, -o` (G) — A spring
- **Kept neighbor:** `cren, -a, -ul` (L) — A notch
- **rawSegment:** `cren, =a, -o (G). A spring`
- **Note:** **Not OCR:** same lemma (`cren…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 53. Letter C — `column_read_order`

- **Dropped:** `crépit` (L) — Creak, rattle
- **Kept neighbor:** `crepuscul` (L) — Twilight
- **rawSegment:** `crépit (L). Creak, rattle`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 54. Letter C — `column_read_order`

- **Dropped:** `crio` (G) — A ram
- **Kept neighbor:** `cri si, =s` (G) — A judgment, a choosing
- **rawSegment:** `crio (G). A ram`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 55. Letter C — `column_read_order`

- **Dropped:** `cruel` (L) — A cross; torture
- **Kept neighbor:** `crudesc` (L) — Becoming raw
- **rawSegment:** `cruel (L). A cross; torture`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 56. Letter C — `ascii_vs_book_combining_forms`

- **Dropped:** `culm, =us` (L) — A stalk
- **Kept neighbor:** `culm, =en, -in` (L) — A ridge, summit
- **rawSegment:** `culm, =us (L). A stalk`
- **Note:** **Not OCR:** same lemma (`culm…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 57. Letter C — `column_read_order`

- **Dropped:** `cyt, =e, -o, =us` (G) — A hollow place; a cell D
- **Kept neighbor:** `choose;` (L) — collect
- **rawSegment:** `cyt, =e, -o, =us (G). A hollow place; a cell D`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 58. Letter C — `column_read_order`

- **Dropped:** `choose;` (L) — collect
- **Kept neighbor:** `cake` (L) — a badger
- **rawSegment:** `•legus (G): Lie down; choose; (L): collect`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 59. Letter D — `column_read_order`

- **Dropped:** `désignât` (L) — Marked
- **Kept neighbor:** `desis` (G) — A binding
- **rawSegment:** `désignât (L). Marked`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 60. Letter D — `column_read_order`

- **Dropped:** `die` (G) — Right; a wood worm
- **Kept neighbor:** `dicell, =a` (G) — A two-pronged hoe
- **rawSegment:** `die (G). Right; a wood worm`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 61. Letter D — `column_read_order`

- **Dropped:** `diet` (L) — Say, pronounce, tell
- **Kept neighbor:** `dicty, -o, =urn` (G) — A net
- **rawSegment:** `diet (L). Say, pronounce, tell`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 62. Letter D — `column_read_order`

- **Dropped:** `dyt, =es` (G) — Dive, enter e (see also ae, jai, o, or oe)
- **Kept neighbor:** `defect;` (G) — laev,
- **rawSegment:** `dyt, =es (G). Dive, enter e (see also ae, jai, o, or oe)`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 63. Letter E — `column_read_order`

- **Dropped:** `egt, = s` (L) — A shield, armor
- **Kept neighbor:** `ego` (L) — Myself, self
- **rawSegment:** `egt, = s (L). A shield, armor`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 64. Letter E — `column_read_order`

- **Dropped:** `eleagn, =us` (G) — A marsh plant
- **Kept neighbor:** `elaeo, elaio` (G) — An olive; olive oil
- **rawSegment:** `eleagn, =us (G). A marsh plant`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 65. Letter E — `column_read_order`

- **Dropped:** `exygr, -o` (G) — Wet Γ
- **Kept neighbor:** `ecien, =s, -t` (L) — Knowledge
- **rawSegment:** `exygr, -o (G). Wet Γ`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 66. Letter E — `column_read_order`

- **Dropped:** `epari` (L) — The gilt-bream
- **Kept neighbor:** `=en, -in` (L) — Anything standing upright;
- **rawSegment:** `epari (L). The gilt-bream`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 67. Letter F — `column_read_order`

- **Dropped:** `fallac` (L) — Deceptive
- **Kept neighbor:** `fais, -i` (L) — False
- **rawSegment:** `fallac (L). Deceptive`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 68. Letter F — `column_read_order`

- **Dropped:** `fee, -i` (L) — Dregs
- **Kept neighbor:** `fecul` (L) — Foul; sediment
- **rawSegment:** `fee, -i (L). Dregs`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 69. Letter F — `column_read_order`

- **Dropped:** `fell, -n, =s` (L) — A cat
- **Kept neighbor:** `felic` (L) — Favorable, lucky
- **rawSegment:** `fell, -n, =s (L). A cat`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 70. Letter F — `column_read_order`

- **Dropped:** `fern, -or, -oro, *ur` (L) — The thigh
- **Kept neighbor:** `femin` (L) — Female, of a woman
- **rawSegment:** `fern, -or, -oro, *ur (L). The thigh`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 71. Letter F — `ascii_vs_book_combining_forms`

- **Dropped:** `fie, =ation` (L) — Make, making
- **Kept neighbor:** `fie, -o, =us` (L) — The fig shepherds fide, fidi figur, figul, fil, c,-i,
- **rawSegment:** `fie, =ation (L). Make, making`
- **Note:** **Not OCR:** same lemma (`fie…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 72. Letter F — `column_read_order`

- **Dropped:** `fill, -a` (L) — A son or daughter
- **Kept neighbor:** `fili, -c, -x` (L) — A fern
- **rawSegment:** `fill, -a (L). A son or daughter`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 73. Letter G — `ascii_vs_book_combining_forms`

- **Dropped:** `gall, =a` (L) — A gall nut
- **Kept neighbor:** `gall, -in, -o, =us` (L) — A chicken,
- **rawSegment:** `gall, =a (L). A gall nut`
- **Note:** **Not OCR:** same lemma (`gall…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 74. Letter G — `column_read_order`

- **Dropped:** `garnet` (G) — A wife or husband
- **Kept neighbor:** `gamps, -o` (G) — Curved, bent
- **rawSegment:** `garnet (G). A wife or husband`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 75. Letter G — `column_read_order`

- **Dropped:** `gelât` (L) — Frozen, jelly-like
- **Kept neighbor:** `gelid` (L) — Cold
- **rawSegment:** `gelât (L). Frozen, jelly-like`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 76. Letter G — `column_read_order`

- **Dropped:** `gêner` (L) — Beget; a race; produce
- **Kept neighbor:** `genet` (G) — Birth, ancestor
- **rawSegment:** `gêner (L). Beget; a race; produce`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 77. Letter G — `column_read_order`

- **Dropped:** `géra, -s, -t` (G) — Old age
- **Kept neighbor:** `gerb` (Ar) — A kangaroo mouse
- **rawSegment:** `géra, -s, -t (G). Old age`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 78. Letter G — `ascii_vs_book_combining_forms`

- **Dropped:** `glut, -i` (L) — To swallow; glue
- **Kept neighbor:** `glut, -e, -eo` (G) — The rump
- **rawSegment:** `glut, -i (L). To swallow; glue`
- **Note:** **Not OCR:** same lemma (`glut…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 79. Letter G — `column_read_order`

- **Dropped:** `gpssypi, =urn` (L) — Cotton
- **Kept neighbor:** `gour, =a` (NL) — A kind of pigeon
- **rawSegment:** `gpssypi, =urn (L). Cotton`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 80. Letter G — `column_read_order`

- **Dropped:** `gyrin, -o, =us` (G) — A tadpole Ή
- **Kept neighbor:** `god;` (L) — tea
- **rawSegment:** `gyrin, -o, =us (G). A tadpole Ή`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 81. Letter H — `column_read_order`

- **Dropped:** `haem, =a, -ato, -o` (G) — Blood
- **Kept neighbor:** `haben, =a` (L) — A thong, rein
- **rawSegment:** `aegr, -o (L). Sick, diseased aegypt, aene aem, =a, aelur, (L).`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 82. Letter H — `column_read_order`

- **Dropped:** `halin, -o` (G) — Made of salt
- **Kept neighbor:** `halia` (G) — An assembly
- **rawSegment:** `halin, -o (G). Made of salt`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 83. Letter H — `column_read_order`

- **Dropped:** `horn, -in, =o` (L) — Man
- **Kept neighbor:** `homalo` (G) — Even, level
- **rawSegment:** `horn, -in, =o (L). Man`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 84. Letter H — `column_read_order`

- **Dropped:** `hystri, -c, =x` (G) — A porcupine I
- **Kept neighbor:** `hireling;` (L) — a robber
- **rawSegment:** `hystri, -c, =x (G). A porcupine I`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 85. Letter I — `column_read_order`

- **Dropped:** `iloi, -o` (G) — Glue
- **Kept neighbor:** `I hecat, -o, -on` (G) — A hundred
- **rawSegment:** `iloi, -o (G). Glue`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 86. Letter I — `column_read_order`

- **Dropped:** `indie` (L) — That which points out; Indian; indigo
- **Kept neighbor:** `indi g` (Sp) — Deep violet blue
- **rawSegment:** `indie (L). That which points out; Indian; indigo`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 87. Letter I — `column_read_order`

- **Dropped:** `infra` (L) — Below, beneath
- **Kept neighbor:** `imbric, -a, -i` (L) — A roof tile,
- **rawSegment:** `infra (L). Below, beneath`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 88. Letter I — `ascii_vs_book_combining_forms`

- **Dropped:** `ini, =a` (S Am) — A kind of porpoise
- **Kept neighbor:** `ini, -a, -o, -urn` (G) — The occiput, nape
- **rawSegment:** `ini, =a (S Am). A kind of porpoise`
- **Note:** **Not OCR:** same lemma (`ini…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 89. Letter I — `column_read_order`

- **Dropped:** `ixi, -a, -o` (G) — Birdlime; mistle­ toe
- **Kept neighbor:** `ixal, -o` (G) — Jumping
- **rawSegment:** `ixi, -a, -o (G). Birdlime; mistle­ toe`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 90. Letter I — `column_read_order`

- **Dropped:** `iyn, -g, =x` (G) — The wryneck J
- **Kept neighbor:** `Iachr, -im, -ym` (L) — Tears, weeping
- **rawSegment:** `iyn, -g, =x (G). The wryneck J`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 91. Letter L — `column_read_order`

- **Dropped:** `lime, =calyx` (G) — The calyx
- **Kept neighbor:** `la, -o` (G) — A stone; the people
- **rawSegment:** `lime,  =calyx (G). The calyx`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 92. Letter L — `column_read_order`

- **Dropped:** `lace, -o, =us` (G) — A cistern, pit
- **Kept neighbor:** `lacca` (It) — Varnish, wax
- **rawSegment:** `lace, -o, =us (G). A cistern, pit`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 93. Letter L — `column_read_order`

- **Dropped:** `laim, -o, =us` (G) — The throat, gullet
- **Kept neighbor:** `lai, -i, -o` (G) — Talk, speak
- **rawSegment:** `laim, -o, =us (G). The throat, gullet`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 94. Letter L — `column_read_order`

- **Dropped:** `limât` (L) — Polished
- **Kept neighbor:** `limb, =us` (L) — An edge; a head band
- **rawSegment:** `limât (L). Polished`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 95. Letter L — `column_read_order`

- **Dropped:** `lue, -i` (L) — Light; a grove
- **Kept neighbor:** `lucan` (LL) — A kind of beetle
- **rawSegment:** `lue, -i (L). Light; a grove`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 96. Letter L — `column_read_order`

- **Dropped:** `lye, -o, =us` (G) — A wolf
- **Kept neighbor:** `lychn, =is` (G) — A kind of plant
- **rawSegment:** `lye, -o, =us (G). A wolf`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 97. Letter L — `ascii_vs_book_combining_forms`

- **Dropped:** `lychn, =is` (G) — A kind of plant
- **Kept neighbor:** `lychn, -o, =us` (G) — A lamp
- **rawSegment:** `lychn, =is (G). A kind of plant`
- **Note:** **Not OCR:** same lemma (`lychn…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 98. Letter M — `column_read_order`

- **Dropped:** `mâcha, -er, -ir` (G) — A sword, dagger, razor
- **Kept neighbor:** `machin, =a` (L) — An engine, machine
- **rawSegment:** `mâcha, -er, -ir (G). A sword, dagger, razor`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 99. Letter M — `column_read_order`

- **Dropped:** `meandr` (G) — Winding, zigzag
- **Kept neighbor:** `maeeu, -si, -sio` (G) — Childbirth
- **rawSegment:** `meandr (G). Winding, zigzag`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 100. Letter M — `ascii_vs_book_combining_forms`

- **Dropped:** `mal, =a` (L) — The jaw, cheek
- **Kept neighbor:** `mal, -e, -i, -ign` (L) — Bad, evil, wrong; imperfect; not
- **rawSegment:** `mal, =a (L). The jaw, cheek`
- **Note:** **Not OCR:** same lemma (`mal…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 101. Letter M — `column_read_order`

- **Dropped:** `mane` (L) — Maimed
- **Kept neighbor:** `mancip` (L) — A purchaser
- **rawSegment:** `mane (L). Maimed`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 102. Letter M — `ascii_vs_book_combining_forms`

- **Dropped:** `marc, =us` (L) — A hammer
- **Kept neighbor:** `marc, -esc, -id` (L) — Withering
- **rawSegment:** `marc, =us (L). A hammer`
- **Note:** **Not OCR:** same lemma (`marc…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 103. Letter M — `ascii_vs_book_combining_forms`

- **Dropped:** `mel, =a, -o` (G) — The cheeks
- **Kept neighbor:** `mel, -i, -it, -ito` (G) — Honey
- **rawSegment:** `mel, =a, -o (G). The cheeks`
- **Note:** **Not OCR:** same lemma (`mel…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 104. Letter M — `column_read_order`

- **Dropped:** `•mêlas` (G) — Black, dark
- **Kept neighbor:** `meldo` (G) — Melt
- **rawSegment:** `•mêlas (G). Black, dark`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 105. Letter M — `column_read_order`

- **Dropped:** `=mêles` (L) — A badger
- **Kept neighbor:** `meli, -d, -n` (L) — A badger
- **rawSegment:** `=mêles (L). A badger`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 106. Letter M — `ascii_vs_book_combining_forms`

- **Dropped:** `mens, =a` (L) — A table
- **Kept neighbor:** `mens, -e, -i` (L) — A month
- **rawSegment:** `mens, =a (L). A table`
- **Note:** **Not OCR:** same lemma (`mens…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 107. Letter M — `column_read_order`

- **Dropped:** `mill, -ar, -ol, =urn` (L) — Millet
- **Kept neighbor:** `milit, -ar, -i` (L) — A soldier
- **rawSegment:** `mill, -ar, -ol, =urn (L). Millet`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 108. Letter M — `column_read_order`

- **Dropped:** `mise, -o` (G) — A stalk
- **Kept neighbor:** `misch, -o, =us` (G) — A stalk
- **rawSegment:** `mise, -o (G). A stalk`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 109. Letter M — `ascii_vs_book_combining_forms`

- **Dropped:** `mist, =us` (L) — A mixing
- **Kept neighbor:** `mist, -o` (G) — Most
- **rawSegment:** `mist, =us (L). A mixing`
- **Note:** **Not OCR:** same lemma (`mist…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 110. Letter M — `column_read_order`

- **Dropped:** `mitl` (L) — Mild, harmless; ripe
- **Kept neighbor:** `mitig` (L) — Make mild
- **rawSegment:** `mitl (L). Mild, harmless; ripe`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 111. Letter M — `column_read_order`

- **Dropped:** `molest` (L) — Disturb
- **Kept neighbor:** `molen` (L) — Grinding
- **rawSegment:** `molest (L). Disturb`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 112. Letter M — `ascii_vs_book_combining_forms`

- **Dropped:** `morph, =a, -o` (G) — Form
- **Kept neighbor:** `morph, -e, -o` (LMy) — Sleep
- **rawSegment:** `morph, =a, -o (G). Form`
- **Note:** **Not OCR:** same lemma (`morph…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 113. Letter M — `column_read_order`

- **Dropped:** `mue, -e, -i, -o, =us` (L) — Mold, moldy; mucus
- **Kept neighbor:** `=mucro, -n` (L) — A sharp point
- **rawSegment:** `mue, -e, -i, -o, =us (L). Mold, moldy; mucus`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 114. Letter M — `column_read_order`

- **Dropped:** `mûri` (L) — A mouse; a wall
- **Kept neighbor:** `=muria` (L) — Brine
- **rawSegment:** `mûri (L). A mouse; a wall`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 115. Letter M — `column_read_order`

- **Dropped:** `mûrie` (L) — The purple-fish; purple
- **Kept neighbor:** `muricat` (L) — Pointed
- **rawSegment:** `mûrie (L). The purple-fish; purple`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 116. Letter M — `column_read_order`

- **Dropped:** `myz, -o` (G) — Suck; mutter Ν
- **Kept neighbor:** `mountain;` (L) — the mouth
- **rawSegment:** `myz, -o (G). Suck; mutter Ν`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 117. Letter N — `column_read_order`

- **Dropped:** `nil, =urn` (L) — A trifle, a little thing
- **Kept neighbor:** `nabi, -d, =s` (L) — A giraffe
- **rawSegment:** `nil, =urn (L). A trifle, a little thing`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 118. Letter N — `ascii_vs_book_combining_forms`

- **Dropped:** `nap, =aea, -o` (G) — A glen, wooded dell
- **Kept neighbor:** `nap, -i, =us` (L) — A turnip
- **rawSegment:** `nap, =aea, -o (G). A glen, wooded dell`
- **Note:** **Not OCR:** same lemma (`nap…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 119. Letter N — `column_read_order`

- **Dropped:** `nerit, =es` (G) — A sea mussel
- **Kept neighbor:** `neri, =urn` (G) — The oleander
- **rawSegment:** `nerit, =es (G). A sea mussel`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 120. Letter N — `column_read_order`

- **Dropped:** `nie, -o` (G) — Victory; strife
- **Kept neighbor:** `nictitat` (L) — Winking
- **rawSegment:** `nie, -o (G). Victory; strife`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 121. Letter N — `column_read_order`

- **Dropped:** `notât` (L) — Marked
- **Kept neighbor:** `note, -o` (G) — South, southwest
- **rawSegment:** `notât (L). Marked`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 122. Letter N — `ascii_vs_book_combining_forms`

- **Dropped:** `nyss, =a` (L My) — A water nymph; a starting post
- **Kept neighbor:** `nyss, -o` (G) — Prick, stab
- **rawSegment:** `nyss, =a (L My). A water nymph; a starting post`
- **Note:** **Not OCR:** same lemma (`nyss…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 123. Letter O — `column_read_order`

- **Dropped:** `olbi, -o` (G) — Blessed, happy
- **Kept neighbor:** `oie, =a, -astr` (L) — An olive; an olive tree
- **rawSegment:** `olbi, -o (G). Blessed, happy`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 124. Letter O — `column_read_order`

- **Dropped:** `ole, -i, -o, =urn` (L) — Olive oil, oil
- **Kept neighbor:** `oie, -nt, -o` (L) — Emit a smell, smell
- **rawSegment:** `ole, -i, -o, =urn (L). Olive oil, oil`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 125. Letter O — `ascii_vs_book_combining_forms`

- **Dropped:** `olen, =a, -e, -i` (G) — The elbow
- **Kept neighbor:** `olen, -t` (L) — Emit a smell, smell
- **rawSegment:** `olen, =a, -e, -i (G). The elbow`
- **Note:** **Not OCR:** same lemma (`olen…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 126. Letter O — `column_read_order`

- **Dropped:** `oler, -i` (L) — Greens, vegetables
- **Kept neighbor:** `oies, -i` (G) — Destroy
- **rawSegment:** `oler, -i (L). Greens, vegetables`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 127. Letter O — `column_read_order`

- **Dropped:** `ornent, =um` (L) — Fat skin
- **Kept neighbor:** `omich, -m` (G) — Urine
- **rawSegment:** `ornent, =um (L). Fat skin`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 128. Letter O — `column_read_order`

- **Dropped:** `one, -o, =us` (G) — A mass; a tubercle; a hook, barb
- **Kept neighbor:** `oncethm, -o` (G) — Braying
- **rawSegment:** `one, -o, =us (G). A mass; a tubercle; a hook, barb`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 129. Letter O — `column_read_order`

- **Dropped:** `opisth, -i, -o` (G) — Behind, the hind part
- **Kept neighbor:** `opi, -o` (G) — Armor; a tool
- **rawSegment:** `opisth, -i, -o (G). Behind, the hind part`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 130. Letter O — `ascii_vs_book_combining_forms`

- **Dropped:** `opt, -i, -o` (G) — The eye; vision
- **Kept neighbor:** `opt, -a, -i` (L) — Choose
- **rawSegment:** `opt, -i, -o (G). The eye; vision`
- **Note:** **Not OCR:** same lemma (`opt…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 131. Letter O — `column_read_order`

- **Dropped:** `ore, =a` (L) — A whale
- **Kept neighbor:** `orches, -t` (G) — Dancing
- **rawSegment:** `ore, =a (L). A whale`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 132. Letter O — `column_read_order`

- **Dropped:** `ornât` (L) — Adorned
- **Kept neighbor:** `orneo` (G) — A bird
- **rawSegment:** `ornât (L). Adorned orneo= (G). orni,   s , -th,A -tho bird;(G). a plume A bird`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 133. Letter P — `ascii_vs_book_combining_forms`

- **Dropped:** `pal, =a` (L) — A shovel, spade
- **Kept neighbor:** `pal, -ae, -aeo` (G) — Ancient
- **rawSegment:** `pal, =a (L). A shovel, spade`
- **Note:** **Not OCR:** same lemma (`pal…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 134. Letter P — `ascii_vs_book_combining_forms`

- **Dropped:** `pale, =a, -i` (L) — Chaff, straw
- **Kept neighbor:** `pale, -o` (G) — Ancient
- **rawSegment:** `pale, =a, -i (L). Chaff, straw`
- **Note:** **Not OCR:** same lemma (`pale…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 135. Letter P — `column_read_order`

- **Dropped:** `pâli` (L) — A stake
- **Kept neighbor:** `pali, -n` (G) — Again, back
- **rawSegment:** `pâli (L). A stake`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 136. Letter P — `column_read_order`

- **Dropped:** `palla, -c, =x` (G) — A concubine; a youth
- **Kept neighbor:** `palii, ~atf -o, =urn` (L) — A mantle; cloaked
- **rawSegment:** `palla, -c, =x (G). A concubine; a youth`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 137. Letter P — `ascii_vs_book_combining_forms`

- **Dropped:** `palm, =a, -i` (L) — A palm tree; the palm of the hand
- **Kept neighbor:** `palm, -o` (G) — Vibrating, throbbing
- **rawSegment:** `palm, =a, -i (L). A palm tree; the palm of the hand`
- **Note:** **Not OCR:** same lemma (`palm…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 138. Letter P — `column_read_order`

- **Dropped:** `panic, =um` (L) — Panic grass
- **Kept neighbor:** `pandion` (G My) — A king of Athens
- **rawSegment:** `panic, =um (L). Panic grass`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 139. Letter P — `column_read_order`

- **Dropped:** `parât` (L) — Ready, prepared
- **Kept neighbor:** `parci` (L) — Few, sparing
- **rawSegment:** `parât (L). Ready, prepared`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 140. Letter P — `column_read_order`

- **Dropped:** `pastill, =us` (L) — A small loaf
- **Kept neighbor:** `pasteur, -i` (N) — Louis Pasteur
- **rawSegment:** `pastill, =us (L). A small loaf`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 141. Letter P — `ascii_vs_book_combining_forms`

- **Dropped:** `pect, =en, -in, -o` (L) — A comb
- **Kept neighbor:** `pect, -o` (G) — Fixed, congealed
- **rawSegment:** `pect, =en, -in, -o (L). A comb`
- **Note:** **Not OCR:** same lemma (`pect…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 142. Letter P — `column_read_order`

- **Dropped:** `pelidn, -o` (G) — Livid, black and blue an oar
- **Kept neighbor:** `pedal` (L) — Of afoot
- **rawSegment:** `ped, -a, -e, -i, -o (L): A foot; (G): a child; the earth; a fetter;  pelidn, -o (G). Livid, black and blue an oar`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 143. Letter P — `ascii_vs_book_combining_forms`

- **Dropped:** `pell, =a, -i` (G) — Skin; the pelvis; a bowl, basin
- **Kept neighbor:** `pell, -o` (G) — Dusky
- **rawSegment:** `pell, =a, -i (G). Skin; the pelvis; a bowl, basin`
- **Note:** **Not OCR:** same lemma (`pell…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 144. Letter P — `column_read_order`

- **Dropped:** `pêne, - s , -st, -t` (G) — A laborer
- **Kept neighbor:** `penelope` (My) — The wife of Ulysses
- **rawSegment:** `pêne, - s , -st, -t (G). A laborer`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 145. Letter P — `column_read_order`

- **Dropped:** `phase, =um` (G) — A tree moss
- **Kept neighbor:** `phascol, -o` (G) — A leather bag
- **rawSegment:** `phase, =um (G). A tree moss`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 146. Letter P — `column_read_order`

- **Dropped:** `phys, -a, -i` (G) — Blow; nature; a bladder
- **Kept neighbor:** `phy sal, -i, =is` (G) — A bladder, bubble; a wind instrument
- **rawSegment:** `phys, -a, -i (G). Blow; nature; a bladder`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 147. Letter P — `ascii_vs_book_combining_forms`

- **Dropped:** `pic, =a` (L) — A magpie
- **Kept neighbor:** `pic, -i` (L) — A woodpecker; varie- gated
- **rawSegment:** `pic, =a (L). A magpie`
- **Note:** **Not OCR:** same lemma (`pic…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 148. Letter P — `column_read_order`

- **Dropped:** `plein` (L) — Pitch black
- **Kept neighbor:** `pico` (L) — Smear with pitch
- **rawSegment:** `plein (L). Pitch black`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 149. Letter P — `column_read_order`

- **Dropped:** `pier, -i, -o` (G) — Bitter, pungent
- **Kept neighbor:** `pict` (L) — Painted, variegated
- **rawSegment:** `pier, -i, -o (G). Bitter, pungent`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 150. Letter P — `ascii_vs_book_combining_forms`

- **Dropped:** `pil, =a` (L) — A ball; a mortar
- **Kept neighbor:** `pil, -i, =us` (L) — Hair
- **rawSegment:** `pil, =a (L). A ball; a mortar`
- **Note:** **Not OCR:** same lemma (`pil…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 151. Letter P — `column_read_order`

- **Dropped:** `pise, -i, =is` (L) — A fish
- **Kept neighbor:** `piscin, =a` (L) — A fish pond
- **rawSegment:** `pise, -i, =is (L). A fish`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 152. Letter P — `column_read_order`

- **Dropped:** `plaçât` (L) — Please, appease
- **Kept neighbor:** `placent, =a, -i` (L) — A round flat cake; the placenta
- **rawSegment:** `plaçât (L). Please, appease`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 153. Letter P — `column_read_order`

- **Dropped:** `plèbe, -i` (L) — Of common people; common
- **Kept neighbor:** `plec, -o, -t, -to` (G) — Twine, twist, braid; strike; twisted
- **rawSegment:** `plèbe, -i (L). Of common people; common`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 154. Letter P — `column_read_order`

- **Dropped:** `pleon` (G) — More, full
- **Kept neighbor:** `pier, -o, -om, -os` (G) — Full, fullness,
- **rawSegment:** `pleon (G). More, full`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 155. Letter P — `column_read_order`

- **Dropped:** `•pons` (L) — Abridge
- **Kept neighbor:** `ponder` (L) — Weighty
- **rawSegment:** `•pons (L). Abridge`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 156. Letter P — `column_read_order`

- **Dropped:** `pore, -i, =us` (L) — A hog, swine
- **Kept neighbor:** `porcat` (NL) — Ridged
- **rawSegment:** `pore, -i, =us (L). A hog, swine`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 157. Letter P — `ascii_vs_book_combining_forms`

- **Dropped:** `port, =a, -i` (L) — A gate, door
- **Kept neighbor:** `port, -i, -un, =us` (L) — A harbor, port
- **rawSegment:** `port, =a, -i (L). A gate, door`
- **Note:** **Not OCR:** same lemma (`port…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 158. Letter P — `column_read_order`

- **Dropped:** `porulos` (L) — Full of small pores
- **Kept neighbor:** `•poms` (L) — A pore, small opening
- **rawSegment:** `porulos (L). Full of small pores`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 159. Letter P — `ascii_vs_book_combining_forms`

- **Dropped:** `pos, =is` (G) — Drink; a husband
- **Kept neighbor:** `pos, -o` (G) — How much; indefinitely; quantity
- **rawSegment:** `pos, =is (G). Drink; a husband`
- **Note:** **Not OCR:** same lemma (`pos…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 160. Letter P — `column_read_order`

- **Dropped:** `prêter` (L) — Beyond, past, more than
- **Kept neighbor:** `priap, =us` (G My) — The god of procreation; the penis
- **rawSegment:** `prêter (L). Beyond, past, more than`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 161. Letter P — `column_read_order`

- **Dropped:** `puéril` (L) — Childish
- **Kept neighbor:** `puerper, -i` (L) — Childbearing
- **rawSegment:** `puéril (L). Childish`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 162. Letter P — `column_read_order`

- **Dropped:** `pulp, =a, -i` (L) — Flesh, pulp
- **Kept neighbor:** `puis, -a, -i, -ilo, -o` (L) — Beat, push, pulse
- **rawSegment:** `pulp, =a, -i (L). Flesh, pulp`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 163. Letter P — `ascii_vs_book_combining_forms`

- **Dropped:** `pyr, -i, =urn, =us` (NL) — A pear
- **Kept neighbor:** `•pyr, -i, -o` (G) — Fire
- **rawSegment:** `pyr, -i, =urn, =us (NL). A pear`
- **Note:** **Not OCR:** same lemma (`pyr…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 164. Letter R — `ascii_vs_book_combining_forms`

- **Dropped:** `rachi, =a` (G) — A rocky shore; surf
- **Kept neighbor:** `rachi, -a, -o, =s` (G) — A spine; the backbone
- **rawSegment:** `rachi, =a (G). A rocky shore; surf`
- **Note:** **Not OCR:** same lemma (`rachi…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 165. Letter R — `column_read_order`

- **Dropped:** `récit` (L) — Readout
- **Kept neighbor:** `reclinat` (L) — Bent back
- **rawSegment:** `récit (L). Readout`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 166. Letter R — `column_read_order`

- **Dropped:** `•regma, -to` (G) — A break, tear
- **Kept neighbor:** `regin, =a` (L) — A queen
- **rawSegment:** `•regma, -to (G). A break, tear`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 167. Letter R — `column_read_order`

- **Dropped:** `régula, -ri, -t` (L) — Regular
- **Kept neighbor:** `=regulus` (L) — A little king, a prince
- **rawSegment:** `régula, -ri, -t (L). Regular`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 168. Letter R — `ascii_vs_book_combining_forms`

- **Dropped:** `rem, =ex, -ig` (L) — A rower
- **Kept neighbor:** `rem, -i, -us` (L) — An oar
- **rawSegment:** `rem, =ex, -ig (L). A rower`
- **Note:** **Not OCR:** same lemma (`rem…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 169. Letter R — `column_read_order`

- **Dropped:** `répand` (L) — Turned up, bent back- ward
- **Kept neighbor:** `repen, -t` (L) — Creeping
- **rawSegment:** `répand (L). Turned up, bent back- ward`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 170. Letter R — `column_read_order`

- **Dropped:** `résidu` (L) — What is left behind
- **Kept neighbor:** `resin, =a, -i` (L) — Resin
- **rawSegment:** `résidu (L). What is left behind`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 171. Letter R — `ascii_vs_book_combining_forms`

- **Dropped:** `retin, -a, -i, -o` (L) — A net; the retina of the eye
- **Kept neighbor:** `retin, *a, -i, -o` (G) — Pine resin
- **rawSegment:** `retin, -a, -i, -o (L). A net; the retina of the eye`
- **Note:** **Not OCR:** same lemma (`retin…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 172. Letter R — `column_read_order`

- **Dropped:** `révéla` (L) — Reveal
- **Kept neighbor:** `revolut` (L) — Rolled back
- **rawSegment:** `révéla (L). Reveal`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 173. Letter R — `ascii_vs_book_combining_forms`

- **Dropped:** `rhachi, =a` (G) — A rocky shore; surf
- **Kept neighbor:** `rhachi, -a, -o, =s` (G) — The spine, backbone
- **rawSegment:** `rhachi, =a (G). A rocky shore; surf`
- **Note:** **Not OCR:** same lemma (`rhachi…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 174. Letter R — `ascii_vs_book_combining_forms`

- **Dropped:** `rhin, =a` (G) — A shark; a file, rasp
- **Kept neighbor:** `rhin, -o` (G) — A nose
- **rawSegment:** `rhin, =a (G). A shark; a file, rasp`
- **Note:** **Not OCR:** same lemma (`rhin…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 175. Letter R — `ascii_vs_book_combining_forms`

- **Dropped:** `rup, =es, -estr, -i` (L) — A rock
- **Kept neighbor:** `rup, -i, *ia, -o` (G) — Filth
- **rawSegment:** `rup, =es, -estr, -i (L). A rock`
- **Note:** **Not OCR:** same lemma (`rup…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 176. Letter S — `ascii_vs_book_combining_forms`

- **Dropped:** `sambuc, =a` (L) — A stringed in- strument
- **Kept neighbor:** `sambuc, *us` (L) — The elder tree
- **rawSegment:** `sambuc, =a (L). A stringed in- strument`
- **Note:** **Not OCR:** same lemma (`sambuc…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 177. Letter S — `column_read_order`

- **Dropped:** `sanit, -a` (L) — Health, soundness
- **Kept neighbor:** `sanicul, =a` (NL) — A kind of plant
- **rawSegment:** `sanit, -a (L). Health, soundness`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 178. Letter S — `column_read_order`

- **Dropped:** `sanicul, =a` (NL) — A kind of plant
- **Kept neighbor:** `sani, -do, *s` (G) — A board, plank
- **rawSegment:** `sanicul, =a (NL). A kind of plant`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 179. Letter S — `column_read_order`

- **Dropped:** `seal, *a, -ari, -i` (L) — A ladder
- **Kept neighbor:** `scalen, -e, -o` (G) — Uneven; limping
- **rawSegment:** `seal, *a, -ari, -i (L). A ladder`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 180. Letter S — `column_read_order`

- **Dropped:** `seel, -i, -id, =is, -o, =us` (G) — A leg
- **Kept neighbor:** `sceler` (L) — Wicked, villainous
- **rawSegment:** `scat, -o (G). Dung seel, -i, -id, =is, -o, =us (G). A leg`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 181. Letter S — `column_read_order`

- **Dropped:** `seen, -a, -o` (G) — A tent; a stage
- **Kept neighbor:** `sceptic, -o` (G) — Reflective, ob- servant
- **rawSegment:** `seen, -a, -o (G). A tent; a stage`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 182. Letter S — `column_read_order`

- **Dropped:** `sches, =is` (G) — A condition or state
- **Kept neighbor:** `=schema, -t, -to` (G) — Form, shape
- **rawSegment:** `sches, =is (G). A condition or state`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 183. Letter S — `column_read_order`

- **Dropped:** `seine, -i, =us` (L) — A kind of lizard
- **Kept neighbor:** `scintill` (L) — Emit sparks, sparkle
- **rawSegment:** `seine, -i, =us (L). A kind of lizard`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 184. Letter S — `column_read_order`

- **Dropped:** `sciur, -o, =us` (L) — A squirrel
- **Kept neighbor:** `scier, -o` (G) — Hard
- **rawSegment:** `sciur, -o, =us (L). A squirrel`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 185. Letter S — `column_read_order`

- **Dropped:** `semât, -i, -o` (G) — A mark, sign, signal, seal
- **Kept neighbor:** `semeio, -t` (G) — Marked; a stand- ard
- **rawSegment:** `semât, -i, -o (G). A mark, sign, signal, seal`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 186. Letter S — `ascii_vs_book_combining_forms`

- **Dropped:** `sen, =ex, -i` (L) — An old person
- **Kept neighbor:** `sen, -i` (L) — Six
- **rawSegment:** `sen, =ex, -i (L). An old person`
- **Note:** **Not OCR:** same lemma (`sen…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 187. Letter S — `column_read_order`

- **Dropped:** `série, -a, -ar, -e, -o` (G) — Silk, silken
- **Kept neighbor:** `•sermo, -n` (L) — A speech
- **rawSegment:** `série, -a, -ar, -e, -o (G). Silk, silken`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 188. Letter S — `ascii_vs_book_combining_forms`

- **Dropped:** `set, =a, -i` (L) — A bristle
- **Kept neighbor:** `set, -o` (G) — A moth
- **rawSegment:** `set, =a, -i (L). A bristle`
- **Note:** **Not OCR:** same lemma (`set…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 189. Letter S — `ascii_vs_book_combining_forms`

- **Dropped:** `sid, =a` (G) — A pomegranate tree; a kind of water plant
- **Kept neighbor:** `sid, -eri, =us` (L) — A star
- **rawSegment:** `sid, =a (G). A pomegranate tree; a kind of water plant`
- **Note:** **Not OCR:** same lemma (`sid…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 190. Letter S — `column_read_order`

- **Dropped:** `silen, =us` (L) — Foam; (My): drunken- ness
- **Kept neighbor:** `sedentary, =silex` (L) — Flint
- **rawSegment:** `silen, =us (L): Foam; (My): drunken- ness`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 191. Letter S — `column_read_order`

- **Dropped:** `skiro` (G) — A white parasol
- **Kept neighbor:** `skier, -o` (G) — Hard
- **rawSegment:** `skiro (G). A white parasol`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 192. Letter S — `ascii_vs_book_combining_forms`

- **Dropped:** `•sol, =a` (L) — The sun
- **Kept neighbor:** `sol, -i, -o` (L) — Alone
- **rawSegment:** `•sol, =a (L). The sun`
- **Note:** **Not OCR:** same lemma (`sol…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 193. Letter S — `column_read_order`

- **Dropped:** `spart, -o` (G) — Scattered
- **Kept neighbor:** `•spams` (L) — The gilt-bream
- **rawSegment:** `spart, -o (G). Scattered`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 194. Letter S — `column_read_order`

- **Dropped:** `spurn, =a` (L) — Foam
- **Kept neighbor:** `spurc` (L) — Dirty, filthy
- **rawSegment:** `spurn, =a (L). Foam`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 195. Letter S — `column_read_order`

- **Dropped:** `stère, -o` (G) — Solid
- **Kept neighbor:** `sterc, -o, -or, =us` (L) — Excrement, dung, manure
- **rawSegment:** `stère, -o (G). Solid`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 196. Letter S — `column_read_order`

- **Dropped:** `stères, =is` (G) — Deprivation, loss
- **Kept neighbor:** `•sterigma, -to` (G) — A support
- **rawSegment:** `stères, =is (G). Deprivation, loss`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 197. Letter S — `ascii_vs_book_combining_forms`

- **Dropped:** `stib, =a, -i` (G) — Hoarfrost; an- timony
- **Kept neighbor:** `stib, -o, =us` (G) — A track, tread
- **rawSegment:** `stib, =a, -i (G). Hoarfrost; an- timony`
- **Note:** **Not OCR:** same lemma (`stib…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 198. Letter S — `ascii_vs_book_combining_forms`

- **Dropped:** `strig, =a` (L) — A furrow, streak
- **Kept neighbor:** `strig, -i` (L) — An owl; a furrow
- **rawSegment:** `strig, =a (L). A furrow, streak`
- **Note:** **Not OCR:** same lemma (`strig…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 199. Letter S — `column_read_order`

- **Dropped:** `stringen` (L) — Compressing
- **Kept neighbor:** `string` (NL) — An owl
- **rawSegment:** `stringen (L). Compressing`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 200. Letter S — `ascii_vs_book_combining_forms`

- **Dropped:** `stup, =a, -o` (L) — The coarse part of
- **Kept neighbor:** `stup, -e, -id` (L) — Benumb, stun
- **rawSegment:** `stup, =a, -o (L). The coarse part of`
- **Note:** **Not OCR:** same lemma (`stup…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 201. Letter S — `column_read_order`

- **Dropped:** `suet, -or` (L) — Suck; a sucker
- **Kept neighbor:** `sud, -a, =or, -ori` (L) — Sweat
- **rawSegment:** `suet, -or (L). Suck; a sucker`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 202. Letter S — `column_read_order`

- **Dropped:** `sul, =a, -i` (Ice) — A gannet
- **Kept neighbor:** `suie, -a, -i, =us` (L) — A furrow, groove, trench
- **rawSegment:** `sul, =a, -i (Ice). A gannet`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 203. Letter S — `column_read_order`

- **Dropped:** `syzyg, -o` (G) — Yoked, paired Τ
- **Kept neighbor:** `soluble;` (G) — a roof, cover; covered
- **rawSegment:** `syzyg, -o (G). Yoked, paired Τ`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 204. Letter T — `column_read_order`

- **Dropped:** `thirsty;` (G) — War-
- **Kept neighbor:** `tab, -e, -id` (L) — Wasting away
- **rawSegment:** `thirsty; (G): War-`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 205. Letter T — `ascii_vs_book_combining_forms`

- **Dropped:** `tab, -e, -id` (L) — Wasting away
- **Kept neighbor:** `tab, -1, -ul, =ula` (L) — A board, table
- **rawSegment:** `tab, -e, -id (L). Wasting away`
- **Note:** **Not OCR:** same lemma (`tab…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 206. Letter T — `column_read_order`

- **Dropped:** `tabern` (L) — A shed, tent
- **Kept neighbor:** `tabe, =s, -t` (L) — Wasting away
- **rawSegment:** `tabern (L). A shed, tent`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 207. Letter T — `column_read_order`

- **Dropped:** `tarsus` (the Arrange (G) — =us (G). Asuperlative Stretching bull Aflat surface; ending)
- **Kept neighbor:** `tal, -ari, -i, -o, =us` (L) — The ankle, heel ankle,
- **rawSegment:** `-o, -i (L). (G). tarsus (the Arrange (G).=us (G). Asuperlative Stretching bull Aflat surface; ending)`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 208. Letter T — `column_read_order`

- **Dropped:** `teen, -o, =urn` (G) — A child
- **Kept neighbor:** `tect, -i, -o` (L) — A roof, covering
- **rawSegment:** `teen, -o, =urn (G). A child`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 209. Letter T — `ascii_vs_book_combining_forms`

- **Dropped:** `tel, =a, -i` (L) — A web
- **Kept neighbor:** `tel, -e` (G) — Far
- **rawSegment:** `tel, =a, -i (L). A web`
- **Note:** **Not OCR:** same lemma (`tel…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 210. Letter T — `column_read_order`

- **Dropped:** `terrien, =us` (G) — A piece of land
- **Kept neighbor:** `temer` (L) — Rash, reckless
- **rawSegment:** `terrien, =us (G). A piece of land`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 211. Letter T — `ascii_vs_book_combining_forms`

- **Dropped:** `ten, -a` (L) — Hold
- **Kept neighbor:** `ten, - s , -t` (L) — Stretched
- **rawSegment:** `ten, -a (L). Hold`
- **Note:** **Not OCR:** same lemma (`ten…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 212. Letter T — `column_read_order`

- **Dropped:** `terebr, =a` (L) — Bore; a boring tool
- **Kept neighbor:** `terebinth, =us` (G) — The turpentine tree
- **rawSegment:** `terebr, =a (L). Bore; a boring tool`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 213. Letter T — `column_read_order`

- **Dropped:** `=terma, -t` (G) — An end, limit
- **Kept neighbor:** `term, =es, -it` (L) — A wood worm
- **rawSegment:** `=terma, -t (G). An end, limit`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 214. Letter T — `ascii_vs_book_combining_forms`

- **Dropped:** `term, =es, -it` (L) — A wood worm
- **Kept neighbor:** `term, -in` (L) — An end; a name
- **rawSegment:** `term, =es, -it (L). A wood worm`
- **Note:** **Not OCR:** same lemma (`term…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 215. Letter T — `ascii_vs_book_combining_forms`

- **Dropped:** `terr, =a, -i` (L) — The earth, land
- **Kept neighbor:** `terr, -i` (L) — Terror
- **rawSegment:** `terr, =a, -i (L). The earth, land`
- **Note:** **Not OCR:** same lemma (`terr…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 216. Letter T — `column_read_order`

- **Dropped:** `terrestr` (L) — On land
- **Kept neighbor:** `ter s` (L) — Clean, neat
- **rawSegment:** `terrestr (L). On land`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 217. Letter T — `column_read_order`

- **Dropped:** `thair, -o, =us` (G) — A door hinge
- **Kept neighbor:** `thai, -o, =us` (G) — A twig; a young person
- **rawSegment:** `thair, -o, =us (G). A door hinge`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 218. Letter T — `ascii_vs_book_combining_forms`

- **Dropped:** `the, =a,` (G) — A view,
- **Kept neighbor:** `the, -i,(G): A god;` (L) — tea
- **rawSegment:** `the, =a, (G): A view, spectacle; (L):`
- **Note:** **Not OCR:** same lemma (`the…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 219. Letter T — `column_read_order`

- **Dropped:** `thee, =a, -o` (G) — A case, box, chest, cup
- **Kept neighbor:** `thect, -o` (G) — Sharpened
- **rawSegment:** `thee, =a, -o (G). A case, box, chest, cup`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 220. Letter T — `column_read_order`

- **Dropped:** `thel, =a, -i` (G) — A nipple
- **Kept neighbor:** `thei, -y` (G) — Female; tender
- **rawSegment:** `thel, =a, -i (G). A nipple`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 221. Letter T — `column_read_order`

- **Dropped:** `thio, -n` (G) — Sulphur
- **Kept neighbor:** `thias, -t` (G) — Crush, flatten
- **rawSegment:** `thio, -n (G). Sulphur`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 222. Letter T — `ascii_vs_book_combining_forms`

- **Dropped:** `thur, =a` (G) — A door
- **Kept neighbor:** `thur, -i` (L) — Incense
- **rawSegment:** `thur, =a (G). A door`
- **Note:** **Not OCR:** same lemma (`thur…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 223. Letter T — `ascii_vs_book_combining_forms`

- **Dropped:** `thyr, =a, -i, -o` (G) — A door
- **Kept neighbor:** `thyr, -eo` (G) — A shield
- **rawSegment:** `thyr, =a, -i, -o (G). A door`
- **Note:** **Not OCR:** same lemma (`thyr…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 224. Letter T — `column_read_order`

- **Dropped:** `toc, -o, =us` (G) — Birth
- **Kept neighbor:** `tich, -o` (G) — A wall
- **rawSegment:** `-tic (G): Relation; (L): belonging to toc, -o, =us (G). Birth`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 225. Letter T — `ascii_vs_book_combining_forms`

- **Dropped:** `tim, -id, -or` (L) — Fear
- **Kept neighbor:** `tim, -a, -o` (G) — Honor, esteem
- **rawSegment:** `tim, -id, -or (L). Fear`
- **Note:** **Not OCR:** same lemma (`tim…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 226. Letter T — `column_read_order`

- **Dropped:** `torn, =e, -i, -o, =y` (G) — Cut toment, stuffing ton, -o (G)· A tone; tension; some­ thing stretched
- **Kept neighbor:** `tons, -or, -ur` (L) — Shear, cut, shave
- **rawSegment:** `torn,  =e, -i, -o, =y (G). Cut toment, stuffing ton, -o (G)· A tone; tension; some­ thing stretched`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 227. Letter T — `column_read_order`

- **Dropped:** `toxic, =um` (L) — A poison, arrow poison
- **Kept neighbor:** `•toxeuma, -to` (G) — An arrow
- **rawSegment:** `toxic, =um (L). A poison, arrow poison`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 228. Letter T — `ascii_vs_book_combining_forms`

- **Dropped:** `tran, =es, -i` (G) — Clear, distinct
- **Kept neighbor:** `tran, -s` (L) — Across, through
- **rawSegment:** `tran, =es, -i (G). Clear, distinct`
- **Note:** **Not OCR:** same lemma (`tran…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 229. Letter T — `column_read_order`

- **Dropped:** `=trema, -to` (G) — A hole
- **Kept neighbor:** `trem, -e, -o, -or, -ul` (L) — Shake, tremble
- **rawSegment:** `=trema, -to (G). A hole trem, -e, -o, -or, -ul (L).`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 230. Letter T — `column_read_order`

- **Dropped:** `=trux` (L) — Fierce
- **Kept neighbor:** `trunc, -a, -at, =us` (L) — Cut off, maimed; that which is cut off, the trunk
- **rawSegment:** `=trux (L). Fierce`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 231. Letter T — `ascii_vs_book_combining_forms`

- **Dropped:** `tryp, -a, -ano, -o` (G) — A hole; bore
- **Kept neighbor:** `tryp, - s , -t` (G) — Rub; rubbed
- **rawSegment:** `tryp, -a, -ano, -o (G). A hole; bore`
- **Note:** **Not OCR:** same lemma (`tryp…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 232. Letter T — `ascii_vs_book_combining_forms`

- **Dropped:** `tub, =a` (L) — A trumpet
- **Kept neighbor:** `tub, -i, =us` (L) — A tube, pipe
- **rawSegment:** `tub, =a (L). A trumpet`
- **Note:** **Not OCR:** same lemma (`tub…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 233. Letter T — `column_read_order`

- **Dropped:** `turn, -e, -esc` (L) — Swell
- **Kept neighbor:** `tumid` (L) — Swollen
- **rawSegment:** `turn, -e, -esc (L). Swell`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 234. Letter T — `ascii_vs_book_combining_forms`

- **Dropped:** `typh, =a` (G) — The cattail
- **Kept neighbor:** `typh, -o, =us` (G) — Smoke
- **rawSegment:** `typh, =a (G). The cattail`
- **Note:** **Not OCR:** same lemma (`typh…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 235. Letter U — `ascii_vs_book_combining_forms`

- **Dropped:** `ul, =a, -e, -i` (G) — A scar
- **Kept neighbor:** `ul, -o` (G) — The gams; curly, woolly; destructive
- **rawSegment:** `ul, =a, -e, -i (G). A scar`
- **Note:** **Not OCR:** same lemma (`ul…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 236. Letter U — `column_read_order`

- **Dropped:** `une, -in, =inus, =us` (L) — A hook
- **Kept neighbor:** `uncia` (L) — A twelfth; a trifle
- **rawSegment:** `une, -in, =inus, =us (L). A hook`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 237. Letter V — `column_read_order`

- **Dropped:** `valid` (L) — Strong
- **Kept neighbor:** `vail` (L) — A valley; a wall, ram- part
- **rawSegment:** `valid (L). Strong`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 238. Letter V — `column_read_order`

- **Dropped:** `vel, =es, -it` (L) — A skirmisher
- **Kept neighbor:** `veil, -eri, -os, =us` (L) — Wool, fleece
- **rawSegment:** `vel, =es, -it (L). A skirmisher`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 239. Letter V — `column_read_order`

- **Dropped:** `vélo, -ci, =x` (L) — Swift
- **Kept neighbor:** `=velum` (L) — A veil; a sail
- **rawSegment:** `vélo, -ci, =x (L). Swift`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 240. Letter V — `column_read_order`

- **Dropped:** `vertebr, =a, -o` (L) — A joint; a colored vertebra
- **Kept neighbor:** `vert, =ex, -ic` (L) — The apex; a defender whirlpool
- **rawSegment:** `vertebr, =a, -o (L). A joint; a colored vertebra`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 241. Letter V — `column_read_order`

- **Dropped:** `vine` (L) — Bind, conquer
- **Kept neighbor:** `=vinca` (NL) — The periwinkle
- **rawSegment:** `vine (L). Bind, conquer`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 242. Letter V — `ascii_vs_book_combining_forms`

- **Dropped:** `virg, =a` (L) — A rod; a twig
- **Kept neighbor:** `virg, -in, =o` (L) — A virgin
- **rawSegment:** `virg, =a (L). A rod; a twig`
- **Note:** **Not OCR:** same lemma (`virg…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 243. Letter V — `ascii_vs_book_combining_forms`

- **Dropped:** `vit, =a, -al` (L) — life
- **Kept neighbor:** `vit, -i, =is` (L) — A vine; a wind- ing
- **rawSegment:** `vit, =a, -al (L). life`
- **Note:** **Not OCR:** same lemma (`vit…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 244. Letter V — `column_read_order`

- **Dropped:** `voluhil` (L) — Turning, rolling, fluent
- **Kept neighbor:** `volucr` (L) — Flying, winged, swift
- **rawSegment:** `voluhil (L). Turning, rolling, fluent`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 245. Letter Z — `ascii_vs_book_combining_forms`

- **Dropped:** `ze, =a` (G) — A grain
- **Kept neighbor:** `ze, -i, =us` (G) — A kind of fish
- **rawSegment:** `ze, =a (G). A grain`
- **Note:** **Not OCR:** same lemma (`ze…`); Borror orders combining forms (`=`, `-`, `*`, …) in print order, but our `roots_sort_key` uses plain ASCII so `-` and `*` sort before `=`. Dropping the “first” row would remove a valid entry — prefer treating these pairs as lint false positives, not spurious rows.

## 246. Letter Z — `column_read_order`

- **Dropped:** `zyth, =us` (G) — A kind of beer
- **Kept neighbor:** `zyii, =s` (NL) — A joining
- **rawSegment:** `zyth, =us (G). A kind of beer`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 247. Letter # — `column_read_order`

- **Dropped:** `-o, =um` (G) — Chaff, bran
- **Kept neighbor:** `-acious` (E) — Abounding in
- **rawSegment:** `-o, =um (G). Chaff, bran`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 248. Letter # — `column_read_order`

- **Dropped:** `-oin =es` (G) — the Afield
- **Kept neighbor:** `-ales` (G) — the ending of plant order names
- **rawSegment:** `-oin =es (G). the Afield Afield (G). Wild, country A fierce hunter; a person`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 249. Letter # — `column_read_order`

- **Dropped:** `-tDry` (L) — A wrapper
- **Kept neighbor:** `-arium` (L) — A place where some- thing is kept
- **rawSegment:** `ari (G). Much; very; warlike arie, arid (L). arill (NL). =s, -tDry (L). A wrapper`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 250. Letter # — `column_read_order`

- **Dropped:** `-ary` (L) — A place where something is kept
- **Kept neighbor:** `'cerma, -to` (G) — A slice; a small
- **rawSegment:** `-ary (L). A place where something is kept`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 251. Letter # — `column_read_order`

- **Dropped:** `; cliv, =us` (L) — A slope
- **Kept neighbor:** `-colous` (L) — Inhabiting
- **rawSegment:** `; cliv, =us (L). A slope`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 252. Letter # — `column_read_order`

- **Dropped:** `ι =dieresis` (G) — A division
- **Kept neighbor:** `-to` (L) — (L).Of
- **rawSegment:** `ι =dieresis (G). A division`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 253. Letter # — `column_read_order`

- **Dropped:** `-to` (L) — (L).Of
- **Kept neighbor:** `-do, =s` (G) — A gazelle
- **rawSegment:** `-to (L). (L).Of`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 254. Letter # — `column_read_order`

- **Dropped:** `émet, -i, -o` (G) — Vomit
- **Kept neighbor:** `-ens, =e, =is` (L) — Of, belonging to
- **rawSegment:** `émet, -i, -o (G). Vomit`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 255. Letter # — `column_read_order`

- **Dropped:** `épier, -a` (G) — Pleasing
- **Kept neighbor:** `-es` (G) — (a suffix meaning an agent or doer)
- **rawSegment:** `épier, -a (G). Pleasing`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 256. Letter # — `column_read_order`

- **Dropped:** `-êtes` (G) — Dwell; a dweller; one who
- **Kept neighbor:** `-ett, =a, =urn, =us` (NL) — Small
- **rawSegment:** `-êtes (G). Dwell; a dweller; one who`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 257. Letter # — `column_read_order`

- **Dropped:** `-gerous` (L) — Bearing
- **Kept neighbor:** `-e,` (G) — -idi, (G).offspring A
- **rawSegment:** `-gerous (L). Bearing`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 258. Letter # — `column_read_order`

- **Dropped:** `| hedon` (G) — Pleasure, delight
- **Kept neighbor:** `-io, -y discover A` (G) — companion different Habit
- **rawSegment:** `| hedon (G). Pleasure, delight`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 259. Letter # — `column_read_order`

- **Dropped:** `-io, -y discover A` (G) — companion different Habit
- **Kept neighbor:** `-iasis` (G) — Treatment, cure; forma- tion of, presence of
- **rawSegment:** `-io, -y discover A (G). companion different Habit`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 260. Letter # — `column_read_order`

- **Dropped:** `-ill, *a, =um, =us` (L) — Small
- **Kept neighbor:** `-ilium` (L) — Small
- **rawSegment:** `-ill, *a, =um, =us (L). Small`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 261. Letter # — `column_read_order`

- **Dropped:** `1st, -o` (G) — A web; tissue
- **Kept neighbor:** `-ist, -o` (G) — (the superlative ending)
- **rawSegment:** `1st, -o (G). A web; tissue`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 262. Letter # — `column_read_order`

- **Dropped:** `-ium` (G) — Small
- **Kept neighbor:** `-i, -o` (L) — Smooth; nimble,
- **rawSegment:** `-ium (G). Small`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 263. Letter # — `column_read_order`

- **Dropped:** `1ère, -m, -si` (G) — Idle talk
- **Kept neighbor:** `-limonium` (G) — Sea lavender
- **rawSegment:** `1ère, -m, -si (G). Idle talk`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 264. Letter # — `column_read_order`

- **Dropped:** `-lite` (G) — A stone
- **Kept neighbor:** `-a-a,` (G) — Smooth
- **rawSegment:** `-lite (G). A stone`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 265. Letter # — `column_read_order`

- **Dropped:** `°gyg` (G My) — A king of Athens
- **Kept neighbor:** `-oid` (G) — Like; form
- **rawSegment:** `°gyg (G My). A king of Athens`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 266. Letter # — `column_read_order`

- **Dropped:** `-orna` (G) — A tumor, morbid growth
- **Kept neighbor:** `-onym` (G) — A name
- **rawSegment:** `-orna (G). A tumor, morbid growth`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 267. Letter # — `column_read_order`

- **Dropped:** `-parous` (L) — Giving birth to, bearing
- **Kept neighbor:** `-i` (L) — A sparrow
- **rawSegment:** `-parous (L). Giving birth to, bearing`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 268. Letter # — `column_read_order`

- **Dropped:** `-pus` (G) — Afoot
- **Kept neighbor:** `-a, -i A -il` (L) — (L). thing
- **rawSegment:** `-pus (G). Afoot`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 269. Letter # — `column_read_order`

- **Dropped:** `écart` (G) — Nimble; dance
- **Kept neighbor:** `-scopy` (G) — Observation
- **rawSegment:** `écart (G). Nimble; dance`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 270. Letter # — `column_read_order`

- **Dropped:** `-stalsis` (G) — A constriction, com- pression
- **Kept neighbor:** `-no, -o` (G) — A
- **rawSegment:** `-stalsis (G). A constriction, com- pression`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 271. Letter # — `column_read_order`

- **Dropped:** `-no, -o` (G) — A
- **Kept neighbor:** `-i,` (G) — Wrinkled Swine-loving skin Syphilis
- **rawSegment:** `-no, -o (G). A`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.

## 272. Letter # — `column_read_order`

- **Dropped:** `-i,` (G) — Wrinkled Swine-loving skin Syphilis
- **Kept neighbor:** `-eo, -tatos` (G) — =us
- **rawSegment:** `-i,  (G). Wrinkled Swine-loving skin Syphilis`
- **Note:** Strict lex order on the full roots line disagrees with book order — often narrow gutter (left+right on one line) or column-major vs row pairing; confirm on PDF spread.
