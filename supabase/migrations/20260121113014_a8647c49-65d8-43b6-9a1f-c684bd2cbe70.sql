-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create venue status enum
CREATE TYPE public.venue_status AS ENUM ('pending', 'approved', 'live');

-- Create food type enum
CREATE TYPE public.food_type AS ENUM ('veg', 'non_veg', 'both');

-- Create venues table
CREATE TABLE public.venues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT,
  postal_code TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  capacity INTEGER NOT NULL,
  price_per_plate INTEGER NOT NULL,
  food_type public.food_type DEFAULT 'both',
  manager_name TEXT,
  manager_phone TEXT,
  manager_email TEXT,
  amenities TEXT[],
  images TEXT[],
  owner_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  status public.venue_status DEFAULT 'live' NOT NULL,
  is_verified BOOLEAN DEFAULT false,
  average_rating DECIMAL(2, 1) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create venue submissions table
CREATE TABLE public.venue_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submitter_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT,
  postal_code TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  capacity INTEGER NOT NULL,
  price_per_plate INTEGER NOT NULL,
  food_type public.food_type DEFAULT 'both',
  manager_name TEXT,
  manager_phone TEXT,
  manager_email TEXT,
  amenities TEXT[],
  images TEXT[],
  status public.venue_status DEFAULT 'pending' NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  approved_at TIMESTAMP WITH TIME ZONE,
  approved_by UUID REFERENCES public.profiles(id)
);

-- Create favorites table
CREATE TABLE public.favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  venue_id UUID REFERENCES public.venues(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE(user_id, venue_id)
);

-- Create reviews table
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  venue_id UUID REFERENCES public.venues(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create indexes
CREATE INDEX idx_venues_city ON public.venues(city);
CREATE INDEX idx_venues_status ON public.venues(status);
CREATE INDEX idx_venues_capacity ON public.venues(capacity);
CREATE INDEX idx_venues_price ON public.venues(price_per_plate);
CREATE INDEX idx_favorites_user ON public.favorites(user_id);
CREATE INDEX idx_favorites_venue ON public.favorites(venue_id);
CREATE INDEX idx_reviews_venue ON public.reviews(venue_id);
CREATE INDEX idx_reviews_user ON public.reviews(user_id);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.venue_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Helper function to get current user's profile id
CREATE OR REPLACE FUNCTION public.get_current_profile_id()
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT id FROM public.profiles WHERE user_id = auth.uid()
$$;

-- Profiles policies
CREATE POLICY "Anyone can view profiles" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (user_id = auth.uid());

-- Venues policies
CREATE POLICY "Anyone can view live venues" ON public.venues
  FOR SELECT USING (status = 'live');

CREATE POLICY "Owners can update own venues" ON public.venues
  FOR UPDATE USING (owner_id = public.get_current_profile_id());

-- Venue submissions policies
CREATE POLICY "Users can view own submissions" ON public.venue_submissions
  FOR SELECT USING (submitter_id = public.get_current_profile_id());

CREATE POLICY "Users can create submissions" ON public.venue_submissions
  FOR INSERT WITH CHECK (submitter_id = public.get_current_profile_id());

CREATE POLICY "Users can update own pending submissions" ON public.venue_submissions
  FOR UPDATE USING (submitter_id = public.get_current_profile_id() AND status = 'pending');

-- Favorites policies
CREATE POLICY "Users can view own favorites" ON public.favorites
  FOR SELECT USING (user_id = public.get_current_profile_id());

CREATE POLICY "Users can add favorites" ON public.favorites
  FOR INSERT WITH CHECK (user_id = public.get_current_profile_id());

CREATE POLICY "Users can remove own favorites" ON public.favorites
  FOR DELETE USING (user_id = public.get_current_profile_id());

-- Reviews policies
CREATE POLICY "Anyone can view reviews" ON public.reviews
  FOR SELECT USING (true);

CREATE POLICY "Users can create reviews" ON public.reviews
  FOR INSERT WITH CHECK (user_id = public.get_current_profile_id());

CREATE POLICY "Users can update own reviews" ON public.reviews
  FOR UPDATE USING (user_id = public.get_current_profile_id());

CREATE POLICY "Users can delete own reviews" ON public.reviews
  FOR DELETE USING (user_id = public.get_current_profile_id());

-- Function to update venue average rating
CREATE OR REPLACE FUNCTION public.update_venue_rating()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.venues
  SET 
    average_rating = (SELECT COALESCE(AVG(rating), 0) FROM public.reviews WHERE venue_id = COALESCE(NEW.venue_id, OLD.venue_id)),
    review_count = (SELECT COUNT(*) FROM public.reviews WHERE venue_id = COALESCE(NEW.venue_id, OLD.venue_id))
  WHERE id = COALESCE(NEW.venue_id, OLD.venue_id);
  RETURN COALESCE(NEW, OLD);
END;
$$;

-- Trigger for rating updates
CREATE TRIGGER update_venue_rating_trigger
AFTER INSERT OR UPDATE OR DELETE ON public.reviews
FOR EACH ROW EXECUTE FUNCTION public.update_venue_rating();

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Timestamp triggers
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_venues_updated_at
BEFORE UPDATE ON public.venues
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at
BEFORE UPDATE ON public.reviews
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$;

-- Trigger for auto profile creation
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert the real banquet data (Hotel Moscot Inn)
INSERT INTO public.venues (
  name, description, address, city, state, postal_code,
  latitude, longitude, capacity, price_per_plate, food_type,
  manager_name, manager_phone, status, is_verified, amenities
) VALUES (
  'Hotel Moscot Inn',
  'A premium banquet venue perfect for weddings and celebrations. Located on the highway bypass, offering easy accessibility and elegant ambiance for your special occasions.',
  'Gadan Khera, Chauraha, Highway Bypass, Nirala Nagar',
  'Unnao',
  'Uttar Pradesh',
  '209801',
  26.5393,
  80.4863,
  120,
  750,
  'veg',
  'Siddharth',
  '7080145599',
  'live',
  true,
  ARRAY['Parking', 'AC', 'Stage', 'Catering', 'Decoration']
);

-- Create storage bucket for venue images
INSERT INTO storage.buckets (id, name, public) VALUES ('venue-images', 'venue-images', true);

-- Storage policies
CREATE POLICY "Anyone can view venue images" ON storage.objects
  FOR SELECT USING (bucket_id = 'venue-images');

CREATE POLICY "Authenticated users can upload venue images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'venue-images' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update own venue images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'venue-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own venue images" ON storage.objects
  FOR DELETE USING (bucket_id = 'venue-images' AND auth.uid()::text = (storage.foldername(name))[1]);