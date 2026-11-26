# Spark Holdings website (Next.js 14 + Tailwind CSS)

A multi-page site for Spark Holdings, built in the same stack as the TailNext template: Next.js 14 (app router), React 18, Tailwind CSS 3, TypeScript. It has a home page, one page for each division (security, cleaning, supplies), a contact page, a light and dark mode toggle, an FAQ and an enquiry form.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Photos and logos

The Spark photos and logos are already in `public/img` (`security`, `cleaning`, `supplies`, `brand`). To swap one, replace the file and keep the same name. The tab icon is `app/icon.png`, cut from the Spark Holdings logo.

## Change the words

All text, phone numbers and addresses are in `lib/content.ts`. Edit it and the pages update.

Phone numbers: the security pages show +265 999 930 551 and +265 897 643 137. The rest of the site uses the group lines from the current site. Change them in `lib/content.ts`.

## Make the enquiry form send email

The form posts to `app/api/enquiry/route.ts`. Until you set it up, visitors see a message with your email and phone number.

1. Create an account at resend.com and verify your sending domain.
2. In Vercel, open Project Settings, then Environment Variables, and add `RESEND_API_KEY`, `ENQUIRY_FROM` and `ENQUIRY_TO` (see `.env.example`).
3. Redeploy. Test it once with a real message.

## Deploy to Vercel

Push this folder to GitHub, import the repository in Vercel and click Deploy. Set `NEXT_PUBLIC_SITE_URL` to your live address.

## Animations (Motion)

Animations use [Motion](https://github.com/motiondivision/motion) (`npm install motion`, imported from `motion/react`). Every animation eases in and out with the same curve, set once in `lib/ease.ts`.

What moves, and where it lives:

- Page opening (`components/Hero.tsx`): the hero panel wipes down, the headline slides up word by word, then the text, buttons and the divisions card ease in. The photo drifts slowly as you scroll.
- Scroll reveals (`components/motion.tsx`): `Reveal` eases a block in, `Stagger` and `StaggerItem` bring groups in one after another, `RevealText` slides headings up word by word, and `Counter` counts the numbers up.
- Interaction: the header pill grows a shadow as you scroll and its active tab glides between pages, photos zoom slowly on hover, the FAQ and mobile menu open with an eased height change, and the theme icon turns over when you switch.
- Divisions carousel (`components/DivisionsCarousel.tsx`): the arrows, a drag or swipe, and keyboard focus slide the cards with the same ease in and out. Two cards show on wide screens and one on phones.
- Getting started steps (`components/Steps.tsx`): the dark highlight starts on the middle step and glides to the step you hover, tap or tab to.
- A thin orange bar at the top of the page fills as you scroll.

Visitors whose device asks for reduced motion get fades instead of movement. Without JavaScript, everything shows at once.

To change the feel, edit `EASE` in `lib/ease.ts` or the `duration` values in `components/motion.tsx`.

## Structure

```
app/            pages, layout, global styles, enquiry API
components/     Header, Footer, ThemeToggle, Photo, PageHeader, Hero, DivisionsCarousel, Steps, DivisionPage, Faq, EnquiryForm, motion
lib/content.ts  all site content
lib/ease.ts     the easing curve used by every animation
```
