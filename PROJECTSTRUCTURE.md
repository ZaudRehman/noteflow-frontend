noteflow-frontend/
├── public/
│   ├── fonts/
│   │   ├── Geist-Regular.woff2
│   │   ├── Geist-Medium.woff2
│   │   ├── Geist-SemiBold.woff2
│   │   ├── GeistMono-Regular.woff2
│   │   ├── GoogleSansFlex-Medium.woff2
│   │   ├── GoogleSansFlex-SemiBold.woff2
│   │   └── LineSeedSans-Regular.woff2
│   ├── icons/
│   │   ├── favicon.ico
│   │   ├── logo.svg
│   │   └── icon-192.png
│   └── manifest.json
│
├── src/
│   ├── app/
│   │   ├── layout.tsx                    # Root layout
│   │   ├── page.tsx                      # Landing page (/)
│   │   ├── globals.css
│   │   ├── error.tsx
│   │   ├── loading.tsx
│   │   │
│   │   ├── (auth)/                       # Auth group (centered layout)
│   │   │   ├── layout.tsx
│   │   │   ├── login.tsx                 # /login ✅
│   │   │   ├── register.tsx              # /register ✅
│   │   │   ├── forgot-password.tsx       # /forgot-password ✅
│   │   │   └── reset-password.tsx        # /reset-password ✅
│   │   │
│   │   └── (dashboard)/                  # Protected group (sidebar layout)
│   │       ├── layout.tsx
│   │       ├── dashboard.tsx             # /dashboard ✅
│   │       ├── notes/
│   │       │   ├── page.tsx              # /notes
│   │       │   ├── [id].tsx              # /notes/[id] (editor)
│   │       │   ├── favorites.tsx         # /notes/favorites ✅
│   │       │   └── archived.tsx          # /notes/archived ✅
│   │       ├── tags/
│   │       │   ├── page.tsx              # /tags
│   │       │   └── [id].tsx              # /tags/[id]
│   │       ├── search.tsx                # /search ✅
│   │       └── profile.tsx               # /profile ✅
│   │
│   ├── components/
│   │   ├── ui/                           # 18 primitives
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Textarea.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Dropdown.tsx
│   │   │   ├── Tooltip.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Avatar.tsx
│   │   │   ├── Skeleton.tsx
│   │   │   ├── Toast.tsx
│   │   │   ├── Switch.tsx
│   │   │   ├── Checkbox.tsx
│   │   │   ├── Radio.tsx
│   │   │   └── Spinner.tsx
│   │   │
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── MobileNav.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Logo.tsx
│   │   │
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   ├── ForgotPasswordForm.tsx
│   │   │   ├── ResetPasswordForm.tsx
│   │   │   ├── AuthGuard.tsx
│   │   │   └── LogoutButton.tsx
│   │   │
│   │   ├── notes/
│   │   │   ├── NoteCard.tsx
│   │   │   ├── NoteGrid.tsx
│   │   │   ├── NoteList.tsx
│   │   │   ├── NoteEditor.tsx
│   │   │   ├── NotePreview.tsx
│   │   │   ├── NoteToolbar.tsx
│   │   │   ├── NoteFilters.tsx
│   │   │   ├── CreateNoteButton.tsx
│   │   │   ├── DeleteNoteDialog.tsx
│   │   │   ├── ActiveUsers.tsx
│   │   │   └── CursorIndicator.tsx
│   │   │
│   │   ├── tags/
│   │   │   ├── TagChip.tsx
│   │   │   ├── TagList.tsx
│   │   │   ├── TagSelector.tsx
│   │   │   ├── TagManager.tsx
│   │   │   ├── CreateTagDialog.tsx
│   │   │   ├── EditTagDialog.tsx
│   │   │   └── DeleteTagDialog.tsx
│   │   │
│   │   ├── search/
│   │   │   ├── SearchBar.tsx
│   │   │   ├── SearchResults.tsx
│   │   │   └── SearchFilters.tsx
│   │   │
│   │   ├── profile/
│   │   │   ├── ProfileForm.tsx
│   │   │   ├── PreferencesForm.tsx
│   │   │   ├── AvatarUpload.tsx
│   │   │   └── SessionList.tsx
│   │   │
│   │   ├── landing/
│   │   │   ├── Hero.tsx
│   │   │   ├── Features.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   └── CTA.tsx
│   │   │
│   │   └── shared/
│   │       ├── EmptyState.tsx
│   │       ├── ErrorBoundary.tsx
│   │       ├── LoadingState.tsx
│   │       ├── Pagination.tsx
│   │       └── ConfirmDialog.tsx
│   │
│   ├── lib/
│   │   ├── api/
│   │   │   ├── client.ts             # Axios with https://noteflow-backend-v1.onrender.com/api/v1
│   │   │   ├── auth.ts               # POST /auth/register, /auth/login, etc.
│   │   │   ├── notes.ts              # GET /notes, POST /notes, PUT /notes/:id, etc.
│   │   │   ├── tags.ts               # GET /tags, POST /tags, PUT /tags/:id, etc.
│   │   │   ├── users.ts              # GET /users/profile, PUT /users/profile, etc.
│   │   │   └── search.ts             # GET /search?q=query
│   │   │
│   │   ├── websocket/
│   │   │   ├── manager.ts            # wss://noteflow-backend-v1.onrender.com/api/v1/notes/:id/ws
│   │   │   ├── types.ts              # WsMessage union type
│   │   │   └── hooks.ts              # useWebSocket(noteId)
│   │   │
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   ├── useNotes.ts
│   │   │   ├── useTags.ts
│   │   │   ├── useSearch.ts
│   │   │   ├── useDebounce.ts
│   │   │   ├── useLocalStorage.ts
│   │   │   └── useMediaQuery.ts
│   │   │
│   │   ├── stores/
│   │   │   ├── authStore.ts
│   │   │   ├── notesStore.ts
│   │   │   ├── tagsStore.ts
│   │   │   └── uiStore.ts
│   │   │
│   │   ├── types/
│   │   │   ├── api.ts                # Response/request types
│   │   │   ├── models.ts             # User, Note, Tag, Revision (match backend)
│   │   │   └── websocket.ts          # WsMessage variants
│   │   │
│   │   ├── utils/
│   │   │   ├── cn.ts
│   │   │   ├── formatDate.ts
│   │   │   ├── truncate.ts
│   │   │   ├── validation.ts         # Zod schemas
│   │   │   └── constants.ts
│   │   │
│   │   └── config/
│   │       ├── env.ts                # Validate NEXT_PUBLIC_API_BASE_URL, etc.
│   │       ├── routes.ts
│   │       └── theme.ts
│   │
│   ├── styles/
│   │   ├── globals.css
│   │   ├── neumorphic.css
│   │   └── markdown.css
│   │
│   └── middleware.ts                 # Auth redirect logic
│
├── .env.local
├── .env.example
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
