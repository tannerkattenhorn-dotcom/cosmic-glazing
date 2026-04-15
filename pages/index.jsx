import { useState, useRef } from “react”;

const PLANETS = {
Sun:     { color: “#FFD700”, glow: “#FFD70066”, symbol: “☉” },
Moon:    { color: “#C0C0FF”, glow: “#C0C0FF66”, symbol: “☽” },
Mercury: { color: “#A8D8EA”, glow: “#A8D8EA66”, symbol: “☿” },
Venus:   { color: “#98FF98”, glow: “#98FF9866”, symbol: “♀” },
Mars:    { color: “#FF4500”, glow: “#FF450066”, symbol: “♂” },
Jupiter: { color: “#FFB347”, glow: “#FFB34766”, symbol: “♃” },
Saturn:  { color: “#DEB887”, glow: “#DEB88766”, symbol: “♄” },
Uranus:  { color: “#7FFFD4”, glow: “#7FFFD466”, symbol: “♅” },
Neptune: { color: “#4169E1”, glow: “#4169E166”, symbol: “♆” },
Pluto:   { color: “#9370DB”, glow: “#9370DB66”, symbol: “♇” },
};

const PLANET_IMAGES = {
Sun:     “https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-*20100819.jpg/240px-The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory*-*20100819.jpg”,
Moon:    “https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/FullMoon2010.jpg/240px-FullMoon2010.jpg”,
Mercury: “https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Mercury_in_true_color.jpg/240px-Mercury_in_true_color.jpg”,
Venus:   “https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Venus-real_color.jpg/240px-Venus-real_color.jpg”,
Mars:    “https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OSIRIS_Mars_true_color.jpg/240px-OSIRIS_Mars_true_color.jpg”,
Jupiter: “https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Jupiter_and_its_shrunken_Great_Red_Spot.jpg/240px-Jupiter_and_its_shrunken_Great_Red_Spot.jpg”,
Saturn:  “https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Saturn_during_Equinox.jpg/240px-Saturn_during_Equinox.jpg”,
Uranus:  “https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Uranus2.jpg/240px-Uranus2.jpg”,
Neptune: “https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Neptune_Full.jpg/240px-Neptune_Full.jpg”,
Pluto:   “https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Pluto_in_True_Color*-*High-Res.jpg/240px-Pluto_in_True_Color*-_High-Res.jpg”,
};

const SIGNS = [“Aries”,“Taurus”,“Gemini”,“Cancer”,“Leo”,“Virgo”,“Libra”,“Scorpio”,“Sagittarius”,“Capricorn”,“Aquarius”,“Pisces”];
const SIGN_EMOJIS = { Aries:“♈”,Taurus:“♉”,Gemini:“♊”,Cancer:“♋”,Leo:“♌”,Virgo:“♍”,Libra:“♎”,Scorpio:“♏”,Sagittarius:“♐”,Capricorn:“♑”,Aquarius:“♒”,Pisces:“♓” };
const SIGN_INFO = {
Aries:{element:“Fire”,modality:“Cardinal”,ruler:“Mars”},Taurus:{element:“Earth”,modality:“Fixed”,ruler:“Venus”},
Gemini:{element:“Air”,modality:“Mutable”,ruler:“Mercury”},Cancer:{element:“Water”,modality:“Cardinal”,ruler:“Moon”},
Leo:{element:“Fire”,modality:“Fixed”,ruler:“Sun”},Virgo:{element:“Earth”,modality:“Mutable”,ruler:“Mercury”},
Libra:{element:“Air”,modality:“Cardinal”,ruler:“Venus”},Scorpio:{element:“Water”,modality:“Fixed”,ruler:“Pluto”},
Sagittarius:{element:“Fire”,modality:“Mutable”,ruler:“Jupiter”},Capricorn:{element:“Earth”,modality:“Cardinal”,ruler:“Saturn”},
Aquarius:{element:“Air”,modality:“Fixed”,ruler:“Uranus”},Pisces:{element:“Water”,modality:“Mutable”,ruler:“Neptune”},
};
const ELEM_COLOR = { Fire:”#FF6B35”, Earth:”#90EE90”, Air:”#87CEEB”, Water:”#6495ED” };

const INTERACTIONS = {
“Sun-Moon”:     { type:“Soul Bond”,        text:“ur conscious self and emotional self are in a permanent group chat. the main character and the lore are one.” },
“Sun-Mercury”:  { type:“Mind Merge”,        text:“ur identity and ur thoughts are cooked by the same chef. how u think is literally who u are.” },
“Sun-Venus”:    { type:“Vibe Lock”,         text:“ur core self and ur love language got merged. u are what u love and u love what u are.” },
“Sun-Mars”:     { type:“Drive Mode”,        text:“ur ego and ur ambition said let’s cook together. the wins are personal and they hit different.” },
“Sun-Jupiter”:  { type:“Main Quest Buff”,   text:“Jupiter is glazing ur sun sign rn. ur core identity gets a cosmic expansion pack.” },
“Sun-Saturn”:   { type:“Grind Arc”,         text:“Saturn said ur main character arc needs discipline. every limitation is a skill unlock waiting.” },
“Moon-Venus”:   { type:“Soft Era”,          text:“ur feelings and ur love language are speaking the same language. ultimate comfort zone glazer.” },
“Moon-Mars”:    { type:“Emotional Crashout”,text:“ur feelings and ur fire are always having a conversation. u feel things and act on them immediately.” },
“Moon-Saturn”:  { type:“Feeling Vault”,     text:“Saturn put ur feelings in a locked chest. u process emotions through structure and discipline.” },
“Venus-Mars”:   { type:“Rizz Chemistry”,    text:“ur love style and ur action style are doing a collab. how u attract and how u pursue are vibing.” },
“Mercury-Mars”: { type:“Yap Mode”,          text:“ur brain and ur drive said go at the same time. u think fast, act fast, and talk fast.” },
“Jupiter-Saturn”:{ type:“Expand vs Structure”,text:“ur blessing planet and ur discipline planet are in a negotiation. ur growth requires structure.” },
};

const HOUSE_INFO = {
1:{name:“Self & Identity”,keyword:“Vibe”,text:“ur whole aura and first impression. the main character intro screen.”},
2:{name:“Money & Values”,keyword:“Bag”,text:“ur bag situation and what u actually value. the financial lore chapter.”},
3:{name:“Communication”,keyword:“Yap”,text:“how ur brain works and how u communicate. ur texting and talking energy.”},
4:{name:“Home & Roots”,keyword:“Origin”,text:“ur roots, family, and safe space. the origin story before the main quest.”},
5:{name:“Creativity & Pleasure”,keyword:“Fun Arc”,text:“ur creative output, fun era, and flirt style. the main character arc.”},
6:{name:“Health & Routine”,keyword:“Side Quest”,text:“ur daily grind, routines, and body care. the necessary side quest.”},
7:{name:“Partnerships”,keyword:“Co-op”,text:“ur relationship lore and who ur drawn to. the co-op mode of ur life.”},
8:{name:“Transformation”,keyword:“Deep Lore”,text:“ur shadow era, deep lore, and shared power. the plot twist chapter.”},
9:{name:“Philosophy & Travel”,keyword:“Main Quest”,text:“ur belief system and hunger to expand. the adventure arc.”},
10:{name:“Career & Legacy”,keyword:“Legacy”,text:“ur public image and what the world sees u building. the legacy arc.”},
11:{name:“Community & Dreams”,keyword:“Squad”,text:“ur chosen family and future visions. the found family era.”},
12:{name:“Hidden Self”,keyword:“Secret Boss”,text:“the version of u nobody sees. the final boss that exists in silence.”},
};

const ARCHETYPES = {
Aries:{name:“Cardinal Crashout Pioneer”,emoji:“♈”,color:”#FF4500”,description:“Mars-ruled fire cardinal sigma who sees the group chat pop off and immediately locks in to mog the entire timeline. Zero beta hesitation — spawns every main quest, charges headfirst, turns every side quest into a server war because waiting is for NPCs.”,phrase:“I’m not waiting on the server, I’m the one spawning the plot fr fr.”,plotTwist:“Everyone thinks he’s just a reckless hothead yapper, but he becomes the most ride-or-die final boss protector once you’re in his inner circle.”},
Taurus:{name:“Fixed Glaze Emperor”,emoji:“♉”,color:”#98FF98”,description:“Venus-ruled earth fixed kingpin who glazes his comfort zone, his snacks, and his people with unbreakable stubbornness. Builds the ultimate 5-star bed rot empire one slow grind at a time.”,phrase:“This my bag, this my aura, this my vibe — don’t even try to Fanum tax it.”,plotTwist:“Looks like pure chill luxury glazer, but has the most explosive crashout when someone touches his security blanket.”},
Gemini:{name:“Mutable Yap Twin”,emoji:“♊”,color:”#A8D8EA”,description:“Mercury-ruled air mutable chaos gremlin who switches topics, aesthetics, and entire personalities faster than the algorithm refreshes. Collects lore from every corner and yaps it back in perfect timing.”,phrase:“Wait I’m in my other personality rn, give me two seconds to cook the next plotline.”,plotTwist:“Everyone calls him scattered and fake, but he’s lowkey the smartest strategist in the group chat when he locks in.”},
Cancer:{name:“Cardinal Shell Glazer”,emoji:“♋”,color:”#C0C0FF”,description:“Moon-ruled water cardinal protector who glazes his safe space and chosen family harder than anyone. Builds the emotional HQ, remembers every tiny vibe shift, will crash out on anyone who threatens the nest.”,phrase:“This is my crab bucket energy, stay in or get mogged out.”,plotTwist:“Looks like a soft delulu homebody, but has the most ruthless boundaries once you break his trust.”},
Leo:{name:“Fixed Drama Main Character”,emoji:“♌”,color:”#FFD700”,description:“Sun-ruled fire fixed superstar who turns every group hang into his personal main character moment. Glazes the spotlight, gives generous aura to his squad, and expects the same energy back.”,phrase:“The stage is mine today, bow down or get ratio’d.”,plotTwist:“Everyone thinks he’s just attention farming, but he’s the most loyal hype man who will go to war for his people.”},
Virgo:{name:“Mutable Yap Analyst”,emoji:“♍”,color:”#7FFFD4”,description:“Mercury-ruled earth mutable perfectionist who overthinks every detail and yaps the most helpful criticism you never asked for. Spots every glitch in the matrix and will edit your entire life if you let him.”,phrase:“I’m not hating, I’m just optimizing your aura real quick.”,plotTwist:“Looks like a neurotic yapper, but is secretly the most ride-or-die service king who will fix your whole life behind the scenes.”},
Libra:{name:“Cardinal Rizz Diplomat”,emoji:“♎”,color:”#FFB347”,description:“Venus-ruled air cardinal charmer who mogs every room by keeping the vibes balanced and aesthetic. Ultimate group glue, flipping between people-pleasing and lowkey controlling the entire social meta.”,phrase:“We’re all eating but only if the aura is evenly distributed, besties.”,plotTwist:“Seems like a people-pleasing pushover, but drops the most savage read when the harmony gets broken.”},
Scorpio:{name:“Fixed Shadow Mogger”,emoji:“♏”,color:”#9370DB”,description:“Pluto/Mars-ruled water fixed detective who glazes the deep lore and mogs everyone by knowing secrets before they drop. Transforms in silence and emerges with the most powerful aura shift.”,phrase:“I already read your search history, don’t play with me.”,plotTwist:“Everyone thinks he’s just mysterious and intense, but is the most ride-or-die once you pass his loyalty test.”},
Sagittarius:{name:“Mutable Adventure Sigma”,emoji:“♐”,color:”#FF8C00”,description:“Jupiter-ruled fire mutable explorer who turns every day into a main quest speedrun. Yaps philosophy at 3am, books the random flight, refuses to stay locked in one server.”,phrase:“I’m not lost, I’m just collecting new plotlines in another timezone.”,plotTwist:“Looks like a chaotic delulu traveler, but drops the most life-changing truth bombs when you least expect it.”},
Capricorn:{name:“Cardinal Grind Boss”,emoji:“♑”,color:”#DEB887”,description:“Saturn-ruled earth cardinal CEO who locks in on the long-term bag while everyone else is bed rotting. Mogs the timeline through pure discipline, builds the empire brick by brick.”,phrase:“I don’t chase clout, I build the whole server from the ground up.”,plotTwist:“Seems like a cold ruthless boss, but has the softest heart once you prove you can keep up with his level.”},
Aquarius:{name:“Fixed Rebel Innovator”,emoji:“♒”,color:”#4169E1”,description:“Uranus/Saturn-ruled air fixed futurist who glazes the weirdest ideas and mogs the normies by inventing the next meta before it trends. Runs the group chat like a secret society.”,phrase:“I’m not weird, the rest of the timeline is just outdated.”,plotTwist:“Everyone calls him emotionally unavailable, but he’s the most loyal humanitarian once you’re in his chosen rebellion.”},
Pisces:{name:“Mutable Dream Delulu”,emoji:“♓”,color:”#818cf8”,description:“Neptune/Jupiter-ruled water mutable empath who floats through every vibe, absorbs everyone’s energy, and turns the whole world into a personal cinematic universe.”,phrase:“I’m not crying, I’m just downloading the collective unconscious in 4K.”,plotTwist:“Looks like a spacey delulu dreamer, but sees through every illusion and can read your soul in one glance.”},
};

const BRAINROT = {
Sun:{Aries:“bestie ur sun said FIRST PLACE OR NOTHING. u speedrun life like it’s a game and honestly ur built different. main character energy but make it aggressive.”,Taurus:“ur sun is literally eating its way through the zodiac and refusing to move. u want the bag AND the vibe AND the snacks. stubborn king behavior.”,Gemini:“two personalities one body and neither of them are answering texts. ur brain has 47 tabs open and somehow u slay every single one.”,Cancer:“ur sun said choose violence AND cry about it. emotional lore character but make it iconic. u remember everything and forgive nothing.”,Leo:“bestie the sun literally rules ur sign so ur just built to eat. main character said YES and the universe agreed.”,Virgo:“ur sun sat down and made a 47 point critique of existence and was RIGHT about all of it. chaotic perfectionist behavior.”,Libra:“can’t make a single decision but somehow always looks iconic doing it. ur sun said aesthetic above all else.”,Scorpio:“ur sun said pick violence, heal from it, transform, repeat. u know everyone’s secrets and carry them like achievements.”,Sagittarius:“ur sun said touch grass but make it philosophical. u will say something wildly profound and immediately leave.”,Capricorn:“born with the mindset of a 45 year old CEO at age 7. ur sun is literally just grinding. the bag is ur love language.”,Aquarius:“ur sun said be different and then was TOO different. u genuinely don’t care what anyone thinks but also invented what everyone cares about.”,Pisces:“ur sun said dissolve into the universe and vibe. u feel everything at once and somehow that’s ur power.”},
Moon:{Aries:“ur emotional support is just rage and then moving on immediately. u feel things at 100mph and process nothing.”,Taurus:“ur moon said comfort or die. emotional stability requires snacks, soft blankets, and no sudden changes.”,Gemini:“ur feelings change every 20 minutes and that’s not a flaw that’s a feature. ur inner world has its own podcast.”,Cancer:“moon in its home sign bestie. u feel EVERYTHING and absorb everyone else’s feelings too.”,Leo:“ur emotions need an audience or they didn’t happen. u feel things dramatically and that’s giving main character behavior.”,Virgo:“u anxiety spiral as a love language. ur moon said worry about everything and fix it meticulously.”,Libra:“ur emotional needs require aesthetic harmony or u literally cannot function. conflict makes ur moon cry.”,Scorpio:“ur emotions live in a locked vault guarded by 3 versions of yourself. u feel at a depth that’s genuinely unhinged.”,Sagittarius:“ur feelings said touch grass and philosophize. u process emotions by running away and calling it growth.”,Capricorn:“u suppress ur feelings so hard they come out as achievements. emotional unavailability speedrun any%.”,Aquarius:“ur moon said be detached but care deeply from a distance. ur emotional support is sending memes.”,Pisces:“ur moon is literally dissolved in the cosmic ocean bestie. u absorb vibes like a sponge and cry at commercials.”},
Rising:{Aries:“u walk into rooms like u own them before checking if u do. the audacity is ur first impression and it WORKS.”,Taurus:“ur vibe says luxury even when ur broke. people instantly trust u and wanna feed u.”,Gemini:“u talk to everyone and somehow everyone thinks ur their best friend. social butterfly behavior at a molecular level.”,Cancer:“ur face has never successfully hidden an emotion in ur entire life. people immediately wanna protect u.”,Leo:“u entered the chat and the chat noticed. ur presence is literally a whole event.”,Virgo:“u look put together even when ur falling apart. the competence aesthetic is ur whole brand.”,Libra:“ur rising said be attractive and diplomatic and it delivered.”,Scorpio:“ur resting face said don’t test me and people genuinely don’t. the mystique is ur superpower.”,Sagittarius:“u look like u just came back from somewhere amazing and ur about to leave for somewhere better.”,Capricorn:“u looked 35 at age 12 and will look 35 forever. the authority vibe was installed at birth.”,Aquarius:“ur vibe is unclassifiable and that’s exactly the brand. alien energy but make it iconic.”,Pisces:“u have dreamy eyes that make people tell u their whole life story within 10 minutes.”},
Mercury:{Aries:“ur brain said ANSWER FIRST THINK NEVER. the impulsive texting is ur Mercury’s whole brand.”,Taurus:“u take 3 business days to respond but ur answer is always RIGHT.”,Gemini:“ur Mercury is home and it said talk about EVERYTHING. ur brain is 47 podcasts playing simultaneously.”,Cancer:“u communicate through vibes and feelings and somehow people always understand.”,Leo:“u storytell everything including ur grocery list. the dramatic delivery is nonnegotiable.”,Virgo:“ur Mercury said facts only and it meant it. u will correct someone’s grammar in a crisis and be RIGHT.”,Libra:“u see every side of every argument so hard u can’t pick one.”,Scorpio:“ur Mercury said gather information and reveal nothing. u know everything about everyone.”,Sagittarius:“ur mouth said the unfiltered truth before ur brain could stop it.”,Capricorn:“u communicate like ur in a board meeting at all times.”,Aquarius:“ur brain makes connections nobody else sees. galaxy brain Mercury behavior.”,Pisces:“ur Mercury communicates in vibes, metaphors, and dreams. somehow it works.”},
Venus:{Aries:“ur Venus said chase or be chased. u fall fast and want to WIN at love.”,Taurus:“ur love language is physical touch and quality snacks. u give the most loyal and luxurious love.”,Gemini:“ur Venus needs intellectual stimulation or it gets bored in 4 days.”,Cancer:“ur Venus said nurture everyone and protect them with ur whole chest.”,Leo:“ur Venus wants to be SEEN and adored and that’s not needy that’s just ur love language.”,Virgo:“ur Venus shows love through acts of service and constructive criticism.”,Libra:“ur Venus is home and said BE THE ROMANTIC IDEAL. u make love look like art.”,Scorpio:“ur Venus said all or nothing and meant it. u love at a depth that’s genuinely terrifying and beautiful.”,Sagittarius:“ur Venus needs freedom and adventure or it will leave.”,Capricorn:“ur Venus said build something real or don’t bother.”,Aquarius:“ur Venus said unconventional love only. u need mental connection before physical.”,Pisces:“ur Venus said dissolve into love completely. the romantic idealism is delulu but it manifests.”},
Mars:{Aries:“ur Mars is home and it said GO. pure action energy. u don’t plan u just move.”,Taurus:“ur Mars is slow to start but CANNOT be stopped once moving.”,Gemini:“ur energy goes 47 directions and somehow gets things done.”,Cancer:“ur Mars protects everyone it loves with unhinged ferocity.”,Leo:“ur drive is fueled by being witnessed. u work hardest when someone’s watching.”,Virgo:“ur Mars said perfect execution or don’t bother.”,Libra:“ur Mars in detriment said fight but make it diplomatic. u avoid conflict so hard u create it.”,Scorpio:“ur Mars said strategic power moves only. u don’t fight loud u fight smart.”,Sagittarius:“ur energy is boundless when ur inspired and nonexistent when ur not.”,Capricorn:“ur Mars said grind until the grind becomes ur identity.”,Aquarius:“ur drive is fueled by rebellion and revolution.”,Pisces:“ur Mars acts on intuition and vibes and somehow always hits.”},
Jupiter:{Aries:“ur luck expands through boldness. the more audacious ur move the bigger the blessing.”,Taurus:“ur abundance comes through patience and building.”,Gemini:“ur luck expands through knowledge and connections.”,Cancer:“ur blessings come through nurturing and emotional intelligence.”,Leo:“ur abundance arrives when ur fully expressed.”,Virgo:“ur luck comes through mastery and service.”,Libra:“ur blessings come through partnership and fairness.”,Scorpio:“ur luck expands through transformation and depth.”,Sagittarius:“Jupiter is HOME here. ur literally blessed by default bestie.”,Capricorn:“ur abundance comes through discipline and structure.”,Aquarius:“ur blessings come through innovation and community.”,Pisces:“ur luck comes through faith and surrender.”},
Saturn:{Aries:“Saturn said slow down the impulses and build discipline.”,Taurus:“Saturn said earn ur stability through patience.”,Gemini:“Saturn said focus ur scattered mind. depth over breadth.”,Cancer:“Saturn said emotional security is earned not given.”,Leo:“Saturn said ur self worth is not dependent on recognition.”,Virgo:“Saturn said perfection is the enemy of done.”,Libra:“Saturn said ur relationships need structure and boundaries.”,Scorpio:“Saturn said face ur shadows or they will face u.”,Sagittarius:“Saturn said ur beliefs need grounding in reality.”,Capricorn:“Saturn is HOME and said the grind IS the reward.”,Aquarius:“Saturn said ur revolutionary ideas need practical structure.”,Pisces:“Saturn said ur dreams need boundaries to manifest.”},
};

const COMPAT_TIERS = {
“🔥”: { label: “God-Tier Aura Match”, color: “#FF6B35”, bg: “#FF6B3522”, desc: “instant lock-in, same server energy” },
“🚀”: { label: “Main Quest Duo”,      color: “#00D4FF”, bg: “#00D4FF22”, desc: “growth + hype, level up together” },
“🟡”: { label: “Mid Compatibility”,   color: “#FFD700”, bg: “#FFD70022”, desc: “works but someone’s gotta lock in harder” },
“💥”: { label: “Crashout Warning”,    color: “#FF4444”, bg: “#FF444422”, desc: “fun until the plot twist hits” },
};

const COMPAT = {
Aries:      { Aries:“🔥”,Taurus:“💥”,Gemini:“🚀”,Cancer:“💥”,Leo:“🔥”,Virgo:“🟡”,Libra:“💥”,Scorpio:“🚀”,Sagittarius:“🔥”,Capricorn:“💥”,Aquarius:“🚀”,Pisces:“🟡” },
Taurus:     { Aries:“💥”,Taurus:“🔥”,Gemini:“🟡”,Cancer:“🔥”,Leo:“💥”,Virgo:“🔥”,Libra:“🚀”,Scorpio:“🚀”,Sagittarius:“🟡”,Capricorn:“🔥”,Aquarius:“💥”,Pisces:“🔥” },
Gemini:     { Aries:“🚀”,Taurus:“🟡”,Gemini:“🔥”,Cancer:“💥”,Leo:“🚀”,Virgo:“💥”,Libra:“🔥”,Scorpio:“🟡”,Sagittarius:“🚀”,Capricorn:“💥”,Aquarius:“🔥”,Pisces:“🚀” },
Cancer:     { Aries:“💥”,Taurus:“🔥”,Gemini:“💥”,Cancer:“🔥”,Leo:“🟡”,Virgo:“🚀”,Libra:“💥”,Scorpio:“🔥”,Sagittarius:“💥”,Capricorn:“🚀”,Aquarius:“🟡”,Pisces:“🔥” },
Leo:        { Aries:“🔥”,Taurus:“💥”,Gemini:“🚀”,Cancer:“🟡”,Leo:“🔥”,Virgo:“💥”,Libra:“🔥”,Scorpio:“🚀”,Sagittarius:“🔥”,Capricorn:“🟡”,Aquarius:“💥”,Pisces:“🚀” },
Virgo:      { Aries:“🟡”,Taurus:“🔥”,Gemini:“💥”,Cancer:“🚀”,Leo:“💥”,Virgo:“🔥”,Libra:“🚀”,Scorpio:“🔥”,Sagittarius:“💥”,Capricorn:“🔥”,Aquarius:“🟡”,Pisces:“🚀” },
Libra:      { Aries:“💥”,Taurus:“🚀”,Gemini:“🔥”,Cancer:“💥”,Leo:“🔥”,Virgo:“🚀”,Libra:“🔥”,Scorpio:“🟡”,Sagittarius:“🚀”,Capricorn:“💥”,Aquarius:“🔥”,Pisces:“🚀” },
Scorpio:    { Aries:“🚀”,Taurus:“🚀”,Gemini:“🟡”,Cancer:“🔥”,Leo:“🚀”,Virgo:“🔥”,Libra:“🟡”,Scorpio:“🔥”,Sagittarius:“💥”,Capricorn:“🚀”,Aquarius:“💥”,Pisces:“🔥” },
Sagittarius:{ Aries:“🔥”,Taurus:“🟡”,Gemini:“🚀”,Cancer:“💥”,Leo:“🔥”,Virgo:“💥”,Libra:“🚀”,Scorpio:“💥”,Sagittarius:“🔥”,Capricorn:“🟡”,Aquarius:“🔥”,Pisces:“🚀” },
Capricorn:  { Aries:“💥”,Taurus:“🔥”,Gemini:“💥”,Cancer:“🚀”,Leo:“🟡”,Virgo:“🔥”,Libra:“💥”,Scorpio:“🚀”,Sagittarius:“🟡”,Capricorn:“🔥”,Aquarius:“🚀”,Pisces:“🟡” },
Aquarius:   { Aries:“🚀”,Taurus:“💥”,Gemini:“🔥”,Cancer:“🟡”,Leo:“💥”,Virgo:“🟡”,Libra:“🔥”,Scorpio:“💥”,Sagittarius:“🔥”,Capricorn:“🚀”,Aquarius:“🔥”,Pisces:“🚀” },
Pisces:     { Aries:“🟡”,Taurus:“🔥”,Gemini:“🚀”,Cancer:“🔥”,Leo:“🚀”,Virgo:“🚀”,Libra:“🚀”,Scorpio:“🔥”,Sagittarius:“🚀”,Capricorn:“🟡”,Aquarius:“🚀”,Pisces:“🔥” },
};

const COMPAT_DESCRIPTIONS = {
“Aries-Taurus”:       “Fixed Glaze Emperor’s slow grind vs ur instant spawn = instant server lag.”,
“Aries-Gemini”:       “Mutable Yap Twin keeps pace and adds chaotic lore to every side quest.”,
“Aries-Cancer”:       “Cardinal Shell Glazer’s emotional HQ vs ur direct charge = crashout city.”,
“Aries-Leo”:          “Fixed Drama Main Character matches ur fire for ultimate main-character duos.”,
“Aries-Virgo”:        “Mutable Yap Analyst optimizes ur quests but may overthink ur speed.”,
“Aries-Libra”:        “Cardinal Rizz Diplomat wants balance while u want immediate action.”,
“Aries-Scorpio”:      “Fixed Shadow Mogger respects ur intensity once trust is locked in.”,
“Aries-Sagittarius”:  “Mutable Adventure Sigma joins ur quests in another timezone fr.”,
“Aries-Capricorn”:    “Cardinal Grind Boss’s long-term empire vs ur ‘now’ energy.”,
“Aries-Aquarius”:     “Fixed Rebel Innovator brings futuristic rizz to ur adventures.”,
“Aries-Pisces”:       “Mutable Dream Delulu floats along but may get lost in ur fast pace.”,
“Taurus-Gemini”:      “Mutable Yap Twin brings chaos to ur stable vibe.”,
“Taurus-Cancer”:      “Cardinal Shell Glazer glazes the same emotional HQ energy.”,
“Taurus-Leo”:         “Fixed Drama Main Character wants spotlight while u want snacks in peace.”,
“Taurus-Virgo”:       “Mutable Yap Analyst optimizes ur bag like no one else.”,
“Taurus-Libra”:       “Cardinal Rizz Diplomat keeps the aesthetic balanced for ur luxury.”,
“Taurus-Scorpio”:     “Fixed Shadow Mogger matches ur depth and loyalty grind.”,
“Taurus-Sagittarius”: “Mutable Adventure Sigma wants to roam while u stay locked.”,
“Taurus-Capricorn”:   “Cardinal Grind Boss builds empires at ur slow-and-steady pace.”,
“Taurus-Aquarius”:    “Fixed Rebel Innovator’s weird ideas vs ur traditional bag.”,
“Taurus-Pisces”:      “Mutable Dream Delulu floats into ur cozy security blanket.”,
“Gemini-Cancer”:      “Cardinal Shell Glazer’s feelings vs ur surface-level yapping.”,
“Gemini-Leo”:         “Fixed Drama Main Character gives u the spotlight u love to narrate.”,
“Gemini-Virgo”:       “Mutable Yap Analyst over-edits ur chaos.”,
“Gemini-Libra”:       “Cardinal Rizz Diplomat keeps the social meta balanced for ur brain.”,
“Gemini-Scorpio”:     “Fixed Shadow Mogger’s deep lore vs ur quick-switch energy.”,
“Gemini-Sagittarius”: “Mutable Adventure Sigma matches ur philosophical 3am yaps.”,
“Gemini-Capricorn”:   “Cardinal Grind Boss wants structure while u want options.”,
“Gemini-Aquarius”:    “Fixed Rebel Innovator invents the next meta u instantly vibe with.”,
“Gemini-Pisces”:      “Mutable Dream Delulu absorbs ur endless ideas into cinematic universes.”,
“Cancer-Leo”:         “Fixed Drama Main Character brings drama to ur safe space.”,
“Cancer-Virgo”:       “Mutable Yap Analyst helps optimize ur nest without breaking it.”,
“Cancer-Libra”:       “Cardinal Rizz Diplomat’s people-pleasing vs ur boundaries.”,
“Cancer-Scorpio”:     “Fixed Shadow Mogger matches ur deep water loyalty.”,
“Cancer-Sagittarius”: “Mutable Adventure Sigma wants to roam while u want home base.”,
“Cancer-Capricorn”:   “Cardinal Grind Boss builds long-term security with u.”,
“Cancer-Aquarius”:    “Fixed Rebel Innovator’s detachment vs ur feelings.”,
“Cancer-Pisces”:      “Mutable Dream Delulu floats in the same emotional ocean.”,
“Leo-Virgo”:          “Mutable Yap Analyst critiques ur performance too hard.”,
“Leo-Libra”:          “Cardinal Rizz Diplomat keeps the audience balanced for ur show.”,
“Leo-Scorpio”:        “Fixed Shadow Mogger brings intense depth to ur drama.”,
“Leo-Sagittarius”:    “Mutable Adventure Sigma joins ur epic quests.”,
“Leo-Capricorn”:      “Cardinal Grind Boss respects ur grind but steals the CEO title.”,
“Leo-Aquarius”:       “Fixed Rebel Innovator steals the weird spotlight from u.”,
“Leo-Pisces”:         “Mutable Dream Delulu turns ur drama into pure cinema.”,
“Virgo-Libra”:        “Cardinal Rizz Diplomat balances ur critical aura.”,
“Virgo-Scorpio”:      “Fixed Shadow Mogger’s depth matches ur analytical grind.”,
“Virgo-Sagittarius”:  “Mutable Adventure Sigma’s big-picture vs ur micro-edits.”,
“Virgo-Capricorn”:    “Cardinal Grind Boss builds empires with ur precision.”,
“Virgo-Aquarius”:     “Fixed Rebel Innovator’s weird ideas vs ur practical fixes.”,
“Virgo-Pisces”:       “Mutable Dream Delulu’s fantasy gets grounded by ur service king energy.”,
“Libra-Scorpio”:      “Fixed Shadow Mogger’s intensity vs ur chill vibe.”,
“Libra-Sagittarius”:  “Mutable Adventure Sigma brings big energy to ur social game.”,
“Libra-Capricorn”:    “Cardinal Grind Boss’s seriousness vs ur diplomatic flow.”,
“Libra-Aquarius”:     “Fixed Rebel Innovator invents new social metas with u.”,
“Libra-Pisces”:       “Mutable Dream Delulu adds the dreamy aesthetic u love.”,
“Scorpio-Sagittarius”:“Mutable Adventure Sigma’s optimism vs ur underworld energy.”,
“Scorpio-Capricorn”:  “Cardinal Grind Boss’s discipline helps ur power moves.”,
“Scorpio-Aquarius”:   “Fixed Rebel Innovator’s detachment vs ur emotional control.”,
“Scorpio-Pisces”:     “Mutable Dream Delulu merges into ur deep water vibes.”,
“Sagittarius-Capricorn”:“Cardinal Grind Boss’s structure vs ur no-rules vibe.”,
“Sagittarius-Aquarius”:“Fixed Rebel Innovator invents new quests with u.”,
“Sagittarius-Pisces”: “Mutable Dream Delulu turns ur adventures into pure fantasy.”,
“Capricorn-Aquarius”: “Fixed Rebel Innovator’s future vision fuels ur legacy.”,
“Capricorn-Pisces”:   “Mutable Dream Delulu’s softness vs ur disciplined aura.”,
“Aquarius-Pisces”:    “Mutable Dream Delulu merges fantasy with ur futuristic rizz.”,
};

const getCompatKey = (a, b) => {
const idx = (s) => SIGNS.indexOf(s);
return idx(a) < idx(b) ? `${a}-${b}` : `${b}-${a}`;
};

const MOCK_CHART = {
planets:{Sun:{sign:“Scorpio”,house:8,degree:15.3},Moon:{sign:“Pisces”,house:12,degree:7.8},Mercury:{sign:“Scorpio”,house:8,degree:22.1},Venus:{sign:“Libra”,house:7,degree:3.4},Mars:{sign:“Aries”,house:1,degree:28.9},Jupiter:{sign:“Sagittarius”,house:9,degree:11.2},Saturn:{sign:“Capricorn”,house:10,degree:19.7},Uranus:{sign:“Aquarius”,house:11,degree:5.6},Neptune:{sign:“Pisces”,house:12,degree:14.3},Pluto:{sign:“Scorpio”,house:8,degree:25.1}},
ascendant:{sign:“Aries”,degree:14.2},
};

const POPULAR_CITIES = [
“New York, NY, USA”,“Los Angeles, CA, USA”,“Chicago, IL, USA”,“Houston, TX, USA”,“Phoenix, AZ, USA”,
“Philadelphia, PA, USA”,“San Antonio, TX, USA”,“San Diego, CA, USA”,“Dallas, TX, USA”,“San Jose, CA, USA”,
“Austin, TX, USA”,“Jacksonville, FL, USA”,“Miami, FL, USA”,“Atlanta, GA, USA”,“Seattle, WA, USA”,
“Denver, CO, USA”,“Nashville, TN, USA”,“Portland, OR, USA”,“Las Vegas, NV, USA”,“Boston, MA, USA”,
“Detroit, MI, USA”,“Baltimore, MD, USA”,“Washington, DC, USA”,“Minneapolis, MN, USA”,“Charlotte, NC, USA”,
“San Francisco, CA, USA”,“Indianapolis, IN, USA”,“Columbus, OH, USA”,“Memphis, TN, USA”,“Louisville, KY, USA”,
“London, England, UK”,“Manchester, England, UK”,“Birmingham, England, UK”,“Glasgow, Scotland, UK”,
“Paris, France”,“Lyon, France”,“Marseille, France”,“Berlin, Germany”,“Munich, Germany”,“Hamburg, Germany”,
“Madrid, Spain”,“Barcelona, Spain”,“Rome, Italy”,“Milan, Italy”,“Amsterdam, Netherlands”,
“Toronto, Ontario, Canada”,“Vancouver, BC, Canada”,“Montreal, Quebec, Canada”,“Calgary, Alberta, Canada”,
“Sydney, NSW, Australia”,“Melbourne, VIC, Australia”,“Brisbane, QLD, Australia”,“Perth, WA, Australia”,
“Tokyo, Japan”,“Osaka, Japan”,“Seoul, South Korea”,“Beijing, China”,“Shanghai, China”,“Shenzhen, China”,
“Mumbai, India”,“Delhi, India”,“Bangalore, India”,“Chennai, India”,“Hyderabad, India”,
“São Paulo, Brazil”,“Rio de Janeiro, Brazil”,“Buenos Aires, Argentina”,“Mexico City, Mexico”,
“Cairo, Egypt”,“Lagos, Nigeria”,“Johannesburg, South Africa”,“Nairobi, Kenya”,
“Dubai, UAE”,“Abu Dhabi, UAE”,“Singapore”,“Bangkok, Thailand”,“Jakarta, Indonesia”,
“Manila, Philippines”,“Karachi, Pakistan”,“Lahore, Pakistan”,“Istanbul, Turkey”,“Ankara, Turkey”,
“Moscow, Russia”,“Saint Petersburg, Russia”,“Kyiv, Ukraine”,“Warsaw, Poland”,“Prague, Czech Republic”,
];

// ── City Autocomplete ─────────────────────────────────────────────────────────
const CityInput = ({ value, onChange }) => {
const [open, setOpen] = useState(false);
const [suggestions, setSuggestions] = useState([]);
const ref = useRef(null);

const handleChange = (val) => {
onChange(val);
if (val.length < 2) { setSuggestions([]); setOpen(false); return; }
const q = val.toLowerCase();
const matches = POPULAR_CITIES.filter(c => c.toLowerCase().includes(q)).slice(0, 7);
setSuggestions(matches);
setOpen(matches.length > 0);
};

return (
<div ref={ref} style={{ position: “relative” }}>
<input
type=“text”
value={value}
onChange={e => handleChange(e.target.value)}
onFocus={() => { if (suggestions.length) setOpen(true); }}
onBlur={() => setTimeout(() => setOpen(false), 160)}
placeholder=“e.g. Los Angeles, CA, USA”
style={{ width:“100%”, padding:“13px 14px”, borderRadius:10, background:”#0d0618”, border:“1px solid #8B5CF655”, color:“white”, fontSize:14, fontFamily:“inherit” }}
/>
{open && suggestions.length > 0 && (
<div style={{ position:“absolute”, top:“calc(100% + 4px)”, left:0, right:0, background:”#120820”, border:“1px solid #8B5CF644”, borderRadius:10, overflow:“hidden”, zIndex:200, boxShadow:“0 8px 32px #00000099” }}>
{suggestions.map((s,i) => (
<div key={i} onMouseDown={() => { onChange(s); setOpen(false); }}
style={{ padding:“11px 14px”, cursor:“pointer”, fontSize:13, color:”#ffffffcc”, borderBottom: i < suggestions.length-1 ? “1px solid #ffffff08” : “none”, transition:“background 0.1s” }}
onMouseEnter={e => e.currentTarget.style.background=”#8B5CF622”}
onMouseLeave={e => e.currentTarget.style.background=“transparent”}
>📍 {s}</div>
))}
<div style={{ padding:“8px 14px 10px”, color:”#ffffff33”, fontSize:11 }}>Not listed? Type: City, State, Country</div>
</div>
)}
</div>
);
};

// ── Stable Stars (rendered once, never re-renders) ────────────────────────────
const STAR_DATA = Array.from({length:100},(_,i) => ({
id:i, x:Math.random()*100, y:Math.random()*100,
size:Math.random()*1.8+0.4, opacity:Math.random()*0.6+0.2,
dur:Math.random()*4+2,
}));

const Stars = () => (

  <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0 }}>
    {STAR_DATA.map(s => (
      <div key={s.id} style={{ position:"absolute", left:`${s.x}%`, top:`${s.y}%`, width:s.size, height:s.size, borderRadius:"50%", background:"white", opacity:s.opacity, animation:`twinkle ${s.dur}s ease-in-out infinite` }} />
    ))}
  </div>
);

// ── Planet Image ──────────────────────────────────────────────────────────────
const PlanetImg = ({ planet, size=44 }) => {
const [err, setErr] = useState(false);
const info = PLANETS[planet];
return (
<div style={{ width:size, height:size, borderRadius:“50%”, overflow:“hidden”, flexShrink:0, border:`2px solid ${info.color}99`, boxShadow:`0 0 10px ${info.glow},0 0 20px ${info.glow}` }}>
{!err
? <img src={PLANET_IMAGES[planet]} alt={planet} onError={()=>setErr(true)} style={{width:“100%”,height:“100%”,objectFit:“cover”}} />
: <div style={{width:“100%”,height:“100%”,background:`radial-gradient(circle,${info.color}44,${info.color}11)`,display:“flex”,alignItems:“center”,justifyContent:“center”,fontSize:size*0.45,color:info.color}}>{info.symbol}</div>
}
</div>
);
};

// ── Chart Wheel ───────────────────────────────────────────────────────────────
const ChartWheel = ({ chart, onSelect, selected }) => {
const sz=270, cx=135, cy=135, oR=118, iR=80, pR=99;
const ang = d => ((d-90)*Math.PI)/180;
return (
<div style={{display:“flex”,justifyContent:“center”,padding:“8px 0 14px”}}>
<svg width={sz} height={sz} style={{filter:“drop-shadow(0 0 20px #8B5CF633)”}}>
<defs>
<radialGradient id="wbg" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#1a0a2e"/><stop offset="100%" stopColor="#0a0618"/></radialGradient>
{Object.entries(PLANETS).map(([n,i]) => (
<radialGradient key={n} id={`pg-${n}`} cx=“50%” cy=“50%” r=“50%”><stop offset="0%" stopColor={i.color} stopOpacity="0.95"/><stop offset="100%" stopColor={i.color} stopOpacity="0.2"/></radialGradient>
))}
</defs>
<circle cx={cx} cy={cy} r={oR} fill="url(#wbg)" stroke="#8B5CF633" strokeWidth="1"/>
<circle cx={cx} cy={cy} r={iR} fill="none" stroke="#8B5CF622" strokeWidth="1"/>
<circle cx={cx} cy={cy} r={46} fill="#0a061888" stroke="#8B5CF611" strokeWidth="1"/>
{Array.from({length:12},(_,i) => {
const a=ang(i*30), x1=cx+iR*Math.cos(a), y1=cy+iR*Math.sin(a), x2=cx+oR*Math.cos(a), y2=cy+oR*Math.sin(a);
const ma=ang(i*30+15), lx=cx+99*Math.cos(ma), ly=cy+99*Math.sin(ma);
return <g key={i}><line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#8B5CF544" strokeWidth="1"/><text x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fill="#ffffff2a" fontSize="8" fontFamily="serif">{i+1}</text></g>;
})}
{Object.entries(chart.planets||{}).map(([name,data]) => {
if (!data?.sign) return null;
const si=SIGNS.indexOf(data.sign); if(si===-1) return null;
const a=ang(si*30+parseFloat(data.degree||0));
const px=cx+pR*Math.cos(a), py=cy+pR*Math.sin(a);
const info=PLANETS[name], isSel=selected===name;
return (
<g key={name} onClick={()=>onSelect(name)} style={{cursor:“pointer”}}>
<circle cx={px} cy={py} r={isSel?12:9} fill={`url(#pg-${name})`} stroke={isSel?info.color:info.color+“55”} strokeWidth={isSel?2:1} style={{filter:isSel?`drop-shadow(0 0 5px ${info.color})`:“none”,transition:“all 0.2s”}}/>
<text x={px} y={py} textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="serif">{info.symbol}</text>
</g>
);
})}
<text x={cx} y={cy-8} textAnchor="middle" fill="#8B5CF677" fontSize="10" fontFamily="serif" letterSpacing="3">✦ COSMIC</text>
<text x={cx} y={cy+8} textAnchor="middle" fill="#8B5CF677" fontSize="10" fontFamily="serif" letterSpacing="3">GLAZING ✦</text>
</svg>
</div>
);
};

// ── Planet Card ───────────────────────────────────────────────────────────────
const PlanetCard = ({ planet, data, onClick, isSelected }) => {
const info = PLANETS[planet];
const si = SIGN_INFO[data?.sign] || {};
const ec = ELEM_COLOR[si.element] || “#ffffff”;
return (
<div onClick={()=>onClick(planet)} style={{ background:isSelected?`linear-gradient(135deg,${info.color}1a,${info.color}0a)`:“linear-gradient(135deg,#ffffff08,#ffffff04)”, border:`1px solid ${isSelected?info.color+"77":"#ffffff12"}`, borderRadius:12, padding:“11px 14px”, cursor:“pointer”, transition:“all 0.2s”, display:“flex”, alignItems:“center”, gap:12, boxShadow:isSelected?`0 0 14px ${info.glow}`:“none” }}>
<PlanetImg planet={planet} size={38}/>
<div style={{flex:1,minWidth:0}}>
<div style={{color:info.color,fontWeight:700,fontSize:13}}>{info.symbol} {planet}</div>
<div style={{display:“flex”,gap:6,alignItems:“center”,marginTop:3,flexWrap:“wrap”}}>
<span style={{color:”#ffffffbb”,fontSize:12}}>{SIGN_EMOJIS[data?.sign]} {data?.sign}</span>
<span style={{color:”#ffffff33”,fontSize:11}}>·</span>
<span style={{color:”#ffffff77”,fontSize:11}}>House {data?.house}</span>
<span style={{color:”#ffffff33”,fontSize:11}}>·</span>
<span style={{background:ec+“22”,color:ec,fontSize:10,padding:“1px 7px”,borderRadius:8}}>{si.element}</span>
</div>
</div>
<div style={{color:”#ffffff33”,fontSize:10,textAlign:“right”}}>
<div>{parseFloat(data?.degree||0).toFixed(1)}°</div>
<div style={{color:”#ffffff22”,marginTop:2,fontSize:9}}>{si.modality}</div>
</div>
</div>
);
};

// ── Planet Detail (reading + interactions) ────────────────────────────────────
const PlanetDetail = ({ planet, data, allPlanets }) => {
const info = PLANETS[planet];
const si = SIGN_INFO[data?.sign] || {};
const ec = ELEM_COLOR[si.element] || “#ffffff”;
const reading = BRAINROT[planet]?.[data?.sign];
const house = HOUSE_INFO[data?.house];

const interactions = Object.entries(INTERACTIONS).filter(([key]) => {
const parts = key.split(”-”);
return parts.includes(planet) && parts.some(p => p !== planet && allPlanets?.[p]);
}).slice(0,3);

return (
<div style={{animation:“fadeIn 0.3s ease”,marginTop:10}}>
{/* Main card */}
<div style={{background:`linear-gradient(135deg,${info.color}18,${info.color}08)`,border:`1px solid ${info.color}44`,borderRadius:16,padding:18,marginBottom:10}}>
<div style={{display:“flex”,gap:12,alignItems:“flex-start”,marginBottom:14}}>
<PlanetImg planet={planet} size={54}/>
<div style={{flex:1}}>
<div style={{color:info.color,fontSize:18,fontWeight:800}}>{info.symbol} {planet}</div>
<div style={{display:“flex”,gap:5,flexWrap:“wrap”,marginTop:5}}>
<span style={{background:”#ffffff11”,color:”#ffffffbb”,fontSize:11,padding:“2px 8px”,borderRadius:8}}>{SIGN_EMOJIS[data?.sign]} {data?.sign}</span>
<span style={{background:”#ffffff11”,color:”#ffffff88”,fontSize:11,padding:“2px 8px”,borderRadius:8}}>House {data?.house}</span>
<span style={{background:ec+“22”,color:ec,fontSize:11,padding:“2px 8px”,borderRadius:8}}>{si.element}</span>
<span style={{background:”#ffffff0a”,color:”#ffffff55”,fontSize:11,padding:“2px 8px”,borderRadius:8}}>{si.modality}</span>
<span style={{background:”#ffffff0a”,color:”#ffffff44”,fontSize:11,padding:“2px 8px”,borderRadius:8}}>Ruled by {si.ruler}</span>
</div>
</div>
</div>
{/* Brainrot reading */}
<div style={{background:”#ffffff08”,borderRadius:10,padding:“10px 13px”,marginBottom:10}}>
<div style={{color:”#ffffff44”,fontSize:10,textTransform:“uppercase”,letterSpacing:2,marginBottom:4}}>🔮 cosmic glazing read</div>
<div style={{color:”#ffffffdd”,fontSize:13,lineHeight:1.65,fontStyle:“italic”}}>”{reading||“ur placement is giving unclassifiable energy and that’s the brand.”}”</div>
</div>
{/* House context */}
{house && (
<div style={{background:`${info.color}0f`,border:`1px solid ${info.color}22`,borderRadius:10,padding:“10px 13px”}}>
<div style={{color:”#ffffff44”,fontSize:10,textTransform:“uppercase”,letterSpacing:2,marginBottom:4}}>🏠 {house.name}</div>
<div style={{color:”#ffffffaa”,fontSize:12,lineHeight:1.6}}>
<span style={{color:info.color,fontWeight:700}}>{house.keyword}: </span>{house.text}
</div>
</div>
)}
</div>
{/* Interactions */}
{interactions.length > 0 && (
<div style={{background:”#ffffff06”,border:“1px solid #ffffff0e”,borderRadius:14,padding:14}}>
<div style={{color:”#ffffff33”,fontSize:10,textTransform:“uppercase”,letterSpacing:2,marginBottom:10}}>⚡ how {planet} interacts with ur chart</div>
<div style={{display:“flex”,flexDirection:“column”,gap:8}}>
{interactions.map(([key,val]) => {
const other = key.split(”-”).find(p=>p!==planet);
const oi = PLANETS[other];
return (
<div key={key} style={{background:”#ffffff08”,borderRadius:10,padding:“10px 12px”}}>
<div style={{display:“flex”,alignItems:“center”,gap:8,marginBottom:5}}>
<PlanetImg planet={other} size={20}/>
<span style={{color:oi?.color,fontSize:12,fontWeight:700}}>{planet} × {other}</span>
<span style={{background:”#ffffff11”,color:”#ffffff55”,fontSize:10,padding:“1px 7px”,borderRadius:8,marginLeft:“auto”}}>{val.type}</span>
</div>
<div style={{color:”#ffffff77”,fontSize:12,lineHeight:1.55}}>{val.text}</div>
</div>
);
})}
</div>
</div>
)}
</div>
);
};

// ── Archetype Card ────────────────────────────────────────────────────────────
const ArchetypeCard = ({ sign }) => {
const a = ARCHETYPES[sign]; if (!a) return null;
return (
<div style={{background:`linear-gradient(135deg,${a.color}18,${a.color}08)`,border:`1px solid ${a.color}55`,borderRadius:18,padding:20,position:“relative”,overflow:“hidden”,animation:“fadeIn 0.4s ease”}}>
<div style={{position:“absolute”,top:-20,right:-10,fontSize:90,opacity:0.05,pointerEvents:“none”}}>{a.emoji}</div>
<div style={{display:“flex”,gap:12,alignItems:“center”,marginBottom:14}}>
<div style={{width:48,height:48,borderRadius:“50%”,background:`radial-gradient(circle,${a.color}44,${a.color}11)`,border:`2px solid ${a.color}88`,display:“flex”,alignItems:“center”,justifyContent:“center”,fontSize:24,boxShadow:`0 0 14px ${a.color}44`,flexShrink:0}}>{a.emoji}</div>
<div>
<div style={{color:”#ffffff44”,fontSize:10,textTransform:“uppercase”,letterSpacing:3}}>ur cosmic archetype</div>
<div style={{color:a.color,fontSize:17,fontWeight:800,fontFamily:“serif”}}>{a.name}</div>
</div>
</div>
<div style={{color:”#ffffffbb”,fontSize:13,lineHeight:1.7,marginBottom:14}}>{a.description}</div>
<div style={{background:`${a.color}18`,border:`1px solid ${a.color}33`,borderRadius:10,padding:“10px 13px”,marginBottom:10}}>
<div style={{color:”#ffffff44”,fontSize:10,textTransform:“uppercase”,letterSpacing:2,marginBottom:4}}>💬 signature phrase</div>
<div style={{color:”#ffffffee”,fontSize:13,fontStyle:“italic”}}>”{a.phrase}”</div>
</div>
<div style={{background:”#ffffff08”,borderRadius:10,padding:“10px 13px”}}>
<div style={{color:”#ffffff44”,fontSize:10,textTransform:“uppercase”,letterSpacing:2,marginBottom:4}}>🌀 plot twist</div>
<div style={{color:”#ffffffcc”,fontSize:12,lineHeight:1.6}}>{a.plotTwist}</div>
</div>
</div>
);
};

// ── MAIN ──────────────────────────────────────────────────────────────────────
export default function CosmicGlazing() {
const [screen, setScreen] = useState(“intro”);
const [apiKey, setApiKey] = useState(””);
const [form, setForm] = useState({ name:””, year:””, month:””, day:””, hour:“12”, minute:“00”, city:”” });
const [chart, setChart] = useState(null);
const [selected, setSelected] = useState(“Sun”);
const [error, setError] = useState(””);
const [useMock, setUseMock] = useState(false);
const [tab, setTab] = useState(“archetype”);

const fetchChart = async () => {
setScreen(“loading”); setError(””);
if (useMock) { setTimeout(()=>{setChart(MOCK_CHART);setScreen(“chart”);},1800); return; }
try {
const res = await fetch(”/api/chart”,{

```
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({name:form.name||"User",year:parseInt(form.year),month:parseInt(form.month),day:parseInt(form.day),hour:parseInt(form.hour),minute:parseInt(form.minute),city:form.city}),
  });
  if(!res.ok) throw new Error();
  const data = await res.json();
  const planets = {};
  if(data.planets) data.planets.forEach(p=>{ if(PLANETS[p.name]) planets[p.name]={sign:p.sign||p.zodiac_sign,house:p.house||1,degree:parseFloat(p.degree||0).toFixed(1)}; });
  setChart({planets:Object.keys(planets).length?planets:MOCK_CHART.planets,ascendant:data.ascendant?{sign:data.ascendant.sign,degree:data.ascendant.degree}:MOCK_CHART.ascendant});
  setScreen("chart");
} catch {
  setError("Couldn't reach the cosmos rn 😔 Showing demo chart instead.");
  setChart(MOCK_CHART); setScreen("chart");
}
```

};

const formValid = form.year && form.month && form.day && form.city;
const IS = { width:“100%”,padding:“13px 14px”,borderRadius:10,background:”#0d0618”,border:“1px solid #8B5CF655”,color:“white”,fontSize:14,fontFamily:“inherit” };
const LS = { color:”#ffffff55”,fontSize:11,letterSpacing:2,textTransform:“uppercase”,marginBottom:6,display:“block” };

return (
<div style={{minHeight:“100vh”,background:“linear-gradient(160deg,#0d0618 0%,#0a0f1e 50%,#0d0618 100%)”,color:“white”,fontFamily:”‘Georgia’,serif”,position:“relative”,overflowX:“hidden”}}>
<style>{`@keyframes twinkle{0%,100%{opacity:0.15}50%{opacity:0.9}} @keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}} @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}} @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}} @keyframes pulse{0%,100%{opacity:0.5}50%{opacity:1}} *{box-sizing:border-box;} input::placeholder{color:#ffffff33;} input:focus{border-color:#8B5CF6!important;outline:none;} ::-webkit-scrollbar{width:4px;} ::-webkit-scrollbar-thumb{background:#8B5CF644;border-radius:4px;} input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{-webkit-appearance:none;}`}</style>

```
  <Stars />

  <div style={{position:"relative",zIndex:1,maxWidth:420,margin:"0 auto",padding:"0 16px 48px"}}>

    {/* HEADER */}
    <div style={{textAlign:"center",padding:"36px 0 20px"}}>
      <div style={{fontSize:10,letterSpacing:7,color:"#8B5CF6aa",textTransform:"uppercase",marginBottom:10,animation:"pulse 3s ease-in-out infinite"}}>✦ the universe has receipts ✦</div>
      <div style={{fontSize:38,fontWeight:900,letterSpacing:-1,lineHeight:1,marginBottom:6,background:"linear-gradient(135deg,#fff 0%,#c084fc 50%,#818cf8 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Cosmic Glazing</div>
      <div style={{color:"#ffffff44",fontSize:13,letterSpacing:1}}>ur chart said what it said bestie</div>
    </div>

    {/* ── INTRO ── */}
    {screen === "intro" && (
      <div style={{animation:"fadeIn 0.5s ease"}}>
        <div style={{display:"flex",justifyContent:"center",gap:10,marginBottom:28}}>
          {["Sun","Moon","Venus","Mars","Jupiter","Saturn"].map((p,i)=>(
            <div key={p} style={{animation:`float ${2.2+i*0.15}s ease-in-out infinite`,animationDelay:`${i*0.12}s`}}>
              <PlanetImg planet={p} size={40}/>
            </div>
          ))}
        </div>
        <div style={{display:"flex",flexWrap:"wrap",gap:8,justifyContent:"center",marginBottom:28}}>
          {["🪐 Full Natal Chart","🏠 All 12 Houses","⚡ Planet Interactions","🎭 Brainrot Archetypes"].map(f=>(
            <div key={f} style={{background:"#ffffff0a",border:"1px solid #ffffff15",borderRadius:20,padding:"6px 14px",fontSize:12,color:"#ffffffaa"}}>{f}</div>
          ))}
        </div>
        <div style={{textAlign:"center",color:"#ffffff55",fontSize:14,lineHeight:1.9,marginBottom:32}}>
          Real tropical astrology.<br/>
          <span style={{color:"#c084fc"}}>Unhinged brainrot delivery.</span><br/>
          <span style={{color:"#818cf8"}}>Accurate enough to hurt.</span>
        </div>
        <button onClick={()=>setScreen("form")} style={{width:"100%",padding:"17px",borderRadius:14,border:"1px solid #8B5CF688",background:"linear-gradient(135deg,#8B5CF622,#6366f115)",color:"white",fontSize:16,fontWeight:700,cursor:"pointer",letterSpacing:1,fontFamily:"serif",boxShadow:"0 0 28px #8B5CF622"}}>
          ✦ read my chart ✦
        </button>
        <div onClick={()=>{setUseMock(true);setScreen("form");}} style={{textAlign:"center",marginTop:14,color:"#ffffff33",fontSize:12,cursor:"pointer",textDecoration:"underline"}}>no api key? try demo chart</div>
      </div>
    )}

    {/* ── API KEY ── */}
    {screen === "apikey" && (
      <div style={{animation:"fadeIn 0.4s ease"}}>
        <div style={{background:"#ffffff06",border:"1px solid #8B5CF622",borderRadius:14,padding:18,marginBottom:20}}>
          <div style={{color:"#c084fc",fontSize:13,fontWeight:700,marginBottom:6}}>🔑 ur key stays local</div>
          <div style={{color:"#ffffff55",fontSize:12,lineHeight:1.65}}>Sent directly to freeastroapi.com for chart calculation only — never stored anywhere else. Get ur free key at <span style={{color:"#8B5CF6"}}>freeastroapi.com</span> (80 free charts/day, no credit card).</div>
        </div>
        <label style={LS}>freeastroapi key</label>
        <input type="password" placeholder="paste ur api key here..." value={apiKey} onChange={e=>setApiKey(e.target.value)} style={{...IS,fontFamily:"monospace",marginBottom:14}}/>
        <button onClick={()=>setScreen("form")} disabled={!apiKey} style={{width:"100%",padding:"14px",borderRadius:12,border:"none",background:apiKey?"linear-gradient(135deg,#8B5CF6,#6366f1)":"#ffffff0f",color:"white",fontSize:15,fontWeight:700,cursor:apiKey?"pointer":"not-allowed",fontFamily:"serif"}}>continue →</button>
        <div onClick={()=>{setUseMock(true);setScreen("form");}} style={{textAlign:"center",marginTop:12,color:"#ffffff33",fontSize:12,cursor:"pointer",textDecoration:"underline"}}>skip — use demo chart</div>
      </div>
    )}

    {/* ── BIRTH FORM ── */}
    {screen === "form" && (
      <div style={{animation:"fadeIn 0.4s ease"}}>
        {/* Tip box */}
        <div style={{background:"#ffffff06",border:"1px solid #8B5CF622",borderRadius:14,padding:"14px 16px",marginBottom:22}}>
          <div style={{color:"#c084fc",fontSize:13,fontWeight:700,marginBottom:8}}>📋 how to fill this in</div>
          <div style={{color:"#ffffff66",fontSize:12,lineHeight:1.8}}>
            <b style={{color:"#ffffffaa"}}>Birth time</b> — use the exact time from ur birth certificate. Even 15 min off can change ur Rising sign and house placements.<br/>
            <b style={{color:"#ffffffaa"}}>Birth city</b> — start typing and pick from the dropdown. The cosmos needs ur exact birthplace for house calculations.<br/>
            <b style={{color:"#ffffffaa"}}>No birth time?</b> — use 12:00. Sun, Moon, and planet signs will still be accurate.
          </div>
        </div>

        {/* Name */}
        <label style={LS}>ur name <span style={{color:"#ffffff22"}}>(optional)</span></label>
        <input type="text" placeholder="what do the stars call u" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} style={{...IS,marginBottom:18}}/>

        {/* Date */}
        <label style={LS}>birth date</label>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1.3fr",gap:8,marginBottom:18}}>
          {[{k:"month",label:"Month",hint:"1 – 12"},{k:"day",label:"Day",hint:"1 – 31"},{k:"year",label:"Year",hint:"e.g. 1998"}].map(f=>(
            <div key={f.k}>
              <div style={{color:"#ffffff33",fontSize:10,textAlign:"center",marginBottom:4}}>{f.label}</div>
              <input type="number" placeholder={f.hint} value={form[f.k]} onChange={e=>setForm(ff=>({...ff,[f.k]:e.target.value}))} style={{...IS,textAlign:"center",padding:"13px 8px"}}/>
            </div>
          ))}
        </div>

        {/* Time */}
        <label style={LS}>birth time <span style={{color:"#ffffff22"}}>(24-hour)</span></label>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:6}}>
          <div>
            <div style={{color:"#ffffff33",fontSize:10,textAlign:"center",marginBottom:4}}>Hour (0 – 23)</div>
            <input type="number" placeholder="e.g. 14" min="0" max="23" value={form.hour} onChange={e=>setForm(f=>({...f,hour:e.target.value}))} style={{...IS,textAlign:"center"}}/>
          </div>
          <div>
            <div style={{color:"#ffffff33",fontSize:10,textAlign:"center",marginBottom:4}}>Minute (0 – 59)</div>
            <input type="number" placeholder="e.g. 30" min="0" max="59" value={form.minute} onChange={e=>setForm(f=>({...f,minute:e.target.value}))} style={{...IS,textAlign:"center"}}/>
          </div>
        </div>
        <div style={{color:"#ffffff33",fontSize:11,textAlign:"center",marginBottom:20}}>2:30 PM = 14:30 · midnight = 00:00 · noon = 12:00</div>

        {/* City */}
        <label style={LS}>birth city</label>
        <CityInput value={form.city} onChange={v=>setForm(f=>({...f,city:v}))}/>
        <div style={{color:"#ffffff33",fontSize:11,marginTop:6,marginBottom:24}}>Include state/province and country for best accuracy — e.g. "Austin, TX, USA"</div>

        <button onClick={fetchChart} disabled={!formValid} style={{width:"100%",padding:"16px",borderRadius:14,border:"none",background:formValid?"linear-gradient(135deg,#8B5CF6,#6366f1)":"#ffffff0f",color:"white",fontSize:16,fontWeight:700,cursor:formValid?"pointer":"not-allowed",fontFamily:"serif",boxShadow:formValid?"0 0 24px #8B5CF644":"none"}}>
          ✦ read my chart ✦
        </button>
      </div>
    )}

    {/* ── LOADING ── */}
    {screen === "loading" && (
      <div style={{textAlign:"center",padding:"64px 0",animation:"fadeIn 0.4s ease"}}>
        <div style={{fontSize:44,animation:"spin 3s linear infinite",display:"inline-block",marginBottom:20,color:"#8B5CF6"}}>✦</div>
        <div style={{color:"#c084fc",fontSize:16,fontWeight:700,marginBottom:8}}>the cosmos is cooking...</div>
        <div style={{color:"#ffffff44",fontSize:13,marginBottom:28}}>calculating ur placements rn bestie</div>
        <div style={{display:"flex",justifyContent:"center",gap:10,flexWrap:"wrap"}}>
          {Object.keys(PLANETS).slice(0,5).map((p,i)=>(
            <div key={p} style={{animation:"float 2s ease-in-out infinite",animationDelay:`${i*0.2}s`}}><PlanetImg planet={p} size={34}/></div>
          ))}
        </div>
      </div>
    )}

    {/* ── CHART ── */}
    {screen === "chart" && chart && (
      <div style={{animation:"fadeIn 0.5s ease"}}>
        {error && <div style={{background:"#ff444418",border:"1px solid #ff444433",borderRadius:10,padding:"10px 14px",marginBottom:14,color:"#ff9999",fontSize:12}}>{error}</div>}
        {useMock && <div style={{background:"#8B5CF618",border:"1px solid #8B5CF633",borderRadius:10,padding:"10px 14px",marginBottom:14,color:"#c084fc",fontSize:12,textAlign:"center"}}>✦ demo chart — add ur api key for real placements</div>}

        <div style={{textAlign:"center",marginBottom:4}}>
          <span style={{color:"#c084fc",fontSize:13,letterSpacing:1}}>{SIGN_EMOJIS[chart.ascendant?.sign]} {chart.ascendant?.sign} Rising · ur cosmic entrance</span>
        </div>

        <ChartWheel chart={chart} onSelect={setSelected} selected={selected}/>

        {/* Tabs */}
        <div style={{display:"flex",gap:6,marginBottom:14}}>
          {[{id:"archetype",label:"✦ archetype"},{id:"planets",label:"🪐 planets"},{id:"houses",label:"🏠 houses"}].map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{flex:1,padding:"9px 4px",borderRadius:10,background:tab===t.id?"linear-gradient(135deg,#8B5CF633,#6366f122)":"#ffffff08",border:`1px solid ${tab===t.id?"#8B5CF677":"#ffffff11"}`,color:tab===t.id?"#c084fc":"#ffffff44",fontSize:10,fontWeight:700,cursor:"pointer",textTransform:"uppercase",letterSpacing:1,fontFamily:"serif"}}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Archetype Tab */}
        {tab === "archetype" && (
          <div style={{animation:"fadeIn 0.3s ease"}}>
            <ArchetypeCard sign={chart.planets?.Sun?.sign||chart.ascendant?.sign}/>
            <div style={{background:"#ffffff06",border:"1px solid #ffffff0f",borderRadius:12,padding:"14px 16px",marginTop:10}}>
              <div style={{color:"#ffffff33",fontSize:10,textTransform:"uppercase",letterSpacing:2,marginBottom:10}}>🌙 ur three archetypes</div>
              {[{label:"☀️ Sun — core identity",sign:chart.planets?.Sun?.sign},{label:"🌙 Moon — emotional self",sign:chart.planets?.Moon?.sign},{label:"⬆️ Rising — first impression",sign:chart.ascendant?.sign}].map(({label,sign})=>{
                const a=ARCHETYPES[sign]; if(!a) return null;
                return (
                  <div key={label} style={{display:"flex",alignItems:"center",gap:10,background:`${a.color}0f`,border:`1px solid ${a.color}2a`,borderRadius:10,padding:"10px 12px",marginBottom:8}}>
                    <div style={{fontSize:20}}>{a.emoji}</div>
                    <div style={{flex:1}}>
                      <div style={{color:"#ffffff44",fontSize:10,textTransform:"uppercase",letterSpacing:1}}>{label}</div>
                      <div style={{color:a.color,fontSize:13,fontWeight:700}}>{a.name}</div>
                    </div>
                    <div style={{fontSize:18}}>{SIGN_EMOJIS[sign]}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Planets Tab */}
        {tab === "planets" && (
          <div style={{animation:"fadeIn 0.3s ease"}}>
            <div style={{display:"flex",flexDirection:"column",gap:7}}>
              {Object.entries(chart.planets||{}).map(([p,d])=>(
                <PlanetCard key={p} planet={p} data={d} onClick={setSelected} isSelected={selected===p}/>
              ))}
            </div>
            {selected && chart.planets?.[selected] && (
              <PlanetDetail planet={selected} data={chart.planets[selected]} allPlanets={chart.planets}/>
            )}
          </div>
        )}

        {/* Houses Tab */}
        {tab === "houses" && (
          <div style={{animation:"fadeIn 0.3s ease",display:"flex",flexDirection:"column",gap:8}}>
            {Array.from({length:12},(_,i)=>{
              const h=i+1, hd=HOUSE_INFO[h];
              const inHouse=Object.entries(chart.planets||{}).filter(([,d])=>d?.house===h);
              return (
                <div key={h} style={{background:"linear-gradient(135deg,#ffffff07,#ffffff03)",border:"1px solid #ffffff10",borderRadius:12,padding:"13px 15px"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:5}}>
                    <div>
                      <span style={{color:"#8B5CF6",fontWeight:700,fontSize:13}}>House {h}</span>
                      <span style={{color:"#ffffff44",fontSize:12}}> · {hd.name}</span>
                    </div>
                    <span style={{background:"#8B5CF622",color:"#8B5CF6",fontSize:10,padding:"2px 8px",borderRadius:8}}>{hd.keyword}</span>
                  </div>
                  <div style={{color:"#ffffff55",fontSize:12,lineHeight:1.55,marginBottom:inHouse.length?10:0}}>{hd.text}</div>
                  {inHouse.length>0 && (
                    <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                      {inHouse.map(([p])=>(
                        <div key={p} onClick={()=>{setSelected(p);setTab("planets");}} style={{display:"flex",alignItems:"center",gap:5,background:`${PLANETS[p].color}1a`,border:`1px solid ${PLANETS[p].color}44`,borderRadius:20,padding:"3px 8px 3px 4px",cursor:"pointer"}}>
                          <PlanetImg planet={p} size={16}/>
                          <span style={{color:PLANETS[p].color,fontSize:11,fontWeight:700}}>{p}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <button onClick={()=>{setScreen("intro");setChart(null);setSelected("Sun");setUseMock(false);setTab("archetype");}} style={{width:"100%",padding:"13px",borderRadius:12,marginTop:20,background:"#ffffff08",border:"1px solid #ffffff11",color:"#ffffff44",fontSize:13,cursor:"pointer",fontFamily:"serif"}}>
          ← new chart
        </button>
      </div>
    )}
  </div>
</div>
```

);
}
