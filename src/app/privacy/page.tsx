import { LegalPageLayout } from '@/components/layout/LegalPageLayout';

export default function PrivacyPolicyPage() {
    return (
        <LegalPageLayout title="Privacy Policy" lastUpdated="December 24, 2025">
            <section>
                <h2>1. Information We Collect</h2>
                <p>
                    We collect information that you provide directly to us when you create an account, create or edit notes, and communicate with us. This includes:
                </p>
                <ul>
                    <li><strong>Account Information:</strong> Your name, email address, and authentication credentials.</li>
                    <li><strong>Note Content:</strong> The text, tags, and metadata associated with the notes you create.</li>
                    <li><strong>Log Data:</strong> Information about your use of the Service, including access times and browser type.</li>
                </ul>
            </section>

            <section>
                <h2>2. How We Use Your Information</h2>
                <p>
                    We use the information we collect to:
                </p>
                <ul>
                    <li>Provide, maintain, and improve the NoteFlow Service.</li>
                    <li>Synchronize your notes in real-time across your devices.</li>
                    <li>Protect the security of your account and the Service.</li>
                    <li>Send you technical notices, updates, and support messages.</li>
                </ul>
            </section>

            <section>
                <h2>3. Real-Time Collaboration</h2>
                <p>
                    NoteFlow is a collaborative tool. When you collaborate on a note, your display name and cursor position may be visible to other collaborators currently viewing the same note.
                </p>
            </section>

            <section>
                <h2>4. Data Storage</h2>
                <p>
                    Your notes are stored securely on our servers. We use industry-standard encryption and security practices to protect your data. You retain full ownership of the content you create.
                </p>
            </section>

            <section>
                <h2>5. Your Choices</h2>
                <p>
                    You can access, update, or delete your personal information and note content at any time through the Service. Deleting a note will remove it from our active databases.
                </p>
            </section>

            <section>
                <h2>6. Contact Us</h2>
                <p>
                    If you have any questions about this Privacy Policy, please contact us at <a href="mailto:zaudrehman@gmail.com">zaudrehman@gmail.com</a>.
                </p>
            </section>
        </LegalPageLayout>
    );
}
