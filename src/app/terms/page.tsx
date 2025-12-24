import { LegalPageLayout } from '@/components/layout/LegalPageLayout';

export default function TermsOfServicePage() {
    return (
        <LegalPageLayout title="Terms of Service" lastUpdated="December 24, 2025">
            <section>
                <h2>1. Acceptance of Terms</h2>
                <p>
                    By accessing or using NoteFlow ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
                </p>
            </section>

            <section>
                <h2>2. Description of Service</h2>
                <p>
                    NoteFlow is a real-time collaborative note-taking application. We provide tools for creating, organizing, and sharing notes with other users.
                </p>
            </section>

            <section>
                <h2>3. User Accounts</h2>
                <p>
                    You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.
                </p>
            </section>

            <section>
                <h2>4. User Content</h2>
                <p>
                    You retain all rights to the content you post to the Service. By posting content, you grant us a worldwide, non-exclusive, royalty-free license to host, store, and display your content solely for the purpose of providing the Service.
                </p>
            </section>

            <section>
                <h2>5. Prohibited Conduct</h2>
                <p>
                    You agree not to use the Service for any unlawful purpose or to engage in any conduct that disrupts or interferes with the Service. This includes, but is not limited to, attempting to gain unauthorized access to our systems or other users' accounts.
                </p>
            </section>

            <section>
                <h2>6. Termination</h2>
                <p>
                    We reserve the right to terminate or suspend your account and access to the Service at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users of the Service.
                </p>
            </section>

            <section>
                <h2>7. Limitation of Liability</h2>
                <p>
                    To the maximum extent permitted by law, NoteFlow shall not be liable for any indirect, incidental, special, or consequential damages resulting from your use of the Service.
                </p>
            </section>

            <section>
                <h2>8. Contact</h2>
                <p>
                    Questions about the Terms of Service should be sent to <a href="mailto:zaudrehman@gmail.com">zaudrehman@gmail.com</a>.
                </p>
            </section>
        </LegalPageLayout>
    );
}
