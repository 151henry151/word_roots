# Spurious entries — review list

Regenerated from `scripts/extract_dictionary.py` and `scripts/spurious_alphabetical_inversion_entries.json` (2026-04-10).

The published `dictionary.json` omits rows in **either** category below.

---

## 1. `SPURIOUS_ROOTS` (exact roots string)

These **40** strings are never emitted in the web bundle—treated as OCR/column garbage or unusable duplicates. Match is on **`roots` only** (after `ocr_root_fixes`).

1. `-o A`
2. `-o Full`
3. `-o, =us a=a`
4. `=irons`
5. `=limma, =a,-to-i, -o`
6. `A`
7. `Egypt`
8. `J Py= ~g> =x`
9. `The`
10. `collât`
11. `down;`
12. `ect`
13. `elope`
14. `f hedeom, *a`
15. `flower;`
16. `ground, =chima, -to`
17. `leist, -i,`
18. `litr,`
19. `living`
20. `loop;`
21. `meadow;`
22. `moth`
23. `n`
24. `neck;`
25. `offish;`
26. `path,`
27. `picked;`
28. `probe; a song; an apple, fruit; a mer`
29. `produce;`
30. `salt;`
31. `servant;`
32. `shield;`
33. `song;`
34. `spectacle;`
35. `swineherd`
36. `teem;`
37. `toothache`
38. `tor,`
39. `tunic-o`
40. `•syphar, -o -o syphil,`

---

## 2. Alphabetical inversion exclusions (full triple)

These **190** rows are dropped because they were the **first** adjacent pair in a browse-letter bucket where `roots_sort_key` **decreased** vs the next row (and `first_stem_key` differed). Each line is `roots` | `langCode` | `meaning`.

1. **`aero`** | G | Topmost, the tip
2. **`agreu, -s, -t`** | G | A hunter agrost, agri,
3. **`ale, =es, -i`** | L | An elk
4. **`all`** | L | Other, another; a wing
5. **`allé`** | Ice | The dovekie
6. **`allelo`** | G | One another; parallel
7. **`alluv, -i`** | L | Wash against, over- flow; a pool
8. **`althae`** | G | Heal, cure
9. **`amie`** | L | Friendly, kind
10. **`arane, =a, -i`** | L | A spider; a spider web
11. **`=apium`** | L | Celery, parsley
12. **`apparat`** | L | Prepared; a preparation append,
13. **`azyg, -o`** | G | Unpaired, unmarried 6
14. **`barbat`** | L | Bearded
15. **`basil, -e, -ic`** | G | Royal
16. **`bâti, =s`** | G | The ray fish
17. **`belli, -d, =s`** | L | A daisy
18. **`caco, =a`** | G | Excrement each
19. **`cale, -i`** | L | The heel; lime, limestone
20. **`call, -c, =x`** | L | A cup
21. **`cane, =er, -r, -ro`** | L | A crab; an ulcer; cancer
22. **`career, -a`** | L | A prison
23. **`catari`** | LL | Of a cat
24. **`caum, -m, -s, -st, -t`** | G | Burn, burn-
25. **`celé`** | G | A rupture, hernia; a tumor
26. **`cere, -o, =us`** | G | The tail
27. **`•colinus`** | Mex | The bobwhite
28. **`coniat, -o`** | G | Plastered, white- washed
29. **`crépit`** | L | Creak, rattle
30. **`crio`** | G | A ram
31. **`cruel`** | L | A cross; torture
32. **`cyt, =e, -o, =us`** | G | A hollow place; a cell D
33. **`choose;`** | L | collect
34. **`désignât`** | L | Marked
35. **`die`** | G | Right; a wood worm
36. **`diet`** | L | Say, pronounce, tell
37. **`dyt, =es`** | G | Dive, enter e (see also ae, jai, o, or oe)
38. **`egt, = s`** | L | A shield, armor
39. **`eleagn, =us`** | G | A marsh plant
40. **`exygr, -o`** | G | Wet Γ
41. **`epari`** | L | The gilt-bream
42. **`fallac`** | L | Deceptive
43. **`fee, -i`** | L | Dregs
44. **`fell, -n, =s`** | L | A cat
45. **`fern, -or, -oro, *ur`** | L | The thigh
46. **`fill, -a`** | L | A son or daughter
47. **`garnet`** | G | A wife or husband
48. **`gelât`** | L | Frozen, jelly-like
49. **`gêner`** | L | Beget; a race; produce
50. **`géra, -s, -t`** | G | Old age
51. **`gpssypi, =urn`** | L | Cotton
52. **`gyrin, -o, =us`** | G | A tadpole Ή
53. **`halin, -o`** | G | Made of salt
54. **`horn, -in, =o`** | L | Man
55. **`hystri, -c, =x`** | G | A porcupine I
56. **`iloi, -o`** | G | Glue
57. **`indie`** | L | That which points out; Indian; indigo
58. **`infra`** | L | Below, beneath
59. **`ixi, -a, -o`** | G | Birdlime; mistle­ toe
60. **`iyn, -g, =x`** | G | The wryneck J
61. **`lime, =calyx`** | G | The calyx
62. **`lace, -o, =us`** | G | A cistern, pit
63. **`laim, -o, =us`** | G | The throat, gullet
64. **`limât`** | L | Polished
65. **`lue, -i`** | L | Light; a grove
66. **`lye, -o, =us`** | G | A wolf
67. **`mâcha, -er, -ir`** | G | A sword, dagger, razor
68. **`meandr`** | G | Winding, zigzag
69. **`mane`** | L | Maimed
70. **`•mêlas`** | G | Black, dark
71. **`=mêles`** | L | A badger
72. **`mill, -ar, -ol, =urn`** | L | Millet
73. **`mise, -o`** | G | A stalk
74. **`mitl`** | L | Mild, harmless; ripe
75. **`molest`** | L | Disturb
76. **`mue, -e, -i, -o, =us`** | L | Mold, moldy; mucus
77. **`mûri`** | L | A mouse; a wall
78. **`mûrie`** | L | The purple-fish; purple
79. **`myz, -o`** | G | Suck; mutter Ν
80. **`nil, =urn`** | L | A trifle, a little thing
81. **`nerit, =es`** | G | A sea mussel
82. **`nie, -o`** | G | Victory; strife
83. **`notât`** | L | Marked
84. **`olbi, -o`** | G | Blessed, happy
85. **`ole, -i, -o, =urn`** | L | Olive oil, oil
86. **`oler, -i`** | L | Greens, vegetables
87. **`ornent, =um`** | L | Fat skin
88. **`one, -o, =us`** | G | A mass; a tubercle; a hook, barb
89. **`opisth, -i, -o`** | G | Behind, the hind part
90. **`ore, =a`** | L | A whale
91. **`ornât`** | L | Adorned
92. **`pâli`** | L | A stake
93. **`palla, -c, =x`** | G | A concubine; a youth
94. **`panic, =um`** | L | Panic grass
95. **`parât`** | L | Ready, prepared
96. **`pastill, =us`** | L | A small loaf
97. **`pelidn, -o`** | G | Livid, black and blue an oar
98. **`pêne, - s , -st, -t`** | G | A laborer
99. **`phase, =um`** | G | A tree moss
100. **`phys, -a, -i`** | G | Blow; nature; a bladder
101. **`plein`** | L | Pitch black
102. **`pier, -i, -o`** | G | Bitter, pungent
103. **`pise, -i, =is`** | L | A fish
104. **`plaçât`** | L | Please, appease
105. **`plèbe, -i`** | L | Of common people; common
106. **`pleon`** | G | More, full
107. **`•pons`** | L | Abridge
108. **`pore, -i, =us`** | L | A hog, swine
109. **`porulos`** | L | Full of small pores
110. **`prêter`** | L | Beyond, past, more than
111. **`puéril`** | L | Childish
112. **`pulp, =a, -i`** | L | Flesh, pulp
113. **`récit`** | L | Readout
114. **`•regma, -to`** | G | A break, tear
115. **`régula, -ri, -t`** | L | Regular
116. **`répand`** | L | Turned up, bent back- ward
117. **`résidu`** | L | What is left behind
118. **`révéla`** | L | Reveal
119. **`sanit, -a`** | L | Health, soundness
120. **`sanicul, =a`** | NL | A kind of plant
121. **`seal, *a, -ari, -i`** | L | A ladder
122. **`seel, -i, -id, =is, -o, =us`** | G | A leg
123. **`seen, -a, -o`** | G | A tent; a stage
124. **`sches, =is`** | G | A condition or state
125. **`seine, -i, =us`** | L | A kind of lizard
126. **`sciur, -o, =us`** | L | A squirrel
127. **`semât, -i, -o`** | G | A mark, sign, signal, seal
128. **`série, -a, -ar, -e, -o`** | G | Silk, silken
129. **`silen, =us`** | L | Foam; (My): drunken- ness
130. **`skiro`** | G | A white parasol
131. **`spart, -o`** | G | Scattered
132. **`spurn, =a`** | L | Foam
133. **`stère, -o`** | G | Solid
134. **`stères, =is`** | G | Deprivation, loss
135. **`stringen`** | L | Compressing
136. **`suet, -or`** | L | Suck; a sucker
137. **`sul, =a, -i`** | Ice | A gannet
138. **`syzyg, -o`** | G | Yoked, paired Τ
139. **`thirsty;`** | G | War-
140. **`tabern`** | L | A shed, tent
141. **`tarsus`** | the Arrange (G | =us (G). Asuperlative Stretching bull Aflat surface; ending)
142. **`teen, -o, =urn`** | G | A child
143. **`terrien, =us`** | G | A piece of land
144. **`terebr, =a`** | L | Bore; a boring tool
145. **`=terma, -t`** | G | An end, limit
146. **`terrestr`** | L | On land
147. **`thair, -o, =us`** | G | A door hinge
148. **`thee, =a, -o`** | G | A case, box, chest, cup
149. **`thel, =a, -i`** | G | A nipple
150. **`thio, -n`** | G | Sulphur
151. **`toc, -o, =us`** | G | Birth
152. **`torn, =e, -i, -o, =y`** | G | Cut toment, stuffing ton, -o (G)· A tone; tension; some­ thing stretched
153. **`toxic, =um`** | L | A poison, arrow poison
154. **`=trema, -to`** | G | A hole
155. **`=trux`** | L | Fierce
156. **`turn, -e, -esc`** | L | Swell
157. **`une, -in, =inus, =us`** | L | A hook
158. **`valid`** | L | Strong
159. **`vel, =es, -it`** | L | A skirmisher
160. **`vélo, -ci, =x`** | L | Swift
161. **`vertebr, =a, -o`** | L | A joint; a colored vertebra
162. **`vine`** | L | Bind, conquer
163. **`voluhil`** | L | Turning, rolling, fluent
164. **`zyth, =us`** | G | A kind of beer
165. **`-o, =um`** | G | Chaff, bran
166. **`-oin =es`** | G | the Afield
167. **`-tDry`** | L | A wrapper
168. **`-ary`** | L | A place where something is kept
169. **`; cliv, =us`** | L | A slope
170. **`ι =dieresis`** | G | A division
171. **`-to`** | L | (L).Of
172. **`émet, -i, -o`** | G | Vomit
173. **`épier, -a`** | G | Pleasing
174. **`-êtes`** | G | Dwell; a dweller; one who
175. **`-gerous`** | L | Bearing
176. **`\| hedon`** | G | Pleasure, delight
177. **`-io, -y discover A`** | G | companion different Habit
178. **`-ill, *a, =um, =us`** | L | Small
179. **`1st, -o`** | G | A web; tissue
180. **`-ium`** | G | Small
181. **`1ère, -m, -si`** | G | Idle talk
182. **`-lite`** | G | A stone
183. **`°gyg`** | G My | A king of Athens
184. **`-orna`** | G | A tumor, morbid growth
185. **`-parous`** | L | Giving birth to, bearing
186. **`-pus`** | G | Afoot
187. **`écart`** | G | Nimble; dance
188. **`-stalsis`** | G | A constriction, com- pression
189. **`-no, -o`** | G | A
190. **`-i,`** | G | Wrinkled Swine-loving skin Syphilis
