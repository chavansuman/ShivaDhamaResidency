-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- -----------------------------------------------------------------------------
-- 1. Table: blogs
-- Inferred from: src/lib/useBlogs.js
-- -----------------------------------------------------------------------------
create table if not exists public.blogs (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text not null unique,
  excerpt text,
  content text,
  author text,
  category text,
  cover_image text, -- Application maps this to 'image' in frontend
  published boolean default false,
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.blogs enable row level security;

-- Policies
-- Allow public read access (Blogs are public)
create policy "Public blogs are viewable by everyone"
  on public.blogs for select
  using ( true );

-- Allow public write access (REQUIREMENT: Simplified admin for this project context)
-- WARNING: In a production environment with proper auth, restrict this to authenticated users
create policy "Allow public insert/update/delete for blogs"
  on public.blogs for all
  using ( true )
  with check ( true );


-- -----------------------------------------------------------------------------
-- 2. Table: site_content
-- Inferred from: src/contexts/SiteSettingsContext.jsx
-- Used for storing dynamic key-value content for the site
-- -----------------------------------------------------------------------------
create table if not exists public.site_content (
  key text primary key,
  value jsonb,
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.site_content enable row level security;

-- Policies
-- Allow public read access
create policy "Site content is viewable by everyone"
  on public.site_content for select
  using ( true );

-- Allow public write access (REQUIREMENT: Simplified admin interaction)
create policy "Allow public insert/update for site_content"
  on public.site_content for all
  using ( true )
  with check ( true );


-- -----------------------------------------------------------------------------
-- 3. Table: properties
-- Inferred from: src/data/properties.js
-- Replacement for external API property management
-- -----------------------------------------------------------------------------
create table if not exists public.properties (
  id text primary key, -- Keeping as text to match current 'G1', 'F1' IDs if desired, or can be uuid
  title text,
  bhk text, -- '1BHK', '2BHK' etc.
  floor text, -- 'Ground Floor'
  floor_number integer, -- Mapped from floorNumber
  rent numeric,
  deposit numeric,
  maintenance numeric,
  area numeric,
  carpet_area numeric, -- Mapped from carpetArea
  bathrooms integer,
  status text, -- 'Available', 'Occupied'
  available_from date, -- Mapped from availableFrom
  display_order integer default 100, -- Mapped from displayOrder
  furnishing_note text, -- Mapped from furnishingNote
  virtual_tour_image text, -- Mapped from virtualTourImage
  virtual_tour jsonb, -- Mapped from virtualTour object
  amenities text[], -- Array of strings
  features jsonb, -- Object
  images text[], -- Array of image URLs
  room_areas jsonb, -- Mapped from roomAreas (Array of objects)
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.properties enable row level security;

-- Policies
-- Allow public read access
create policy "Properties are viewable by everyone"
  on public.properties for select
  using ( true );

-- Allow public write access
create policy "Allow public management of properties"
  on public.properties for all
  using ( true )
  with check ( true );


-- -- -----------------------------------------------------------------------------
-- -- 4. Storage Buckets
-- -- -----------------------------------------------------------------------------
-- -- Create storage buckets
-- insert into storage.buckets (id, name, public)
-- values 
--   ('blog-images', 'blog-images', true),
--   ('property-images', 'property-images', true),
--   ('site-assets', 'site-assets', true)
-- on conflict (id) do nothing;

-- -- Storage Policies
-- -- Simplified for public usage across all buckets
-- create policy "Public Access"
--   on storage.objects for select
--   using ( true );

-- create policy "Public Upload"
--   on storage.objects for insert
--   with check ( true );

-- create policy "Public Update"
--   on storage.objects for update
--   using ( true );

-- create policy "Public Delete"
--   on storage.objects for delete
--   using ( true );

-- -----------------------------------------------------------------------------
-- 4. Storage Buckets
-- -----------------------------------------------------------------------------
-- Create a bucket for blog images
insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true)
on conflict (id) do nothing;

-- Create a bucket for property images
insert into storage.buckets (id, name, public)
values ('property-images', 'property-images', true)
on conflict (id) do nothing;

-- Create a bucket for site assets (general images)
insert into storage.buckets (id, name, public)
values ('site-assets', 'site-assets', true)
on conflict (id) do nothing;

-- Storage Policies (Simplified for public usage as per project context)

-- Policy: Public Read
create policy "Public Access"
  on storage.objects for select
  using ( bucket_id in ('blog-images', 'site-assets', 'property-images') );

-- Policy: Public Upload (WARNING: Highly permissive, use with caution)
create policy "Public Upload"
  on storage.objects for insert
  with check ( bucket_id in ('blog-images', 'site-assets', 'property-images') );

-- Policy: Public Update/Delete
create policy "Public Update Delete"
  on storage.objects for update
  using ( bucket_id in ('blog-images', 'site-assets', 'property-images') );

create policy "Public Delete"
  on storage.objects for delete
  using ( bucket_id in ('blog-images', 'site-assets', 'property-images') );
