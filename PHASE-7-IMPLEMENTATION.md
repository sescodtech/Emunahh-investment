# Phase 7 — Insights / Blog & Thought Leadership

Phase 7 replaces the previous hard-coded blog with a CMS-managed editorial system built on Supabase.

## Public experience

### Insights hub
Route: `/blog`

The page now loads live published editorial records from Supabase and includes:
- institutional Insights hero;
- category filters;
- article search;
- featured insight treatment;
- latest insights grid;
- publication dates and reading time;
- clear general-information disclaimer;
- enquiry CTA.

### Article pages
Canonical route: `/blog/:slug`

Each article has:
- dedicated URL;
- category;
- author;
- publication date;
- reading time;
- hero image;
- structured article body;
- topic tags;
- general-information disclosure;
- author profile;
- related insights;
- native share / copy-link fallback;
- article SEO title, description, canonical URL and Open Graph image support.

### Homepage integration
The homepage Insights section now reads the latest three published/scheduled-live articles from the same editorial tables. CMS/default content remains as a fallback if the editorial migration has not yet been installed or no articles exist.

## Admin experience

A new admin module is available:

`Insights & Blog`

It supports:
- creating and editing articles;
- draft, scheduled, published and archived states;
- featured article flag;
- publication scheduling;
- category selection;
- author selection;
- Cloudinary hero-image upload;
- image alt text;
- tags;
- reading time;
- SEO title and description;
- canonical URL;
- Open Graph image;
- category management;
- author management.

The management dashboard overview also shows a Published Insights count.

## Editorial data model

Migration 033 creates:
- `blog_categories`
- `blog_authors`
- `blog_posts`

Public access is limited by Row Level Security to articles that are published, or scheduled with a publication time that has already arrived. Draft and archived content remain management-only.

Admin writes require the existing `content.update` permission.

## Initial editorial content

The former hard-coded blog articles are migrated into the database as initial content under a neutral `Emunahh-Invest Editorial Team` author. This avoids relying on unverified internal committee/desk names as public author identities.

## Important editorial standard

Do not publish:
- guaranteed return language;
- unverified licences or regulatory claims;
- invented AUM, customer counts, awards or partnerships;
- personalised investment recommendations as general blog content.

Articles should remain educational unless separately reviewed and approved for another purpose.

## Database

Run only:

`supabase/033_phase7_insights_editorial_system.sql`

This migration assumes Phase 6 migration 032 has already been run successfully.

Do not rerun migrations 001–032.
