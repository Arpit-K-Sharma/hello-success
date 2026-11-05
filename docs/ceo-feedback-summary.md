 # CEO feedback, in plain English

Source: Mina's message and `docs/changes-ceo-info.md` (5 Nov 2026).

**The short version:** He likes the look, so keep it dark and techy. Most of the work is about honesty: anything on the site that isn't real comes off. The site should also be shorter, and the enquiry form needs to actually work.

---

## 1. Make the content honest (biggest job)

**The rule:** a number stays on the site only if it has a real, named source. If there's no source, it comes off.

### Problem section stats
- Swap the 3 stat cards for real research figures, and add a small "Sources" line underneath.
- Keep the mock inbox, but put an **"Example"** tag on it so nobody reads it as client data.

### Grow / Serve / Run stats
These currently read as results *we* delivered. We haven't delivered any yet, so each one becomes an industry research figure.

| Outcome | Now | Becomes |
|---|---|---|
| Grow | 3× faster lead response | **7×**: leads contacted within an hour are about 7 times as likely to become a sales conversation (HBR 2011) |
| Serve | 40% resolved without waiting | **80% by 2029**: Gartner *forecasts* AI will resolve 80% of common service issues. Keep the words "forecasts" and "by 2029" |
| Run | 20 hrs saved per person per month | **9 hours a week**: the average time AI saves an Australian worker (RMIT/Deloitte 2026) |

- Add the label **"What the research says"** above each stat.
- Quotes credited to a client or a named person come out. Our own lines can stay, without quote marks or a name.

### Results section: remove it entirely
None of the following is real, so it all goes:
- **Case studies:** Harbour Health, Northwind (also Microsoft's famous sample company, so anyone in IT will spot it) and Summit Building.
- **The Redgum quote and all 3 testimonials:** the headshots are stock photos. Fake testimonials can breach Australian Consumer Law.
- **Headline stats:** "150+ systems", "12k hours" and "98% retention".

**In its place, a "Why work with us" section:**
- **Heading:** "Built by someone who's run the floor, not just advised it."
- **3 cards, with no numbers:** One team start to finish · You see the plan before you commit · Measured against your numbers.
- **A founding client offer:** "Be one of our first clients" for 2027, with a button.
- **Optional:** one anonymised example from Mina's past work, only if her old employment contract allows it.

*He wrote all the replacement copy in the original doc, so we can lift it straight from there.*

---

## 2. Show who's behind it

- **About:** the site should say who leads Hello Success. That's Mina Azar, co-founder of IT Together, with 20+ years in sales, customer experience and operations.
- **Fix the "30+ years of IT delivery" claim:** IT Together only started in April 2024. Change it to "20+ years of sales, operations and CX leadership, alongside IT Together's engineers".
- **"Major CRM implementation partner":** name the real partner, or remove the line.
- **"IT qualified engineers":** keep, and name the certifications if possible. That's a question for Om.
- **Name line:** use **"Hello Success, powered by IT Together"** consistently. Not with a dash, because our copy rule bans dashes.

---

## 3. Real contact details

| | Now | Becomes |
|---|---|---|
| Phone | 0491 570 156 (a fake TV/film number) | **0478 062 165**, linked as `tel:+61478062165` |
| Email | hello@hellosuccess.example | A real inbox on our domain. **We need to set this up for him** |
| LinkedIn | linkedin.com homepage | His profile link. **He'll send it** |
| Location | Sydney | Keep, or change to "Parramatta, Sydney" |

---

## 4. Design and layout

**Keep the look.** These changes are about readability, not toning it down.

- **Mobile hero:** make it static, one screen, no scroll pinning.
  - Show only the first page: eyebrow, headline, intro and the buttons.
  - Don't show the Discover / Redesign / Automate pages in the mobile hero. That explanation moves, in more detail, into the main step section (see "Cut from 12 sections to 8" below).
  - Instead of the long scroll animation, show only its end state: the 3D scene spinning behind the copy, with the glow kept so it still feels alive.
  - Reduced motion: show the scene still, no spin.
- **Less auto-moving content on mobile:** the auto-advancing swipe cards should let people read at their own pace.
- **Reduced motion:** switch the animation off when the user has asked their device to reduce motion.
- **Contrast:** check grey-on-black text against WCAG AA (4.5:1).
- **Alt text:** add it to every image that carries meaning.
- **Cut from 12 sections to 8:**
  - Right now the same idea is explained three times (3 steps in the hero, 3 in "How it works", 6 in "Process"). Use **one 4-step model everywhere: Discover → Redesign → Build → Run.**
  - Drop the 3-step strip in the hero. Its content (what happens at Discover, why we Redesign before any software, how we build the automation) goes into the 4-step section, written out in full there rather than as one-line beats.
  - **Open:** the CEO's doc drops the strip on desktop too. Confirm whether the desktop hero keeps its scroll beats or also goes to the first page only.
  - Fold the 6 services into Grow / Serve / Run as "What we build", with the details staying in the popups.
- **Duplicate desktop and mobile copies:** he noticed sections are rendered twice. That's our `Split` pattern, and screen readers and Google can read both copies. Worth checking.

---

## 5. Booking and enquiries (TO DISCUSS WITH HIM)

**What he actually wants:** when someone books, **he gets a message on his phone**. No calendar.

> ⚠️ The written doc still says "add a calendar link if you can". That contradicts what he told you, so confirm with him.

**What the doc asks the form to do:**
- **Send** every enquiry somewhere real: the inbox, plus the CRM if there is one. *Right now it sends nothing.*
- **Confirm:** show a thank-you message on screen, send the person an email confirmation, and show a clear error if sending fails.
- **Pre-select the goal:** the "Start with Grow / Serve / Run" buttons open the form with that goal chosen. *This already works, and he checked it.*
- **Consent:** add a line under the button, "We'll use your details to reply… See our privacy policy", linked to a **privacy policy page** we need to create.
- **One promise everywhere:** "We'll reply within one business day". The FAQ currently says "within a day".

**Questions for the meeting:**
1. Which phone message: SMS, WhatsApp, or a push notification?
2. Who follows up on each enquiry, and how fast?
3. Is there a CRM, or is email plus a phone alert enough?
4. **Button wording:** "Book" or "Request"? His first message said "Request a discovery call", because nothing actually gets booked. The doc says "Book a discovery call" everywhere. Without a calendar, "Request" is the more honest choice.
5. **Free call vs paid discovery:** the site needs to make clear that the 30-minute call is free and the Discovery that follows is paid.

---

## 6. FAQ

- **Timelines:** keep "2 weeks Discovery, 4 to 6 weeks Pilot" only if we'll really commit to them.
- **Prices and the "fee at risk" guarantee:** take these out until they're confirmed. Use: "Every engagement starts with a fixed price Discovery, quoted after a free 30 minute call."

---

## 7. Launch checklist (technical, mostly ours)

- [ ] Move to the real domain (hellosuccess.au?), with https and www redirecting
- [ ] Change robots from `noindex` to `index`, and submit the site to Google Search Console
- [ ] Page title and description, plus a branded share image for LinkedIn and messaging apps
- [ ] Analytics for visits and enquiries, mentioned in the privacy policy
- [ ] Final test on a phone and a desktop, a real test enquiry end to end, and every link clicked

---

## What we're waiting on from him

- LinkedIn profile link
- Confirmation of the domain
- Booking notification method (see section 5)
- The CRM partner name, or permission to remove the line
- Whether the Discovery and Pilot timelines are real commitments
- Om: the engineers' qualifications
