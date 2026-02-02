import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { updateProfile } from "../auth/actions";
import styles from "./profile.module.css";

export default async function ProfilePage() {
    const { userId } = await auth();

    if (!userId) {
        return redirect("/sign-in");
    }

    const user = await currentUser();
    const supabase = await createClient();

    // Fetch current profile data by clerk_user_id
    let { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("clerk_user_id", userId)
        .single();

    // Auto-create profile on first visit if none exists
    if (!profile) {
        const { data: newProfile } = await supabase
            .from("profiles")
            .insert({
                clerk_user_id: userId,
                full_name: user?.fullName || "",
            })
            .select()
            .single();
        profile = newProfile;
    }

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
                                <select name="school" defaultValue={profile?.school || ""}>
                                    <option value="">Select a school...</option>
                                    <option value="CC">Columbia College</option>
                                    <option value="SEAS">Fu Foundation School of Engineering (SEAS)</option>
                                    <option value="GS">School of General Studies</option>
                                    <option value="GSAS">Graduate School of Arts and Sciences (GSAS)</option>
                                    <option value="CBS">Columbia Business School</option>
                                    <option value="LAW">Columbia Law School</option>
                                    <option value="SIPA">School of International and Public Affairs (SIPA)</option>
                                    <option value="TC">Teachers College</option>
                                    <option value="JRN">Graduate School of Journalism</option>
                                    <option value="PH">Mailman School of Public Health</option>
                                    <option value="SOA">School of the Arts</option>
                                    <option value="GSAPP">Graduate School of Architecture, Planning and Preservation</option>
                                    <option value="VP&S">Vagelos College of Physicians and Surgeons</option>
                                    <option value="CDM">College of Dental Medicine</option>
                                    <option value="NURSING">School of Nursing</option>
                                    <option value="SSW">School of Social Work</option>
                                    <option value="SPS">School of Professional Studies</option>
                                    <option value="CLIMATE">Columbia Climate School</option>
                                    <option value="BARNARD">Barnard College</option>
                                    <option value="UTS">Union Theological Seminary</option>
                                    <option value="JTS">Jewish Theological Seminary</option>
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
            </div>
        </div>
    );
}
