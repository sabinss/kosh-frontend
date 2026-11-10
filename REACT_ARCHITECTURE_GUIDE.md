React Architecture & Design Patterns Learning Guide
Purpose
Use this document as the architecture and teaching guide for my React
project. When I ask Claude Code to build a feature, I want it to inspect
the project, choose appropriate design patterns, explain the design in
simple language, implement the feature, and teach me how the code works.

Do not force every pattern into every feature. Use a pattern only
when it solves a real problem. Prefer simple, maintainable code over
unnecessary abstraction.

1. Pattern-to-feature learning map
   Pattern / concept Example feature What I should learn
   Container--Presenter Roles listing page Separate data fetching
   and business logic from
   UI rendering.

Controlled & Create Role form Understand when React
Uncontrolled Components should own input state
and when native form
state is enough.

Compound Components Permission selection Build related
panel components that share
state and work together
through
composition/context.

Render Props Customizable Share behavior while
permissions table allowing callers to
customize rendering;
compare with hooks and
composition.

Higher-Order Component Protected Understand component
(HOC) platform-admin pages wrapping and
cross-cutting concerns;
compare with route
guards and hooks.

Custom Hooks Permission checking Extract reusable logic,
such as useCan() or
usePermissions().

Provider / Context Auth, tenant, and theme Share app-wide state
context without prop drilling;
understand provider
boundaries.

Optimistic UI Activate/deactivate Update UI before the
role server responds, then
confirm or roll back on
failure.

State Reducer Role permission editor Model complex state
transitions predictably
and allow behavior
customization.

Observer / Pub-Sub Role update Notify multiple
notifications interested parts of the
app when a role
changes; know when this
is unnecessary.

Performance patterns Permission matrix with Learn profiling,
hundreds of permissions memoization,
pagination,
virtualization, and
efficient data
structures.

Slot pattern Reusable admin cards Let callers provide
and layouts custom content to
specific areas of
reusable components.

Strategy pattern Different authorization Encapsulate
strategies interchangeable
authorization rules
behind a consistent
interface.
Facade pattern Tenant provisioning Provide a simple API
workflow over a multi-step
workflow involving
services and API calls. 2. How Claude Code should work with me
Step 1 --- Inspect the project first

- Inspect the folder structure, package.json, routing, state
  management, API client, styling system, and tests.
- Find similar existing features and follow their conventions.
- Identify the current authentication, authorization, tenant, and API
  architecture.
- Do not assume a library is installed; verify it.
- Do not rewrite unrelated files or introduce a new architecture
  without explaining why.
  Step 2 --- Understand the feature
  Summarize the business problem, expected user flow, API requirements,
  important UI states (loading, success, empty, error, unauthorized),
  security requirements, and any missing decisions.

Ask only questions that are essential. Clearly state assumptions instead
of silently inventing requirements.
Step 3 --- Teach the design before coding
Explain in beginner-friendly language:

1. Which patterns are appropriate for this feature.
2. Why each pattern fits and what problem it solves.
3. Which components, hooks, providers, services, and types will be
   created or changed.
4. How data flows through the feature.
5. How errors and edge cases will be handled.
6. Which patterns are unnecessary and why.
   Use a small example or analogy for unfamiliar concepts. Keep the
   explanation connected to the feature.
   Step 4 --- Show a proposed structure
   Adapt the file tree to the existing project. For example:
   src/
   features/
   auth/
   api/
   components/
   hooks/
   pages/
   providers/
   services/
   types/
   shared/
   components/
   hooks/
   lib/
   This is only an example. Do not force this structure if the project
   already uses another convention.
   Step 5 --- Implement incrementally

- Build in small, understandable steps.
- Explain important files and their responsibilities.
- Use explicit TypeScript types if the project uses TypeScript.
- Reuse existing API clients, error handling, UI components, and
  routing.
- Keep components focused; avoid giant components.
- Avoid duplicating business rules and avoid premature abstractions.
- Include accessibility and useful user feedback.
- Add or update tests using the project's existing test framework.
  For a large task, implement a working vertical slice first, then extend
  it.
  Step 6 --- Verify
  Run relevant checks where available: type checking, linting,
  unit/component tests, build, and relevant end-to-end tests. Report
  exactly what was run and whether it passed. Never claim a check passed
  if it was not run.
  Step 7 --- Teach me after implementation
  Finish with: - A short explanation of the end-to-end flow. - The
  patterns used and where they appear. - The most important files to
  read. - A simple example of how to extend the feature. - Trade-offs and
  possible improvements. - A few questions to check my understanding.

Do not just dump code. Help me understand the reasoning so I can build
the next feature myself. 3. Example: Authentication feature
When I ask Claude Code to implement authentication, use this checklist
as a starting point. Adapt it to the actual backend and existing
project.
First inspect or clarify

- Login method: email/password, SSO, OAuth, or something else.
- Backend authentication endpoints and response format.
- Access-token and refresh-token behavior.
- Whether the backend uses secure HTTP-only cookies or returns tokens.
- Logout and session-expiration behavior.
- Whether multiple tenants are supported.
- Whether roles and permissions come from the backend.
- Public routes and protected routes.
- Platform-admin versus tenant-user access.
  Security: Do not invent a token-storage approach. Prefer secure
  HTTP-only cookies when supported by the backend. Do not store sensitive
  session tokens in localStorage by default. The backend must enforce
  authorization; hiding a UI element is not a security boundary.
  Possible architecture
  Concern Possible implementation Pattern / concept
  Authentication state AuthProvider and Provider
  useAuth()

  Login form Controlled form state Controlled components
  and validation

  Login API calls Auth API module/service Separation of concerns

  Current-user loading useCurrentUser() Custom Hook

  Protected routes Route-level Composition; HOC only
  authentication check if justified by project
  conventions

  Permission checks useCan(permission) Custom Hook

  Role/permission rules Centralized Strategy, only if
  authorization policy multiple policies are
  needed

  Session expiry Consistent API error Service/facade boundary
  handling and session where useful
  reset  
  Logout Centralized Service where useful
  session-ending
  operation
  Example responsibilities

- AuthProvider: exposes authentication state to the application.
- useAuth: gives components access to user, status, login, and
  logout.
- authApi: calls backend authentication endpoints.
- ProtectedRoute: redirects or blocks unauthenticated users.
- useCan: checks whether the current user has a permission.
- LoginPage: composes the page-level UI.
- LoginForm: renders fields, validation, and submit interaction.
  Use names and boundaries that fit the actual project.
  Authentication states
  Model states explicitly instead of relying on one ambiguous boolean:
- loading --- checking whether a session exists.
- authenticated --- a valid user session is available.
- unauthenticated --- no valid session exists.
- error --- session initialization or authentication failed, if the
  UI needs to distinguish it.
  Avoid briefly showing protected content while the app is still checking
  the session.
  Example flow
  User opens application
  |
  v
  Application checks session
  |
  +---+---+
  | |
  Valid Invalid
  | |
  v v
  Dashboard Login page
  |
  v
  Backend checks permissions
  |
  v
  Show permitted actions
  The frontend improves navigation and user experience. The backend must
  independently authorize every protected operation.

4. Example: Role and permission management
   Feature Learning focus
   Roles listing page Container--Presenter; loading,
   empty, and error states

Create Role form Controlled components and
validation

Permission selection panel Compound Components

Customizable permissions table Composition or Render Props;
compare alternatives

Protected platform-admin pages Route guards and authorization
boundaries

Permission checking Custom Hooks and centralized policy

Auth, tenant, and theme context Provider

Activate/deactivate role Optimistic UI with rollback

Role permission editor State Reducer

Role update notifications Observer/Pub-Sub only if multiple
real subscribers need it

Large permission matrix Profiling, virtualization,
efficient rendering

Reusable admin cards and layouts Slot pattern

Different authorization strategies Strategy
Tenant provisioning workflow Facade
For each feature, explain the pattern in the context of the actual code.
Show why it is better than a simpler alternative for that particular
case. 5. Architecture and code-quality rules

- Keep complex or reused business rules out of presentation
  components.
- Keep server state separate from local UI state. Reuse the project's
  existing data-fetching approach.
- Use Context selectively; it is not automatically the right place for
  every state value.
- Do not use HOCs, Render Props, reducers, Pub/Sub, or Facades just to
  demonstrate a pattern. Explain when a hook, composition, or simple
  function is enough.
- Backend authorization is authoritative. Frontend permission checks
  are for user experience, not security.
- Avoid premature global state and unnecessary dependencies.
- Handle loading, empty, error, success, and unauthorized states.
- Clean up subscriptions and event listeners.
- Prefer readable code over clever code.
- Test important business rules, not only implementation details.
- Preserve existing conventions unless there is a clear reason to
  change them.

6. Reusable prompt for future Claude Code tasks
   Copy this prompt and replace the feature name and requirements:
   I want to implement [FEATURE NAME] in this React project.

Use REACT_ARCHITECTURE_LEARNING_GUIDE.md as the learning and architecture guide.

Act as both:

1. A senior React engineer who designs and implements maintainable production code.
2. A teacher who explains concepts and design decisions in beginner-friendly language.

Follow this process:

1. Inspect the project before changing anything. Identify its architecture,
   libraries, conventions, routing, API layer, state management, and tests.
2. Understand the feature and identify missing requirements. Ask only essential
   questions and clearly state assumptions.
3. Explain the proposed design before coding:
   - Which design patterns fit?
   - Why are they appropriate?
   - What problem does each pattern solve?
   - What simpler alternatives did you consider?
4. Show the proposed file structure and data flow.
5. Implement incrementally, following existing project conventions.
6. Explain important files and code as you build.
7. Include relevant loading, success, empty, error, and unauthorized states.
8. Consider security, accessibility, performance, and edge cases.
9. Add or update tests and run relevant checks.
10. Summarize how it works, where each pattern is used, and how I can extend it.

Important:

- Do not force patterns where they are not needed.
- Do not add unnecessary dependencies or rewrite unrelated code.
- Do not assume backend API behavior; inspect the project or ask me.
- For authentication and authorization, frontend checks never replace
  backend security.
- Do not skip the teaching explanation and give me code only.

Feature to implement:
[DESCRIBE THE FEATURE AND EXPECTED BEHAVIOR HERE] 7. Suggested learning order

1. React foundations: composition, props, state, controlled inputs.
2. Component architecture: Container--Presenter, Compound
   Components, Slot.
3. Reusable behavior: Custom Hooks, Context Provider, Render Props.
4. Access control: authentication, protected routes, permission
   checking, Strategy.
5. Complex state: reducers, State Reducer, optimistic updates.
6. Communication and scale: Observer/Pub-Sub, performance
   profiling, virtualization.
7. Workflow orchestration: Facade and tenant provisioning.
   The goal is not to use every pattern everywhere. The goal is to
   recognize a problem, choose an appropriate pattern, understand its
   trade-offs, and implement it confidently
