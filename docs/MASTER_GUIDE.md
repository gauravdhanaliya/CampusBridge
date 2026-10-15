# CAMPUSBRIDGE — MASTER DEVELOPMENT GUIDE
## Complete Project Instructions for Claude + Claude Code

Act as my senior software architect, UI/UX designer, full-stack engineer, database engineer, security reviewer, and personal coding mentor.

I am building CampusBridge, a college and university networking and campus navigation platform for the HackShift hackathon.

I will use Claude.ai for planning and guidance and Claude Code to implement the application in my existing project folder.

I am a beginner developer. Explain technical concepts in simple language, but maintain professional software engineering standards.

IMPORTANT: You are responsible for guiding me through the ENTIRE project, phase by phase. Do not give me a plan and leave me to figure out the implementation. For each phase, provide the exact prompt I should copy into Claude Code, tell me what to expect, help me test the result, troubleshoot errors, and guide me to the next phase.

---

# 1. PRODUCT VISION

Product name: CampusBridge

Tagline: Different Campuses. Same Dreams.

Mission:
Connect colleges and universities across India through detailed campus maps, location discovery, visitor navigation, event discovery, and cross-college student and teacher networking.

The application must support desktop browsers and mobile devices, with installable PWA support as a future capability.

The product should feel like a polished, youthful, colorful, modern student platform, not a generic administrative website.

Core value proposition:

1. Find any mapped place on a campus.
2. Navigate to classrooms, offices, facilities, and event venues.
3. Discover events organized by other colleges and universities.
4. Connect with students, teachers, clubs, and potential teammates.
5. Let authorized college administrators maintain their campus information and events.

---

# 2. CURRENT PROJECT STATUS

Phase 1 — Design system and responsive UI: COMPLETED.

The existing project already has an initial interface. Never assume which components or files exist without inspecting the project.

Your first task is to ask me for or review the latest Claude Code completion report, project file structure, and any remaining issues.

Preserve existing work. Do not recreate the application from scratch.

If a feature is already implemented and tested, verify it and retain it instead of implementing it again.

Start with Phase 2.

---

# 3. DESIGN SYSTEM

Maintain the established CampusBridge branding.

Color palette:
- Campus green: #116B5A
- Orange: #FF9F43
- Purple: #7664D8
- Blue: #2588E8
- Background: #F6F8F5

Design principles:
- Rounded cards and clean panels
- Clear typography and readable labels
- Friendly icons
- Color-coded location markers
- Attractive event cards
- Responsive desktop and mobile layouts
- Consistent navigation
- Useful loading, empty, error, and success states
- Accessible color contrast and keyboard interaction

Preserve the existing design wherever possible. Improve inconsistent components without unnecessarily redesigning completed screens.

---

# 4. TECHNICAL STACK

Preferred stack:
- React
- Vite
- TypeScript
- Tailwind CSS
- Lucide icons
- Leaflet and OpenStreetMap for outdoor maps
- Supabase Auth
- PostgreSQL through Supabase
- Supabase Storage for approved uploads
- Row Level Security for authorization
- Vercel or Cloudflare Pages for deployment

Use the project's existing compatible dependencies where appropriate.

Do not replace working technologies without a strong reason and my approval.

Prefer free and open-source technologies and free service tiers. Check current limits and terms before recommending external services.

Do not expose secrets in frontend code. Do not put service-role keys in VITE_ environment variables. Never commit real credentials.

---

# 5. DEVELOPMENT RULES

Follow these rules for every phase:

1. Inspect the existing project before editing.
2. Identify the current implementation and missing features.
3. Provide an exact, self-contained Claude Code prompt.
4. Tell me which phase the prompt implements and what it must not change.
5. Have Claude Code work in small, logical steps.
6. Run the relevant type checks, linting, tests, and build.
7. Fix errors before declaring a phase complete.
8. Test important user interactions, not only visual appearance.
9. Report changed files, dependencies, test results, and limitations.
10. Keep the project runnable after every phase.
11. Preserve working features and existing design.
12. Do not start the next phase until I confirm the current phase works or explicitly ask to continue.
13. If a dependency, API, or external service is unavailable, explain the problem and provide a practical alternative.
14. Never fabricate successful authentication, registrations, map routes, data persistence, verification, or other functionality.
15. Keep demo data clearly distinguishable from real verified data.

For every phase, give me:
- The exact Claude Code prompt
- Prerequisites
- Expected implementation
- Commands to run
- Manual testing checklist
- Expected results
- Common errors and fixes
- Completion criteria

If I report an error, help me debug that error before moving forward.

---

# PHASE 1 — DESIGN SYSTEM AND RESPONSIVE UI

STATUS: COMPLETED.

Expected scope:
- Branding and color palette
- Reusable UI components
- Main navigation
- Responsive desktop and mobile layout
- Initial dashboard and visual structure

Do not rebuild Phase 1. Inspect and preserve it.

If testing reveals incomplete features, fix only the necessary issues.

---

# PHASE 2 — CAMPUS EXPLORER AND LOCATION DISCOVERY

OBJECTIVE:
Make the campus map and location directory functional.

Required features:

A. Interactive outdoor map
- Use Leaflet and OpenStreetMap.
- Display a real interactive map.
- Support zoom and pan.
- Display sample campus markers.
- Select a marker to view its details.
- Synchronize selected markers with search results.
- Provide map and list views.
- Make the map responsive.

B. Location categories
- Academic buildings
- Classrooms and lecture halls
- Laboratories
- Faculty cabins and staff rooms
- Administrative offices
- Library
- Cafeteria and canteen
- Toilets and accessible toilets
- Drinking water
- Dustbins and waste collection
- Parking
- Main gates and entrances
- Stairs and lifts
- First aid and security
- Auditoriums and event venues
- Hostels and sports facilities

C. Search and filtering
- Search by place name, room number, and building.
- Filter by location category.
- Clear filters.
- Select a search result to highlight its marker.
- Display helpful empty states.
- Keep search results and markers synchronized.

D. Location details
Show:
- Name and category
- Institution and campus
- Building and floor
- Room number where applicable
- Description
- Accessibility details where known
- Verification status
- Get Directions action

E. Data
Use a structured location data model containing:
- ID
- Name
- Category
- Campus ID
- Building name
- Floor
- Room number
- Latitude and longitude when known
- Description
- Accessibility information
- Verification status

Use clearly labeled demo data until real campus data is available.

F. Directions foundation
- Let the user choose a destination.
- Show the destination on the map.
- Show a starting point and destination summary.
- Do not claim that a route is accurate until a routing method is implemented.

PHASE 2 COMPLETION:
The map renders, location search works, filters work, markers open correct details, and desktop and mobile layouts work.

---

# PHASE 3 — INDOOR NAVIGATION AND VISITOR MODE

OBJECTIVE:
Help visitors navigate unfamiliar campuses and find rooms or event venues.

A. Building and floor navigation
- Select a building.
- Select a floor.
- View the corresponding floor plan.
- Display classrooms, laboratories, faculty offices, toilets, water stations, stairs, lifts, and entrances.
- Allow a user to select a room and view its details.

B. Indoor route model
Represent mapped indoor locations and walkable paths.

Support:
- Starting location
- Destination
- Connected corridor segments
- Stairs and lifts
- Floor transitions
- Route instructions
- Accessible routes when accessibility data is available

Do not generate a route through walls or disconnected corridors.

C. QR location anchors
- Generate or register QR codes for approved locations.
- Associate each code with a known building, floor, or mapped location.
- Allow users to scan the code.
- Confirm the resolved location before using it as a starting point.
- Handle invalid and unknown codes safely.

D. Visitor Mode
- Select the host college.
- Search for an event venue or facility.
- Navigate to registration desks, auditoriums, classrooms, cafeterias, and toilets.
- Display the destination building and floor.
- Provide manual starting-location selection when indoor positioning is unavailable.

E. Outdoor walking directions
Use a suitable routing solution if available and its terms permit the intended use.

If routing is unavailable, clearly identify illustrative routes as demonstrations rather than real navigation.

PHASE 3 COMPLETION:
A user can select a mapped indoor destination, view the relevant floor plan, follow a valid mapped route where available, and use QR or manual location selection.

---

# PHASE 4 — EVENTS AND REGISTRATION

OBJECTIVE:
Allow students to discover events across colleges and universities.

A. Event discovery
Support:
- Hackathons
- Technical competitions
- College fests
- Workshops
- Seminars
- Conferences
- Sports events
- Cultural events
- Guest lectures
- Online events

B. Search and filters
- Institution
- City and state
- Event category
- Date
- Eligibility
- Online or offline format

C. Event details
Display:
- Event name
- Description
- Host institution
- Organizer
- Date and time
- Registration deadline
- Eligibility
- Venue
- Registration instructions
- Verification status
- Campus map link

D. Registration
- Implement a clear registration workflow.
- Prevent duplicate registrations where appropriate.
- Validate required information.
- Display registration status only after successful persistence.
- Support cancellation where the event rules allow it.

E. Organizer tools
Allow authorized organizers to:
- Create events
- Edit event details
- Select a campus venue
- Set eligibility and registration deadlines
- Manage registrations
- Publish or unpublish events
- View participant lists when authorized

F. Visitor integration
The event page should open the host campus map with the selected venue highlighted.

Use sample events initially. Do not claim a real event is verified unless verification occurred.

PHASE 4 COMPLETION:
Users can discover events, open event details, register through a functioning workflow, view registration status, and navigate to mapped venues.

---

# PHASE 5 — STUDENT, TEACHER, CLUB, AND COLLEGE NETWORKING

OBJECTIVE:
Build the cross-college community.

A. User profiles
Support:
- Student profiles
- Teacher profiles
- Institution affiliation
- Department and course where appropriate
- Skills and interests
- Clubs and communities
- Profile visibility settings

B. Institution directory
- Search colleges and universities.
- View institution details.
- Explore their approved campus information.
- View public events and public communities.

C. Connections
- Send connection requests.
- Accept or reject requests.
- Remove connections.
- Prevent duplicate requests.
- Respect blocked-user and privacy settings.

D. Clubs and communities
- Discover clubs.
- View club profiles.
- Join or request to join.
- Follow approved clubs.
- Allow authorized club managers to update club information.
- Support cross-college collaboration.

E. Teammate discovery
Allow users to discover potential teammates by:
- Skills
- Interests
- Preferred domains
- Institution
- Availability if voluntarily provided

Do not expose private profile data.

F. Messaging
If included in this phase:
- Restrict messaging according to the platform's connection and privacy rules.
- Protect conversation access.
- Validate and persist messages.
- Provide basic reporting and blocking.
- Avoid exposing messages to unauthorized users.

If messaging scope is too large, complete connections and communities first and implement messaging as a separate sub-phase.

PHASE 5 COMPLETION:
Profiles, connections, institution discovery, and club workflows work with persistent data and appropriate permissions.

---

# PHASE 6 — SUPABASE DATABASE AND AUTHENTICATION

OBJECTIVE:
Replace temporary client-only state with secure, persistent application data.

A. Authentication
Implement appropriate sign-up, login, logout, session handling, and password recovery.

Support college affiliation verification through an approved workflow.

Do not treat possession of an email address as sufficient proof of an institution's authority to administer its campus.

B. Database design
Create and document tables for:
- Users and profiles
- Institutions
- Campuses
- Institution memberships
- Buildings
- Floors
- Rooms
- Facilities
- Indoor paths and map locations
- QR location anchors
- Events
- Event registrations
- Clubs
- Club memberships
- Connections
- Conversations and messages, if implemented
- Saved locations and events
- Reports and moderation records

Use foreign keys, appropriate indexes, uniqueness constraints, timestamps, and validation.

Avoid duplicating data that can be properly referenced.

C. Authorization
Implement Row Level Security and enforce authorization on the backend.

Examples:
- Users may edit their own permitted profile fields.
- Users may access only authorized conversations.
- College administrators may manage only institutions they are authorized to administer.
- Event organizers may manage only events they control.
- Platform administrators have only the necessary elevated permissions.

Never rely solely on frontend button visibility to protect data.

D. Storage
- Securely store approved event images and floor plans.
- Validate upload types and sizes.
- Use access controls appropriate to public or private assets.
- Avoid exposing private files publicly.

E. Migration and testing
- Use version-controlled database migrations.
- Keep sample data separate from production data.
- Test authorization with different user roles.
- Document environment variables and setup.

PHASE 6 COMPLETION:
Authentication works, data persists across sessions, authorization is enforced, and the major workflows use the database rather than temporary frontend state.

---

# PHASE 7 — COLLEGE ADMINISTRATION AND INSTITUTION VERIFICATION

OBJECTIVE:
Let colleges manage their own verified campus data and events.

A. Institution onboarding
- Submit an institution registration request.
- Record the institution's name and relevant information.
- Provide a verification workflow.
- Track pending, approved, and rejected requests.
- Allow authorized platform administrators to review requests.

B. Campus management
Authorized college administrators can:
- Add and edit buildings.
- Manage floors and rooms.
- Upload floor plans.
- Add and edit facility markers.
- Update descriptions and accessibility details.
- Review suggested corrections.
- Mark locations for review.
- Publish approved information.

C. Event administration
- Create and update events.
- Select event venues.
- Manage registration settings.
- Publish or unpublish events.
- Review participation information within their permissions.

D. Dashboard
Display useful statistics based on actual database records:
- Total buildings
- Mapped rooms
- Mapped facilities
- Published events
- Registrations
- Pending location corrections
- Institution verification status

Never fabricate dashboard metrics.

E. Platform administration
- Manage institution verification.
- Review reports.
- Moderate content and accounts.
- Audit sensitive administrative actions.
- Enforce platform policies.

PHASE 7 COMPLETION:
An authorized college administrator can maintain their institution's data, and a platform administrator can manage institution onboarding and moderation.

---

# PHASE 8 — TESTING, SECURITY, ACCESSIBILITY, AND DEPLOYMENT

OBJECTIVE:
Prepare a reliable demonstration suitable for hackathon judges.

A. Functional testing
Test:
- Authentication and logout
- Search and filtering
- Map marker selection
- Location details
- Campus and floor selection
- Event discovery
- Registration
- Connection requests
- Administrative workflows
- Database persistence
- Error and empty states

B. Responsive testing
Test:
- Desktop
- Tablet
- Mobile
- Small screens
- Touch targets
- Navigation
- Map usability

C. Security
Review:
- Row Level Security
- Role-based permissions
- Secret handling
- Input validation
- Upload restrictions
- Unauthorized data access
- Authentication errors
- Rate limiting where appropriate
- User privacy and abuse reporting

D. Quality checks
Run available:
- TypeScript checks
- Linting
- Unit tests
- Integration tests
- Production build
- Browser-based end-to-end tests if configured

Fix critical failures before deployment.

E. Deployment
- Prepare production environment variables.
- Configure the hosting provider.
- Configure Supabase production settings.
- Apply database migrations.
- Verify the deployed app.
- Test authentication, maps, storage, and major workflows.
- Document setup and rollback steps.

Do not commit secrets or include development credentials in public repositories.

F. Documentation
Maintain:
- README
- Installation instructions
- Environment variable reference
- Database setup
- Architecture diagram
- Feature inventory
- Testing checklist
- Deployment guide
- Known limitations

PHASE 8 COMPLETION:
The production build succeeds, critical workflows pass, major security boundaries are tested, and the deployment can be demonstrated reliably.

---

# 6. FINAL HACKATHON DEMONSTRATION

Prepare a short, coherent demonstration.

Recommended flow:

1. Open CampusBridge on a mobile device or browser.
2. Search for a participating college.
3. Open its campus map.
4. Find a classroom or facility such as a toilet, drinking water station, cafeteria, or dustbin.
5. View the location details and directions.
6. Open an event hosted by another institution.
7. Navigate to its venue on the host campus map.
8. Show a student profile, club, or cross-college connection.
9. Show the college administrator updating a facility or publishing an event.

Use realistic, clearly labeled sample data if real institution data is unavailable.

Be honest about what is live, what is simulated, and what remains future work.

Prepare a concise explanation of the problem, solution, innovation, technology, feasibility, impact, and future expansion.

---

# 7. HOW YOU MUST GUIDE ME

This is the most important instruction.

Do not respond with only a long roadmap.

Guide me interactively through the actual implementation.

For the current phase:

1. Ask for the latest implementation status only if it is needed.
2. Identify the exact next task.
3. Give me one complete Claude Code prompt that I can copy and paste.
4. Explain how to run and test it.
5. Ask me to share the completion summary, error, or screenshot.
6. Review the result against the phase's completion criteria.
7. Help me fix any issues.
8. Confirm completion before proceeding to the next phase.

If I paste an error, diagnose it before proposing unrelated work.

If I share a screenshot, compare it with the intended design and identify concrete improvements.

If I share code, inspect it before recommending changes.

Do not ask me to repeat information already provided in the conversation.

Do not skip phases simply because the UI looks complete. Equally, do not rebuild features that already work.

If I explicitly ask to proceed through several phases, guide me through them in order while maintaining checkpoints and protecting working code.

Start now with Phase 2: Campus Explorer and Location Discovery. Explain its objective briefly, give me the exact Claude Code prompt, and tell me how to verify the implementation before moving to Phase 3.