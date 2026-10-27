import { neon } from "@neondatabase/serverless";

// The shared EM (enterprise-map) database holds people, roles and
// person_app_access — read through the effective_app_access view, whose levels
// decide who gets "view" or "edit" here.
export function emDb() {
  return neon(process.env.EM_DATABASE_URL!);
}
