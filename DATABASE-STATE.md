# Emunahh-Invest database state — current master

## Confirmed in this conversation
The last database chain explicitly confirmed successful by the user is the reconciled installation through migration 031.

Confirmed:
- 001–003 base schema/CMS/RBAC
- repaired/reconciled 004–005
- reconciled 006–031 master

## Not yet confirmed in this conversation
Migrations 032, 033, 034 and the new 035 document-storage migration have been supplied, but their PASS results have not yet been reported by the user.

## Safe next step
Run the read-only checker:

`supabase/SQL_STATE_CHECK_031-035.sql`

Then run only the migrations reported MISSING, in numerical order.

If 032, 033, 034 and 035 are ALL missing, you may run:

`supabase/EMUNAHH_POST_031_MASTER_032-035.sql`

If some are PASS and some are MISSING, do not use the combined file; run only the missing individual files in order.
