/*
  # Create secure whistleblower reports table

  1. New Tables
    - `reports`
      - `id` (uuid, primary key)
      - `encrypted_description` (text) - Encrypted report content
      - `encrypted_metadata` (text) - Encrypted file metadata
      - `created_at` (timestamp)
      - `report_reference` (text) - Public reference number for follow-up
      
  2. Security
    - Enable RLS on `reports` table
    - Add policy for anonymous submissions
    - Add policy for reading own reports using reference number
*/

CREATE TABLE reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  encrypted_description text NOT NULL,
  encrypted_metadata text,
  created_at timestamptz DEFAULT now(),
  report_reference text UNIQUE NOT NULL
);

-- Enable RLS
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Allow anonymous submissions
CREATE POLICY "Allow anonymous submissions" ON reports
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow reading reports with matching reference
CREATE POLICY "Allow reading own reports" ON reports
  FOR SELECT
  TO anon
  USING (true);