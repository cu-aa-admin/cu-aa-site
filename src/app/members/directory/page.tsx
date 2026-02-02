import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import styles from "./directory.module.css";

export const dynamic = 'force-dynamic';

export default async function DirectoryPage(props: {
    searchParams: Promise<{ search?: string; industry?: string }>;
}) {
    const searchParams = await props.searchParams;

    // 1. Verify Auth with Clerk
    const { userId } = await auth();

    if (!userId) {
        redirect("/sign-in");
    }

    const supabase = await createClient();

    // 2. Build Query
    let query = supabase
        .from("profiles")
        .select("*")
        .order("full_name", { ascending: true });

    if (searchParams.search) {
        query = query.ilike("full_name", `%${searchParams.search}%`);
    }

    if (searchParams.industry) {
        query = query.ilike("industry", `%${searchParams.industry}%`);
    }

    const { data: profiles, error } = await query;

    if (error) {
        console.error("Error fetching profiles:", error);
        return <div>Error loading directory</div>;
    }

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <div className={styles.container}>
                    <h1>Alumni Directory</h1>
                    <p>Connect with {profiles?.length || 0} fellow alumni.</p>

                    <form className={styles.searchBar}>
                        <input
                            name="search"
                            placeholder="Search by name..."
                            defaultValue={searchParams.search}
                            className={styles.searchInput}
                        />
                        <input
                            name="industry"
                            placeholder="Filter by Industry..."
                            defaultValue={searchParams.industry}
                            className={styles.searchInput}
                        />
                        <button type="submit" className={styles.searchBtn}>Search</button>
                        {(searchParams.search || searchParams.industry) && (
                            <a href="/members/directory" className={styles.clearBtn}>Clear</a>
                        )}
                    </form>
                </div>
            </div>

            <div className={styles.container}>
                <div className={styles.grid}>
                    {profiles?.map((profile) => (
                        <div key={profile.id} className={styles.card}>
                            <div className={styles.cardHeader}>
                                <div className={styles.avatar}>
                                    {profile.full_name ? profile.full_name[0].toUpperCase() : '?'}
                                </div>
                                <div>
                                    <h3 className={styles.name}>{profile.full_name || "Unnamed Member"}</h3>
                                    <div className={styles.meta}>
                                        {profile.school} • {profile.class_year}
                                    </div>
                                </div>
                            </div>

                            <div className={styles.cardBody}>
                                {profile.company && (
                                    <div className={styles.role}>
                                        <strong>{profile.company}</strong>
                                        {profile.industry && <span className={styles.tag}>{profile.industry}</span>}
                                    </div>
                                )}

                                {profile.bio && (
                                    <p className={styles.bio}>{profile.bio}</p>
                                )}
                            </div>

                            {profile.linkedin_url && (
                                <div className={styles.cardFooter}>
                                    <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" className={styles.linkedinBtn}>
                                        View LinkedIn
                                    </a>
                                </div>
                            )}
                        </div>
                    ))}

                    {profiles?.length === 0 && (
                        <div className={styles.empty}>
                            No members found matching your search.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
