import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { updateProfile } from "../auth/actions";
import styles from "./profile.module.css";

export default async function ProfilePage() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    // Fetch current profile data
    const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <h1>Your Profile</h1>
                <p className={styles.subtitle}>
                    This information will be displayed in the Alumni Directory.
                </p>

                <form action={updateProfile} className={styles.form}>
                    <div className={styles.section}>
                        <h2>Basic Info</h2>
                        <div className={styles.grid}>
                            <div className={styles.field}>
                                <label>Full Name</label>
                                <input
                                    name="full_name"
                                    defaultValue={profile?.full_name || ""}
                                    placeholder="e.g. Jane Doe"
                                />
                            </div>
                            <div className={styles.field}>
                                <label>Linked In URL</label>
                                <input
                                    name="linkedin_url"
                                    defaultValue={profile?.linkedin_url || ""}
                                    placeholder="https://linkedin.com/in/..."
                                />
                            </div>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h2>Columbia Affiliation</h2>
                        <div className={styles.grid}>
                            <div className={styles.field}>
                                <label>School</label>
                                <select name="school" defaultValue={profile?.school || "CC"}>
                                    <option value="CC">Columbia College</option>
                                    <option value="SEAS">Engineering (SEAS)</option>
                                    <option value="SIPA">SIPA</option>
                                    <option value="CBS">Business School</option>
                                    <option value="LAW">Law School</option>
                                    <option value="GSAS">GSAS</option>
                                    <option value="TC">Teachers College</option>
                                    <option value="JRN">Journalism</option>
                                    <option value="PH">Public Health</option>
                                    <option value="GS">General Studies</option>
                                    <option value="SOA">The Arts</option>
                                </select>
                            </div>
                            <div className={styles.field}>
                                <label>Class Year</label>
                                <input
                                    name="class_year"
                                    defaultValue={profile?.class_year || ""}
                                    placeholder="e.g. 2015"
                                />
                            </div>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h2>Professional</h2>
                        <div className={styles.grid}>
                            <div className={styles.field}>
                                <label>Industry</label>
                                <input
                                    name="industry"
                                    defaultValue={profile?.industry || ""}
                                    placeholder="e.g. Finance, Tech, Healthcare"
                                />
                            </div>
                            <div className={styles.field}>
                                <label>Current Company / Org</label>
                                <input
                                    name="company"
                                    defaultValue={profile?.company || ""}
                                    placeholder="e.g. Google"
                                />
                            </div>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h2>Bio</h2>
                        <div className={styles.field}>
                            <label>Short Bio</label>
                            <textarea
                                name="bio"
                                rows={4}
                                defaultValue={profile?.bio || ""}
                                placeholder="Tell the community about your work and interests..."
                            />
                        </div>
                    </div>

                    <div className={styles.submitArea}>
                        <button type="submit" className={styles.saveBtn}>
                            Save Changes
                        </button>
                    </div>
                </form>

                <div className={styles.signout}>
                    <form action="/auth/signout" method="post">
                        <button className={styles.linkBtn} type="submit">Sign out</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
