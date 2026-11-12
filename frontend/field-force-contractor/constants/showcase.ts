// ============================================
// showcase.ts — Client-demo feature flags
//
// SHOWCASE_MODE toggles convenience bypasses that let the app run
// end-to-end inside Expo Go (and on simulators) so we can walk a client
// through the contractor flow without standing up real biometric
// hardware, real GPS proximity to a job site, or the inspection
// workflow.
//
// IMPORTANT: SHOWCASE_MODE === true disables real security gates. It
// MUST be off (EXPO_PUBLIC_SHOWCASE_MODE unset or not 'true') for any
// build that ships to real users or carries real client data behind
// real authentication.
//
// What flips when SHOWCASE_MODE === true:
//   1. TicketDetailScreen.handleAcceptTask short-circuits to
//      navigation.goBack(). The inspection forced-nav is skipped and
//      the GPS permission prompt is skipped.
//   2. TicketDetailScreen.handleStartTask runs a two-tap demo flow.
//      First tap shows an Alert with the "you must be within 100 feet
//      of the site" message so the audience sees the proximity gate
//      works. Second tap short-circuits to taskStatus = 'in_progress'
//      and fires the backend transition (using the task's site
//      coordinates as the demo start location) so a list refresh
//      reflects the new status. The attempt counter is per-mount so
//      navigating away and back resets it for a re-demo.
//
// Adding a new bypass? Gate it on SHOWCASE_MODE here AND keep the
// production path intact in each gated function so the production flip
// stays a one-line change.
//
// How to toggle:
//   SHOWCASE_MODE is off by default. It turns on only when the
//   EXPO_PUBLIC_SHOWCASE_MODE env var is exactly 'true'. For a local
//   demo, set it in frontend/field-force-contractor/.env (see
//   .env.example) and restart Expo with `npx expo start --clear`. For a
//   demo EAS build, set it in that build profile's `env` block only.
//
//   Expo inlines EXPO_PUBLIC_* values at bundle time and only for static
//   dot-notation access, so keep the read below as
//   process.env.EXPO_PUBLIC_SHOWCASE_MODE (no destructuring, no
//   computed keys).
// ============================================

export const SHOWCASE_MODE: boolean =
  process.env.EXPO_PUBLIC_SHOWCASE_MODE === 'true';

// Loud dev-time warning so nobody forgets the flag is on. __DEV__ is
// the React Native global that's true in Metro / Expo Go and false in
// production bundles, so this fires only when devs are looking at logs.
if (__DEV__ && SHOWCASE_MODE) {
  // eslint-disable-next-line no-console
  console.warn(
    '[SHOWCASE_MODE] Accept-ticket and start-task verification bypasses are ACTIVE. ' +
    'This build is for client demos. ' +
    'Unset EXPO_PUBLIC_SHOWCASE_MODE and restart Expo for a production-like run.'
  );
}
