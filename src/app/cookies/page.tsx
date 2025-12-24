import { LegalPageLayout } from '@/components/layout/LegalPageLayout';

export default function CookiePolicyPage() {
    return (
        <LegalPageLayout title="Cookie Policy" lastUpdated="December 24, 2025">
            <section>
                <h2>1. What Are Cookies?</h2>
                <p>
                    Cookies are small text files stored on your device that help web applications remember your preferences and provide a consistent experience.
                </p>
            </section>

            <section>
                <h2>2. How We Use Cookies</h2>
                <p>
                    NoteFlow uses cookies and similar technologies (like LocalStorage) primarily for essential purposes:
                </p>
                <ul>
                    <li><strong>Authentication:</strong> To keep you logged in as you navigate the application.</li>
                    <li><strong>Preferences:</strong> To remember your theme settings and sidebar state.</li>
                    <li><strong>Security:</strong> To protect against CSRF and other common web vulnerabilities.</li>
                    <li><strong>Scratchpad:</strong> We use LocalStorage to store your local scratchpad content so it persists between sessions.</li>
                </ul>
            </section>

            <section>
                <h2>3. Third-Party Cookies</h2>
                <p>
                    We do not currently use third-party tracking or advertising cookies. Any cookies used are strictly functional and necessary for the core NoteFlow experience.
                </p>
            </section>

            <section>
                <h2>4. Managing Cookies</h2>
                <p>
                    Most web browsers allow you to control cookies through their settings. However, disabling essential cookies may prevent NoteFlow from functioning correctly (e.g., you won't be able to stay logged in).
                </p>
            </section>

            <section>
                <h2>5. Updates to This Policy</h2>
                <p>
                    We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.
                </p>
            </section>

            <section>
                <h2>6. Questions</h2>
                <p>
                    If you have questions about our use of cookies, please contact us at <a href="mailto:zaudrehman@gmail.com">zaudrehman@gmail.com</a>.
                </p>
            </section>
        </LegalPageLayout>
    );
}
