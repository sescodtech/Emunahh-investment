# Form Submission Hotfix — Phase 10 Revision 2

## Problem found
The public RLS policy allows anonymous INSERT into `applications` and `contact_messages`, but does not allow anonymous SELECT of those records.

The previous frontend used `.insert(...).select().single()` after public submission. That requested the inserted row back from PostgREST and conflicted with the intended RLS model.

## Fix
- Generate the UUID in the browser with `crypto.randomUUID()`.
- Insert the row using that explicit ID.
- Do not request a SELECT/RETURNING representation.
- Use the known UUID to trigger the server-side `notify-new-submission` Edge Function.
- Return only the locally known public reference and ID to the UI.

## Security
No public SELECT policy was added. Applicant records remain unreadable to anonymous users. Public status checks continue through the restricted `track_application` RPC.

## Database change
None. No new SQL migration is required for this hotfix.
